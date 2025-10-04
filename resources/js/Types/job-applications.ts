import { Company } from "./companies";

export interface JobApplication {
  id: number;
  company_id: number;
  job_posting_id: number;
  name: string;
  email: string;
  phone: string;
  cover_letter: string | null;
  resume_path: string | null;
  status: 'applied' | 'under_review' | 'interview' | 'rejected' | 'hired';
  application_token: string;
  token_expires_at: string | null;
  custom_fields: Record<string, string> | null;
  created_at: string;
  updated_at: string;
  jobPosting: {
    id: number;
    title: string;
    location: string | null;
    employmentType?: {
      id: number;
      name: string;
    };
  };
  company: Company;
}

export interface JobApplicationForm {
  status: 'applied' | 'under_review' | 'interview' | 'rejected' | 'hired';
}