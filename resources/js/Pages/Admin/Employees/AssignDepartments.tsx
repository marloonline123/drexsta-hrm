import { Form, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Employee } from '@/Types/employees';
import { router } from '@inertiajs/react';
import { User, Warehouse } from 'lucide-react';
import { Separator } from '@/Components/Ui/separator';
import { Badge } from '@/Components/Ui/badge';
import { Checkbox } from '@/Components/Ui/checkbox';
import { useState } from 'react';
import FormButton from '@/Components/Ui/form-button';
import InputError from '@/Components/input-error';
import { Department } from '@/Types/deparments';
import { truncateText } from '@/Lib/utils';

interface AssignDepartmentsProps {
    employee: Employee;
    departments: Department[];
}

export default function AssignDepartments({ employee, departments }: AssignDepartmentsProps) {
    console.log(employee);
    const [selectedDepartments, setSelectedDepartments] = useState<number[]>(
        employee.departments?.map(department => department.id) || []
    );

    

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard.index'),
        },
        {
            title: 'Employees',
            href: route('dashboard.employees.index'),
        },
        {
            title: employee.name,
            href: route('dashboard.employees.show', employee.username),
        },
        {
            title: 'Assign Departments',
            href: route('dashboard.employees.assign-departments', employee.username),
        },
    ];

    const handleDepartmentToggle = (abilityId: number) => {
        setSelectedDepartments(prev =>
            prev.includes(abilityId)
                ? prev.filter(id => id !== abilityId)
                : [...prev, abilityId]
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Assign departments - ${employee.name}`} />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Warehouse className="h-8 w-8" />
                            Assign Departments
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage departments for employee: {employee.name}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Employee Info Card */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Employee</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="bg-primary/10 rounded-full p-4">
                                        <User className="h-12 w-12 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold">{employee.name}</h3>
                                        <p className="text-muted-foreground">{employee.email}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className="font-semibold mb-2">Current Departments</h4>
                                    {employee.departments && employee.departments.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {employee.departments.map((department) => (
                                                <Link key={department.id} href={route('dashboard.departments.show', department.slug)} className='group'>
                                                    <Badge variant="secondary" className="mr-2 mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                        {department.name}
                                                    </Badge>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground text-sm">No departments assigned</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Departments Assignment Card */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Available Departments</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Form action={route('dashboard.employees.assign-departments', employee.username)} method='post' className="space-y-6">
                                    {({ processing, errors }) => (
                                        <>
                                            {departments && departments.length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {departments.map((department) => (
                                                        <label
                                                            htmlFor={`department-${department.id}`}
                                                            key={department.id}
                                                            className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                                                        >
                                                            <Checkbox
                                                                id={`department-${department.id}`}
                                                                name="departments[]"
                                                                value={department.id}
                                                                checked={selectedDepartments.includes(department.id)}
                                                                onCheckedChange={() => handleDepartmentToggle(department.id)}
                                                            />
                                                            <div className="flex-1">
                                                                <div
                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                >
                                                                    {department.name}
                                                                </div>
                                                                {department.description && (
                                                                    <p className="text-xs text-muted-foreground mt-1">
                                                                        {truncateText(department.description, 100)}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <InputError message={errors?.departments} className="mt-2" />
                                                        </label>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <Warehouse className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                                    <h3 className="text-lg font-semibold mb-2">No departments available</h3>
                                                    <p className="text-muted-foreground">
                                                        Create departments first to assign them to employees.
                                                    </p>
                                                </div>
                                            )}

                                            <div className="flex justify-end gap-3 pt-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => router.visit(route('dashboard.employees.edit', employee.id))}
                                                >
                                                    Cancel
                                                </Button>
                                                <FormButton text='Assign Departments' loadingText='Assigning...' type="submit" isLoading={processing} />
                                            </div>
                                        </>
                                    )}
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
