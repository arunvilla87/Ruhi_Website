/*
  # Fix resume storage configuration

  1. Changes
    - Drop existing storage policies to avoid conflicts
    - Create storage bucket with proper configuration
    - Set up RLS policies for resume uploads and access
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Resume uploads are public" ON storage.objects;
DROP POLICY IF EXISTS "Resumes are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own resumes" ON storage.objects;

-- Ensure the storage bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Set up RLS policies for the resumes bucket
CREATE POLICY "Resume uploads are public"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Resumes are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'resumes');

CREATE POLICY "Anyone can update resumes"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'resumes');

CREATE POLICY "Anyone can delete resumes"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'resumes');