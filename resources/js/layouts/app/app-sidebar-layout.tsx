import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { TopNavigation } from '@/components/top-navigation';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { cn } from '@/lib/utils';

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
