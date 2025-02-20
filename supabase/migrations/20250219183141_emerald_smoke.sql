-- Add status column to jobs table
ALTER TABLE jobs
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'open'
CHECK (status IN ('open', 'closed'));

-- Update existing jobs to have 'open' status
UPDATE jobs SET status = 'open' WHERE status IS NULL;

-- Create index for status column
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);

-- Add policy for updating job status
CREATE POLICY "Admins can update job status"
ON jobs FOR UPDATE
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