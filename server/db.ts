import dotenv from "dotenv";
dotenv.config();  
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from "@shared/schema";


if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set!");
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
} 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err: Error) => {
  console.error('Error connecting to the database:', err);
});

export const db = drizzle(pool, { schema });
export { pool };
