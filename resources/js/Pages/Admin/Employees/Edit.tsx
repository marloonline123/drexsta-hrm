import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { useLanguage } from '@/Hooks/use-language';
import { FormEvent, useState } from 'react';
import { Employee } from '@/Types/employees';
import { router } from '@inertiajs/react';
import { Edit3, User, Key } from 'lucide-react';
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
        title: 'Edit',
        href: '/dashboard/employees/edit',
    },
];

interface EditEmployeeProps {
    employee: Employee;
}

export default function EditEmployee({ employee }: EditEmployeeProps) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: employee.name,
        email: employee.email,
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        router.put(route('dashboard.employees.update', employee.id), formData, {
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const handleAssignRoles = () => {
        router.visit(route('dashboard.employees.assign-roles', employee.id));
    };

    const handleAssignAbilities = () => {
        router.visit(route('dashboard.employees.assign-abilities', employee.id));
    };

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
                                    <Button 
                                        className="w-full" 
                                        variant="outline"
                                        onClick={handleAssignRoles}
                                    >
                                        Assign Roles
                                    </Button>
                                    <Button 
                                        className="w-full" 
                                        variant="outline"
                                        onClick={handleAssignAbilities}
                                    >
                                        Assign Abilities
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Edit Form Card */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Update Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name *</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                placeholder="Enter employee's full name"
                                            />
                                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                placeholder="Enter employee's email address"
                                            />
                                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="password">
                                                <div className="flex items-center gap-2">
                                                    <Key className="h-4 w-4" />
                                                    New Password
                                                </div>
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                                placeholder="Leave blank to keep current password"
                                            />
                                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="password_confirmation">Confirm New Password</Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                value={formData.password_confirmation}
                                                onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                                                placeholder="Confirm new password"
                                            />
                                            {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button 
                                            type="button" 
                                            variant="outline"
                                            onClick={() => router.visit(route('dashboard.employees.index'))}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit">
                                            Update Employee
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