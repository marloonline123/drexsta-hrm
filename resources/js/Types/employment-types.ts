import { Company } from './companies';

export type EmploymentType = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    is_active: boolean;
    company?: Company;
    created_at: string;
    updated_at: string;
};

export type EmploymentTypeFormData = {
    name: string;
    description?: string;
    is_active?: boolean;
};