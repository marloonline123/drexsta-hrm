import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
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
    DropdownMenuSeparator,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/Ui/tabs';
import { Calendar } from '@/Components/Ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/Ui/popover';
import { 
    Clock, 
    Search, 
    MoreHorizontal, 
    Edit, 
    Calendar as CalendarIcon, 
    Users, 
    Timer, 
    Coffee,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Download,
    Plus
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
        title: 'Attendance',
        href: '/hrm/attendance',
    },
];

interface AttendanceRecord {
    id: number;
    employee: {
        id: number;
        name: string;
        avatar?: string;
        department: string;
        position: string;
    };
    date: string;
    clockIn: string | null;
    clockOut: string | null;
    breakDuration: number; // in minutes
    totalHours: number;
    status: 'present' | 'absent' | 'late' | 'half-day' | 'leave';
    notes?: string;
}

interface Employee {
    id: number;
    name: string;
    avatar?: string;
    department: string;
    position: string;
}

// Mock data for attendance records
const mockAttendanceRecords: AttendanceRecord[] = [
    {
        id: 1,
        employee: {
            id: 1,
            name: 'John Smith',
            department: 'Engineering',
            position: 'Senior Developer'
        },
        date: '2024-01-26',
        clockIn: '09:00',
        clockOut: '17:30',
        breakDuration: 60,
        totalHours: 7.5,
        status: 'present'
    },
    {
        id: 2,
        employee: {
            id: 2,
            name: 'Sarah Johnson',
            department: 'Human Resources',
            position: 'HR Manager'
        },
        date: '2024-01-26',
        clockIn: '09:15',
        clockOut: '17:00',
        breakDuration: 45,
        totalHours: 7.0,
        status: 'late',
        notes: '15 minutes late due to traffic'
    },
    {
        id: 3,
        employee: {
            id: 3,
            name: 'Michael Chen',
            department: 'Engineering',
            position: 'Team Lead'
        },
        date: '2024-01-26',
        clockIn: '08:45',
        clockOut: '18:00',
        breakDuration: 60,
        totalHours: 8.25,
        status: 'present'
    },
    {
        id: 4,
        employee: {
            id: 4,
            name: 'Emily Rodriguez',
            department: 'Sales',
            position: 'Sales Manager'
        },
        date: '2024-01-26',
        clockIn: null,
        clockOut: null,
        breakDuration: 0,
        totalHours: 0,
        status: 'leave',
        notes: 'Approved sick leave'
    },
    {
        id: 5,
        employee: {
            id: 5,
            name: 'David Kim',
            department: 'Finance',
            position: 'Financial Analyst'
        },
        date: '2024-01-26',
        clockIn: '09:30',
        clockOut: '13:30',
        breakDuration: 30,
        totalHours: 3.5,
        status: 'half-day',
        notes: 'Medical appointment'
    }
];

// Mock employees for clock in/out
const mockEmployees: Employee[] = [
    { id: 1, name: 'John Smith', department: 'Engineering', position: 'Senior Developer' },
    { id: 2, name: 'Sarah Johnson', department: 'Human Resources', position: 'HR Manager' },
    { id: 3, name: 'Michael Chen', department: 'Engineering', position: 'Team Lead' },
    { id: 4, name: 'Emily Rodriguez', department: 'Sales', position: 'Sales Manager' },
    { id: 5, name: 'David Kim', department: 'Finance', position: 'Financial Analyst' },
    { id: 6, name: 'Jessica Wang', department: 'Operations', position: 'Operations Manager' }
];

