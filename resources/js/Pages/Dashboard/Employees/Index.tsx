import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Button } from '@/Components/Ui/button';
import {
    Users,
    UserPlus,
    Download,
    Upload,
} from 'lucide-react';
import { Employee } from '@/Types/employees';
import { PaginatedData } from '@/Types/global';
import FilterComponent from '@/Components/Shared/Filter';
import Pagination from '@/Components/Shared/Pagination';
import EmptyResource from '@/Components/Shared/EmptyResource';
import EmployeesList from '@/Components/Employees/EmployeesList';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Employees',
        href: route('dashboard.employees.index'),
    },
];

interface EmployeesIndexProps {
    employees: PaginatedData<Employee>;
}

export default function EmployeesIndex({ employees }: EmployeesIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees Management" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Users className="h-8 w-8" />
                            Employees
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your organization's employee data and information.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <a href={route('dashboard.employees.export')}>
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </a>
                        </Button>
                        <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Import
                        </Button>
                        <Button asChild>
                            <a href={route('dashboard.employees.create')}>
                                <UserPlus className="h-4 w-4 mr-2" />
                                Add Employee
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Filters and Search */}
                <FilterComponent
                    routeName='dashboard.employees.index'
                    fields={{
                        search: { type: 'text', placeholder: 'Search employees by name, email...' },
                    }}
                />

                {/* Employees List */}
                <EmployeesList employees={employees.data} />

                {employees.data.length === 0 && (
                    <EmptyResource
                        icon={Users}
                        title="No employees found"
                        description='Get started by adding your first employee.'
                    />
                )}

                {/* Pagination */}
                <Pagination meta={employees.meta} />
            </div>
        </AppLayout>
    );
}