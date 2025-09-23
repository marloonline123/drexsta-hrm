import { PaginatedData } from "./global";
import { JobTitle } from "./job-titles";
import { Role } from "./roles";

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
    myRole?: string;
    myRoles?: Role[];
    myJobTitles?: JobTitle[];
    created_at: string;
    updated_at: string;
}

export type CompaniesResponse = PaginatedData<Company, { employees_count: number }>;
