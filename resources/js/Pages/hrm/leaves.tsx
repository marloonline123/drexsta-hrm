import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Textarea } from '@/Components/Ui/textarea';
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
import { Calendar } from '@/Components/Ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/Ui/popover';
import { 
    Calendar as CalendarIcon, 
    Search, 
    MoreHorizontal, 
    Check, 
    X,
    Users, 
    Clock,
    CheckCircle,
    XCircle,
    Download,
    Plus,
    Plane,
    Heart
} from 'lucide-react';
import { useLanguage } from '@/Hooks/use-language';
import { cn } from '@/Lib/utils';
import { format } from 'date-fns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Leaves',
        href: '/hrm/leaves',
    },
];

interface LeaveApplication {
    id: number;
    employee: {
        id: number;
        name: string;
        avatar?: string;
        department: string;
        position: string;
        employeeId: string;
    };
    leaveType: 'annual' | 'sick' | 'maternity' | 'emergency' | 'unpaid';
    startDate: string;
    endDate: string;
    totalDays: number;
    reason: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    appliedDate: string;
}

// Mock data
const mockLeaveApplications: LeaveApplication[] = [
    {
        id: 1,
        employee: {
            id: 1, name: 'John Smith', department: 'Engineering',
            position: 'Senior Developer', employeeId: 'EMP001'
        },
        leaveType: 'annual', startDate: '2024-02-15', endDate: '2024-02-20',
        totalDays: 6, reason: 'Family vacation to Europe',
        status: 'approved', appliedDate: '2024-01-20'
    },
    {
        id: 2,
        employee: {
            id: 2, name: 'Sarah Johnson', department: 'Human Resources',
            position: 'HR Manager', employeeId: 'EMP002'
        },
        leaveType: 'sick', startDate: '2024-01-28', endDate: '2024-01-30',
        totalDays: 3, reason: 'Medical treatment and recovery',
        status: 'pending', appliedDate: '2024-01-27'
    },
    {
        id: 3,
        employee: {
            id: 3, name: 'Michael Chen', department: 'Engineering',
            position: 'Team Lead', employeeId: 'EMP003'
        },
        leaveType: 'emergency', startDate: '2024-01-29', endDate: '2024-01-29',
        totalDays: 1, reason: 'Family emergency',
        status: 'approved', appliedDate: '2024-01-29'
    },
    {
        id: 4,
        employee: {
            id: 4, name: 'Emily Rodriguez', department: 'Sales',
            position: 'Sales Manager', employeeId: 'EMP004'
        },
        leaveType: 'annual', startDate: '2024-03-01', endDate: '2024-03-05',
        totalDays: 5, reason: 'Spring break vacation',
        status: 'rejected', appliedDate: '2024-01-25'
    }
];

