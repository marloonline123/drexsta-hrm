import React, { PropsWithChildren, useEffect } from 'react';
import PublicHeader from '@/Layouts/Public/PublicHeader';
import PublicFooter from './Public/PublicFooter';
import { usePage } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';

export default function PublicLayout({ children }: PropsWithChildren) {
    const flashMessage = usePage().props.flash as { success?: string; error?: string } | undefined;
    useEffect(() => {
        if (flashMessage?.success) {
            toast.success(flashMessage.success);
        }
        if (flashMessage?.error) {
            toast.error(flashMessage.error);
        }
    }, [flashMessage?.error, flashMessage?.success]);

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <PublicHeader />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <PublicFooter />
            <Toaster />
        </div>
    );
}