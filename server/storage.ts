import { users, type User, type InsertUser, resumes, type Resume, type InsertResume, templates } from "@shared/schema";
import session from "express-session";
import { Template } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

// Sample template data
const defaultTemplates: Template[] = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean and professional design for all industries",
    isPremium: false,
    category: ["all", "free", "business", "tech"],
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc"
  },
  {
    id: "executive-pro",
    name: "Executive Pro",
    description: "Perfect for senior professionals and managers",
    isPremium: true,
    category: ["all", "premium", "business", "finance"],
    thumbnail: "https://images.unsplash.com/photo-1586282391129-76a6df230234"
  },
  {
    id: "creative-edge",
    name: "Creative Edge",
    description: "Stand out with this design-focused template",
    isPremium: false,
    category: ["all", "free", "creative", "design"],
    thumbnail: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
  },
  {
    id: "tech-focus",
    name: "Tech Focus",
    description: "Optimized for technical roles and developers",
    isPremium: true,
    category: ["all", "premium", "tech"],
    thumbnail: "https://images.unsplash.com/photo-1568952433726-3896e3881c65"
  },
  {
    id: "minimal-tech",
    name: "Minimal Tech",
    description: "Clean design focused on skills and experience",
    isPremium: false,
    category: ["all", "free", "tech"],
    thumbnail: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28"
  },
  {
    id: "professional-classic",
    name: "Professional Classic",
    description: "Timeless design for all professionals",
    isPremium: false,
    category: ["all", "free", "business"],
    thumbnail: "https://images.unsplash.com/photo-1586282391129-76a6df230234"
  }
];

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getResumeById(id: number): Promise<Resume | undefined>;
  getResumesByUserId(userId: number): Promise<Resume[]>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: number, resume: Partial<Resume>): Promise<Resume>;
  deleteResume(id: number): Promise<void>;
  getTemplates(): Template[];
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
    return user;
  }

  async getResumeById(id: number): Promise<Resume | undefined> {
    const [resume] = await db.select().from(resumes).where(eq(resumes.id, id));
    return resume || undefined;
  }

  async getResumesByUserId(userId: number): Promise<Resume[]> {
    return await db.select().from(resumes).where(eq(resumes.userId, userId));
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const [resume] = await db.insert(resumes).values(insertResume).returning();
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
    
    return updatedResume;
  }

  async deleteResume(id: number): Promise<void> {
    await db.delete(resumes).where(eq(resumes.id, id));
  }

  getTemplates(): Template[] {
    return this.templates;
  }
}

export const storage = new DatabaseStorage();
