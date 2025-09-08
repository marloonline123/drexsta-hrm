import { Button } from '@/Components/Ui/button';
import { useLanguage } from '@/Hooks/use-language';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Head, Link } from '@inertiajs/react';
import { Building, ArrowLeft } from 'lucide-react';
import { Company } from '@/Types/companies';
import CompanyForm from '@/Components/Companies/CompanyForm';

interface EditCompanyProps {
    company: Company;
}

export default function EditCompany({ company }: EditCompanyProps) {
    const { t } = useLanguage();
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
        {
            title: t('common.edit'),
            href: route('dashboard.companies.edit', company.slug),
        },
    ];

    


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${t('companies.editCompanyTitle')} - ${company.name}`} />
            
            <div className={`p-6`}>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route('dashboard.companies.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Building className="h-6 w-6" />
                            {t('companies.editCompanyTitle')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('companies.updateCompanyInfo')} {company.name}
                        </p>
                    </div>
                </div>

                <CompanyForm 
                    action={route('dashboard.companies.update', company.slug)} 
                    company={company}
                    method="put"
                />
            </div>
        </AppLayout>
    );
}