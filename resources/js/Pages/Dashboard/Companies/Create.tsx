import { Button } from '@/Components/Ui/button';

import { useLanguage } from '@/Hooks/use-language';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Head } from '@inertiajs/react';
import { Building, ArrowLeft } from 'lucide-react';
import CompanyForm from '@/Components/Companies/CompanyForm';

export default function CreateCompany() {
    const { t } = useLanguage();

    // Dynamic breadcrumbs with translations
    const translatedBreadcrumbs: BreadcrumbItem[] = [
        {
            title: t('nav.dashboard'),
            href: route('dashboard.index'),
        },
        {
            title: t('nav.companies'),
            href: route('dashboard.companies.index'),
        },
        {
            title: t('companies.createCompany'),
            href: route('dashboard.companies.create'),
        },
    ];

    return (
        <AppLayout breadcrumbs={translatedBreadcrumbs}>
            <Head title={t('companies.createCompany')} />

            <div className={`p-6`}>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <a href="/companies">
                            <ArrowLeft className="h-4 w-4" />
                        </a>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Building className="h-6 w-6" />
                            {t('companies.createCompany')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('companies.addNewCompany')}
                        </p>
                    </div>
                </div>

                <CompanyForm action={route('dashboard.companies.store')} />
            </div>
        </AppLayout>
    );
}