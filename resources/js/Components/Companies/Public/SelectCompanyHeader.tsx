import { Button } from '@/Components/Ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/Ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/Ui/dropdown-menu';
import { LanguageToggle } from '@/Components/language-toggle';
import AppearanceToggleDropdown from '@/Components/appearance-dropdown';
import { type SharedData } from '@/Types';
import { Link, usePage } from '@inertiajs/react';
import {
    User,
    LogOut,
    Settings
} from 'lucide-react';

export function SelectCompanyHeader() {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center justify-between px-4">
                {/* Logo/Brand */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                        <span className="text-primary-foreground font-bold text-sm">HR</span>
                    </div>
                    <span className="font-semibold text-lg">Drexsta HRM</span>
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-2">
                    {/* Language Toggle */}
                    <LanguageToggle />

                    {/* Theme Toggle */}
                    <AppearanceToggleDropdown />

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={auth.user.avatar || ''} alt={auth.user.name} />
                                    <AvatarFallback className="bg-primary/10">
                                        {auth.user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{auth.user.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {auth.user.email}
                                    </p>
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