-- Add mime type validation and file size constraints to file_storage
ALTER TABLE file_storage
  ADD CONSTRAINT valid_mime_types 
    CHECK (content_type IN (
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )),
  ADD CONSTRAINT valid_file_size
    CHECK (size <= 5242880); -- 5MB limit

-- Create a function to validate file uploads
CREATE OR REPLACE FUNCTION validate_file_upload()
RETURNS trigger AS $$
BEGIN
  -- Validate mime type
  IF NEW.content_type NOT IN (
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) THEN
    RAISE EXCEPTION 'Invalid file type. Only PDF and DOCX files are allowed.';
  END IF;

  -- Validate file size
  IF NEW.size > 5242880 THEN
    RAISE EXCEPTION 'File size exceeds 5MB limit.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for file validation
DROP TRIGGER IF EXISTS validate_file_upload_trigger ON file_storage;
CREATE TRIGGER validate_file_upload_trigger
  BEFORE INSERT OR UPDATE ON file_storage
  FOR EACH ROW
  EXECUTE FUNCTION validate_file_upload();

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_file_storage_content_type ON file_storage(content_type);
CREATE INDEX IF NOT EXISTS idx_file_storage_created_at ON file_storage(created_at);