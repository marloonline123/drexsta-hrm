import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { buttonVariants } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Employee } from '@/Types/employees';
import { Edit3, User } from 'lucide-react';
import { Separator } from '@/Components/Ui/separator';
import { Badge } from '@/Components/Ui/badge';
import { cn } from '@/Lib/utils';
import EditEmployeeInfoForm from '@/Components/Employees/EditEmployeeInfoForm';
import EditEmployeePasswordForm from '@/Components/Employees/EditEmployeePasswordForm';


interface EditEmployeeProps {
    employee: Employee;
}

export default function EditEmployee({ employee }: EditEmployeeProps) {
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
            title: 'Edit Employee - ' + employee.name,
            href: route('dashboard.employees.edit', employee.username),
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Employee - ${employee.name}`} />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Edit3 className="h-8 w-8" />
                            Edit Employee
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Update employee information and manage roles.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Employee Info Card */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Employee Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="bg-primary/10 rounded-full p-4">
                                        <User className="h-12 w-12 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold">{employee.name}</h3>
                                        <p className="text-muted-foreground">{employee.email}</p>
                                        <Badge className="mt-2">
                                            {employee.email_verified_at ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                </div>
                                
                                <Separator />
                                
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Employee ID:</span>
                                        <span>#{employee.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Username:</span>
                                        <span>{employee.username}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Joined:</span>
                                        <span>{new Date(employee.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Last Updated:</span>
                                        <span>{new Date(employee.updated_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                
                                <Separator />
                                
                                <div className="space-y-2">
                                    <Link 
                                        href={route('dashboard.employees.assign-roles', employee.username)} 
                                        className={cn("w-full", buttonVariants({ variant: 'outline' }))}
                                    >
                                        Assign Roles
                                    </Link>
                                    <Link 
                                        href={route('dashboard.employees.assign-abilities', employee.username)}
                                        className={cn("w-full", buttonVariants({ variant: 'outline' }))}
                                    >
                                        Assign Abilities
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className='space-y-12 lg:col-span-2'>
                        {/* Edit Info Form Card */}
                        <EditEmployeeInfoForm employee={employee} />

                        {/* Edit Password Form Card */}
                        <EditEmployeePasswordForm employee={employee} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}