export default function Attendance() {
    const { t } = useLanguage();
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'present' | 'absent' | 'late' | 'half-day' | 'leave'>('all');
    const [departmentFilter, setDepartmentFilter] = useState<string>('all');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isClockInDialogOpen, setIsClockInDialogOpen] = useState(false);
    const [isManualEntryDialogOpen, setIsManualEntryDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<string>('');

    // Get unique departments
    const departments = Array.from(new Set(mockEmployees.map(emp => emp.department)));

    // Filter attendance records
    const filteredRecords = attendanceRecords.filter(record => {
        const matchesSearch = record.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            record.employee.department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
        const matchesDepartment = departmentFilter === 'all' || record.employee.department === departmentFilter;
        const matchesDate = record.date === format(selectedDate, 'yyyy-MM-dd');
        return matchesSearch && matchesStatus && matchesDepartment && matchesDate;
    });

    // Calculate summary statistics
    const totalEmployees = mockEmployees.length;
    const presentCount = filteredRecords.filter(r => r.status === 'present' || r.status === 'late').length;
    const absentCount = filteredRecords.filter(r => r.status === 'absent').length;
    const lateCount = filteredRecords.filter(r => r.status === 'late').length;
    const onLeaveCount = filteredRecords.filter(r => r.status === 'leave').length;
    const averageHours = filteredRecords.length > 0 
        ? filteredRecords.reduce((sum, record) => sum + record.totalHours, 0) / filteredRecords.length
        : 0;

    const handleClockIn = () => {
        const employee = mockEmployees.find(emp => emp.id === parseInt(selectedEmployee));
        if (!employee) return;

        const currentTime = format(new Date(), 'HH:mm');
        const today = format(new Date(), 'yyyy-MM-dd');
        
        // Check if employee already has a record for today
        const existingRecord = attendanceRecords.find(
            record => record.employee.id === employee.id && record.date === today
        );

        if (existingRecord) {
            // Update existing record with clock-in time
            const updatedRecords = attendanceRecords.map(record =>
                record.id === existingRecord.id
                    ? { ...record, clockIn: currentTime, status: 'present' as const }
                    : record
            );
            setAttendanceRecords(updatedRecords);
        } else {
            // Create new attendance record
            const newRecord: AttendanceRecord = {
                id: Math.max(...attendanceRecords.map(r => r.id)) + 1,
                employee: employee,
                date: today,
                clockIn: currentTime,
                clockOut: null,
                breakDuration: 0,
                totalHours: 0,
                status: 'present'
            };
            setAttendanceRecords([...attendanceRecords, newRecord]);
        }

        setSelectedEmployee('');
        setIsClockInDialogOpen(false);
    };

    const handleClockOut = (recordId: number) => {
        const currentTime = format(new Date(), 'HH:mm');
        
        const updatedRecords = attendanceRecords.map(record => {
            if (record.id === recordId && record.clockIn) {
                const clockInTime = new Date(`2024-01-01 ${record.clockIn}`);
                const clockOutTime = new Date(`2024-01-01 ${currentTime}`);
                const diffMs = clockOutTime.getTime() - clockInTime.getTime();
                const totalHours = (diffMs / (1000 * 60 * 60)) - (record.breakDuration / 60);
                
                return {
                    ...record,
                    clockOut: currentTime,
                    totalHours: Math.max(0, totalHours)
                };
            }
            return record;
        });

        setAttendanceRecords(updatedRecords);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'present': return 'default';
            case 'late': return 'secondary';
            case 'absent': return 'destructive';
            case 'half-day': return 'outline';
            case 'leave': return 'secondary';
            default: return 'default';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'present': return <CheckCircle className="h-4 w-4" />;
            case 'late': return <AlertTriangle className="h-4 w-4" />;
            case 'absent': return <XCircle className="h-4 w-4" />;
            case 'half-day': return <Coffee className="h-4 w-4" />;
            case 'leave': return <Calendar className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Attendance - HRM" />
            
            <div className="flex-1 space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('attendance')}</h1>
                        <p className="text-muted-foreground">
                            Track employee attendance, working hours, and time management
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Dialog open={isClockInDialogOpen} onOpenChange={setIsClockInDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Clock className="mr-2 h-4 w-4" />
                                    Clock In/Out
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Employee Clock In</DialogTitle>
                                    <DialogDescription>
                                        Select an employee to clock in for today.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="employee">Select Employee</Label>
                                        <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose an employee" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mockEmployees.map((employee) => (
                                                    <SelectItem key={employee.id} value={employee.id.toString()}>
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="h-6 w-6">
                                                                <AvatarImage src={employee.avatar} />
                                                                <AvatarFallback>
                                                                    {employee.name.split(' ').map(n => n[0]).join('')}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <div className="font-medium">{employee.name}</div>
                                                                <div className="text-sm text-muted-foreground">
                                                                    {employee.department} • {employee.position}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsClockInDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleClockIn} disabled={!selectedEmployee}>
                                        Clock In
                                    </Button>
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
                            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{presentCount}</div>
                            <p className="text-xs text-muted-foreground">
                                {Math.round((presentCount / totalEmployees) * 100)}% attendance
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{lateCount}</div>
                            <p className="text-xs text-muted-foreground">
                                {Math.round((lateCount / totalEmployees) * 100)}% late
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
                            <Calendar className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{onLeaveCount}</div>
                            <p className="text-xs text-muted-foreground">
                                Approved leaves
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Absent</CardTitle>
                            <XCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{absentCount}</div>
                            <p className="text-xs text-muted-foreground">
                                Unauthorized absence
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Hours</CardTitle>
                            <Timer className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{averageHours.toFixed(1)}h</div>
                            <p className="text-xs text-muted-foreground">
                                Daily average
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <Tabs defaultValue="daily" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="daily">Daily View</TabsTrigger>
                        <TabsTrigger value="weekly">Weekly Report</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly Report</TabsTrigger>
                    </TabsList>

                    <TabsContent value="daily">
                        <Card>
                            <CardHeader>
                                <CardTitle>Daily Attendance</CardTitle>
                                <CardDescription>
                                    View and manage attendance for {format(selectedDate, 'MMMM dd, yyyy')}
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
                                    
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-[240px] pl-3 text-left font-normal">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {format(selectedDate, 'PPP')}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={(date) => date && setSelectedDate(date)}
                                                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    
                                    <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="present">Present</SelectItem>
                                            <SelectItem value="late">Late</SelectItem>
                                            <SelectItem value="absent">Absent</SelectItem>
                                            <SelectItem value="half-day">Half Day</SelectItem>
                                            <SelectItem value="leave">On Leave</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    
                                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filter by department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Departments</SelectItem>
                                            {departments.map((dept) => (
                                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Attendance Table */}
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Employee</TableHead>
                                                <TableHead>Department</TableHead>
                                                <TableHead>Clock In</TableHead>
                                                <TableHead>Clock Out</TableHead>
                                                <TableHead>Break</TableHead>
                                                <TableHead>Total Hours</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Notes</TableHead>
                                                <TableHead className="w-[70px]">Actions</TableHead>
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
                                                                    {record.employee.position}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{record.employee.department}</TableCell>
                                                    <TableCell>
                                                        {record.clockIn ? (
                                                            <span className="font-mono">{record.clockIn}</span>
                                                        ) : (
                                                            <span className="text-muted-foreground">--:--</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {record.clockOut ? (
                                                            <span className="font-mono">{record.clockOut}</span>
                                                        ) : record.clockIn ? (
                                                            <Button 
                                                                size="sm" 
                                                                variant="outline"
                                                                onClick={() => handleClockOut(record.id)}
                                                            >
                                                                Clock Out
                                                            </Button>
                                                        ) : (
                                                            <span className="text-muted-foreground">--:--</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {record.breakDuration > 0 ? `${record.breakDuration}m` : '--'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="font-medium">{record.totalHours.toFixed(1)}h</span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={getStatusColor(record.status)} className="gap-1">
                                                            {getStatusIcon(record.status)}
                                                            {record.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-sm text-muted-foreground">
                                                            {record.notes || '--'}
                                                        </span>
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
                                                                <DropdownMenuItem>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit Record
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>
                                                                    Add Break
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    Add Note
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
                    </TabsContent>

                    <TabsContent value="weekly">
                        <Card>
                            <CardHeader>
                                <CardTitle>Weekly Attendance Report</CardTitle>
                                <CardDescription>
                                    Comprehensive weekly attendance analysis and trends
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 text-muted-foreground">
                                    Weekly report features coming soon...
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="monthly">
                        <Card>
                            <CardHeader>
                                <CardTitle>Monthly Attendance Report</CardTitle>
                                <CardDescription>
                                    Monthly attendance patterns and employee performance metrics
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 text-muted-foreground">
                                    Monthly report features coming soon...
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}