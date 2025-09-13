import { EmploymentType } from "./employment-types";

export interface JobRequisition {
  id: number;
  company_id: number;
  department_id: number;
  job_title_id: number;
  employment_type_id: number;
  requested_by: number;
  requisition_code: string;
  number_of_positions: number;
  job_description: string | null;
  requirements: string | null;
  employment_type: EmploymentType;
  min_salary: number | null;
  max_salary: number | null;
  target_start_date: string | null;
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'closed';
  reason: string | null;
  additional_notes: string | null;
  created_at: string;
  updated_at: string;
  department?: {
    id: number;
    name: string;
  };
  jobTitle?: {
    id: number;
    title: string;
  };
  requester?: {
    id: number;
    name: string;
  };
}

export interface JobRequisitionForm {
  company_id?: number;
  department_id: number | string;
  job_title_id: number | string;
  number_of_positions: number;
  job_description: string | null;
  requirements: string | null;
  employment_type_id: number | string;
  min_salary: number | string | null;
  max_salary: number | string | null;
  target_start_date: string | null;
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'closed';
  reason: string | null;
  additional_notes: string | null;
}