import { Button } from '@/Components/Ui/button';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Head, Link } from '@inertiajs/react';
import { Building, ArrowLeft } from 'lucide-react';
import DepartmentForm from '@/Components/Departments/DepartmentForm';
import { Department } from '@/Types/deparments';
import { t } from 'i18next';
import { User } from '@/Types/user';


interface Props {
    department: Department;
    employees: User[];
}

export default function EditDepartment({ department, employees }: Props) {
    console.log('Employees:', employees);
    console.log('Department:', department);
    
    
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
            title: department.name,
            href: route('dashboard.departments.show', department.slug),
        },
        {
            title: 'Edit',
            href: route('dashboard.departments.edit', department.slug),
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
                    action={route('dashboard.departments.update', department.slug)}
                    method="put"
                    department={department}
                    employees={employees}
                />
            </div>
        </AppLayout>
    );
}