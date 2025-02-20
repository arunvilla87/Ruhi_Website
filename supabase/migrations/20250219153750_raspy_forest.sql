-- Create a table to store file metadata
CREATE TABLE IF NOT EXISTS file_storage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  content_type text NOT NULL,
  size bigint NOT NULL,
  url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE file_storage ENABLE ROW LEVEL SECURITY;

-- Create policies for file_storage
CREATE POLICY "Files are viewable by everyone"
  ON file_storage FOR SELECT
  USING (true);

CREATE POLICY "Files can be created by anyone"
  ON file_storage FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Files can be deleted by creators"
  ON file_storage FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_file_storage_created_by ON file_storage(created_by);