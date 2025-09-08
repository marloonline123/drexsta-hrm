import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Badge } from '@/Components/Ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/Components/Ui/avatar';
import { DeleteModal } from '@/Components/Shared/DeleteModal';
import { useLanguage } from '@/Hooks/use-language';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
    Building, 
    ArrowLeft, 
    Edit,
    Mail, 
    Phone, 
    MapPin, 
    Globe, 
    FileText, 
    Users, 
    Calendar,
    Settings,
    Trash2
} from 'lucide-react';
import { useState } from 'react';

interface Company {
    id: number;
    name: string;
    industry: string;
    slug: string;
    phone?: string;
    email?: string;
    address?: string;
    description?: string;
    logo_path?: string;
    is_active: boolean;
    employeesCount?: number;
    establishedDate?: string;
    website?: string;
    taxId?: string;
    status?: string;
    logo?: string;
    created_at: string;
    updated_at: string;
}

interface ShowCompanyProps {
    company: Company;
}

export default function ShowCompany({ company }: ShowCompanyProps) {
    const { t, isRTL } = useLanguage();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('nav.dashboard'),
            href: '/dashboard',
        },
        {
            title: t('nav.companies'),
            href: '/companies',
        },
        {
            title: company.name,
            href: `/companies/${company.id}`,
        },
    ];

    const getStatusBadge = (status: string) => {
        const isActive = status === 'active' || company.is_active;
        return (
            <Badge variant={isActive ? 'default' : 'secondary'} className="capitalize">
                {isActive ? t('companies.active') : t('companies.inactive')}
            </Badge>
        );
    };

    const handleDeleteCompany = async () => {
        setIsDeleting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Here you would make the actual API call
            // await fetch(`/companies/${company.id}`, { method: 'DELETE' });
            
            console.log('Company deleted:', company.name);
            // Redirect to companies list after successful deletion
            window.location.href = '/companies';
        } catch (error) {
            console.error('Failed to delete company:', error);
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${company.name} - ${t('companies.companyDetails')}`} />
            
            <div className={`p-6 ${isRTL ? 'rtl' : 'ltr'}`}>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <a href="/companies">
                            <ArrowLeft className="h-4 w-4" />
                        </a>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Building className="h-6 w-6" />
                            {company.name}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('companies.companyDetails')}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <a href={`/companies/${company.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('common.edit')}
                            </a>
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={() => setShowDeleteModal(true)}
                            className="text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('common.delete')}
                        </Button>
                        <Button variant="outline" size="icon">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="max-w-4xl space-y-6">
                    {/* Company Overview */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={company.logo} alt={company.name} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                        {company.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <CardTitle className="text-xl">{company.name}</CardTitle>
                                    <p className="text-muted-foreground">{company.industry}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        {getStatusBadge(company.status || 'active')}
                                        <span className="text-sm text-muted-foreground">•</span>
                                        <span className="text-sm text-muted-foreground">
                                            {company.employeesCount} {t('companies.employeesCount')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        {company.description && (
                            <CardContent>
                                <p className="text-muted-foreground">{company.description}</p>
                            </CardContent>
                        )}
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('companies.contactInfo')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    {company.email && (
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">{t('companies.email')}</p>
                                                <p className="text-sm text-muted-foreground">{company.email}</p>
                                            </div>
                                        </div>
                                    )}
                                    {company.phone && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">{t('companies.phone')}</p>
                                                <p className="text-sm text-muted-foreground">{company.phone}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    {company.website && (
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">{t('companies.website')}</p>
                                                <p className="text-sm text-muted-foreground">{company.website}</p>
                                            </div>
                                        </div>
                                    )}
                                    {company.address && (
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">{t('companies.address')}</p>
                                                <p className="text-sm text-muted-foreground">{company.address}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Business Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('companies.businessInfo')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {company.taxId && (
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">{t('companies.taxId')}</p>
                                            <p className="text-sm text-muted-foreground">{company.taxId}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <Users className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{t('companies.employeesCount')}</p>
                                        <p className="text-sm text-muted-foreground">{company.employeesCount}</p>
                                    </div>
                                </div>
                                {company.establishedDate && (
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">{t('companies.establishedDate')}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(company.establishedDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>System Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <p className="font-medium">{t('common.createdAt')}</p>
                                    <p className="text-muted-foreground">
                                        {new Date(company.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium">{t('common.updatedAt')}</p>
                                    <p className="text-muted-foreground">
                                        {new Date(company.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Delete Modal */}
                <DeleteModal
                    open={showDeleteModal}
                    onOpenChange={setShowDeleteModal}
                    onConfirm={handleDeleteCompany}
                    loading={isDeleting}
                    title={`${t('companies.deleteCompany')} "${company.name}"`}
                    description={`${t('companies.confirmDelete')} ${t('companies.deleteWarning')}`}
                    actionButtonText={t('common.delete')}
                >
                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                            {t('companies.confirmDelete')}
                        </p>
                        <div className="p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={company.logo} alt={company.name} />
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {company.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{company.name}</p>
                                    <p className="text-sm text-muted-foreground">{company.industry}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-destructive text-sm font-medium">
                            {t('companies.deleteWarning')}
                        </p>
                    </div>
                </DeleteModal>
            </div>
        </AppLayout>
    );
}