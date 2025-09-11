import { NavMain } from '@/Components/nav-main';
import { CompanySwitcher } from '@/Components/Companies/CompanySwitcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/Components/Ui/sidebar';
import { useLanguage } from '@/Hooks/use-language';
import { type NavItem } from '@/Types';
import { Link } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Users, 
    Building, 
    Clock, 
    Calculator, 
    Calendar, 
    CreditCard, 
    Shield, 
    Settings, 
    Briefcase,
    UserCheck,
    Crown,
    BadgeCheck
} from 'lucide-react';
import AppLogo from '../app-logo';

export function AppSidebar() {
    const { t, isRTL } = useLanguage();
    
    const mainNavItems: NavItem[] = [
        {
            title: t('nav.dashboard'),
            href: route('dashboard.index'),
            icon: LayoutGrid,
        },
        {
            title: t('nav.companies'),
            href: route('dashboard.companies.index'),
            icon: Building,
        },
    ];

    const hrmNavItems: NavItem[] = [
        {
            title: t('nav.employees'),
            href: '/hrm/employees',
            icon: Users,
        },
        {
            title: t('nav.departments'),
            href: route('dashboard.departments.index'),
            icon: Building,
        },
        {
            title: t('nav.attendance'),
            href: '/hrm/attendance',
            icon: Clock,
        },
        {
            title: t('nav.payroll'),
            href: '/hrm/payroll',
            icon: Calculator,
        },
        {
            title: t('nav.leaves'),
            href: '/hrm/leaves',
            icon: Calendar,
        },
        {
            title: t('nav.banks'),
            href: '/hrm/banks',
            icon: CreditCard,
        },
    ];

    const adminNavItems: NavItem[] = [
        {
            title: t('nav.employmentTypes'),
            href: route('dashboard.employment-types.index'),
            icon: Briefcase,
        },
        {
            title: t('nav.jobTitles'),
            href: route('dashboard.job-titles.index'),
            icon: BadgeCheck,
        },
        {
            title: t('nav.security'),
            href: '/admin/security',
            icon: Shield,
        },
        {
            title: t('nav.roles'),
            href: route('dashboard.roles.index'),
            icon: Crown,
        },
        {
            title: t('nav.admin'),
            href: '/admin/users',
            icon: UserCheck,
        },
        {
            title: t('nav.settings'),
            href: '/settings',
            icon: Settings,
        },
    ];
    return (
        <Sidebar collapsible="icon" variant="inset" side={isRTL ? "right" : "left"}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                {/* Company Switcher */}
                <div className="px-2 py-2">
                    <CompanySwitcher />
                </div>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <NavMain items={hrmNavItems} />
                <NavMain items={adminNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* Footer content can be added here if needed */}
            </SidebarFooter>
        </Sidebar>
    );
}