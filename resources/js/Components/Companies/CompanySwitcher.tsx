import { Button } from '@/Components/Ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/Ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/Ui/avatar';
import {
    BadgeCheck,
    ChevronsUpDown,
    Users,
} from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { Company } from '@/Types/companies';
import { User } from '@/Types/user';
import { cn } from '@/Lib/utils';


interface CompanySwitcherProps {
    className?: string;
}

export function CompanySwitcher({ className = '' }: CompanySwitcherProps) {
    const page = usePage().props;
    const user = (page.auth as { user: User }).user;
    const sidebarCompanies: Company[] = (page.sidebarCompanies as Company[]) || [];
    const currentCompany = user.activeCompany;

    console.log(sidebarCompanies);
    


    // const getRoleColor = (role: string) => {
    //     switch (role) {
    //         case 'owner':
    //             return 'text-orange-600';
    //         case 'admin':
    //             return 'text-purple-600';
    //         default:
    //             return 'text-blue-600';
    //     }
    // };

    // if (!currentCompany) return null;

    return (
        <div className={className}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="w-full justify-start h-auto p-2 hover:bg-sidebar-accent"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={currentCompany.logo_url} alt={currentCompany.name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    {currentCompany.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-left overflow-hidden">
                                <p className="text-sm font-medium truncate">{currentCompany.name}</p>
                                <p className="text-xs text-muted-foreground capitalize">{currentCompany.myRole}</p>
                            </div>
                            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 space-y-1" align="start" side="right">
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium">Switch Company</p>
                            <p className="text-xs text-muted-foreground">
                                Select a company to manage
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {sidebarCompanies.map((company) => (
                        <DropdownMenuItem
                            key={company.id}
                            className={cn("flex items-center gap-3 p-3 cursor-pointer border", company.id === currentCompany.id && 'border-2 border-primary')}
                            onClick={() => router.post(route('select-company.save', company.slug), {}, { preserveScroll: true })}
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={company.logo_url} alt={company.name} />
                                <AvatarFallback className="bg-primary/10 text-primary hover:bg-muted hover:text-muted">
                                    {company.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm font-medium truncate">{company.name}</p>
                                </div>
                                <p className="text-xs">
                                    <Users className="h-3 w-3 inline mr-1 text-muted" />
                                    {company.myRole}
                                </p>
                            </div>

                            {company.id === currentCompany.id && (
                                <BadgeCheck className="h-12 w-12 text-7xl text-primary" />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}