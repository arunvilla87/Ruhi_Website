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
}