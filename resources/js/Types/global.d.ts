import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

export type PaginatedData<T, M extends Record<string, unknown> = Record<string, never>> = {
    data: T[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    } & M;
};

