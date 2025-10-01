import { NavMain } from '@/Components/nav-main';
import { CompanySwitcher } from '@/Components/Companies/CompanySwitcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/Components/Ui/sidebar';
import { useLanguage } from '@/Hooks/use-language';
import { Auth, type NavItem } from '@/Types';
import { Link, usePage } from '@inertiajs/react';
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
    BadgeCheck,
    CheckCheck,
    Zap
} from 'lucide-react';
import AppLogo from '../app-logo';
import { hasPermissionTo } from '@/Lib/permissions';

export function AppSidebar() {
    const { t, isRTL } = useLanguage();
    const { user } = usePage().props.auth as Auth;
    
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
            show: hasPermissionTo(user, 'companies.view'),
        },
    ];
    

    const hrmNavItems: NavItem[] = [
        {
            title: t('nav.employees'),
            href: route('dashboard.employees.index'),
            icon: Users,
            show: hasPermissionTo(user, 'employees.view'),
        },
        {
            title: t('nav.departments'),
            href: route('dashboard.departments.index'),
            icon: Building,
            show: hasPermissionTo(user, 'departments.view'),
        },
        {
            title: t('nav.attendance'),
            href: '/hrm/attendance',
            icon: Clock,
            show: hasPermissionTo(user, 'attendance.view'),
        },
        {
            title: t('nav.payroll'),
            href: '/hrm/payroll',
            icon: Calculator,
            show: hasPermissionTo(user, 'payroll.view'),
        },
        {
            title: t('nav.leaves'),
            href: '/hrm/leaves',
            icon: Calendar,
            show: hasPermissionTo(user, 'leaves.view'),
        },
        {
            title: t('nav.banks'),
            href: '/hrm/banks',
            icon: CreditCard,
            show: hasPermissionTo(user, 'employees.view'),
        },
    ];

    const adminNavItems: NavItem[] = [
        {
            title: t('nav.employmentTypes'),
            href: route('dashboard.employment-types.index'),
            icon: Briefcase,
            show: hasPermissionTo(user, 'employment-types.view'),
        },
        {
            title: t('nav.jobTitles'),
            href: route('dashboard.job-titles.index'),
            icon: BadgeCheck,
            show: hasPermissionTo(user, 'job-titles.view'),
        },
        {
            title: t('nav.jobRequisitions'),
            href: route('dashboard.job-requisitions.index'),
            icon: Briefcase,
            show: hasPermissionTo(user, 'job-requisitions.view'),
        },
        {
            title: t('nav.jobPostings'),
            href: route('dashboard.job-postings.index'),
            icon: Briefcase,
            show: hasPermissionTo(user, 'job-postings.view'),
        },
        {
            title: t('nav.approvalPolicies'),
            href: route('dashboard.approval-policies.index'),
            icon: CheckCheck,
            show: hasPermissionTo(user, 'approval-policies.edit'),
        },
        {
            title: t('nav.security'),
            href: '/admin/security',
            icon: Shield,
            show: hasPermissionTo(user, 'roles.view'),
        },
        {
            title: t('nav.roles'),
            href: route('dashboard.roles.index'),
            icon: Crown,
            show: hasPermissionTo(user, 'roles.view'),
        },
        {
            title: t('nav.abilities'),
            href: route('dashboard.abilities.index'),
            icon: Zap,
            show: hasPermissionTo(user, 'abilities.view'),
        },
        {
            title: t('nav.admin'),
            href: '/admin/users',
            icon: UserCheck,
            show: hasPermissionTo(user, 'users.view'),
        },
        {
            title: t('nav.settings'),
            href: '/settings',
            icon: Settings,
            show: hasPermissionTo(user, 'settings.view'),
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