import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { templates } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Resume management routes
  app.get("/api/resumes", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    try {
      const resumes = await storage.getResumesByUserId(req.user.id);
      res.json(resumes);
    } catch (error) {
      res.status(500).send("Failed to fetch resumes");
    }
  });

  app.get("/api/resumes/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    try {
      const resume = await storage.getResumeById(parseInt(req.params.id));
      if (!resume) {
        return res.status(404).send("Resume not found");
      }
      
      if (resume.userId !== req.user.id) {
        return res.status(403).send("Forbidden");
      }
      
      res.json(resume);
    } catch (error) {
      res.status(500).send("Failed to fetch resume");
    }
  });

  app.post("/api/resumes", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    try {
      const resume = await storage.createResume({
        ...req.body,
        userId: req.user.id
      });
      res.status(201).json(resume);
    } catch (error) {
      res.status(500).send("Failed to create resume");
    }
  });

  app.put("/api/resumes/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    try {
      const resumeId = parseInt(req.params.id);
      const existingResume = await storage.getResumeById(resumeId);
      
      if (!existingResume) {
        return res.status(404).send("Resume not found");
      }
      
      if (existingResume.userId !== req.user.id) {
        return res.status(403).send("Forbidden");
      }
      
      const updatedResume = await storage.updateResume(resumeId, req.body);
      res.json(updatedResume);
    } catch (error) {
      res.status(500).send("Failed to update resume");
    }
  });

  app.delete("/api/resumes/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    try {
      const resumeId = parseInt(req.params.id);
      const existingResume = await storage.getResumeById(resumeId);
      
      if (!existingResume) {
        return res.status(404).send("Resume not found");
      }
      
      if (existingResume.userId !== req.user.id) {
        return res.status(403).send("Forbidden");
      }
      
      await storage.deleteResume(resumeId);
      res.status(204).send();
    } catch (error) {
      res.status(500).send("Failed to delete resume");
    }
  });

  // Template routes
  app.get("/api/templates", (req, res) => {
    // This would typically fetch from a database, but we'll return built-in templates
    // from the lib/resume-data.ts file initialized in storage
    try {
      const templateData = storage.getTemplates();
      
      // Filter by category if provided
      const category = req.query.category as string;
      const isPremium = req.query.premium === 'true' ? true : 
                        req.query.premium === 'false' ? false : undefined;
      
      let filteredTemplates = templateData;
      
      if (category && category !== 'all') {
        filteredTemplates = templateData.filter(t => 
          t.category.includes(category.toLowerCase()));
      }
      
      if (isPremium !== undefined) {
        filteredTemplates = filteredTemplates.filter(t => t.isPremium === isPremium);
      }
      
      res.json(filteredTemplates);
    } catch (error) {
      res.status(500).send("Failed to fetch templates");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
