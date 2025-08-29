import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/hooks/use-language';
import { 
    Building, 
    Check, 
    ChevronsUpDown, 
    Plus,
    Settings,
    Users,
    Crown,
    Sparkles
} from 'lucide-react';
import { useState } from 'react';

interface Company {
    id: string;
    name: string;
    logo?: string;
    plan: 'starter' | 'professional' | 'enterprise';
    role: 'owner' | 'admin' | 'member';
    employeeCount: number;
}

interface CompanySwitcherProps {
    className?: string;
}

export function CompanySwitcher({ className = '' }: CompanySwitcherProps) {
    const { t } = useLanguage();
    const [isCreateCompanyOpen, setIsCreateCompanyOpen] = useState(false);
    
    // Mock data for companies - in real app this would come from props or API
    const companies: Company[] = [
        {
            id: '1',
            name: 'Acme Corporation',
            logo: undefined,
            plan: 'professional',
            role: 'owner',
            employeeCount: 85
        },
        {
            id: '2', 
            name: 'TechStart Inc.',
            logo: undefined,
            plan: 'starter',
            role: 'admin',
            employeeCount: 12
        },
        {
            id: '3',
            name: 'Global Enterprises',
            logo: undefined,
            plan: 'enterprise',
            role: 'member',
            employeeCount: 450
        }
    ];
    
    const [currentCompanyId, setCurrentCompanyId] = useState('1');
    const currentCompany = companies.find(c => c.id === currentCompanyId);
    
    const getPlanBadge = (plan: string) => {
        switch (plan) {
            case 'enterprise':
                return <Badge className="bg-orange-100 text-orange-800"><Crown className="h-3 w-3 mr-1" />Enterprise</Badge>;
            case 'professional':
                return <Badge className="bg-purple-100 text-purple-800"><Sparkles className="h-3 w-3 mr-1" />Pro</Badge>;
            default:
                return <Badge className="bg-blue-100 text-blue-800">Starter</Badge>;
        }
    };
    
    const getRoleColor = (role: string) => {
        switch (role) {
            case 'owner':
                return 'text-orange-600';
            case 'admin':
                return 'text-purple-600';
            default:
                return 'text-blue-600';
        }
    };

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
                                <AvatarImage src={currentCompany.logo} alt={currentCompany.name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    {currentCompany.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-left overflow-hidden">
                                <p className="text-sm font-medium truncate">{currentCompany.name}</p>
                                <p className="text-xs text-muted-foreground capitalize">{currentCompany.role}</p>
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
                                <AvatarImage src={company.logo} alt={company.name} />
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
                                <div className="flex items-center gap-2 mb-1">
                                    {getPlanBadge(company.plan)}
                                    <span className={`text-xs capitalize ${getRoleColor(company.role)}`}>
                                        {company.role}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    <Users className="h-3 w-3 inline mr-1" />
                                    {company.employeeCount} employees
                                </p>
                            </div>
                        </DropdownMenuItem>
                    ))}
                    
                    <DropdownMenuSeparator />
                    
                    <Dialog open={isCreateCompanyOpen} onOpenChange={setIsCreateCompanyOpen}>
                        <DialogTrigger asChild>
                            <DropdownMenuItem
                                className="flex items-center gap-2 p-3 cursor-pointer"
                                onSelect={(e) => e.preventDefault()}
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-dashed">
                                    <Plus className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Create Company</p>
                                    <p className="text-xs text-muted-foreground">
                                        Add a new company to your account
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Company</DialogTitle>
                                <DialogDescription>
                                    Create a new company workspace for your team.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Company Name</Label>
                                    <Input id="companyName" placeholder="Acme Corporation" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="companySize">Company Size</Label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                                        <option value="">Select company size</option>
                                        <option value="1-10">1-10 employees</option>
                                        <option value="11-50">11-50 employees</option>
                                        <option value="51-200">51-200 employees</option>
                                        <option value="201-1000">201-1000 employees</option>
                                        <option value="1000+">1000+ employees</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button variant="outline" onClick={() => setIsCreateCompanyOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={() => setIsCreateCompanyOpen(false)}>
                                        Create Company
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    
                    <DropdownMenuItem className="flex items-center gap-2 p-3 cursor-pointer">
                        <Settings className="h-4 w-4" />
                        <span className="text-sm">Company Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}