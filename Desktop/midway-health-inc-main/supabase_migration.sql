-- =====================================================
-- Midway Health Inc - Supabase Database Migration
-- =====================================================
-- This file contains all database tables, indexes, RLS policies,
-- and initial data for the Midway Health Inc website.
--
-- INSTRUCTIONS:
-- 1. Go to your Supabase project dashboard
-- 2. Navigate to SQL Editor
-- 3. Create a new query
-- 4. Copy and paste this entire file
-- 5. Click "Run" to execute
-- =====================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- DROP EXISTING TABLES (if re-running migration)
-- =====================================================
-- Uncomment these lines if you need to reset the database
-- DROP TABLE IF EXISTS newsletter CASCADE;
-- DROP TABLE IF EXISTS job_applications CASCADE;
-- DROP TABLE IF EXISTS appointments CASCADE;
-- DROP TABLE IF EXISTS consultations CASCADE;
-- DROP TABLE IF EXISTS contact_messages CASCADE;
-- DROP TABLE IF EXISTS services CASCADE;
-- DROP TABLE IF EXISTS blog_posts CASCADE;

-- =====================================================
-- CREATE TABLES
-- =====================================================

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Reviewed', 'Contacted'))
);

-- Consultations (Detailed care consultation requests)
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  age TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  care_type TEXT NOT NULL,
  description TEXT NOT NULL,
  urgency TEXT NOT NULL CHECK (urgency IN ('immediate', 'few-days', 'week', 'exploring')),
  preferred_contact TEXT NOT NULL CHECK (preferred_contact IN ('phone', 'email')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Reviewed', 'Contacted', 'Scheduled', 'Closed'))
);

-- Appointments (Simple appointment bookings)
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_requested TEXT,
  preferred_date DATE,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Confirmed', 'Completed', 'Cancelled'))
);

-- Job Applications
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT NOT NULL,
  resume_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Reviewed', 'Interviewed', 'Rejected', 'Hired'))
);

-- Newsletter Subscriptions
CREATE TABLE IF NOT EXISTS newsletter (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Blog posts indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Services indexes
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);

-- Contact messages indexes
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Consultations indexes
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_urgency ON consultations(urgency);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);

-- Appointments indexes
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(preferred_date);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at DESC);

-- Job applications indexes
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications(created_at DESC);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES - PUBLIC READ (Blog & Services)
-- =====================================================

-- Blog posts: Public can read
DROP POLICY IF EXISTS "Public can read blog posts" ON blog_posts;
CREATE POLICY "Public can read blog posts"
  ON blog_posts FOR SELECT
  USING (true);

-- Services: Public can read
DROP POLICY IF EXISTS "Public can read services" ON services;
CREATE POLICY "Public can read services"
  ON services FOR SELECT
  USING (true);

-- =====================================================
-- RLS POLICIES - PUBLIC INSERT (Forms)
-- =====================================================

-- Contact messages: Public can insert
DROP POLICY IF EXISTS "Public can submit contact messages" ON contact_messages;
CREATE POLICY "Public can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Consultations: Public can insert
DROP POLICY IF EXISTS "Public can submit consultation requests" ON consultations;
CREATE POLICY "Public can submit consultation requests"
  ON consultations FOR INSERT
  WITH CHECK (true);

-- Appointments: Public can insert
DROP POLICY IF EXISTS "Public can book appointments" ON appointments;
CREATE POLICY "Public can book appointments"
  ON appointments FOR INSERT
  WITH CHECK (true);

-- Job applications: Public can insert
DROP POLICY IF EXISTS "Public can submit job applications" ON job_applications;
CREATE POLICY "Public can submit job applications"
  ON job_applications FOR INSERT
  WITH CHECK (true);

-- Newsletter: Public can subscribe
DROP POLICY IF EXISTS "Public can subscribe to newsletter" ON newsletter;
CREATE POLICY "Public can subscribe to newsletter"
  ON newsletter FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- RLS POLICIES - ADMIN ONLY (Management)
