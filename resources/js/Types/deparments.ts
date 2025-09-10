import { User } from "./user";

export interface Department {
    id: number;
    name: string;
    slug: string;
    description: string;
    manager: User;
    employee_count: number;
    annual_budget: number;
    is_active: boolean;
    created_at: string;
}