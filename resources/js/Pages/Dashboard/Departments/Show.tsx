import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Badge } from '@/Components/Ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/Components/Ui/avatar';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Head, Link } from '@inertiajs/react';
import {
    Building,
    ArrowLeft,
    Edit,
    Mail,
    Users,
    Calendar,
    Trash2,
    DollarSign,
    Crown,
    User
} from 'lucide-react';
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/Ui/table';
import DeleteDepartmentModal from '@/Components/Departments/DeleteDepartmentModal';
import { Department } from '@/Types/deparments';
import { t } from 'i18next';
import { formatCurrency } from '@/Lib/utils';

interface Props {
    department: Department;
}

export default function ShowDepartment({ department }: Props) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    console.log('Department:', department);
    

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('nav.dashboard'),
            href: route('dashboard.index'),
        },
        {
            title: t('nav.departments'),
            href: route('dashboard.departments.index'),
        },
        {
            title: department.name,
            href: route('dashboard.departments.show', department.slug),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${department.name} - Department Details`} />

            <div className={`p-6`}>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/dashboard/departments">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Building className="h-6 w-6" />
                            {department.name}
                        </h1>
                        <p className="text-muted-foreground">
                            Department Details
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <Link href={route('dashboard.departments.edit', department.slug)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteModal(true)}
                            className="text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Department Overview */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Building className="h-8 w-8 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-xl">{department.name}</CardTitle>
                                    <p className="text-muted-foreground">{department.description}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge variant={department.is_active ? 'default' : 'secondary'}>
                                            {department.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">•</span>
                                        {/* <span className="text-sm text-muted-foreground">
                                            {department.employees_count} Employees
                                        </span> */}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Department Stats */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{department.employees_count + 1}</div>
                                <p className="text-xs text-muted-foreground">
                                    Including manager
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Annual Budget</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(department.annual_budget)}</div>
                                <p className="text-xs text-muted-foreground">
                                    Allocated budget
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Created</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {new Date(department.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(department.created_at).getFullYear()}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Status</CardTitle>
                                <Crown className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {department.is_active ? 'Active' : 'Inactive'}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Current status
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Department Manager */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Department Manager</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={department.manager.profile_photo_url} />
                                    <AvatarFallback>
                                        {department.manager.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h3 className="font-semibold">{department.manager.name}</h3>
                                    <p className="text-sm text-muted-foreground">{department.manager.position}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{department.manager.email}</span>
                                    </div>
                                </div>
                                <Badge variant="outline">Manager</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Department Employees */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Department Members</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Employee</TableHead>
                                            <TableHead>Position</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {department.employees.map((employee) => (
                                            <TableRow key={employee.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={employee.profile_photo_url} />
                                                            <AvatarFallback>
                                                                {employee.name.split(' ').map(n => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium">{employee.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{employee.position}</TableCell>
                                                <TableCell>{employee.email}</TableCell>
                                                <TableCell>
                                                    <Badge variant={employee.department_role === 'manager' ? 'default' : 'outline'}>
                                                        {employee.department_role === 'manager' ? (
                                                            <>
                                                                <Crown className="h-3 w-3 mr-1" />
                                                                Manager
                                                            </>
                                                        ) : (
                                                            <>
                                                                <User className="h-3 w-3 mr-1" />
                                                                Employee
                                                            </>
                                                        )}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <DeleteDepartmentModal
                department={department}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
            />
        </AppLayout>
    );
}