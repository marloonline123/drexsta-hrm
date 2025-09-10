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

interface Department {
    id: number;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    annual_budget: number;
    manager: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
}

interface Props {
    department: Department;
    employees: Employee[];
}

export default function EditDepartment({ department, employees }: Props) {
    const { t } = useLanguage();

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
            title: department.name,
            href: `/dashboard/departments/${department.id}`,
        },
        {
            title: 'Edit',
            href: `/dashboard/departments/${department.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={translatedBreadcrumbs}>
            <Head title={`Edit ${department.name}`} />

            <div className={`p-6`}>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={`/dashboard/departments/${department.id}`}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Building className="h-6 w-6" />
                            Edit Department
                        </h1>
                        <p className="text-muted-foreground">
                            Update {department.name} information
                        </p>
                    </div>
                </div>

                <DepartmentForm 
                    action={`/dashboard/departments/${department.id}`}
                    method="put"
                    department={department}
                    employees={employees}
                />
            </div>
        </AppLayout>
    );
}