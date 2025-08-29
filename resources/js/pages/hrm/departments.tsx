import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, Search, MoreHorizontal, Edit, Trash2, Users, Building, Crown, User } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Departments',
        href: '/hrm/departments',
    },
];

interface Department {
    id: number;
    name: string;
    description: string;
    manager: {
        id: number;
        name: string;
        avatar?: string;
        email: string;
    };
    employeeCount: number;
    budget: number;
    status: 'active' | 'inactive';
    createdAt: string;
}

interface Employee {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    position: string;
}

// Mock data for departments
const mockDepartments: Department[] = [
    {
        id: 1,
        name: 'Human Resources',
        description: 'Manages employee relations, recruitment, and organizational development',
        manager: {
            id: 1,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@company.com',
            avatar: undefined
        },
        employeeCount: 12,
        budget: 150000,
        status: 'active',
        createdAt: '2024-01-15'
    },
    {
        id: 2,
        name: 'Engineering',
        description: 'Software development, infrastructure, and technical operations',
        manager: {
            id: 2,
            name: 'Michael Chen',
            email: 'michael.chen@company.com',
            avatar: undefined
        },
        employeeCount: 25,
        budget: 800000,
        status: 'active',
        createdAt: '2024-01-10'
    },
    {
        id: 3,
        name: 'Sales & Marketing',
        description: 'Revenue generation, customer acquisition, and brand management',
        manager: {
            id: 3,
            name: 'Emily Rodriguez',
            email: 'emily.rodriguez@company.com',
            avatar: undefined
        },
        employeeCount: 18,
        budget: 300000,
        status: 'active',
        createdAt: '2024-01-12'
    },
    {
        id: 4,
        name: 'Finance',
        description: 'Financial planning, accounting, and budget management',
        manager: {
            id: 4,
            name: 'David Kim',
            email: 'david.kim@company.com',
            avatar: undefined
        },
        employeeCount: 8,
        budget: 120000,
        status: 'inactive',
        createdAt: '2024-01-20'
    }
];

// Mock data for available employees (to assign as managers)
const mockEmployees: Employee[] = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', position: 'HR Director' },
    { id: 2, name: 'Michael Chen', email: 'michael.chen@company.com', position: 'Engineering Lead' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.rodriguez@company.com', position: 'Sales Director' },
    { id: 4, name: 'David Kim', email: 'david.kim@company.com', position: 'Finance Manager' },
    { id: 5, name: 'Jessica Wang', email: 'jessica.wang@company.com', position: 'Operations Manager' },
    { id: 6, name: 'Robert Taylor', email: 'robert.taylor@company.com', position: 'Product Manager' }
];

