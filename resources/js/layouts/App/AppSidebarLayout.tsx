import { AppContent } from '@/Components/app-content';
import { AppShell } from '@/Components/app-shell';
import { AppSidebar } from '@/Components/app-sidebar';
import { AppSidebarHeader } from '@/Components/app-sidebar-header';
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
