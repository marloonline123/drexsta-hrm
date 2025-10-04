import { NavMain } from '@/Components/Layout/NavMain';
import { CompanySwitcher } from '@/Components/Companies/CompanySwitcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/Components/Ui/sidebar';
import { useLanguage } from '@/Hooks/use-language';
import { Link } from '@inertiajs/react';
import AppLogo from '../app-logo';
export function AppSidebar() {
    const { isRTL } = useLanguage();
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
                <NavMain />
            </SidebarContent>

            <SidebarFooter>
                {/* Footer content can be added here if needed */}
            </SidebarFooter>
        </Sidebar>
    );
}