export default function Departments() {
    const { t } = useLanguage();
    const [departments, setDepartments] = useState<Department[]>(mockDepartments);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        managerId: '',
        budget: '',
        status: 'active' as 'active' | 'inactive'
    });

    // Filter departments based on search and status
    const filteredDepartments = departments.filter(dept => {
        const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dept.manager.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || dept.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAddDepartment = () => {
        const selectedManager = mockEmployees.find(emp => emp.id === parseInt(formData.managerId));
        if (!selectedManager) return;

        const newDepartment: Department = {
            id: Math.max(...departments.map(d => d.id)) + 1,
            name: formData.name,
            description: formData.description,
            manager: {
                id: selectedManager.id,
                name: selectedManager.name,
                email: selectedManager.email,
                avatar: selectedManager.avatar
            },
            employeeCount: 0,
            budget: parseInt(formData.budget) || 0,
            status: formData.status,
            createdAt: new Date().toISOString().split('T')[0]
        };

        setDepartments([...departments, newDepartment]);
        resetForm();
        setIsAddDialogOpen(false);
    };

    const handleEditDepartment = () => {
        if (!editingDepartment) return;

        const selectedManager = mockEmployees.find(emp => emp.id === parseInt(formData.managerId));
        if (!selectedManager) return;

        const updatedDepartments = departments.map(dept =>
            dept.id === editingDepartment.id
                ? {
                    ...dept,
                    name: formData.name,
                    description: formData.description,
                    manager: {
                        id: selectedManager.id,
                        name: selectedManager.name,
                        email: selectedManager.email,
                        avatar: selectedManager.avatar
                    },
                    budget: parseInt(formData.budget) || dept.budget,
                    status: formData.status
                }
                : dept
        );

        setDepartments(updatedDepartments);
        resetForm();
        setEditingDepartment(null);
    };

    const handleDeleteDepartment = (id: number) => {
        setDepartments(departments.filter(dept => dept.id !== id));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            managerId: '',
            budget: '',
            status: 'active'
        });
    };

    const openEditDialog = (department: Department) => {
        setEditingDepartment(department);
        setFormData({
            name: department.name,
            description: department.description,
            managerId: department.manager.id.toString(),
            budget: department.budget.toString(),
            status: department.status
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const DepartmentForm = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Department Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter department name"
                />
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter department description"
                    rows={3}
                />
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="manager">Department Manager</Label>
                <Select value={formData.managerId} onValueChange={(value) => setFormData({ ...formData, managerId: value })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a manager" />
                    </SelectTrigger>
                    <SelectContent>
                        {mockEmployees.map((employee) => (
                            <SelectItem key={employee.id} value={employee.id.toString()}>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={employee.avatar} />
                                        <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{employee.name}</div>
                                        <div className="text-sm text-muted-foreground">{employee.position}</div>
                                    </div>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="budget">Annual Budget</Label>
                    <Input
                        id="budget"
                        type="number"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="0"
                    />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Departments - HRM" />
            
            <div className="flex-1 space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('departments')}</h1>
                        <p className="text-muted-foreground">
                            Manage organizational departments and their structures
                        </p>
                    </div>
                    
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => resetForm()}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Department
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Add New Department</DialogTitle>
                                <DialogDescription>
                                    Create a new department with manager and budget allocation.
                                </DialogDescription>
                            </DialogHeader>
                            <DepartmentForm />
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleAddDepartment}>
                                    Add Department
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Overview Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
                            <Building className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{departments.length}</div>
                            <p className="text-xs text-muted-foreground">
                                +2 from last month
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Departments</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {departments.filter(d => d.status === 'active').length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {Math.round((departments.filter(d => d.status === 'active').length / departments.length) * 100)}% of total
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {departments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Across all departments
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                            <Crown className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(departments.reduce((sum, dept) => sum + dept.budget, 0))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Annual allocation
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardHeader>
                        <CardTitle>Department Management</CardTitle>
                        <CardDescription>
                            View and manage all organizational departments
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search departments..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            
                            <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Departments Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Manager</TableHead>
                                        <TableHead>Employees</TableHead>
                                        <TableHead>Budget</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="w-[70px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredDepartments.map((department) => (
                                        <TableRow key={department.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{department.name}</div>
                                                    <div className="text-sm text-muted-foreground line-clamp-1">
                                                        {department.description}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={department.manager.avatar} />
                                                        <AvatarFallback>
                                                            {department.manager.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{department.manager.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {department.manager.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                    {department.employeeCount}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">
                                                    {formatCurrency(department.budget)}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={department.status === 'active' ? 'default' : 'secondary'}>
                                                    {department.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(department.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => openEditDialog(department)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem 
                                                            onClick={() => handleDeleteDepartment(department.id)}
                                                            className="text-destructive"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Edit Dialog */}
            <Dialog open={!!editingDepartment} onOpenChange={() => setEditingDepartment(null)}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Department</DialogTitle>
                        <DialogDescription>
                            Update department information and settings.
                        </DialogDescription>
                    </DialogHeader>
                    <DepartmentForm />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingDepartment(null)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEditDepartment}>
                            Update Department
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}