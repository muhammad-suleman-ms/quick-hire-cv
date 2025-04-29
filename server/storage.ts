import { users, type User, type InsertUser, resumes, type Resume, type InsertResume, templates } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { Template } from "@shared/schema";

const MemoryStore = createMemoryStore(session);

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private resumes: Map<number, Resume>;
  private templates: Template[];
  sessionStore: session.Store;
  private userIdCounter: number;
  private resumeIdCounter: number;

  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.templates = defaultTemplates;
    this.userIdCounter = 1;
    this.resumeIdCounter = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getResumeById(id: number): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async getResumesByUserId(userId: number): Promise<Resume[]> {
    return Array.from(this.resumes.values()).filter(
      (resume) => resume.userId === userId
    );
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = this.resumeIdCounter++;
    const resume: Resume = {
      ...insertResume,
      id,
      lastUpdated: new Date()
    };
    this.resumes.set(id, resume);
    return resume;
  }

  async updateResume(id: number, resumeData: Partial<Resume>): Promise<Resume> {
    const existingResume = this.resumes.get(id);
    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const updatedResume: Resume = {
      ...existingResume,
      ...resumeData,
      lastUpdated: new Date()
    };
    
    this.resumes.set(id, updatedResume);
    return updatedResume;
  }

  async deleteResume(id: number): Promise<void> {
    if (!this.resumes.has(id)) {
      throw new Error("Resume not found");
    }
    this.resumes.delete(id);
  }

  getTemplates(): Template[] {
    return this.templates;
  }
}

export const storage = new MemStorage();
