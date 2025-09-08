import { Button } from '@/Components/Ui/button';
import { Input } from '@/Components/Ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/Ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/Ui/dropdown-menu';
import { Badge } from '@/Components/Ui/badge';
import { LanguageToggle } from '@/Components/language-toggle';
import AppearanceToggleDropdown from '@/Components/appearance-dropdown';
import { useSidebar } from '@/Components/Ui/sidebar';
import { useLanguage } from '@/Hooks/use-language';
import { Link, usePage } from '@inertiajs/react';
import {
    Search,
    Bell,
    Menu,
    Settings,
    User,
    LogOut,
    Shield,
    HelpCircle
} from 'lucide-react';
import { useState } from 'react';

export function TopNavigation() {
    const { t } = useLanguage();
    const { toggleSidebar } = useSidebar();
    const { props } = usePage();
    const [searchQuery, setSearchQuery] = useState('');
    
    // Mock user data - in real app this would come from props
    const user = {
        name: 'John Doe',
        email: 'john.doe@company.com',
        avatar: null,
        role: 'Administrator'
    };

    // Mock notifications
    const notifications = [
        { id: 1, title: 'New employee registered', time: '5 min ago', unread: true },
        { id: 2, title: 'Monthly report ready', time: '1 hour ago', unread: true },
        { id: 3, title: 'System maintenance scheduled', time: '2 hours ago', unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background">
            <div className="flex h-14 items-center px-4 gap-4">
                {/* Sidebar Toggle */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSidebar}
                    className="md:hidden"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Search */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t('search.placeholder', 'Search...')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-9"
                        />
                    </div>
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-2">
                    {/* Language Toggle */}
                    <LanguageToggle />

                    {/* Theme Toggle */}
                    <AppearanceToggleDropdown />

                    {/* Notifications */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="relative">
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-0">
                                        {unreadCount}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel className="flex items-center justify-between">
                                Notifications
                                {unreadCount > 0 && (
                                    <Badge variant="secondary">{unreadCount} new</Badge>
                                )}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {notifications.length === 0 ? (
                                <div className="p-4 text-center text-muted-foreground">
                                    No notifications
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <DropdownMenuItem key={notification.id} className="flex-col items-start p-4">
                                        <div className="flex items-start justify-between w-full">
                                            <div className="flex-1">
                                                <p className={`text-sm ${notification.unread ? 'font-medium' : ''}`}>
                                                    {notification.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                            {notification.unread && (
                                                <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                                            )}
                                        </div>
                                    </DropdownMenuItem>
                                ))
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.avatar || ''} alt={user.name} />
                                    <AvatarFallback className="bg-primary/10">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user.email}
                                    </p>
                                    <Badge variant="secondary" className="w-fit text-xs mt-1">
                                        {user.role}
                                    </Badge>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/profile" className="flex items-center">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/settings" className="flex items-center">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/admin" className="flex items-center">
                                    <Shield className="mr-2 h-4 w-4" />
                                    <span>Admin Panel</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <HelpCircle className="mr-2 h-4 w-4" />
                                <span>Help & Support</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/logout" method="post" className="flex items-center text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}