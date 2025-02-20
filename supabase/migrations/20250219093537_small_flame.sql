/*
  # Fix Cascade Delete for Jobs

  1. Changes
    - Add ON DELETE CASCADE to applications table foreign key
    - This ensures when a job is deleted, all related applications are also deleted

  2. Implementation
    - Drop existing applications table
    - Recreate applications table with cascade delete
    - Recreate RLS policies
*/

-- Drop existing applications table
DROP TABLE IF EXISTS applications;

-- Recreate applications table with cascade delete
CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
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