export default function Leaves() {
    const { t } = useLanguage();
    const [leaveApplications, setLeaveApplications] = useState<LeaveApplication[]>(mockLeaveApplications);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'cancelled'>('all');
    const [typeFilter, setTypeFilter] = useState<'all' | 'annual' | 'sick' | 'maternity' | 'emergency' | 'unpaid'>('all');
    const [isNewLeaveDialogOpen, setIsNewLeaveDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '', leaveType: '', startDate: undefined as Date | undefined,
        endDate: undefined as Date | undefined, reason: ''
    });

    // Filter leave applications
    const filteredApplications = leaveApplications.filter(app => {
        const matchesSearch = app.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            app.employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        const matchesType = typeFilter === 'all' || app.leaveType === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    // Calculate summary statistics
    const totalApplications = leaveApplications.length;
    const pendingCount = leaveApplications.filter(app => app.status === 'pending').length;
    const approvedCount = leaveApplications.filter(app => app.status === 'approved').length;
    const rejectedCount = leaveApplications.filter(app => app.status === 'rejected').length;

    const handleApproveLeave = (id: number) => {
        const updatedApplications = leaveApplications.map(app =>
            app.id === id ? { ...app, status: 'approved' as const } : app
        );
        setLeaveApplications(updatedApplications);
    };

    const handleRejectLeave = (id: number) => {
        const updatedApplications = leaveApplications.map(app =>
            app.id === id ? { ...app, status: 'rejected' as const } : app
        );
        setLeaveApplications(updatedApplications);
    };

    const handleSubmitLeave = () => {
        if (!formData.employeeId || !formData.leaveType || !formData.startDate || !formData.endDate) return;

        const startDate = formData.startDate;
        const endDate = formData.endDate;
        const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        const newApplication: LeaveApplication = {
            id: Math.max(...leaveApplications.map(app => app.id)) + 1,
            employee: {
                id: parseInt(formData.employeeId), name: 'New Employee',
                department: 'Department', position: 'Position',
                employeeId: `EMP${formData.employeeId.padStart(3, '0')}`
            },
            leaveType: formData.leaveType as any,
            startDate: format(startDate, 'yyyy-MM-dd'),
            endDate: format(endDate, 'yyyy-MM-dd'),
            totalDays: totalDays, reason: formData.reason,
            status: 'pending', appliedDate: format(new Date(), 'yyyy-MM-dd')
        };

        setLeaveApplications([...leaveApplications, newApplication]);
        setFormData({ employeeId: '', leaveType: '', startDate: undefined, endDate: undefined, reason: '' });
        setIsNewLeaveDialogOpen(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'default';
            case 'pending': return 'secondary';
            case 'rejected': return 'destructive';
            default: return 'secondary';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved': return <CheckCircle className="h-4 w-4" />;
            case 'pending': return <Clock className="h-4 w-4" />;
            case 'rejected': return <XCircle className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    const getLeaveTypeIcon = (type: string) => {
        switch (type) {
            case 'annual': return <Plane className="h-4 w-4" />;
            case 'sick': return <Heart className="h-4 w-4" />;
            default: return <CalendarIcon className="h-4 w-4" />;
        }
    };

    const getLeaveTypeColor = (type: string) => {
        switch (type) {
            case 'annual': return 'bg-blue-100 text-blue-800';
            case 'sick': return 'bg-red-100 text-red-800';
            case 'maternity': return 'bg-purple-100 text-purple-800';
            case 'emergency': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leaves - HRM" />
            
            <div className="flex-1 space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('leaves')}</h1>
                        <p className="text-muted-foreground">
                            Manage employee leave applications and approval workflows
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Dialog open={isNewLeaveDialogOpen} onOpenChange={setIsNewLeaveDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Leave
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Apply for Leave</DialogTitle>
                                    <DialogDescription>Submit a new leave application for approval.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Employee ID</Label>
                                            <Input
                                                value={formData.employeeId}
                                                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                                placeholder="Enter employee ID"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Leave Type</Label>
                                            <Select value={formData.leaveType} onValueChange={(value) => setFormData({ ...formData, leaveType: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="annual">Annual Leave</SelectItem>
                                                    <SelectItem value="sick">Sick Leave</SelectItem>
                                                    <SelectItem value="maternity">Maternity Leave</SelectItem>
                                                    <SelectItem value="emergency">Emergency Leave</SelectItem>
                                                    <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Start Date</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {formData.startDate ? format(formData.startDate, 'PPP') : 'Select date'}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={formData.startDate}
                                                        onSelect={(date) => setFormData({ ...formData, startDate: date })}
                                                        disabled={(date) => date < new Date()}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>End Date</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {formData.endDate ? format(formData.endDate, 'PPP') : 'Select date'}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={formData.endDate}
                                                        onSelect={(date) => setFormData({ ...formData, endDate: date })}
                                                        disabled={(date) => date < (formData.startDate || new Date())}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label>Reason</Label>
                                        <Textarea
                                            value={formData.reason}
                                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                            placeholder="Enter reason for leave"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsNewLeaveDialogOpen(false)}>Cancel</Button>
                                    <Button onClick={handleSubmitLeave}>Submit Application</Button>
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
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalApplications}</div>
                            <p className="text-xs text-muted-foreground">This month</p>
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
                            <CardTitle className="text-sm font-medium">Approved</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
                            <p className="text-xs text-muted-foreground">
                                {Math.round((approvedCount / totalApplications) * 100)}% approval rate
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                            <XCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
                            <p className="text-xs text-muted-foreground">Not approved</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Leave Applications */}
                <Card>
                    <CardHeader>
                        <CardTitle>Leave Applications</CardTitle>
                        <CardDescription>View and manage all employee leave applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search applications..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            
                            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                            
                            <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="annual">Annual</SelectItem>
                                    <SelectItem value="sick">Sick</SelectItem>
                                    <SelectItem value="maternity">Maternity</SelectItem>
                                    <SelectItem value="emergency">Emergency</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Applications Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Leave Type</TableHead>
                                        <TableHead>Dates</TableHead>
                                        <TableHead>Days</TableHead>
                                        <TableHead>Reason</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="w-[120px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredApplications.map((application) => (
                                        <TableRow key={application.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={application.employee.avatar} />
                                                        <AvatarFallback>
                                                            {application.employee.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{application.employee.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {application.employee.department}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cn(
                                                    "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                                                    getLeaveTypeColor(application.leaveType)
                                                )}>
                                                    {getLeaveTypeIcon(application.leaveType)}
                                                    {application.leaveType}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div>{format(new Date(application.startDate), 'MMM dd')}</div>
                                                    <div className="text-muted-foreground">
                                                        {format(new Date(application.endDate), 'MMM dd, yyyy')}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">{application.totalDays}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm line-clamp-2">{application.reason}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusColor(application.status)} className="gap-1">
                                                    {getStatusIcon(application.status)}
                                                    {application.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    {application.status === 'pending' && (
                                                        <>
                                                            <Button
                                                                size="sm" variant="outline"
                                                                onClick={() => handleApproveLeave(application.id)}
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <Check className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm" variant="outline"
                                                                onClick={() => handleRejectLeave(application.id)}
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </>
                                                    )}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                                            <DropdownMenuItem>Add Comment</DropdownMenuItem>
                                                            <DropdownMenuItem>Export</DropdownMenuItem>
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