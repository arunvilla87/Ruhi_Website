/*
  # Schema Setup with Policy Cleanup

  1. Tables
    - Create jobs and applications tables if they don't exist
    - Set up RLS and policies with proper cleanup
  
  2. Changes
    - Drops existing policies before creating new ones
    - Ensures clean policy setup
*/

-- Begin transaction
BEGIN;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Drop policies for jobs table
  DROP POLICY IF EXISTS "Jobs are viewable by everyone" ON jobs;
  DROP POLICY IF EXISTS "Jobs can be created by authenticated users" ON jobs;
  DROP POLICY IF EXISTS "Jobs can be updated by creators" ON jobs;
  DROP POLICY IF EXISTS "Jobs can be deleted by creators" ON jobs;
  
  -- Drop policies for applications table
  DROP POLICY IF EXISTS "Applications can be created by anyone" ON applications;
  DROP POLICY IF EXISTS "Applications are viewable by job creators" ON applications;
EXCEPTION
  WHEN undefined_table THEN
    NULL;
END $$;

-- Create jobs table if it doesn't exist
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  requirements text[] NOT NULL DEFAULT '{}',
  responsibilities text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create applications table if it doesn't exist
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  resume_url text,
  cover_letter text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create new policies for jobs
CREATE POLICY "Jobs are viewable by everyone" 
  ON jobs FOR SELECT 
  USING (true);

CREATE POLICY "Jobs can be created by authenticated users" 
  ON jobs FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Jobs can be updated by creators" 
  ON jobs FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = created_by);

CREATE POLICY "Jobs can be deleted by creators" 
  ON jobs FOR DELETE 
  TO authenticated 
  USING (auth.uid() = created_by);

-- Create new policies for applications
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

COMMIT;