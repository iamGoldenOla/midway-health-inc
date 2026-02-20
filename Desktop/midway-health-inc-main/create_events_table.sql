-- =====================================================
-- Events Table Migration
-- Run this in Supabase SQL Editor
-- =====================================================

-- Create the events table
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TEXT,
    location TEXT,
    image_url TEXT,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public can read published events
CREATE POLICY "Public can read published events"
ON events FOR SELECT
USING (is_published = true);

-- Only authenticated admin can manage events
CREATE POLICY "Admin can manage events"
ON events FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Seed with sample upcoming events
INSERT INTO events (title, description, event_date, event_time, location, is_published) VALUES
(
    'Free Home Health Assessment Day',
    'Join us for a free in-home health assessment. Our nurses will evaluate your care needs and answer all your questions about home healthcare services.',
    (CURRENT_DATE + INTERVAL '14 days')::DATE,
    '10:00 AM - 4:00 PM',
    'Midway Health Inc. Office, 1434 W 76th St, Chicago, IL 60620',
    true
),
(
    'Caregiver Support Workshop',
    'A free workshop for family caregivers covering stress management, patient care techniques, and available community resources.',
    (CURRENT_DATE + INTERVAL '21 days')::DATE,
    '2:00 PM - 5:00 PM',
    'Chicago Public Library, South Side Branch',
    true
),
(
    'Senior Wellness Fair',
    'Annual wellness fair featuring health screenings, nutrition advice, fall prevention tips, and information on our home care services.',
    (CURRENT_DATE + INTERVAL '35 days')::DATE,
    '9:00 AM - 3:00 PM',
    'Beverly Arts Center, Chicago, IL',
    true
);

-- =====================================================
-- VERIFICATION
-- SELECT * FROM events ORDER BY event_date;
-- =====================================================
