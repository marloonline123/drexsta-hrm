import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Employee } from '@/Types/employees';
import { router } from '@inertiajs/react';
import { User, Users } from 'lucide-react';
import { Separator } from '@/Components/Ui/separator';
import { Badge } from '@/Components/Ui/badge';
import { Checkbox } from '@/Components/Ui/checkbox';
import { FormEvent, useState } from 'react';
import { Role } from '@/Types/roles';

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

interface AssignRolesProps {
    employee: Employee;
    roles: Role[]; // We'll need to define proper types for roles
}

export default function AssignRoles({ employee, roles }: AssignRolesProps) {
    const [selectedRoles, setSelectedRoles] = useState<number[]>(
        employee.roles?.map(role => role.id) || []
    );

    const handleRoleToggle = (roleId: number) => {
        setSelectedRoles(prev => 
            prev.includes(roleId) 
                ? prev.filter(id => id !== roleId)
                : [...prev, roleId]
        );
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        router.post(route('dashboard.employees.assign-roles', employee.id), {
            roles: selectedRoles
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Assign Roles - ${employee.name}`} />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Users className="h-8 w-8" />
                            Assign Roles
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage roles for employee: {employee.name}
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
                                    <h4 className="font-semibold mb-2">Current Roles</h4>
                                    {employee.roles && employee.roles.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {employee.roles.map((role) => (
                                                <Badge key={role.id} className="mr-2 mb-2">
                                                    {role.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground text-sm">No roles assigned</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Roles Assignment Card */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Available Roles</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {roles && roles.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {roles.map((role) => (
                                                <div 
                                                    key={role.id} 
                                                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                                                >
                                                    <Checkbox
                                                        id={`role-${role.id}`}
                                                        checked={selectedRoles.includes(role.id)}
                                                        onCheckedChange={() => handleRoleToggle(role.id)}
                                                    />
                                                    <div className="flex-1">
                                                        <label 
                                                            htmlFor={`role-${role.id}`} 
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {role.name}
                                                        </label>
                                                        {/* {role.description && (
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                {role.description}
                                                            </p>
                                                        )} */}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold mb-2">No roles available</h3>
                                            <p className="text-muted-foreground">
                                                Create roles first to assign them to employees.
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
                                        <Button type="submit">
                                            Save Roles
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}