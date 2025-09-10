export type User = {
    id: number;
    active_company_id: number;
    name: string;
    email: string;
    profile_photo_url?: string;
    email_verified_at: string | null;
    department_role?: string;
    created_at: string;
    updated_at: string;
};