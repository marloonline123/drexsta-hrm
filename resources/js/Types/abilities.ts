export type Ability = {
    id: number;
    key: string;
    label: string;
    description: string | null;
    users_count: number;
    created_at: string;
    updated_at: string;
};

export type AbilityFormData = {
    key: string;
    label: string;
    description?: string;
};