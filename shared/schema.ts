import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionStatus: text("subscription_status").default("inactive"),
  subscriptionExpiresAt: timestamp("subscription_expires_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  templateId: text("template_id").notNull(),
  data: text("data").notNull(), // JSON string of resume data
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertResumeSchema = createInsertSchema(resumes).pick({
  userId: true,
  name: true,
  templateId: true,
  data: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;

// Resume data schema for validation
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
  linkedIn: z.string().optional(),
  website: z.string().optional(),
});

export const experienceItemSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Job title is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
});

export const educationItemSchema = z.object({
  school: z.string().min(1, "School or university name is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
  gpa: z.string().optional(),
});

export const resumeDataSchema = z.object({
  templateId: z.string().min(1, "Template selection is required"),
  personalInfo: personalInfoSchema,
  experience: z.array(experienceItemSchema).optional(),
  education: z.array(educationItemSchema).optional(),
  skills: z.array(z.string()).optional(),
  summary: z.string().optional(),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type ResumeData = z.infer<typeof resumeDataSchema>;
