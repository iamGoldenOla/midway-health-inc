-- =====================================================
-- Supabase RLS (Row Level Security) Policies
-- Run this in Supabase SQL Editor
-- This ensures ONLY authenticated admin users can
-- create, update, or delete data. Public users can
-- only INSERT (submit forms) and SELECT published content.
-- =====================================================

-- ── Enable RLS on all tables ─────────────────────────────────────────────────
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- ── Drop existing policies (clean slate) ─────────────────────────────────────
DROP POLICY IF EXISTS "Public can read published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin can manage blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Public can read services" ON services;
DROP POLICY IF EXISTS "Admin can manage services" ON services;
DROP POLICY IF EXISTS "Public can submit contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin can manage contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Public can submit consultations" ON consultations;
DROP POLICY IF EXISTS "Admin can manage consultations" ON consultations;
DROP POLICY IF EXISTS "Public can submit appointments" ON appointments;
DROP POLICY IF EXISTS "Admin can manage appointments" ON appointments;
DROP POLICY IF EXISTS "Public can submit job applications" ON job_applications;
DROP POLICY IF EXISTS "Admin can manage job applications" ON job_applications;
DROP POLICY IF EXISTS "Public can subscribe to newsletter" ON newsletter;
DROP POLICY IF EXISTS "Admin can manage newsletter" ON newsletter;

-- ── BLOG POSTS ────────────────────────────────────────────────────────────────
-- Anyone can read published posts
CREATE POLICY "Public can read published blog posts"
ON blog_posts FOR SELECT
USING (published = true);

-- Only authenticated users (admin) can do everything
CREATE POLICY "Admin can manage blog posts"
ON blog_posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ── SERVICES ─────────────────────────────────────────────────────────────────
-- Anyone can read services (needed for public Services page)
CREATE POLICY "Public can read services"
ON services FOR SELECT
USING (true);

-- Only authenticated users (admin) can create/update/delete
CREATE POLICY "Admin can manage services"
ON services FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ── CONTACT MESSAGES ─────────────────────────────────────────────────────────
-- Anyone can submit a contact message
CREATE POLICY "Public can submit contact messages"
ON contact_messages FOR INSERT
WITH CHECK (true);

-- Only authenticated users (admin) can read/update/delete
CREATE POLICY "Admin can manage contact messages"
ON contact_messages FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ── CONSULTATIONS ─────────────────────────────────────────────────────────────
-- Anyone can submit a consultation request
CREATE POLICY "Public can submit consultations"
ON consultations FOR INSERT
WITH CHECK (true);

-- Only authenticated users (admin) can read/update/delete
CREATE POLICY "Admin can manage consultations"
ON consultations FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ── APPOINTMENTS ─────────────────────────────────────────────────────────────
-- Anyone can book an appointment
CREATE POLICY "Public can submit appointments"
ON appointments FOR INSERT
WITH CHECK (true);

-- Only authenticated users (admin) can read/update/delete
CREATE POLICY "Admin can manage appointments"
ON appointments FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ── JOB APPLICATIONS ─────────────────────────────────────────────────────────
-- Anyone can submit a job application
CREATE POLICY "Public can submit job applications"
ON job_applications FOR INSERT
WITH CHECK (true);

-- Only authenticated users (admin) can read/update/delete
CREATE POLICY "Admin can manage job applications"
ON job_applications FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ── NEWSLETTER ───────────────────────────────────────────────────────────────
-- Anyone can subscribe
CREATE POLICY "Public can subscribe to newsletter"
ON newsletter FOR INSERT
WITH CHECK (true);

-- Only authenticated users (admin) can read/delete
CREATE POLICY "Admin can manage newsletter"
ON newsletter FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- VERIFICATION: Check all policies are active
-- Run this to confirm:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
-- =====================================================
