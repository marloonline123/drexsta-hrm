import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Building,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Users,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Globe,
    FileText,
    CheckCircle,
    XCircle
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Companies',
        href: '/companies',
    },
];

export default function CompaniesPage() {
    const { t, isRTL } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
    const [viewCompany, setViewCompany] = useState<any>(null);
    const [editCompany, setEditCompany] = useState<any>(null);
    
    // Mock companies data
    const companies = [
        {
            id: 1,
            name: 'Acme Corporation',
            industry: 'Technology',
            size: '100-500',
            phone: '+1 (555) 123-4567',
            email: 'info@acme.com',
            website: 'https://acme.com',
            address: '123 Business St, New York, NY 10001',
            taxId: 'TAX-123456',
            establishedDate: '2010-01-15',
            status: 'active',
            employeesCount: 342,
            logo: null
        },
        {
            id: 2,
            name: 'TechStart Inc',
            industry: 'Software',
            size: '10-50',
            phone: '+1 (555) 987-6543',
            email: 'hello@techstart.com',
            website: 'https://techstart.com',
            address: '456 Startup Ave, San Francisco, CA 94102',
            taxId: 'TAX-654321',
            establishedDate: '2020-06-10',
            status: 'active',
            employeesCount: 28,
            logo: null
        }
    ];

    const getStatusBadge = (status: string) => {
        return status === 'active' ? (
            <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                {t('companies.active')}
            </Badge>
        ) : (
            <Badge className="bg-red-100 text-red-800">
                <XCircle className="h-3 w-3 mr-1" />
                {t('companies.inactive')}
            </Badge>
        );
    };

    const filteredCompanies = companies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            company.industry.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !filterStatus || company.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('companies.title')} />
            
            <div className={`space-y-6 p-6 ${isRTL ? 'rtl' : 'ltr'}`}>
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Building className="h-8 w-8" />
                            {t('companies.title')}
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            {t('companies.description')}
                        </p>
                    </div>
                    <Dialog open={isAddCompanyOpen} onOpenChange={setIsAddCompanyOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                {t('companies.addCompany')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>{t('companies.addCompany')}</DialogTitle>
                                <DialogDescription>
                                    {t('companies.description')}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="companyName">{t('companies.companyName')}</Label>
                                        <Input id="companyName" placeholder="Acme Corporation" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="industry">{t('companies.industry')}</Label>
                                        <Input id="industry" placeholder="Technology" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">{t('companies.email')}</Label>
                                        <Input id="email" type="email" placeholder="info@company.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">{t('companies.phone')}</Label>
                                        <Input id="phone" placeholder="+1 (555) 000-0000" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">{t('companies.address')}</Label>
                                    <Textarea id="address" placeholder="123 Business Street..." />
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button variant="outline" onClick={() => setIsAddCompanyOpen(false)}>
                                        {t('common.cancel')}
                                    </Button>
                                    <Button onClick={() => setIsAddCompanyOpen(false)}>
                                        {t('common.create')}
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {t('companies.totalCompanies')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold">{companies.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {t('companies.activeCompanies')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold text-green-600">
                                {companies.filter(c => c.status === 'active').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {t('companies.employeesCount')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold">
                                {companies.reduce((sum, c) => sum + c.employeesCount, 0)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Industries
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold">
                                {new Set(companies.map(c => c.industry)).size}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filters */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex-1 min-w-64">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder={t('common.search') + '...'}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder={t('companies.status')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t('companies.status')}</SelectItem>
                                    <SelectItem value="active">{t('companies.active')}</SelectItem>
                                    <SelectItem value="inactive">{t('companies.inactive')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Companies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCompanies.map((company) => (
                        <Card key={company.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={company.logo || ""} alt={company.name} />
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {company.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg">{company.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground">{company.industry}</p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => setViewCompany(company)}>
                                                <Eye className="h-4 w-4 mr-2" />
                                                {t('common.view')}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setEditCompany(company)}>
                                                <Edit className="h-4 w-4 mr-2" />
                                                {t('common.edit')}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                {t('common.delete')}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="flex items-center gap-2">
                                    {getStatusBadge(company.status)}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span>{company.employeesCount} {t('companies.employeesCount')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="truncate">{company.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{company.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="truncate">{company.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>{t('companies.establishedDate')}: {new Date(company.establishedDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredCompanies.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">{t('companies.noCompanies')}</h3>
                            <p className="text-muted-foreground">
                                {searchTerm ? 'Try adjusting your search terms.' : t('companies.createFirst')}
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* View Company Dialog */}
                <Dialog open={!!viewCompany} onOpenChange={() => setViewCompany(null)}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{t('companies.companyDetails')}</DialogTitle>
                        </DialogHeader>
                        {viewCompany && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={viewCompany.logo} alt={viewCompany.name} />
                                        <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                            {viewCompany.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-xl font-bold">{viewCompany.name}</h3>
                                        <p className="text-muted-foreground">{viewCompany.industry}</p>
                                        {getStatusBadge(viewCompany.status)}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium mb-3">{t('companies.contactInfo')}</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4" />
                                                {viewCompany.email}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                {viewCompany.phone}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4" />
                                                {viewCompany.website}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-medium mb-3">{t('companies.businessInfo')}</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4" />
                                                {viewCompany.taxId}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4" />
                                                {viewCompany.employeesCount} employees
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                Est. {new Date(viewCompany.establishedDate).getFullYear()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-medium mb-2">{t('companies.address')}</h4>
                                    <p className="text-sm text-muted-foreground">{viewCompany.address}</p>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}