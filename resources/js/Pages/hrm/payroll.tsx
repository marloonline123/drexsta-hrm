import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Input } from '@/Components/Ui/input';
import { Badge } from '@/Components/Ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/Ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/Components/Ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/Components/Ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/Ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/Ui/select';
import { 
    DollarSign, 
    Search, 
    MoreHorizontal, 
    Users, 
    CheckCircle,
    Clock,
    FileText,
    Download,
    Calculator,
    CreditCard
} from 'lucide-react';
import { useLanguage } from '@/Hooks/use-language';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Payroll',
        href: '/hrm/payroll',
    },
];

interface PayrollRecord {
    id: number;
    employee: {
        id: number;
        name: string;
        avatar?: string;
        department: string;
        position: string;
        employeeId: string;
    };
    period: { month: string; year: number };
    basicSalary: number;
    allowances: number;
    deductions: number;
    grossSalary: number;
    netSalary: number;
    status: 'draft' | 'pending' | 'approved' | 'paid' | 'rejected';
}

// Mock data
const mockPayrollRecords: PayrollRecord[] = [
    {
        id: 1,
        employee: {
            id: 1, name: 'John Smith', department: 'Engineering', 
            position: 'Senior Developer', employeeId: 'EMP001'
        },
        period: { month: 'January', year: 2024 },
        basicSalary: 5000, allowances: 1600, deductions: 1300,
        grossSalary: 7350, netSalary: 6050, status: 'paid'
    },
    {
        id: 2,
        employee: {
            id: 2, name: 'Sarah Johnson', department: 'Human Resources',
            position: 'HR Manager', employeeId: 'EMP002'
        },
        period: { month: 'January', year: 2024 },
        basicSalary: 4500, allowances: 1400, deductions: 1350,
        grossSalary: 6310, netSalary: 4960, status: 'approved'
    },
    {
        id: 3,
        employee: {
            id: 3, name: 'Michael Chen', department: 'Engineering',
            position: 'Team Lead', employeeId: 'EMP003'
        },
        period: { month: 'January', year: 2024 },
        basicSalary: 6000, allowances: 1950, deductions: 1550,
        grossSalary: 9400, netSalary: 7850, status: 'pending'
    },
    {
        id: 4,
        employee: {
            id: 4, name: 'Emily Rodriguez', department: 'Sales',
            position: 'Sales Manager', employeeId: 'EMP004'
        },
        period: { month: 'January', year: 2024 },
        basicSalary: 4800, allowances: 1540, deductions: 1380,
        grossSalary: 7332, netSalary: 5952, status: 'draft'
    }
];

export default function Payroll() {
    const { t } = useLanguage();
    const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(mockPayrollRecords);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'pending' | 'approved' | 'paid' | 'rejected'>('all');
    const [departmentFilter, setDepartmentFilter] = useState<string>('all');
    const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false);

    // Get unique departments
    const departments = Array.from(new Set(payrollRecords.map(record => record.employee.department)));

    // Filter payroll records
    const filteredRecords = payrollRecords.filter(record => {
        const matchesSearch = record.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            record.employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
        const matchesDepartment = departmentFilter === 'all' || record.employee.department === departmentFilter;
        return matchesSearch && matchesStatus && matchesDepartment;
    });

    // Calculate summary statistics
    const totalGrossPay = filteredRecords.reduce((sum, record) => sum + record.grossSalary, 0);
    const totalNetPay = filteredRecords.reduce((sum, record) => sum + record.netSalary, 0);
    const pendingCount = filteredRecords.filter(r => r.status === 'pending').length;
    const paidCount = filteredRecords.filter(r => r.status === 'paid').length;

    const handleProcessPayroll = (recordId: number) => {
        const updatedRecords = payrollRecords.map(record =>
            record.id === recordId ? { ...record, status: 'approved' as const } : record
        );
        setPayrollRecords(updatedRecords);
    };

    const handlePaySalary = (recordId: number) => {
        const updatedRecords = payrollRecords.map(record =>
            record.id === recordId ? { ...record, status: 'paid' as const } : record
        );
        setPayrollRecords(updatedRecords);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'default';
            case 'approved': return 'secondary';
            case 'pending': return 'outline';
            case 'draft': return 'secondary';
            case 'rejected': return 'destructive';
            default: return 'secondary';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid': return <CheckCircle className="h-4 w-4" />;
            case 'approved': return <Clock className="h-4 w-4" />;
            case 'pending': return <Clock className="h-4 w-4" />;
            case 'draft': return <FileText className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payroll - HRM" />
            
            <div className="flex-1 space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('payroll')}</h1>
                        <p className="text-muted-foreground">
                            Manage employee salaries, payroll processing, and financial reports
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Dialog open={isProcessDialogOpen} onOpenChange={setIsProcessDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Calculator className="mr-2 h-4 w-4" />
                                    Process Payroll
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Process Monthly Payroll</DialogTitle>
                                    <DialogDescription>
                                        Process payroll for January 2024
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="rounded-lg border p-4">
                                        <h4 className="font-medium mb-2">Processing Summary</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Total Employees:</span>
                                                <span>{filteredRecords.length}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Gross Payroll:</span>
                                                <span>{formatCurrency(totalGrossPay)}</span>
                                            </div>
                                            <div className="flex justify-between font-medium">
                                                <span>Net Payroll:</span>
                                                <span>{formatCurrency(totalNetPay)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsProcessDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button>Process All</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Overview Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Employees</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredRecords.length}</div>
                            <p className="text-xs text-muted-foreground">Active payroll</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Gross Pay</CardTitle>
                            <DollarSign className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(totalGrossPay)}</div>
                            <p className="text-xs text-muted-foreground">Monthly total</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Net Pay</CardTitle>
                            <CreditCard className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(totalNetPay)}</div>
                            <p className="text-xs text-muted-foreground">After deductions</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
                            <p className="text-xs text-muted-foreground">Awaiting approval</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Paid</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{paidCount}</div>
                            <p className="text-xs text-muted-foreground">Completed</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Payroll Management */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payroll Management</CardTitle>
                        <CardDescription>
                            Manage monthly payroll for January 2024
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search employees..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            
                            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                </SelectContent>
                            </Select>
                            
                            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Departments</SelectItem>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Payroll Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Basic Salary</TableHead>
                                        <TableHead>Allowances</TableHead>
                                        <TableHead>Deductions</TableHead>
                                        <TableHead>Net Pay</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="w-[100px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRecords.map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={record.employee.avatar} />
                                                        <AvatarFallback>
                                                            {record.employee.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{record.employee.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {record.employee.employeeId} • {record.employee.department}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">{formatCurrency(record.basicSalary)}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-green-600">{formatCurrency(record.allowances)}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-red-600">{formatCurrency(record.deductions)}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-bold text-green-600">{formatCurrency(record.netSalary)}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusColor(record.status)} className="gap-1">
                                                    {getStatusIcon(record.status)}
                                                    {record.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    {record.status === 'draft' && (
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline"
                                                            onClick={() => handleProcessPayroll(record.id)}
                                                        >
                                                            Process
                                                        </Button>
                                                    )}
                                                    {record.status === 'approved' && (
                                                        <Button 
                                                            size="sm"
                                                            onClick={() => handlePaySalary(record.id)}
                                                        >
                                                            Pay
                                                        </Button>
                                                    )}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>
                                                                <FileText className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Download className="mr-2 h-4 w-4" />
                                                                Download Payslip
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}