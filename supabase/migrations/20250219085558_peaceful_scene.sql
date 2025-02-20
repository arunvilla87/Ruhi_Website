/*
  # Schema Reset and Setup

  1. Tables
    - Drop and recreate `jobs` table with updated structure
    - Drop and recreate `applications` table with updated structure

  2. Security
    - Reset and enable RLS on both tables
    - Set up fresh policies for access control
*/

-- Begin transaction
BEGIN;

-- Drop existing tables and their policies
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS jobs;

-- Create jobs table
CREATE TABLE jobs (
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

-- Create applications table
CREATE TABLE applications (
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

-- Policies for jobs
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

-- Policies for applications
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