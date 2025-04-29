import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { insertUserSchema, resumeDataSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import session from "express-session";
import createMemoryStore from "memorystore";

// Initialize Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_example";
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-03-31.basil",
});

// Session setup for express

export async function registerRoutes(app: Express): Promise<Server> {
  // Create session middleware
  const MemoryStore = createMemoryStore(session);

  // Set up session
  app.use(
    session({
      cookie: { maxAge: 86400000 },
      store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || 'resume-builder-secret'
    })
  );

  // Auth middleware
  const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.session.user) {
      return next();
    }
    return res.status(401).json({ message: "Unauthorized" });
  };

  // Check if user has active subscription
  const hasActiveSubscription = async (userId: number) => {
    const user = await storage.getUser(userId);
    if (!user) {
      return false;
    }
    return user.subscriptionStatus === "active" && 
           user.subscriptionExpiresAt && 
           new Date(user.subscriptionExpiresAt) > new Date();
  };

  // Auth routes
  app.post("/api/signup", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(validatedData.password, salt);
      
      // Create user
      const user = await storage.createUser({
        username: validatedData.username,
        password: hashedPassword
      });

      // Set user in session (without password)
      req.session.user = {
        id: user.id,
        username: user.username
      };
      
      return res.status(201).json({
        id: user.id,
        username: user.username
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      return res.status(500).json({ message: "Error creating user" });
    }
  });

  app.post("/api/signin", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set user in session (without password)
      req.session.user = {
        id: user.id,
        username: user.username
      };
      
      return res.json({
        id: user.id,
        username: user.username
      });
    } catch (error) {
      console.error('Signin error:', error);
      return res.status(500).json({ message: "Error signing in" });
    }
  });

  app.post("/api/signout", (req, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Error signing out" });
      }
      return res.status(200).json({ message: "Signed out successfully" });
    });
  });

  app.get("/api/me", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.session as any).user.id;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.json({
        id: user.id,
        username: user.username
      });
    } catch (error) {
      console.error('Error getting current user:', error);
      return res.status(500).json({ message: "Error fetching user data" });
    }
  });

  // Resumes API
  app.get("/api/resumes", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.session as any).user.id;
      const resumes = await storage.getResumes(userId);
      
      // Transform data to include name extracted from JSON data
      const formattedResumes = resumes.map(resume => {
        const data = JSON.parse(resume.data);
        return {
          id: resume.id,
          name: `${data.personalInfo.firstName} ${data.personalInfo.lastName} Resume`,
          templateId: resume.templateId,
          updatedAt: resume.updatedAt
        };
      });
      
      return res.json(formattedResumes);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      return res.status(500).json({ message: "Error fetching resumes" });
    }
  });

  app.get("/api/resumes/:id", isAuthenticated, async (req, res) => {
    try {
      const resumeId = parseInt(req.params.id);
      const userId = (req.session as any).user.id;
      
      const resume = await storage.getResumeById(resumeId);
      
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      // Ensure user owns this resume
      if (resume.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized access to resume" });
      }
      
      // Return parsed data
      return res.json(JSON.parse(resume.data));
    } catch (error) {
      console.error('Error fetching resume:', error);
      return res.status(500).json({ message: "Error fetching resume" });
    }
  });

  // Check free templates usage limit (3 resumes max for free users)
  app.get("/api/free-templates-count", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.session as any).user.id;
      
      // Check subscription status
      const isPremium = await hasActiveSubscription(userId);
      if (isPremium) {
        return res.json({ 
          count: 0, 
          reachedLimit: false,
          isPremium: true
        });
      }
      
      // Count free template resumes
      const userResumes = await storage.getResumes(userId);
      const freeTemplateResumes = userResumes.filter(resume => {
        const templateId = resume.templateId;
        // Check if template is free (basic, modern, classic)
        return ['basic', 'modern', 'classic'].includes(templateId);
      });
      
      return res.json({
        count: freeTemplateResumes.length,
        reachedLimit: freeTemplateResumes.length >= 3,
        isPremium: false
      });
    } catch (error) {
      console.error('Error checking free templates count:', error);
      return res.status(500).json({ message: "Error checking free templates count" });
    }
  });

  app.post("/api/resumes", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.session as any).user.id;
      const resumeData = req.body;
      
      // Validate resume data
      const validatedData = resumeDataSchema.parse(resumeData);
      
      // Check if user is attempting to use a premium template without subscription
      const isPremium = await hasActiveSubscription(userId);
      const selectedTemplateId = validatedData.templateId;
      const isSelectedTemplatePremium = !['basic', 'modern', 'classic'].includes(selectedTemplateId);
      
      if (isSelectedTemplatePremium && !isPremium) {
        return res.status(403).json({ 
          message: "Premium subscription required to use this template",
          requiresSubscription: true
        });
      }
      
      // Check free templates limit (only for free templates and non-premium users)
      if (!isPremium && !isSelectedTemplatePremium) {
        const userResumes = await storage.getResumes(userId);
        const freeTemplateResumes = userResumes.filter(resume => 
          ['basic', 'modern', 'classic'].includes(resume.templateId)
        );
        
        if (freeTemplateResumes.length >= 3) {
          return res.status(403).json({ 
            message: "Free account limit reached (3 resumes max). Please upgrade to premium.",
            reachedFreeLimit: true
          });
        }
      }
      
      // Create resume
      const resume = await storage.createResume({
        userId,
        name: `${validatedData.personalInfo.firstName} ${validatedData.personalInfo.lastName} Resume`,
        templateId: validatedData.templateId,
        data: JSON.stringify(validatedData)
      });
      
      return res.status(201).json({
        id: resume.id,
        name: resume.name,
        templateId: resume.templateId
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error('Error creating resume:', error);
      return res.status(500).json({ message: "Error creating resume" });
    }
  });

  app.put("/api/resumes/:id", isAuthenticated, async (req, res) => {
    try {
      const resumeId = parseInt(req.params.id);
      const userId = (req.session as any).user.id;
      const resumeData = req.body;
      
      // Validate resume data
      const validatedData = resumeDataSchema.parse(resumeData);
      
      // Find resume
      const existingResume = await storage.getResumeById(resumeId);
      if (!existingResume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      // Ensure user owns this resume
      if (existingResume.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized access to resume" });
      }
      
      // Update resume
      const updatedResume = await storage.updateResume(resumeId, {
        name: `${validatedData.personalInfo.firstName} ${validatedData.personalInfo.lastName} Resume`,
        templateId: validatedData.templateId,
        data: JSON.stringify(validatedData)
      });
      
      return res.json({
        id: updatedResume?.id,
        name: updatedResume?.name,
        templateId: updatedResume?.templateId
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error('Error updating resume:', error);
      return res.status(500).json({ message: "Error updating resume" });
    }
  });

  app.delete("/api/resumes/:id", isAuthenticated, async (req, res) => {
    try {
      const resumeId = parseInt(req.params.id);
      const userId = (req.session as any).user.id;
      
      // Find resume
      const existingResume = await storage.getResumeById(resumeId);
      if (!existingResume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      // Ensure user owns this resume
      if (existingResume.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized access to resume" });
      }
      
      // Delete resume
      await storage.deleteResume(resumeId);
      
      return res.json({ message: "Resume deleted successfully" });
    } catch (error) {
      console.error('Error deleting resume:', error);
      return res.status(500).json({ message: "Error deleting resume" });
    }
  });

  // Subscription API
  app.get("/api/subscription", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.session as any).user.id;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const isPremium = user.subscriptionStatus === "active" && 
                        user.subscriptionExpiresAt && 
                        new Date(user.subscriptionExpiresAt) > new Date();
      
      return res.json({
        isPremium,
        expiresAt: user.subscriptionExpiresAt
      });
    } catch (error) {
      console.error('Error getting subscription status:', error);
      return res.status(500).json({ message: "Error fetching subscription data" });
    }
  });

  // Stripe payment route for one-time payments
  app.post("/api/create-payment-intent", isAuthenticated, async (req, res) => {
    try {
      const { amount } = req.body;
      const userId = (req.session as any).user.id;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Create a Payment Intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          userId: userId.toString()
        },
      });
      
      // Update user with subscription status (will be confirmed after payment)
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1); // One month subscription
      
      await storage.updateSubscriptionStatus(userId, "active", expiresAt);
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
