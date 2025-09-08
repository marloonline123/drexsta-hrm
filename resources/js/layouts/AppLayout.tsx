import { Toaster } from '@/Components/Ui/sonner';
import AppLayoutTemplate from '@/layouts/App/AppSidebarLayout';
import { type BreadcrumbItem } from '@/Types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const flashMessage = usePage().props.flash as { success?: string; error?: string } | undefined;
    useEffect(() => {
        if (flashMessage?.success) {
            toast.success(flashMessage.success);
            console.log('Flash message:', flashMessage.success);
            
        }
        if (flashMessage?.error) {
            toast.error(flashMessage.error);
            console.log('Flash message:', flashMessage.error);
        }
    }, []);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster />
        </AppLayoutTemplate>
    )
};
