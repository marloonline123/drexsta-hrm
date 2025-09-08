import { Button } from '@/Components/Ui/button';
import { Input } from '@/Components/Ui/input';
import { Badge } from '@/Components/Ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/Ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/Ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/Ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/Ui/dialog';
import { Label } from '@/Components/Ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { useLanguage } from '@/Hooks/use-language';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Shield,
    ShieldCheck,
    ShieldAlert,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    User,
    Clock,
    MapPin,
    Phone,
    Mail,
    Calendar,
    Users,
    AlertTriangle,
    CheckCircle
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Administration',
        href: '/admin',
    },
    {
        title: 'Security Guards',
        href: '/admin/security',
    },
];

export default function SecurityPage() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [isAddGuardOpen, setIsAddGuardOpen] = useState(false);
    
    // Mock security guards data
    const securityGuards = [
        {
            id: 1,
            name: 'Michael Thompson',
            email: 'michael.thompson@company.com',
            phone: '+1 (555) 123-4567',
            badge: 'SEC-001',
            shift: 'Day Shift (6AM-6PM)',
            location: 'Main Building',
            status: 'on_duty',
            joinDate: '2023-01-15',
            lastCheckIn: '2024-01-27 06:00:00',
            avatar: null,
            certifications: ['Security License', 'First Aid', 'Fire Safety']
        },
        {
            id: 2,
            name: 'David Rodriguez',
            email: 'david.rodriguez@company.com',
            phone: '+1 (555) 987-6543',
            badge: 'SEC-002',
            shift: 'Night Shift (6PM-6AM)',
            location: 'Parking Garage',
            status: 'off_duty',
            joinDate: '2022-08-20',
            lastCheckIn: '2024-01-26 18:00:00',
            avatar: null,
            certifications: ['Security License', 'Armed Guard']
        },
        {
            id: 3,
            name: 'Lisa Chen',
            email: 'lisa.chen@company.com',
            phone: '+1 (555) 456-7890',
            badge: 'SEC-003',
            shift: 'Swing Shift (2PM-10PM)',
            location: 'Reception Area',
            status: 'on_break',
            joinDate: '2023-05-10',
            lastCheckIn: '2024-01-27 14:00:00',
            avatar: null,
            certifications: ['Security License', 'Customer Service']
        }
    ];

    const statusOptions = [
        { value: 'on_duty', label: 'On Duty', color: 'bg-green-100 text-green-800', icon: CheckCircle },
        { value: 'off_duty', label: 'Off Duty', color: 'bg-gray-100 text-gray-800', icon: User },
        { value: 'on_break', label: 'On Break', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
        { value: 'emergency', label: 'Emergency', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
    ];

    const getStatusBadge = (status: string) => {
        const statusConfig = statusOptions.find(s => s.value === status);
        const Icon = statusConfig?.icon || User;
        return (
            <Badge className={statusConfig?.color || 'bg-gray-100 text-gray-800'}>
                <Icon className="h-3 w-3 mr-1" />
                {statusConfig?.label || status}
            </Badge>
        );
    };

    const filteredGuards = securityGuards.filter(guard => {
        const matchesSearch = guard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            guard.badge.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            guard.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !filterStatus || guard.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Security Guards" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Shield className="h-8 w-8" />
                            Security Guards
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage security personnel and monitor their status and activities.
                        </p>
                    </div>
                    <Dialog open={isAddGuardOpen} onOpenChange={setIsAddGuardOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Security Guard
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Add New Security Guard</DialogTitle>
                                <DialogDescription>
                                    Register a new security guard in the system.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="guardName">Full Name</Label>
                                        <Input id="guardName" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="badgeNumber">Badge Number</Label>
                                        <Input id="badgeNumber" placeholder="SEC-004" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="john.doe@company.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" placeholder="+1 (555) 000-0000" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="shift">Shift</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select shift" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="day">Day Shift (6AM-6PM)</SelectItem>
                                                <SelectItem value="night">Night Shift (6PM-6AM)</SelectItem>
                                                <SelectItem value="swing">Swing Shift (2PM-10PM)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Location</Label>
                                        <Input id="location" placeholder="Main Building" />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button variant="outline" onClick={() => setIsAddGuardOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={() => setIsAddGuardOpen(false)}>
                                        Add Guard
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4" />
                                On Duty
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold text-green-600">
                                {securityGuards.filter(g => g.status === 'on_duty').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                On Break
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold text-yellow-600">
                                {securityGuards.filter(g => g.status === 'on_break').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Off Duty
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold text-gray-600">
                                {securityGuards.filter(g => g.status === 'off_duty').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Total Guards
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold">{securityGuards.length}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex-1 min-w-64">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search guards..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    {statusOptions.map((status) => (
                                        <SelectItem key={status.value} value={status.value}>
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Guards List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredGuards.map((guard) => (
                        <Card key={guard.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={guard.avatar || ""} alt={guard.name} />
                                            <AvatarFallback>
                                                {guard.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg">{guard.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground">{guard.badge}</p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
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
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Remove
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="flex items-center gap-2">
                                    {getStatusBadge(guard.status)}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{guard.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span>{guard.shift}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="truncate">{guard.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{guard.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>Joined {new Date(guard.joinDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredGuards.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No security guards found</h3>
                            <p className="text-muted-foreground">
                                {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first security guard.'}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}