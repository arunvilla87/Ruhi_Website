export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  status: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface JobApplication {
  id: string;
  job_id?: string;
  full_name: string;
  email: string;
  phone?: string;
  resume_url?: string;
  cover_letter?: string;
  visa_status?: 'H1B' | 'H4-EAD' | 'GreenCard' | 'US Citizen';
  employment_type?: 'W2' | 'C2C';
  willing_to_relocate?: boolean;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
}