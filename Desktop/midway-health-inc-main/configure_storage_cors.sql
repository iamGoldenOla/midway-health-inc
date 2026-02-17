-- =====================================================
-- STORAGE CORS CONFIGURATION
-- =====================================================

-- Update the resumes bucket to allow CORS
UPDATE storage.buckets
SET 
  public = false,
  file_size_limit = 5242880,  -- 5MB
  allowed_mime_types = ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
WHERE id = 'resumes';

-- Verify bucket configuration
SELECT id, name, public, file_size_limit, allowed_mime_types 
FROM storage.buckets 
WHERE id = 'resumes';
