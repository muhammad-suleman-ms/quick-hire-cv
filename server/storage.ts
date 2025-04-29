import { users, resumes, type User, type InsertUser, type Resume, type InsertResume } from "@shared/schema";

// Define storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User>;
  updateSubscriptionStatus(userId: number, status: string, expiresAt?: Date): Promise<User>;
  
  // Resume operations
  getResumes(userId: number): Promise<Resume[]>;
  getResumeById(id: number): Promise<Resume | undefined>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: number, data: Partial<Resume>): Promise<Resume | undefined>;
  deleteResume(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private resumes: Map<number, Resume>;
  private currentUserId: number;
  private currentResumeId: number;

  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.currentUserId = 1;
    this.currentResumeId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      stripeCustomerId: null, 
      stripeSubscriptionId: null,
      subscriptionStatus: "inactive",
      subscriptionExpiresAt: null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User> {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    const updatedUser: User = {
      ...user,
      stripeCustomerId: stripeInfo.stripeCustomerId,
      stripeSubscriptionId: stripeInfo.stripeSubscriptionId,
      subscriptionStatus: "active",
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async updateSubscriptionStatus(userId: number, status: string, expiresAt?: Date): Promise<User> {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    const updatedUser: User = {
      ...user,
      subscriptionStatus: status,
      subscriptionExpiresAt: expiresAt || null
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Resume operations
  async getResumes(userId: number): Promise<Resume[]> {
    return Array.from(this.resumes.values()).filter(
      (resume) => resume.userId === userId
    );
  }

  async getResumeById(id: number): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async createResume(resume: InsertResume): Promise<Resume> {
    const id = this.currentResumeId++;
    const newResume: Resume = {
      ...resume,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.resumes.set(id, newResume);
    return newResume;
  }

  async updateResume(id: number, data: Partial<Resume>): Promise<Resume | undefined> {
    const resume = this.resumes.get(id);
    if (!resume) {
      return undefined;
    }
    
    const updatedResume: Resume = {
      ...resume,
      ...data,
      updatedAt: new Date()
    };
    
    this.resumes.set(id, updatedResume);
    return updatedResume;
  }

  async deleteResume(id: number): Promise<boolean> {
    return this.resumes.delete(id);
  }
}

export const storage = new MemStorage();
