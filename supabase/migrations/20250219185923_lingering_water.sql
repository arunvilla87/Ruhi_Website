/*
  # Update Applications Schema

  1. Changes
    - Make job_id optional
    - Add visa_status field
    - Add employment_type field
    - Add willing_to_relocate field

  2. New Fields
    - visa_status: H1B, H4-EAD, GreenCard, US Citizen
    - employment_type: W2, C2C
    - willing_to_relocate: boolean

  3. Security
    - Maintain existing RLS policies
    - Add constraints for new fields
*/

-- Add new columns to applications table
ALTER TABLE applications
  ALTER COLUMN job_id DROP NOT NULL,
  ADD COLUMN visa_status text CHECK (visa_status IN ('H1B', 'H4-EAD', 'GreenCard', 'US Citizen')),
  ADD COLUMN employment_type text CHECK (employment_type IN ('W2', 'C2C')),
  ADD COLUMN willing_to_relocate boolean DEFAULT false;

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_applications_visa_status ON applications(visa_status);
CREATE INDEX IF NOT EXISTS idx_applications_employment_type ON applications(employment_type);
CREATE INDEX IF NOT EXISTS idx_applications_willing_to_relocate ON applications(willing_to_relocate);