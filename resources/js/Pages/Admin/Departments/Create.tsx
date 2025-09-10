import { Button } from '@/Components/Ui/button';
import { useLanguage } from '@/Hooks/use-language';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Head, Link } from '@inertiajs/react';
import { Building, ArrowLeft } from 'lucide-react';
import DepartmentForm from '@/Components/Departments/DepartmentForm';

interface Employee {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    position: string;
}

interface Props {
    employees: Employee[];
}

export default function CreateDepartment({ employees }: Props) {
    const { t } = useLanguage();
    console.log('Employees:', employees);
    

    // Dynamic breadcrumbs with translations
    const translatedBreadcrumbs: BreadcrumbItem[] = [
        {
            title: t('nav.dashboard'),
            href: '/dashboard',
        },
        {
            title: 'Admin',
            href: '/admin',
        },
        {
            title: t('departments'),
            href: '/dashboard/departments',
        },
        {
            title: 'Create Department',
            href: '/dashboard/departments/create',
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