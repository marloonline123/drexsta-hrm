import { Role } from './roles';
import { Permission } from './permissions';
import { Ability } from './approval-policies';
import { Department } from './deparments';
import { JobTitle } from './job-titles';

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
    abilities: Ability[];
    departments?: Department[];
    jobTitles?: JobTitle[];
};

export type EmployeeFormData = {
    name: string;
    email: string;
    phone: number;
};