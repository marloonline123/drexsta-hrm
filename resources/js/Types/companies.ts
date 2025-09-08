import { PaginatedData } from "./global";

export type Company = {
    id: number;
    name: string;
    slug: string;
    industry: string;
    email?: string;
    phone?: string;
    address?: string;
    description?: string;
    logo_url?: string;
    is_active: boolean;
    employees_count: number;
    established_date: string;
    created_at: string;
    updated_at: string;
}

export type CompaniesResponse = PaginatedData<Company, { employees_count: number }>;
