-- Create activity_logs table
CREATE TABLE IF NOT EXISTS "activity_logs" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "action" TEXT NOT NULL,
  "details" JSONB,
  "ip_address" TEXT,
  "user_agent" TEXT,
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create template_feedback table
CREATE TABLE IF NOT EXISTS "template_feedback" (
  "id" SERIAL PRIMARY KEY,
  "template_id" TEXT NOT NULL,
  "user_id" INTEGER,
  "rating" INTEGER,
  "feedback" TEXT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create analytics_data table
CREATE TABLE IF NOT EXISTS "analytics_data" (
  "id" SERIAL PRIMARY KEY,
  "date" DATE NOT NULL,
  "visits" INTEGER DEFAULT 0,
  "signups" INTEGER DEFAULT 0,
  "resumes_created" INTEGER DEFAULT 0,
  "subscriptions_purchased" INTEGER DEFAULT 0,
  "subscriptions_canceled" INTEGER DEFAULT 0,
  "total_active_users" INTEGER DEFAULT 0,
  "total_premium_users" INTEGER DEFAULT 0
);

-- Add columns to users table if they don't exist
ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS "role" TEXT DEFAULT 'user' NOT NULL,
ADD COLUMN IF NOT EXISTS "subscription_status" TEXT DEFAULT 'free' NOT NULL,
ADD COLUMN IF NOT EXISTS "subscription_start_date" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "subscription_end_date" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "stripe_customer_id" TEXT,
ADD COLUMN IF NOT EXISTS "stripe_subscription_id" TEXT,
ADD COLUMN IF NOT EXISTS "last_login_at" TIMESTAMP;

-- Add columns to resumes table if they don't exist
ALTER TABLE "resumes"
ADD COLUMN IF NOT EXISTS "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS "downloads" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "share_count" INTEGER DEFAULT 0;