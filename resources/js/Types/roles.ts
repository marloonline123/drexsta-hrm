import { Permission } from './permissions';

export type Role = {
    id: number;
    name: string;
    guard_name: string;
    company_id: number;
    permissions: Permission[];
    users_count: number;
    created_at: string;
    updated_at: string;
};

export type RoleFormData = {
    name: string;
    permissions: string[];
};

export type GroupedPermission = {
    id: number;
    name: string;
    category: string;
    action: string;
};