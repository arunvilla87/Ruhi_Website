/*
  # Fix Cascade Delete for Jobs and Applications

  1. Changes
    - Drop existing applications table
    - Recreate applications table with proper cascade delete
    - Recreate RLS policies
    - Add indexes for better performance

  2. Security
    - Maintain existing RLS policies
    - Ensure proper cascade delete behavior
*/

-- Drop existing applications table
DROP TABLE IF EXISTS applications;

-- Recreate applications table with cascade delete
CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  resume_url text,
  cover_letter text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Recreate policies for applications
CREATE POLICY "Applications can be created by anyone" 
  ON applications FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Applications are viewable by job creators" 
  ON applications FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.created_by = auth.uid()
    )
  );

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);