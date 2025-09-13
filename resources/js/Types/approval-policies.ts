export interface Ability {
  id: number;
  company_id: number;
  key: string;
  label: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApprovalPolicy {
  id: number;
  company_id: number;
  action: string;
  steps: string[];
  created_at: string;
  updated_at: string;
}