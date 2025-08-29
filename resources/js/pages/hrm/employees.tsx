import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Users,
    UserPlus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Building,
    FileText,
    Download,
    Upload,
    Settings,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Employees',
        href: '/hrm/employees',
    },
];

export default function EmployeesPage() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
    
    // Mock employee data
    const employees = [
        {
            id: 1,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@company.com',
            phone: '+1 (555) 123-4567',
            department: 'Engineering',
            position: 'Senior Developer',
            status: 'active',
            joinDate: '2023-01-15',
            avatar: null,
            location: 'New York, NY',
            salary: '$85,000',
            employeeId: 'EMP001'
        },
        {
            id: 2,
            name: 'Ahmed Al-Rashid',
            email: 'ahmed.rashid@company.com',
            phone: '+1 (555) 987-6543',
            department: 'Marketing',
            position: 'Marketing Manager',
            status: 'active',
            joinDate: '2022-08-20',
            avatar: null,
            location: 'Dubai, UAE',
            salary: '$65,000',
            employeeId: 'EMP002'
        }
    ];

    const departments = ['Engineering', 'Marketing', 'Human Resources', 'Finance', 'Sales', 'Operations'];
    const statusOptions = [
        { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
        { value: 'inactive', label: 'Inactive', color: 'bg-gray-100 text-gray-800' },
        { value: 'on_leave', label: 'On Leave', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'terminated', label: 'Terminated', color: 'bg-red-100 text-red-800' }
    ];

    const getStatusBadge = (status: string) => {
        const statusConfig = statusOptions.find(s => s.value === status);
        return (
            <Badge className={statusConfig?.color || 'bg-gray-100 text-gray-800'}>
                {statusConfig?.label || status}
            </Badge>
        );
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'on_leave':
                return <AlertCircle className="h-4 w-4 text-yellow-600" />;
            case 'inactive':
            case 'terminated':
                return <XCircle className="h-4 w-4 text-red-600" />;
            default:
                return <AlertCircle className="h-4 w-4 text-gray-600" />;
        }
    };

    const filteredEmployees = employees.filter(employee => {
        const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = !filterDepartment || employee.department === filterDepartment;
        const matchesStatus = !filterStatus || employee.status === filterStatus;
        return matchesSearch && matchesDepartment && matchesStatus;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />
            
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
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Import
                        </Button>
                        <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Add Employee
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Add New Employee</DialogTitle>
                                    <DialogDescription>
                                        Fill in the employee information below.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="john.doe@company.com" />
                                    </div>
                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={() => setIsAddEmployeeOpen(false)}>
                                            Add Employee
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex-1 min-w-64">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search employees by name, email, or ID..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="All Departments" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Departments</SelectItem>
                                        {departments.map(dept => (
                                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Employees Grid */}
                <div className="grid gap-4">
                    {filteredEmployees.map((employee, index) => (
                        <Card 
                            key={employee.id} 
                            className="hover:shadow-lg transition-all duration-200 group cursor-pointer animate-in fade-in slide-in-from-bottom"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4 flex-1">
                                        <Avatar className="h-12 w-12 border-2 border-muted">
                                            <AvatarImage src={employee.avatar || ''} alt={employee.name} />
                                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                {employee.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                    {employee.name}
                                                </h3>
                                                {getStatusIcon(employee.status)}
                                                {getStatusBadge(employee.status)}
                                            </div>
                                            
                                            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4" />
                                                        <span>{employee.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4" />
                                                        <span>{employee.phone}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Building className="h-4 w-4" />
                                                        <span>{employee.department} • {employee.position}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4" />
                                                        <span>ID: {employee.employeeId}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Eye className="h-4 w-4 mr-2" />
                                            View
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit Employee
                                                </DropdownMenuItem>
                                                <Separator className="my-1" />
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete Employee
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredEmployees.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No employees found</h3>
                            <p className="text-muted-foreground mb-4">
                                {searchTerm || filterDepartment || filterStatus 
                                    ? 'Try adjusting your search or filter criteria.'
                                    : 'Get started by adding your first employee.'}
                            </p>
                            {!(searchTerm || filterDepartment || filterStatus) && (
                                <Button onClick={() => setIsAddEmployeeOpen(true)}>
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Add First Employee
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}