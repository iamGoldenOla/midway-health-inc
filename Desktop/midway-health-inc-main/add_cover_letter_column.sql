-- Add cover_letter column to job_applications table
ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS cover_letter TEXT;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'job_applications' 
ORDER BY ordinal_position;
