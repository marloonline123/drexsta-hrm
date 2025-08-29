import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface NavMainProps {
    items: NavItem[];
    label?: string;
}

export function NavMain({ items = [], label }: NavMainProps) {
    const page = usePage();
    
    if (items.length === 0) return null;
    
    // Determine group label based on items or use provided label
    const getGroupLabel = () => {
        if (label) return label;
        
        const firstItem = items[0];
        if (firstItem?.href.includes('/hrm/')) return 'Human Resources';
        if (firstItem?.href.includes('/admin/') || firstItem?.href.includes('/settings')) return 'Administration';
        return 'Platform';
    };
    
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{getGroupLabel()}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
