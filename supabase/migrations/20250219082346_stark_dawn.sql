/*
  # Create jobs schema and sample data

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `department` (text)
      - `location` (text)
      - `type` (text)
      - `description` (text)
      - `requirements` (text[])
      - `responsibilities` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `created_by` (uuid, references auth.users)
    
    - `applications`
      - `id` (uuid, primary key)
      - `job_id` (uuid, references jobs)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text, optional)
      - `resume_url` (text, optional)
      - `cover_letter` (text, optional)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public job viewing
    - Add policies for authenticated job management
    - Add policies for application submission and viewing
*/

-- Drop existing tables if they exist
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

-- Insert sample job listings
INSERT INTO jobs (title, department, location, type, description, requirements, responsibilities, created_by)
VALUES
  (
    'Senior Software Engineer',
    'Engineering',
    'Remote',
    'Full-time',
    'We are seeking an experienced Senior Software Engineer to join our growing team. In this role, you will be responsible for developing high-quality software solutions, mentoring junior developers, and contributing to the technical direction of our projects.',
    ARRAY[
      'Bachelor''s degree in Computer Science or related field',
      '7+ years of experience in software development',
      'Strong proficiency in JavaScript/TypeScript and React',
      'Experience with Node.js and REST APIs',
      'Knowledge of cloud platforms (AWS, Azure, or GCP)',
      'Strong problem-solving and analytical skills',
      'Excellent communication and team collaboration abilities'
    ],
    ARRAY[
      'Design and implement scalable software solutions',
      'Lead technical design discussions and code reviews',
      'Mentor junior developers and promote best practices',
      'Collaborate with cross-functional teams to define and implement new features',
      'Optimize application performance and reliability',
      'Contribute to technical documentation and architecture decisions',
      'Participate in agile development processes'
    ],
    auth.uid()
  ),
  (
    'Business Analyst',
    'Business Operations',
    'New York, NY',
    'Full-time',
    'We are looking for a detail-oriented Business Analyst to help bridge the gap between our business objectives and technology solutions. The ideal candidate will have strong analytical skills and the ability to communicate effectively with stakeholders at all levels.',
    ARRAY[
      'Bachelor''s degree in Business Administration, Information Systems, or related field',
      '3+ years of experience as a Business Analyst',
      'Strong analytical and problem-solving skills',
      'Proficiency in SQL and data analysis tools',
      'Experience with requirements gathering and documentation',
      'Knowledge of agile methodologies',
      'Excellent communication and presentation skills'
    ],
    ARRAY[
      'Gather and analyze business requirements from stakeholders',
      'Create detailed functional specifications and user stories',
      'Facilitate meetings and workshops with stakeholders',
      'Develop process flows and documentation',
      'Support user acceptance testing',
      'Monitor project progress and report on status',
      'Identify process improvement opportunities'
    ],
    auth.uid()
  ),
  (
    'Management Consultant',
    'Consulting',
    'Chicago, IL',
    'Full-time',
    'Join our consulting team to help clients solve complex business challenges and drive organizational transformation. You will work with senior executives to develop and implement strategic initiatives that create lasting value.',
    ARRAY[
      'MBA or Master''s degree in related field',
      '5+ years of consulting or relevant industry experience',
      'Strong strategic thinking and problem-solving abilities',
      'Experience in project management and change management',
      'Excellent analytical and quantitative skills',
      'Outstanding presentation and communication abilities',
      'Willingness to travel up to 50%'
    ],
    ARRAY[
      'Lead client engagements and manage project teams',
      'Conduct industry research and competitive analysis',
      'Develop strategic recommendations and implementation plans',
      'Create financial models and business cases',
      'Present findings to senior executives',
      'Build and maintain client relationships',
      'Mentor junior consultants'
    ],
    auth.uid()
  ),
  (
    'Digital Marketing Specialist',
    'Marketing',
    'Remote',
    'Full-time',
    'We are seeking a creative and data-driven Digital Marketing Specialist to develop and execute marketing campaigns across various digital channels. The ideal candidate will have a strong understanding of digital marketing principles and experience with marketing analytics.',
    ARRAY[
      'Bachelor''s degree in Marketing, Communications, or related field',
      '3+ years of digital marketing experience',
      'Proficiency in Google Analytics and marketing automation tools',
      'Experience with SEO, SEM, and social media marketing',
      'Strong content creation and copywriting skills',
      'Data analysis and reporting capabilities',
      'Knowledge of email marketing best practices'
    ],
    ARRAY[
      'Develop and implement digital marketing strategies',
      'Manage social media presence and content calendar',
      'Create and optimize paid advertising campaigns',
      'Monitor and analyze campaign performance',
      'Generate regular performance reports',
      'Collaborate with content team on marketing materials',
      'Stay current with digital marketing trends'
    ],
    auth.uid()
  );