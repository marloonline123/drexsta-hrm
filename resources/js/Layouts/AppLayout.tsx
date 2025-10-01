import { Toaster } from '@/Components/Ui/sonner';
import AppLayoutTemplate from '@/Layouts/App/AppSidebarLayout';
import { Auth, type BreadcrumbItem } from '@/Types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const {user} = usePage().props.auth as Auth;
    const flashMessage = usePage().props.flash as { success?: string; error?: string } | undefined;
    useEffect(() => {
        if (flashMessage?.success) {
            toast.success(flashMessage.success);
        }
        if (flashMessage?.error) {
            toast.error(flashMessage.error);
        }
    }, [flashMessage?.error, flashMessage?.success]);

    console.log("user in layout", user);
    

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster />
        </AppLayoutTemplate>
    )
};
