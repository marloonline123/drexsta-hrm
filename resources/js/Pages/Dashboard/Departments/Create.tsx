import { Button } from '@/Components/Ui/button';
import { useLanguage } from '@/Hooks/use-language';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Head, Link } from '@inertiajs/react';
import { Building, ArrowLeft } from 'lucide-react';
import DepartmentForm from '@/Components/Departments/DepartmentForm';
import { User } from '@/Types/user';

interface Props {
    employees: User[];
}

export default function CreateDepartment({ employees }: Props) {
    const { t } = useLanguage();    

    // Dynamic breadcrumbs with translations
    const translatedBreadcrumbs: BreadcrumbItem[] = [
        {
            title: t('nav.dashboard'),
            href: route('dashboard.index'),
        },
        {
            title: t('departments'),
            href: route('dashboard.departments.index'),
        },
        {
            title: 'Create Department',
            href: route('dashboard.departments.create'),
        },
    ];

    return (
        <AppLayout breadcrumbs={translatedBreadcrumbs}>
            <Head title="Create Department" />

            <div className={`p-6`}>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/dashboard/departments">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Building className="h-6 w-6" />
                            Create Department
                        </h1>
                        <p className="text-muted-foreground">
                            Add a new department to your organization
                        </p>
                    </div>
                </div>

                <DepartmentForm 
                    action={route('dashboard.departments.store')}
                    method="post"
                    employees={employees}
                />
            </div>
        </AppLayout>
    );
}