import { AppContent } from '@/Components/Layout/AppContent';
import { AppShell } from '@/Components/Layout/AppShell';
import { AppSidebar } from '@/Components/Layout/AppSidebar';
import { AppSidebarHeader } from '@/Components/Layout/AppSidebarHeader';
import { TopNavigation } from '@/Components/top-navigation';
import { type BreadcrumbItem } from '@/Types';
import { type PropsWithChildren } from 'react';
import { useLanguage } from '@/Hooks/use-language';
import { cn } from '@/Lib/utils';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { isRTL } = useLanguage();


    return (
        <AppShell variant="sidebar">
            <TopNavigation />
            <AppSidebar />
            <AppContent
                variant="sidebar"
                className={cn(
                    "overflow-x-hidden pt-14",
                    isRTL && "rtl:flex-grow rtl:w-auto"
                )}
                data-rtl={isRTL}
            >
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
