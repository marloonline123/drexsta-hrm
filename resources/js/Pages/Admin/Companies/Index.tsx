import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { useLanguage } from '@/Hooks/use-language';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Head, Link } from '@inertiajs/react';
import { buttonVariants } from '@/Components/Ui/button';
import {
    Building,
    Plus,
} from 'lucide-react';
import Pagination from '@/Components/Shared/Pagination';
import { PaginatedData } from '@/Types/global';
import { Company } from '@/Types/companies';
import Filter from '@/Components/Shared/Filter';
import CompaniesGrid from '@/Components/Companies/CompaniesGrid';
import CompaniesStats from '@/Components/Companies/CompaniesStats';

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

export default function CompaniesPage({ companies }: { companies: PaginatedData<Company> }) {
    const companiesData = companies.data || [];
    console.log('Companies Data:', companies);
    
    const { t } = useLanguage();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('companies.title')} />
            
            <div className={`space-y-6 p-6`}>
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
                    <Link href={route('dashboard.companies.create')} className={buttonVariants()}>
                        <Plus className="h-4 w-4 mr-2" />
                        {t('companies.addCompany')}
                    </Link>
                </div>

                {/* Stats Cards */}
                <CompaniesStats companies={companies} />

                <Filter 
                    routeName='dashboard.companies.index'
                    filterSectionName='Company'
                    fields={{ 
                        search: { type: 'text', placeholder: 'Search by name, email...' },
                        status: { type: 'select', placeholder: 'Select Status', options: [
                            { value: 'all', label: 'All' },
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                        ] },
                     }}
                />

                {/* Companies Grid */}
                <CompaniesGrid companies={companiesData} />

                {companiesData.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">{t('companies.noCompanies')}</h3>
                            <p className="text-muted-foreground">
                                { t('companies.createFirst') }
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {companies.meta && (
                    <div className="mt-6">
                        <Pagination meta={companies.meta} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}