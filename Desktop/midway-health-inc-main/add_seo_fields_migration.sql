-- =====================================================
-- Migration: Add SEO fields to blog_posts and new fields to services
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add new columns to blog_posts
ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS excerpt TEXT,
  ADD COLUMN IF NOT EXISTS featured_image TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS og_image TEXT,
  ADD COLUMN IF NOT EXISTS focus_keyword TEXT;

-- Add new columns to services
ALTER TABLE services
  ADD COLUMN IF NOT EXISTS image TEXT,
  ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';

-- Update existing blog posts to be published (if any exist)
UPDATE blog_posts SET published = true WHERE published IS NULL;

-- =====================================================
-- Admin User: Update email to midwayhealthinc@gmail.com
-- =====================================================
-- Run this AFTER the above migration to update admin email:
--
-- UPDATE auth.users
-- SET email = 'midwayhealthinc@gmail.com',
--     email_confirmed_at = NOW()
-- WHERE email = 'admin@midwayhealthinc.com';
--
-- NOTE: You must also update the password via Supabase Dashboard:
-- Authentication > Users > Find user > Reset password
-- New password: MidwayAdmin2026!Secure
