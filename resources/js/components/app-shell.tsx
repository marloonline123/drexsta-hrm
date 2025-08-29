import { SidebarProvider } from '@/components/ui/sidebar';
import { useLanguage } from '@/hooks/use-language';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;
    const { isRTL } = useLanguage();

    useEffect(() => {
        // Apply RTL class to body for proper styling
        document.body.classList.toggle('rtl', isRTL);
        document.body.classList.toggle('ltr', !isRTL);
        
        // Set document direction
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = isRTL ? 'ar' : 'en';
    }, [isRTL]);

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    return (
        <div className={`min-h-screen w-full bg-background flex ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>
        </div>
    );
}
