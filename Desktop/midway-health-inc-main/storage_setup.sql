-- =====================================================
-- STORAGE BUCKET SETUP FOR RESUMES
-- =====================================================

-- Create storage bucket for resumes if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- STORAGE RLS POLICIES
-- =====================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public resume uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public resume downloads" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin to delete resumes" ON storage.objects;

-- Allow anyone to upload resumes (public upload)
CREATE POLICY "Allow public resume uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'resumes');

-- Allow anyone to download resumes (for admin dashboard)
CREATE POLICY "Allow public resume downloads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'resumes');

-- Allow authenticated users (admins) to delete resumes
CREATE POLICY "Allow admin to delete resumes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'resumes');

-- =====================================================
-- VERIFY SETUP
-- =====================================================

-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'resumes';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%resume%';
