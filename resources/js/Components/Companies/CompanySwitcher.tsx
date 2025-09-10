import { Button } from '@/Components/Ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/Ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/Ui/avatar';
import {
    Check,
    ChevronsUpDown,
    Settings,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Company } from '@/Types/companies';
import { User } from '@/Types/user';


interface CompanySwitcherProps {
    className?: string;
}

export function CompanySwitcher({ className = '' }: CompanySwitcherProps) {
    const page = usePage().props;
    const user = (page.auth as { user: User }).user;
    const companies: Company[] = (page.companies as Company[]) || [];
    const [currentCompanyId, setCurrentCompanyId] = useState<number | undefined>(user?.active_company_id);
    const currentCompany = companies.find(c => c.id === currentCompanyId);

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

    if (!currentCompany) return null;

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
                                <p className="text-xs text-muted-foreground capitalize">{currentCompany.my_role}</p>
                            </div>
                            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="start" side="right">
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium">Switch Company</p>
                            <p className="text-xs text-muted-foreground">
                                Select a company to manage
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {companies.map((company) => (
                        <DropdownMenuItem
                            key={company.id}
                            className="flex items-center gap-3 p-3 cursor-pointer"
                            onClick={() => setCurrentCompanyId(company.id)}
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={company.logo_url} alt={company.name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    {company.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm font-medium truncate">{company.name}</p>
                                    {company.id === currentCompanyId && (
                                        <Check className="h-4 w-4 text-primary" />
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    <Users className="h-3 w-3 inline mr-1" />
                                    {company.employees_count} employees
                                </p>
                            </div>
                        </DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="flex items-center gap-2 p-3 cursor-pointer">
                        <Settings className="h-4 w-4" />
                        <span className="text-sm">Company Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}