import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Badge } from '@/Components/Ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/Components/Ui/avatar';
import { useLanguage } from '@/Hooks/use-language';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Head, Link } from '@inertiajs/react';
import {
    Building,
    ArrowLeft,
    Edit,
    Mail,
    Phone,
    MapPin,
    // Globe,
    // FileText,
    Users,
    Calendar,
    // Settings,
    Trash2
} from 'lucide-react';
import { Company } from '@/Types/companies';
import DeleteCompanyModal from '@/Components/Companies/DeleteCompanyModal';
import { useState } from 'react';

interface ShowCompanyProps {
    company: Company;
}

export default function ShowCompany({ company }: ShowCompanyProps) {
    const { t } = useLanguage();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('nav.dashboard'),
            href: route('dashboard.index'),
        },
        {
            title: t('nav.companies'),
            href: route('dashboard.companies.index'),
        },
        {
            title: company.name,
            href: route('dashboard.companies.show', company.slug),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${company.name} - ${t('companies.companyDetails')}`} />

            <div className={`p-6`}>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route('dashboard.companies.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
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
                            <Link href={route('dashboard.companies.edit', company.slug)}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('common.edit')}
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteModal(true)}
                            className="text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('common.delete')}
                        </Button>
                        {/* <Button variant="outline" size="icon">
                            <Settings className="h-4 w-4" />
                        </Button> */}
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Company Overview */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={company.logo_url} alt={company.name} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                        {company.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <CardTitle className="text-xl">{company.name}</CardTitle>
                                    <p className="text-muted-foreground">{company.industry}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge variant={company.is_active ? 'default' : 'secondary'} className="capitalize">
                                            {company.is_active ? t('companies.active') : t('companies.inactive')}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">•</span>
                                        <span className="text-sm text-muted-foreground">
                                            {company.employees_count} {t('companies.employeesCount')}
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
                                    {/* {company.website && (
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">{t('companies.website')}</p>
                                                <p className="text-sm text-muted-foreground">{company.website}</p>
                                            </div>
                                        </div>
                                    )} */}
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
                                {/* {company.taxId && (
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">{t('companies.taxId')}</p>
                                            <p className="text-sm text-muted-foreground">{company.taxId}</p>
                                        </div>
                                    </div>
                                )} */}
                                <div className="flex items-center gap-3">
                                    <Users className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{t('companies.employeesCount')}</p>
                                        <p className="text-sm text-muted-foreground">{company.employees_count}</p>
                                    </div>
                                </div>
                                {company.established_date && (
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">{t('companies.establishedDate')}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(company.established_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Delete Modal */}
                <DeleteCompanyModal company={company} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
            </div>
        </AppLayout>
    );
}