import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    UserCheck,
    Shield,
    Crown,
    Settings,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Mail,
    Phone,
    Calendar,
    Users,
    Lock,
    Unlock,
    AlertTriangle,
    CheckCircle,
    Clock
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
        title: 'Admin Management',
        href: '/admin/users',
    },
];

export default function AdminUsersPage() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
    
    // Mock admin users data
    const adminUsers = [
        {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@company.com',
            phone: '+1 (555) 123-4567',
            role: 'super_admin',
            status: 'active',
            lastLogin: '2024-01-27 08:30:00',
            joinDate: '2022-01-15',
            avatar: null,
            permissions: ['all'],
            twoFactorEnabled: true
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@company.com',
            phone: '+1 (555) 987-6543',
            role: 'hr_admin',
            status: 'active',
            lastLogin: '2024-01-26 16:45:00',
            joinDate: '2022-08-20',
            avatar: null,
            permissions: ['employees', 'leaves', 'attendance'],
            twoFactorEnabled: false
        },
        {
            id: 3,
            name: 'Mike Wilson',
            email: 'mike.wilson@company.com',
            phone: '+1 (555) 456-7890',
            role: 'finance_admin',
            status: 'active',
            lastLogin: '2024-01-25 10:15:00',
            joinDate: '2023-03-10',
            avatar: null,
            permissions: ['payroll', 'reports'],
            twoFactorEnabled: true
        },
        {
            id: 4,
            name: 'Emily Davis',
            email: 'emily.davis@company.com',
            phone: '+1 (555) 321-0987',
            role: 'it_admin',
            status: 'inactive',
            lastLogin: '2024-01-20 14:20:00',
            joinDate: '2023-06-01',
            avatar: null,
            permissions: ['system_settings', 'security'],
            twoFactorEnabled: true
        }
    ];

    const roleOptions = [
        { value: 'super_admin', label: 'Super Admin', color: 'bg-purple-100 text-purple-800', icon: Crown },
        { value: 'hr_admin', label: 'HR Admin', color: 'bg-blue-100 text-blue-800', icon: Users },
        { value: 'finance_admin', label: 'Finance Admin', color: 'bg-green-100 text-green-800', icon: Settings },
        { value: 'it_admin', label: 'IT Admin', color: 'bg-orange-100 text-orange-800', icon: Shield }
    ];

    const statusOptions = [
        { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
        { value: 'inactive', label: 'Inactive', color: 'bg-red-100 text-red-800' },
        { value: 'suspended', label: 'Suspended', color: 'bg-yellow-100 text-yellow-800' }
    ];

    const getRoleBadge = (role: string) => {
        const roleConfig = roleOptions.find(r => r.value === role);
        const Icon = roleConfig?.icon || Shield;
        return (
            <Badge className={roleConfig?.color || 'bg-gray-100 text-gray-800'}>
                <Icon className="h-3 w-3 mr-1" />
                {roleConfig?.label || role}
            </Badge>
        );
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = statusOptions.find(s => s.value === status);
        return (
            <Badge className={statusConfig?.color || 'bg-gray-100 text-gray-800'}>
                {statusConfig?.label || status}
            </Badge>
        );
    };

    const filteredUsers = adminUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = !filterRole || user.role === filterRole;
        const matchesStatus = !filterStatus || user.status === filterStatus;
        return matchesSearch && matchesRole && matchesStatus;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Management" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <UserCheck className="h-8 w-8" />
                            Admin Management
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage system administrators and their access permissions.
                        </p>
                    </div>
                    <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Admin User
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Add New Admin User</DialogTitle>
                                <DialogDescription>
                                    Create a new administrator account with specific permissions.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="adminName">Full Name</Label>
                                        <Input id="adminName" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="adminEmail">Email</Label>
                                        <Input id="adminEmail" type="email" placeholder="john.doe@company.com" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="adminPhone">Phone</Label>
                                        <Input id="adminPhone" placeholder="+1 (555) 000-0000" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="adminRole">Role</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roleOptions.map((role) => (
                                                    <SelectItem key={role.value} value={role.value}>
                                                        {role.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="twoFactor" />
                                    <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button variant="outline" onClick={() => setIsAddAdminOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={() => setIsAddAdminOpen(false)}>
                                        Create Admin
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
                                <UserCheck className="h-4 w-4" />
                                Total Admins
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold">{adminUsers.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Active
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold text-green-600">
                                {adminUsers.filter(u => u.status === 'active').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                2FA Enabled
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold text-blue-600">
                                {adminUsers.filter(u => u.twoFactorEnabled).length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Crown className="h-4 w-4" />
                                Super Admins
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold text-purple-600">
                                {adminUsers.filter(u => u.role === 'super_admin').length}
                            </div>
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
                                        placeholder="Search admin users..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={filterRole} onValueChange={setFilterRole}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Roles" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    {roleOptions.map((role) => (
                                        <SelectItem key={role.value} value={role.value}>
                                            {role.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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

                {/* Users List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredUsers.map((user) => (
                        <Card key={user.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={user.avatar || ""} alt={user.name} />
                                            <AvatarFallback>
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg">{user.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
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
                                                View Profile
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Edit className="h-4 w-4 mr-2" />
                                                Edit Permissions
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                {user.status === 'active' ? (
                                                    <>
                                                        <Lock className="h-4 w-4 mr-2" />
                                                        Suspend
                                                    </>
                                                ) : (
                                                    <>
                                                        <Unlock className="h-4 w-4 mr-2" />
                                                        Activate
                                                    </>
                                                )}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Remove
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {getRoleBadge(user.role)}
                                    {getStatusBadge(user.status)}
                                    {user.twoFactorEnabled && (
                                        <Badge className="bg-blue-100 text-blue-800">
                                            <Shield className="h-3 w-3 mr-1" />
                                            2FA
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{user.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>Last login {new Date(user.lastLogin).toLocaleString()}</span>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-xs text-muted-foreground mb-2">Permissions:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {user.permissions.map((permission) => (
                                                <Badge key={permission} variant="outline" className="text-xs">
                                                    {permission === 'all' ? 'All Permissions' : permission.replace('_', ' ')}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredUsers.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No admin users found</h3>
                            <p className="text-muted-foreground">
                                {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first admin user.'}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}