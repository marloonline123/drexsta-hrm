import { Role } from './roles';
import { Permission } from './permissions';

export type Employee = {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: number | null;
    email_verified_at: string | null;
    active_company_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    roles: Role[];
    permissions: Permission[];
};

export type EmployeeFormData = {
    name: string;
    email: string;
    phone: number;
};