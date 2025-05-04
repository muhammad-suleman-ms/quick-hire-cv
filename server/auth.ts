import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser, UserRole } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Log visit with their IP and user agent
async function logVisit(req: Request) {
  try {
    const ipAddress = req.ip || req.headers['x-forwarded-for'] as string || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    
    // Log the visit
    await storage.logActivity({
      userId: req.user?.id,
      action: 'page_visit',
      details: { 
        path: req.path,
        method: req.method,
        referrer: req.headers.referer || null,
      },
      ipAddress,
      userAgent
    });
    
    // Update daily analytics
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await storage.updateDailyAnalytics(today, { visits: 1 });
  } catch (err) {
    console.error('Error logging visit:', err);
  }
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "resume-builder-secret",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === 'production'
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Log visits
  app.use(async (req, res, next) => {
    // Only log API requests (to avoid logging static files)
    if (req.path.startsWith('/api')) {
      await logVisit(req);
    }
    next();
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        }
        
        // Update last login timestamp
        await storage.updateUser(user.id, { lastLoginAt: new Date() });
        
        // Log the login activity
        const updatedUser = await storage.getUser(user.id);
        return done(null, updatedUser);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).send("Username already exists");
      }
      
      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).send("Email already exists");
      }

      // Set the role (admin for first user, otherwise regular user)
      const users = await storage.getAllUsers();
      const isFirstUser = users.length === 0;
      
      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
        role: isFirstUser ? UserRole.ADMIN : UserRole.USER,
        lastLoginAt: new Date()
      });

      // Log the registration
      await storage.logActivity({
        userId: user.id,
        action: 'user_registered',
        details: { username: user.username, email: user.email },
        ipAddress: req.ip || req.headers['x-forwarded-for'] as string || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown'
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/login", async (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: "Invalid credentials" });
      
      req.login(user, async (loginErr) => {
        if (loginErr) return next(loginErr);
        
        // Log the login
        await storage.logActivity({
          userId: user.id,
          action: 'user_login',
          details: { username: user.username },
          ipAddress: req.ip || req.headers['x-forwarded-for'] as string || 'unknown',
          userAgent: req.headers['user-agent'] || 'unknown'
        });
        
        return res.status(200).json(user);
      });
    })(req, res, next);
  });

  app.post("/api/logout", async (req, res, next) => {
    // Log the logout if user is authenticated
    if (req.isAuthenticated()) {
      await storage.logActivity({
        userId: req.user!.id,
        action: 'user_logout',
        details: { username: req.user!.username },
        ipAddress: req.ip || req.headers['x-forwarded-for'] as string || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown'
      });
    }
    
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });

  // Admin route to get all users
  app.get("/api/admin/users", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    if (req.user!.role !== UserRole.ADMIN) return res.status(403).send("Forbidden");
    
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).send("Failed to fetch users");
    }
  });

  // Admin route to get activity logs
  app.get("/api/admin/activity", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    if (req.user!.role !== UserRole.ADMIN) return res.status(403).send("Forbidden");
    
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const activities = await storage.getRecentActivities(limit);
      res.json(activities);
    } catch (error) {
      res.status(500).send("Failed to fetch activity logs");
    }
  });

  // Admin route to get analytics data
  app.get("/api/admin/analytics", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    if (req.user!.role !== UserRole.ADMIN) return res.status(403).send("Forbidden");
    
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : 30;
      
      const endDate = new Date();
      endDate.setHours(0, 0, 0, 0);
      
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - days);
      
      const analytics = await storage.getDailyAnalytics(startDate, endDate);
      const userStats = await storage.getUserStatistics();
      const resumeStats = await storage.getResumeStatistics();
      
      res.json({
        dailyData: analytics,
        userStats,
        resumeStats
      });
    } catch (error) {
      res.status(500).send("Failed to fetch analytics data");
    }
  });
}
