import { 
  users, type User, type InsertUser, 
  resumes, type Resume, type InsertResume, 
  activityLogs, type ActivityLog, type InsertActivityLog, 
  templateFeedback, analyticsData, type AnalyticsData,
  SubscriptionStatus, UserRole
} from "@shared/schema";
import session from "express-session";
import { Template, templateSchema } from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql, count, sum, avg, gte, lte } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

// Enhanced templates with more detailed information
const defaultTemplates: Template[] = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean and professional design for all industries with a focus on readability and ATS optimization",
    isPremium: false,
    category: ["all", "free", "business", "tech"],
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc",
    previewImages: [
      "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc",
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea"
    ],
    popularityScore: 9.2,
    features: ["ATS Optimized", "Clean Layout", "Professional Font", "Minimalist Design"],
    colors: ["#ffffff", "#f8f9fa", "#212529", "#0d6efd"],
    fonts: ["Inter", "Roboto"],
    layout: "single-column",
    atsCompatibilityScore: 9,
    suitableFor: ["Entry Level", "Mid Level", "Tech", "Business"],
    createdAt: new Date(2023, 1, 15),
    updatedAt: new Date(2023, 10, 5)
  },
  {
    id: "executive-pro",
    name: "Executive Pro",
    description: "Perfect for senior professionals and managers with emphasis on leadership and achievements",
    isPremium: true,
    category: ["all", "premium", "business", "finance", "executive"],
    thumbnail: "https://images.unsplash.com/photo-1586282391129-76a6df230234",
    previewImages: [
      "https://images.unsplash.com/photo-1586282391129-76a6df230234",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
    ],
    popularityScore: 8.7,
    features: ["Executive Summary", "Leadership Focus", "Achievement Highlights", "Professional Font", "Premium Paper"],
    colors: ["#ffffff", "#f1f3f5", "#212529", "#343a40", "#0b5394"],
    fonts: ["Georgia", "Merriweather"],
    layout: "two-column",
    atsCompatibilityScore: 8,
    suitableFor: ["Senior Level", "Executive", "Management", "Finance"],
    createdAt: new Date(2023, 2, 20),
    updatedAt: new Date(2023, 11, 15)
  },
  {
    id: "creative-edge",
    name: "Creative Edge",
    description: "Stand out with this design-focused template perfect for creative professionals",
    isPremium: false,
    category: ["all", "free", "creative", "design"],
    thumbnail: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    previewImages: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf"
    ],
    popularityScore: 8.5,
    features: ["Visual Portfolio Section", "Custom Color Options", "Creative Layout", "Skills Visualization"],
    colors: ["#ffffff", "#f8f9fa", "#212529", "#e64980", "#15aabf"],
    fonts: ["Poppins", "Montserrat"],
    layout: "creative",
    atsCompatibilityScore: 7,
    suitableFor: ["Design", "Marketing", "Art", "Creative Roles"],
    createdAt: new Date(2023, 3, 5),
    updatedAt: new Date(2023, 9, 20)
  },
  {
    id: "tech-focus",
    name: "Tech Focus",
    description: "Optimized for technical roles and developers with dedicated sections for projects and technical skills",
    isPremium: true,
    category: ["all", "premium", "tech"],
    thumbnail: "https://images.unsplash.com/photo-1568952433726-3896e3881c65",
    previewImages: [
      "https://images.unsplash.com/photo-1568952433726-3896e3881c65",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
    ],
    popularityScore: 9.4,
    features: ["Technical Skills Matrix", "GitHub Integration", "Project Showcase", "Code Sample Section"],
    colors: ["#ffffff", "#f8f9fa", "#212529", "#4c6ef5", "#212529"],
    fonts: ["JetBrains Mono", "Inter"],
    layout: "tech-focused",
    atsCompatibilityScore: 9,
    suitableFor: ["Developers", "Engineers", "Data Scientists", "Technical Roles"],
    createdAt: new Date(2023, 4, 10),
    updatedAt: new Date(2023, 11, 5)
  },
  {
    id: "minimal-tech",
    name: "Minimal Tech",
    description: "Clean design focused on skills and experience for technical professionals",
    isPremium: false,
    category: ["all", "free", "tech"],
    thumbnail: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
    previewImages: [
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    ],
    popularityScore: 8.9,
    features: ["Skills Ratings", "Clean Technical Layout", "Project Highlights", "ATS Optimized"],
    colors: ["#ffffff", "#f8f9fa", "#212529", "#12b886"],
    fonts: ["Source Code Pro", "Open Sans"],
    layout: "tech-minimal",
    atsCompatibilityScore: 8,
    suitableFor: ["Software Engineers", "IT Professionals", "Technical Support", "Entry-Level Tech"],
    createdAt: new Date(2023, 5, 20),
    updatedAt: new Date(2023, 10, 10)
  },
  {
    id: "professional-classic",
    name: "Professional Classic",
    description: "Timeless design for all professionals with classic formatting that recruiters know and trust",
    isPremium: false,
    category: ["all", "free", "business"],
    thumbnail: "https://images.unsplash.com/photo-1586282391129-76a6df230234",
    previewImages: [
      "https://images.unsplash.com/photo-1586282391129-76a6df230234", 
      "https://images.unsplash.com/photo-1664575602276-acd073f104c1"
    ],
    popularityScore: 8.6,
    features: ["Traditional Format", "Chronological Layout", "ATS Optimized", "Conservative Design"],
    colors: ["#ffffff", "#f8f9fa", "#212529", "#495057"],
    fonts: ["Times New Roman", "Arial"],
    layout: "classic",
    atsCompatibilityScore: 10,
    suitableFor: ["All Industries", "Traditional Fields", "Corporate Roles", "Government"],
    createdAt: new Date(2023, 1, 5),
    updatedAt: new Date(2023, 8, 15)
  },
  // Premium templates
  {
    id: "data-scientist",
    name: "Data Scientist Pro",
    description: "Specialized template for data scientists and analysts with sections for technical skills and projects",
    isPremium: true,
    category: ["all", "premium", "tech", "data"],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    previewImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      "https://images.unsplash.com/photo-1600267204088-c521eaa96804"
    ],
    popularityScore: 9.1,
    features: ["Data Visualization Section", "Technical Skills Matrix", "Research Publications", "Project Impact Metrics"],
    colors: ["#ffffff", "#f8f9fa", "#212529", "#4c6ef5", "#9775fa"],
    fonts: ["IBM Plex Sans", "IBM Plex Mono"],
    layout: "data-focused",
    atsCompatibilityScore: 9,
    suitableFor: ["Data Scientists", "Data Analysts", "Machine Learning Engineers", "Researchers"],
    createdAt: new Date(2023, 6, 15),
    updatedAt: new Date(2023, 12, 1)
  },
  {
    id: "healthcare-professional",
    name: "Healthcare Professional",
    description: "Specialized template for healthcare professionals with appropriate sections for credentials and specializations",
    isPremium: true,
    category: ["all", "premium", "healthcare", "specialized"],
    thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
    previewImages: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528"
    ],
    popularityScore: 8.4,
    features: ["Credentials Section", "Specialized Training", "Certifications Focus", "Clinical Experience"],
    colors: ["#ffffff", "#f8f9fa", "#212529", "#1098ad", "#4dabf7"],
    fonts: ["Lora", "Open Sans"],
    layout: "healthcare",
    atsCompatibilityScore: 8,
    suitableFor: ["Doctors", "Nurses", "Medical Technicians", "Healthcare Administration"],
    createdAt: new Date(2023, 5, 10),
    updatedAt: new Date(2023, 11, 20)
  },
  {
    id: "academic-cv",
    name: "Academic CV",
    description: "Comprehensive academic curriculum vitae for researchers, professors, and PhD candidates",
    isPremium: true,
    category: ["all", "premium", "academic", "research"],
    thumbnail: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3",
    previewImages: [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6"
    ],
    popularityScore: 8.2,
    features: ["Publications Section", "Research Grants", "Teaching Experience", "Conference Presentations"],
    colors: ["#ffffff", "#f8f9fa", "#212529", "#364fc7"],
    fonts: ["Merriweather", "Source Sans Pro"],
    layout: "academic",
    atsCompatibilityScore: 7,
    suitableFor: ["Professors", "Researchers", "PhD Candidates", "Academic Staff"],
    createdAt: new Date(2023, 7, 5),
    updatedAt: new Date(2023, 12, 10)
  },
  {
    id: "startup-founder",
    name: "Startup Founder",
    description: "Showcase your entrepreneurial journey and leadership skills with this founder-focused template",
    isPremium: true,
    category: ["all", "premium", "business", "entrepreneur"],
    thumbnail: "https://images.unsplash.com/photo-1551135049-8a33b5883817",
    previewImages: [
      "https://images.unsplash.com/photo-1551135049-8a33b5883817",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216"
    ],
    popularityScore: 8.3,
    features: ["Venture History", "Funding Raised", "Business Impact Metrics", "Leadership Philosophy"],
    colors: ["#ffffff", "#f8f9fa", "#212529", "#f03e3e", "#1864ab"],
    fonts: ["Playfair Display", "Raleway"],
    layout: "founder",
    atsCompatibilityScore: 7,
    suitableFor: ["Entrepreneurs", "Founders", "Business Development", "Startup Executives"],
    createdAt: new Date(2023, 4, 25),
    updatedAt: new Date(2023, 11, 30)
  }
];

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getPremiumUsers(): Promise<User[]>;
  
  // Resume methods
  getResumeById(id: number): Promise<Resume | undefined>;
  getResumesByUserId(userId: number): Promise<Resume[]>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: number, resume: Partial<Resume>): Promise<Resume>;
  deleteResume(id: number): Promise<void>;
  incrementResumeDownloads(id: number): Promise<void>;
  incrementResumeShareCount(id: number): Promise<void>;
  
  // Template methods
  getTemplates(): Template[];
  getTemplateById(id: string): Template | undefined;
  getFreeTemplates(): Template[];
  getPremiumTemplates(): Template[];
  getTemplatesByCategory(category: string): Template[];
  
  // Analytics methods
  logActivity(activity: InsertActivityLog): Promise<ActivityLog>;
  getRecentActivities(limit?: number): Promise<ActivityLog[]>;
  getActivityByUserId(userId: number): Promise<ActivityLog[]>;
  recordTemplateFeedback(templateId: string, userId: number | null, rating: number, feedback?: string): Promise<void>;
  getTemplateRatings(): Promise<{ templateId: string, averageRating: number, count: number }[]>;
  
  // Admin dashboard methods
  getDailyAnalytics(startDate: Date, endDate: Date): Promise<AnalyticsData[]>;
  updateDailyAnalytics(date: Date, data: Partial<AnalyticsData>): Promise<void>;
  getUserStatistics(): Promise<{
    totalUsers: number, 
    premiumUsers: number, 
    activeUsersLast30Days: number
  }>;
  getResumeStatistics(): Promise<{
    totalResumes: number,
    totalDownloads: number,
    popularTemplates: { templateId: string, count: number }[]
  }>;
  
  // Session storage
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  private templates: Template[];
  sessionStore: session.Store;

  constructor() {
    this.templates = defaultTemplates;
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    
    // Log the signup activity
    await this.logActivity({
      userId: user.id,
      action: 'user_signup',
      details: { username: user.username }
    });
    
    // Update analytics for the day
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await this.updateDailyAnalytics(today, { signups: 1 });
    
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    // Check if user is upgrading to premium
    let logPremiumUpgrade = false;
    if (userData.subscriptionStatus === SubscriptionStatus.PREMIUM) {
      const currentUser = await this.getUser(id);
      if (currentUser && currentUser.subscriptionStatus !== SubscriptionStatus.PREMIUM) {
        logPremiumUpgrade = true;
      }
    }
    
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    
    if (!updatedUser) {
      throw new Error("User not found");
    }
    
    // Log premium upgrade if applicable
    if (logPremiumUpgrade) {
      await this.logActivity({
        userId: id,
        action: 'premium_subscription',
        details: { subscriptionStatus: SubscriptionStatus.PREMIUM }
      });
      
      // Update analytics
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      await this.updateDailyAnalytics(today, { subscriptionsPurchased: 1 });
    }
    
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async getPremiumUsers(): Promise<User[]> {
    return await db.select().from(users).where(eq(users.subscriptionStatus, SubscriptionStatus.PREMIUM));
  }

  // Resume methods
  async getResumeById(id: number): Promise<Resume | undefined> {
    const [resume] = await db.select().from(resumes).where(eq(resumes.id, id));
    return resume || undefined;
  }

  async getResumesByUserId(userId: number): Promise<Resume[]> {
    return await db.select().from(resumes).where(eq(resumes.userId, userId));
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const [resume] = await db.insert(resumes).values(insertResume).returning();
    
    // Log resume creation
    await this.logActivity({
      userId: insertResume.userId,
      action: 'resume_created',
      details: { resumeId: resume.id, templateId: resume.templateId }
    });
    
    // Update analytics
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await this.updateDailyAnalytics(today, { resumesCreated: 1 });
    
    return resume;
  }

  async updateResume(id: number, resumeData: Partial<Resume>): Promise<Resume> {
    const [updatedResume] = await db
      .update(resumes)
      .set({
        ...resumeData,
        lastUpdated: new Date()
      })
      .where(eq(resumes.id, id))
      .returning();
    
    if (!updatedResume) {
      throw new Error("Resume not found");
    }
    
    // Log resume update
    await this.logActivity({
      userId: updatedResume.userId,
      action: 'resume_updated',
      details: { resumeId: id }
    });
    
    return updatedResume;
  }

  async deleteResume(id: number): Promise<void> {
    // Get resume before deleting to log the user ID
    const resume = await this.getResumeById(id);
    
    if (resume) {
      await db.delete(resumes).where(eq(resumes.id, id));
      
      // Log resume deletion
      await this.logActivity({
        userId: resume.userId,
        action: 'resume_deleted',
        details: { resumeId: id }
      });
    }
  }

  async incrementResumeDownloads(id: number): Promise<void> {
    await db
      .update(resumes)
      .set({ downloads: sql`${resumes.downloads} + 1` })
      .where(eq(resumes.id, id));
      
    // Get resume to log the download
    const resume = await this.getResumeById(id);
    
    if (resume) {
      await this.logActivity({
        userId: resume.userId,
        action: 'resume_downloaded',
        details: { resumeId: id }
      });
    }
  }

  async incrementResumeShareCount(id: number): Promise<void> {
    await db
      .update(resumes)
      .set({ shareCount: sql`${resumes.shareCount} + 1` })
      .where(eq(resumes.id, id));
      
    // Get resume to log the share
    const resume = await this.getResumeById(id);
    
    if (resume) {
      await this.logActivity({
        userId: resume.userId,
        action: 'resume_shared',
        details: { resumeId: id }
      });
    }
  }

  // Template methods
  getTemplates(): Template[] {
    return this.templates;
  }

  getTemplateById(id: string): Template | undefined {
    return this.templates.find(template => template.id === id);
  }

  getFreeTemplates(): Template[] {
    return this.templates.filter(template => !template.isPremium);
  }

  getPremiumTemplates(): Template[] {
    return this.templates.filter(template => template.isPremium);
  }

  getTemplatesByCategory(category: string): Template[] {
    return this.templates.filter(template => 
      template.category.includes(category.toLowerCase())
    );
  }

  // Analytics methods
  async logActivity(activity: InsertActivityLog): Promise<ActivityLog> {
    const [logEntry] = await db.insert(activityLogs).values(activity).returning();
    return logEntry;
  }

  async getRecentActivities(limit: number = 100): Promise<ActivityLog[]> {
    return await db
      .select()
      .from(activityLogs)
      .orderBy(desc(activityLogs.timestamp))
      .limit(limit);
  }

  async getActivityByUserId(userId: number): Promise<ActivityLog[]> {
    return await db
      .select()
      .from(activityLogs)
      .where(eq(activityLogs.userId, userId))
      .orderBy(desc(activityLogs.timestamp));
  }

  async recordTemplateFeedback(
    templateId: string, 
    userId: number | null, 
    rating: number, 
    feedback?: string
  ): Promise<void> {
    await db.insert(templateFeedback).values({
      templateId,
      userId,
      rating,
      feedback
    });
    
    // Log the feedback activity
    if (userId) {
      await this.logActivity({
        userId,
        action: 'template_feedback',
        details: { templateId, rating }
      });
    }
  }

  async getTemplateRatings(): Promise<{ templateId: string, averageRating: number, count: number }[]> {
    const result = await db
      .select({
        templateId: templateFeedback.templateId,
        averageRating: avg(templateFeedback.rating),
        count: count()
      })
      .from(templateFeedback)
      .groupBy(templateFeedback.templateId);
    
    return result.map(item => ({
      templateId: item.templateId,
      averageRating: Number(item.averageRating),
      count: Number(item.count)
    }));
  }

  // Admin dashboard methods
  async getDailyAnalytics(startDate: Date, endDate: Date): Promise<AnalyticsData[]> {
    return await db
      .select()
      .from(analyticsData)
      .where(
        and(
          gte(analyticsData.date, startDate),
          lte(analyticsData.date, endDate)
        )
      )
      .orderBy(analyticsData.date);
  }

  async updateDailyAnalytics(date: Date, data: Partial<AnalyticsData>): Promise<void> {
    // Format date to ensure it's just the date part (no time)
    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0);
    
    // Check if an entry for this date already exists
    const [existingEntry] = await db
      .select()
      .from(analyticsData)
      .where(eq(analyticsData.date, formattedDate));
    
    if (existingEntry) {
      // Update existing entry
      const updateData: Record<string, any> = {};
      
      // Increment fields instead of overwriting
      if (data.visits) updateData.visits = sql`${analyticsData.visits} + ${data.visits}`;
      if (data.signups) updateData.signups = sql`${analyticsData.signups} + ${data.signups}`;
      if (data.resumesCreated) updateData.resumesCreated = sql`${analyticsData.resumesCreated} + ${data.resumesCreated}`;
      if (data.subscriptionsPurchased) updateData.subscriptionsPurchased = sql`${analyticsData.subscriptionsPurchased} + ${data.subscriptionsPurchased}`;
      if (data.subscriptionsCanceled) updateData.subscriptionsCanceled = sql`${analyticsData.subscriptionsCanceled} + ${data.subscriptionsCanceled}`;
      
      // These should be absolute numbers, not increments
      if (data.totalActiveUsers !== undefined) updateData.totalActiveUsers = data.totalActiveUsers;
      if (data.totalPremiumUsers !== undefined) updateData.totalPremiumUsers = data.totalPremiumUsers;
      
      await db
        .update(analyticsData)
        .set(updateData)
        .where(eq(analyticsData.id, existingEntry.id));
    } else {
      // Create new entry
      const userStats = await this.getUserStatistics();
      
      await db.insert(analyticsData).values({
        date: formattedDate,
        visits: data.visits || 0,
        signups: data.signups || 0,
        resumesCreated: data.resumesCreated || 0,
        subscriptionsPurchased: data.subscriptionsPurchased || 0,
        subscriptionsCanceled: data.subscriptionsCanceled || 0,
        totalActiveUsers: data.totalActiveUsers || userStats.totalUsers,
        totalPremiumUsers: data.totalPremiumUsers || userStats.premiumUsers
      });
    }
  }

  async getUserStatistics(): Promise<{
    totalUsers: number, 
    premiumUsers: number, 
    activeUsersLast30Days: number
  }> {
    // Get total users
    const [{ count: totalUsers }] = await db
      .select({ count: count() })
      .from(users);
    
    // Get premium users
    const [{ count: premiumUsers }] = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.subscriptionStatus, SubscriptionStatus.PREMIUM));
    
    // Get active users in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const [{ count: activeUsersLast30Days }] = await db
      .select({ count: count() })
      .from(users)
      .where(gte(users.lastLoginAt || new Date(0), thirtyDaysAgo));
    
    return {
      totalUsers: Number(totalUsers),
      premiumUsers: Number(premiumUsers),
      activeUsersLast30Days: Number(activeUsersLast30Days)
    };
  }

  async getResumeStatistics(): Promise<{
    totalResumes: number,
    totalDownloads: number,
    popularTemplates: { templateId: string, count: number }[]
  }> {
    // Get total resumes
    const [{ count: totalResumes }] = await db
      .select({ count: count() })
      .from(resumes);
    
    // Get total downloads
    const [{ total: totalDownloads }] = await db
      .select({ total: sum(resumes.downloads) })
      .from(resumes);
    
    // Get popular templates
    const popularTemplates = await db
      .select({
        templateId: resumes.templateId,
        count: count()
      })
      .from(resumes)
      .groupBy(resumes.templateId)
      .orderBy(desc(count()))
      .limit(5);
    
    return {
      totalResumes: Number(totalResumes),
      totalDownloads: Number(totalDownloads || 0),
      popularTemplates: popularTemplates.map(t => ({
        templateId: t.templateId,
        count: Number(t.count)
      }))
    };
  }
}

export const storage = new DatabaseStorage();
