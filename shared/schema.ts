import { pgTable, text, serial, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
});

export const loginUserSchema = insertUserSchema.pick({
  username: true,
  password: true,
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  templateId: text("template_id").notNull(),
  content: json("content").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  isPublic: boolean("is_public").default(false),
});

export const insertResumeSchema = createInsertSchema(resumes).pick({
  userId: true,
  title: true,
  templateId: true,
  content: true,
  isPublic: true,
});

export const resumeContentSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
    summary: z.string().optional(),
  }),
  experience: z.array(
    z.object({
      jobTitle: z.string().optional(),
      employer: z.string().optional(),
      location: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      isCurrent: z.boolean().optional(),
      description: z.string().optional(),
    })
  ),
  education: z.array(
    z.object({
      institution: z.string().optional(),
      degree: z.string().optional(),
      field: z.string().optional(),
      location: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      isCurrent: z.boolean().optional(),
      description: z.string().optional(),
    })
  ),
  skills: z.array(
    z.object({
      name: z.string().optional(),
      level: z.number().min(0).max(5).optional(),
    })
  ),
  certifications: z.array(
    z.object({
      name: z.string().optional(),
      issuer: z.string().optional(),
      date: z.string().optional(),
      expiration: z.string().optional(),
      doesExpire: z.boolean().optional(),
    })
  ),
  languages: z.array(
    z.object({
      name: z.string().optional(),
      proficiency: z.string().optional(),
    })
  ),
  projects: z.array(
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      url: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      isCurrent: z.boolean().optional(),
    })
  ),
});

export const templates = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    isPremium: z.boolean(),
    category: z.array(z.string()),
    thumbnail: z.string(),
  })
);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumes.$inferSelect;
export type ResumeContent = z.infer<typeof resumeContentSchema>;

export type Template = z.infer<typeof templates>[number];
