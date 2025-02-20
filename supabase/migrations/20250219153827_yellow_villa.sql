-- Add additional metadata columns to file_storage
ALTER TABLE file_storage
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS last_accessed_at timestamptz;

-- Create a function to update last_accessed_at
CREATE OR REPLACE FUNCTION update_last_accessed()
RETURNS trigger AS $$
BEGIN
  NEW.last_accessed_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating last_accessed_at
DROP TRIGGER IF EXISTS update_last_accessed_trigger ON file_storage;
CREATE TRIGGER update_last_accessed_trigger
  BEFORE UPDATE ON file_storage
  FOR EACH ROW
  EXECUTE FUNCTION update_last_accessed();

-- Add policy for updating file metadata
CREATE POLICY "Files can be updated by creators"
  ON file_storage FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

-- Add indexes for improved query performance
CREATE INDEX IF NOT EXISTS idx_file_storage_tags ON file_storage USING gin (tags);
CREATE INDEX IF NOT EXISTS idx_file_storage_last_accessed ON file_storage(last_accessed_at);