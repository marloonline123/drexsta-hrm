import React, { PropsWithChildren } from 'react';
import PublicHeader from '@/Layouts/Public/PublicHeader';
import PublicFooter from '@/Layouts/Public/PublicFooter';

export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <PublicHeader />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <PublicFooter />
        </div>
    );
}