import { Company } from "./companies";
import { Permission } from "./permissions";
import { Role } from "./roles";

export type User = {
    id: number;
    active_company_id: number;
    name: string;
    email: string;
    profile_photo_url?: string;
    email_verified_at: string | null;
    department_role?: string;
    activeCompany: Company;
    phone?: string;
    roles: Role[];
    permissions?: Permission[];
    created_at: string;
    updated_at: string;
};