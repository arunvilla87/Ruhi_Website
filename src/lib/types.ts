// Define the application status type
export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected';
export type VisaStatus = 'H1B' | 'H4-EAD' | 'GreenCard' | 'US Citizen';
export type EmploymentType = 'W2' | 'C2C';

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
  job_id: string;
  full_name: string;
  email: string;
  phone?: string;
  resume_url?: string;
  cover_letter?: string;
  visa_status?: VisaStatus;
  employment_type?: EmploymentType;
  willing_to_relocate?: boolean;
  status: ApplicationStatus;
  created_at: string;
}

export interface ApplicationWithJob extends JobApplication {
  jobs: Job;
}

export interface AdminUser {
  id: string;
  email: string;
}

export interface UploadProgressEvent {
  loaded: number;
  total: number;
}