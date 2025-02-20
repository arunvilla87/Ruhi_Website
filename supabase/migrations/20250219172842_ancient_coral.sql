/*
  # Fix RLS Policies for Applications Table

  1. Changes
    - Drop existing RLS policies for applications table
    - Create new policies that allow:
      - Anyone to create applications
      - Admins to view and manage all applications
      - Job creators to view applications for their jobs
    - Add policy for updating application status

  2. Security
    - Maintains data security while allowing proper access
    - Ensures admins have full access
    - Preserves job creator access to their job applications
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Applications can be created by anyone" ON applications;
DROP POLICY IF EXISTS "Applications are viewable by job creators" ON applications;

-- Create new policies
-- Allow anyone to create applications
CREATE POLICY "Applications can be created by anyone"
ON applications FOR INSERT
TO public
WITH CHECK (true);

-- Allow admins to view all applications
CREATE POLICY "Admins can view all applications"
ON applications FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Allow job creators to view their job applications
CREATE POLICY "Job creators can view their applications"
ON applications FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM jobs
    WHERE jobs.id = applications.job_id
    AND jobs.created_by = auth.uid()
  )
);

-- Allow admins to update application status
CREATE POLICY "Admins can update applications"
ON applications FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Allow job creators to update their applications
CREATE POLICY "Job creators can update their applications"
ON applications FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM jobs
    WHERE jobs.id = applications.job_id
    AND jobs.created_by = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM jobs
    WHERE jobs.id = applications.job_id
    AND jobs.created_by = auth.uid()
  )
);