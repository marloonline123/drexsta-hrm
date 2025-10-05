export interface PaymentMethod {
    id: number;
    company_id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface PaymentMethodFormData {
    name: string;
    description: string;
    is_active: boolean;
}

export interface PaginatedPaymentMethods {
    data: PaymentMethod[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}