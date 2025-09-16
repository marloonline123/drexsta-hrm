import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';

import { useLanguage } from '@/Hooks/use-language';
import { FormEvent, useState } from 'react';
import { EmployeeFormData } from '@/Types/employees';
import { router } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import EmployeeForm from '@/Components/Employees/EmployeeForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Employees',
        href: '/dashboard/employees',
    },
    {
        title: 'Create',
        href: '/dashboard/employees/create',
    },
];

export default function CreateEmployee() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Employee" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <UserPlus className="h-8 w-8" />
                            Create Employee
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Add a new employee to your organization.
                        </p>
                    </div>
                </div>

                {/* Create Employee Form */}
                <EmployeeForm action={route('dashboard.employees.store')} />
            </div>
        </AppLayout>
    );
}