import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { useLanguage } from '@/Hooks/use-language';
import { Employee } from '@/Types/employees';
import { router } from '@inertiajs/react';
import { User, Mail, Calendar, BadgeCheck, BadgeX } from 'lucide-react';
import { Separator } from '@/Components/Ui/separator';
import { Badge } from '@/Components/Ui/badge';

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
        title: 'View',
        href: '/dashboard/employees/view',
    },
];

interface ShowEmployeeProps {
    employee: Employee;
}

export default function ShowEmployee({ employee }: ShowEmployeeProps) {
    const { t } = useLanguage();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Employee Details - ${employee.name}`} />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <User className="h-8 w-8" />
                            Employee Details
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            View detailed information about this employee.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="outline"
                            onClick={() => router.visit(route('dashboard.employees.edit', employee.id))}
                        >
                            Edit Employee
                        </Button>
                        <Button 
                            variant="destructive"
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this employee?')) {
                                    router.delete(route('dashboard.employees.destroy', employee.id));
                                }
                            }}
                        >
                            Delete Employee
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Employee Info Card */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-start gap-6">
                                    <div className="bg-primary/10 rounded-full p-4">
                                        <User className="h-12 w-12 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{employee.name}</h3>
                                        <p className="text-muted-foreground">{employee.email}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            {employee.email_verified_at ? (
                                                <>
                                                    <BadgeCheck className="h-4 w-4 text-green-600" />
                                                    <span className="text-sm text-green-600">Email Verified</span>
                                                </>
                                            ) : (
                                                <>
                                                    <BadgeX className="h-4 w-4 text-red-600" />
                                                    <span className="text-sm text-red-600">Email Not Verified</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <Separator />
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-muted-foreground">Contact Information</h4>
                                            <div className="mt-2 space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                                    <span>{employee.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <span>{employee.username}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-muted-foreground">Account Information</h4>
                                            <div className="mt-2 space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">Employee ID:</span>
                                                    <span>#{employee.id}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <span>Joined: {new Date(employee.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <span>Last Updated: {new Date(employee.updated_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Roles and Permissions Card */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Roles</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {employee.roles && employee.roles.length > 0 ? (
                                    <div className="space-y-2">
                                        {employee.roles.map((role) => (
                                            <Badge key={role.id} className="mr-2 mb-2">
                                                {role.name}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No roles assigned</p>
                                )}
                                <Button 
                                    className="w-full mt-4" 
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.visit(route('dashboard.employees.assign-roles', employee.id))}
                                >
                                    Manage Roles
                                </Button>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle>Permissions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {employee.permissions && employee.permissions.length > 0 ? (
                                    <div className="space-y-2">
                                        {employee.permissions.map((permission) => (
                                            <Badge key={permission.id} variant="secondary" className="mr-2 mb-2">
                                                {permission.name}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No direct permissions assigned</p>
                                )}
                                <Button 
                                    className="w-full mt-4" 
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.visit(route('dashboard.employees.assign-abilities', employee.id))}
                                >
                                    Manage Permissions
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}