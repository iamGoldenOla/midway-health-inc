-- ============================================================
-- Blog Comments Table
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS blog_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_slug TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    comment TEXT NOT NULL,
    approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Public can read only approved comments
CREATE POLICY "Public can read approved comments"
ON blog_comments FOR SELECT
USING (approved = true);

-- Anyone can submit a comment (insert)
CREATE POLICY "Anyone can submit a comment"
ON blog_comments FOR INSERT
WITH CHECK (true);

-- Authenticated admin can manage all comments
CREATE POLICY "Admin can manage all comments"
ON blog_comments FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Index for fast lookup by post slug
CREATE INDEX IF NOT EXISTS idx_blog_comments_slug ON blog_comments(post_slug);
CREATE INDEX IF NOT EXISTS idx_blog_comments_approved ON blog_comments(approved);