-- =====================================================

-- Blog posts: Admin can do everything
DROP POLICY IF EXISTS "Admin can manage blog posts" ON blog_posts;
CREATE POLICY "Admin can manage blog posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Services: Admin can manage
DROP POLICY IF EXISTS "Admin can manage services" ON services;
CREATE POLICY "Admin can manage services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Contact messages: Admin can read/update/delete
DROP POLICY IF EXISTS "Admin can manage contact messages" ON contact_messages;
CREATE POLICY "Admin can manage contact messages"
  ON contact_messages FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Consultations: Admin can read/update/delete
DROP POLICY IF EXISTS "Admin can manage consultations" ON consultations;
CREATE POLICY "Admin can manage consultations"
  ON consultations FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Appointments: Admin can read/update/delete
DROP POLICY IF EXISTS "Admin can manage appointments" ON appointments;
CREATE POLICY "Admin can manage appointments"
  ON appointments FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Job applications: Admin can read/update/delete
DROP POLICY IF EXISTS "Admin can manage job applications" ON job_applications;
CREATE POLICY "Admin can manage job applications"
  ON job_applications FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Newsletter: Admin can read/delete
DROP POLICY IF EXISTS "Admin can manage newsletter" ON newsletter;
CREATE POLICY "Admin can manage newsletter"
  ON newsletter FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- =====================================================
-- SEED DATA - INITIAL SERVICES
-- =====================================================

INSERT INTO services (title, slug, description, icon) VALUES
('Skilled Nursing', 'skilled-nursing', 'Professional nursing care delivered by licensed RNs and LPNs in the comfort of your home. Our skilled nurses provide wound care, medication management, IV therapy, and chronic disease monitoring with compassion and expertise.', 'stethoscope'),
('Personal Care', 'personal-care', 'Compassionate assistance with daily activities including bathing, grooming, dressing, and mobility support. Our caregivers help maintain dignity and independence while ensuring safety and comfort.', 'heart'),
('Home Health Aide', 'home-health-aide', 'Trained and certified home health aides provide essential support with personal care, light housekeeping, meal preparation, and companionship. They work under the supervision of our nursing team to deliver comprehensive care.', 'home'),
('Physical Therapy', 'physical-therapy', 'Licensed physical therapists help restore mobility, strength, and function through personalized treatment plans. We focus on pain management, injury recovery, and improving quality of life through evidence-based techniques.', 'activity'),
('Occupational Therapy', 'occupational-therapy', 'Our occupational therapists help patients regain independence in daily tasks through adaptive techniques and equipment. We focus on improving fine motor skills, cognitive function, and safe home modifications.', 'briefcase'),
('Speech Therapy', 'speech-therapy', 'Certified speech-language pathologists address communication disorders, swallowing difficulties, and cognitive-linguistic challenges. We provide personalized therapy to improve speech clarity, language skills, and safe eating.', 'message-circle'),
('Companionship Care', 'companionship-care', 'Friendly, engaging companions provide social interaction, conversation, and emotional support. Our caregivers help reduce isolation, provide transportation to appointments, and assist with light activities and hobbies.', 'users'),
('Medication Management', 'medication-management', 'Expert oversight of medication schedules, administration, and monitoring for side effects. Our nurses ensure proper dosing, prevent drug interactions, and coordinate with physicians for optimal medication therapy.', 'pill'),
('Post-Surgical Care', 'post-surgical-care', 'Specialized recovery support following hospital discharge. Our team provides wound care, pain management, mobility assistance, and monitoring to ensure safe healing and prevent complications.', 'shield'),
('Chronic Disease Management', 'chronic-disease-management', 'Comprehensive care for patients with diabetes, heart disease, COPD, and other chronic conditions. We provide education, monitoring, symptom management, and coordination with your healthcare team.', 'trending-up')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- Next steps:
-- 1. Set up storage buckets in Supabase dashboard
-- 2. Create admin user via Supabase Auth
-- 3. Test database connections
-- =====================================================
