import { pgTable, text, serial, integer, timestamp, json, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User roles enum
export const UserRole = {
  USER: "user",
  ADMIN: "admin"
} as const;

// Subscription status enum
export const SubscriptionStatus = {
  FREE: "free",
  PREMIUM: "premium",
  CANCELED: "canceled"
} as const;

// Add user roles and subscription fields
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  role: text("role").default(UserRole.USER).notNull(),
  subscriptionStatus: text("subscription_status").default(SubscriptionStatus.FREE).notNull(),
  subscriptionStartDate: timestamp("subscription_start_date"),
  subscriptionEndDate: timestamp("subscription_end_date"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow(),
  lastLoginAt: timestamp("last_login_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  role: true,
  subscriptionStatus: true,
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
  createdAt: timestamp("created_at").defaultNow(),
  downloads: integer("downloads").default(0),
  shareCount: integer("share_count").default(0),
});

// Activity logs for user actions and website visits
export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  action: text("action").notNull(),
  details: json("details"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertActivityLogSchema = createInsertSchema(activityLogs).pick({
  userId: true,
  action: true,
  details: true,
  ipAddress: true,
  userAgent: true,
});

// Template feedback
export const templateFeedback = pgTable("template_feedback", {
  id: serial("id").primaryKey(),
  templateId: text("template_id").notNull(),
  userId: integer("user_id"),
  rating: integer("rating"),
  feedback: text("feedback"),
  createdAt: timestamp("created_at").defaultNow(),
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
    jobTitle: z.string().optional(),
    // Additional fields for improved resume
    profileImage: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
    behance: z.string().optional(),
    dribbble: z.string().optional(),
    customLinks: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      })
    ).optional(),
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
      achievements: z.array(z.string()).optional(),
      skills: z.array(z.string()).optional(),
      responsibilites: z.array(z.string()).optional(),
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
      gpa: z.string().optional(),
      courses: z.array(z.string()).optional(),
      achievements: z.array(z.string()).optional(),
    })
  ),
  skills: z.array(
    z.object({
      name: z.string().optional(),
      level: z.number().min(0).max(5).optional(),
      category: z.string().optional(),
    })
  ),
  certifications: z.array(
    z.object({
      name: z.string().optional(),
      issuer: z.string().optional(),
      date: z.string().optional(),
      expiration: z.string().optional(),
      doesExpire: z.boolean().optional(),
      credentialId: z.string().optional(),
      credentialUrl: z.string().optional(),
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
      technologies: z.array(z.string()).optional(),
      achievements: z.array(z.string()).optional(),
    })
  ),
  // Additional sections for premium templates
  awards: z.array(
    z.object({
      title: z.string().optional(),
      issuer: z.string().optional(),
      date: z.string().optional(),
      description: z.string().optional(),
    })
  ).optional(),
  publications: z.array(
    z.object({
      title: z.string().optional(),
      publisher: z.string().optional(),
      date: z.string().optional(),
      url: z.string().optional(),
      description: z.string().optional(),
      authors: z.array(z.string()).optional(),
    })
  ).optional(),
  volunteerWork: z.array(
    z.object({
      organization: z.string().optional(),
      role: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      isCurrent: z.boolean().optional(),
      description: z.string().optional(),
    })
  ).optional(),
  references: z.array(
    z.object({
      name: z.string().optional(),
      company: z.string().optional(),
      position: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      relationship: z.string().optional(),
    })
  ).optional(),
  customSections: z.array(
    z.object({
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string().optional(),
          subtitle: z.string().optional(),
          date: z.string().optional(),
          description: z.string().optional(),
          bullets: z.array(z.string()).optional(),
        })
      ),
    })
  ).optional(),
});

// Enhanced template schema with more fields
export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  isPremium: z.boolean(),
  category: z.array(z.string()),
  thumbnail: z.string(),
  previewImages: z.array(z.string()).optional(),
  popularityScore: z.number().optional(),
  features: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  fonts: z.array(z.string()).optional(),
  layout: z.string().optional(),
  atsCompatibilityScore: z.number().min(1).max(10).optional(),
  suitableFor: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const templates = z.array(templateSchema);

// Admin dashboard analytics
export const analyticsData = pgTable("analytics_data", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  visits: integer("visits").default(0),
  signups: integer("signups").default(0),
  resumesCreated: integer("resumes_created").default(0),
  subscriptionsPurchased: integer("subscriptions_purchased").default(0),
  subscriptionsCanceled: integer("subscriptions_canceled").default(0),
  totalActiveUsers: integer("total_active_users").default(0),
  totalPremiumUsers: integer("total_premium_users").default(0),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumes.$inferSelect;
export type ResumeContent = z.infer<typeof resumeContentSchema>;

export type Template = z.infer<typeof templateSchema>;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type AnalyticsData = typeof analyticsData.$inferSelect;
