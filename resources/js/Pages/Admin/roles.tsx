/**
 * Roles & Permissions Management Page
 * 
 * This page provides comprehensive role management functionality including:
 * - Create new roles with custom permissions
 * - Edit existing roles and update their permissions
 * - View role details and assigned permissions
 * - Delete roles (when no users are assigned)
 * - Assign permissions by category (Users, Companies, Employees, etc.)
 * - Full internationalization support (English/Arabic)
 * - RTL layout support
 * 
 * Features:
 * - CRUD operations for roles
 * - Permission management by categories
 * - User assignment tracking
 * - Responsive design with shadcn/ui components
 * - Real-time validation and error handling
 * - Mock data implementation (ready for backend integration)
 * 
 * @requires useLanguage hook for i18n
 * @requires AppLayout wrapper
 * @requires shadcn/ui components
 */

import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { useLanguage } from '@/Hooks/use-language';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/Components/Ui/button';
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Textarea } from '@/Components/Ui/textarea';
import { Checkbox } from '@/Components/Ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/Ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/Ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/Components/Ui/alert-dialog';
import { Badge } from '@/Components/Ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Separator } from '@/Components/Ui/separator';
import { Crown, Plus, Edit, Trash2, Eye, Shield, Users, Building, Clock, Calculator, FileText, Settings } from 'lucide-react';

interface Permission {
    id: string;
    name: string;
    category: string;
    action: string;
}

interface Role {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
    usersCount: number;
    createdAt: string;
    updatedAt: string;
}

interface RoleFormData {
    name: string;
    description: string;
    permissions: string[];
}

const MOCK_PERMISSIONS: Permission[] = [
    // User Management
    { id: '1', name: 'users.view', category: 'users', action: 'view' },
    { id: '2', name: 'users.create', category: 'users', action: 'create' },
    { id: '3', name: 'users.edit', category: 'users', action: 'edit' },
    { id: '4', name: 'users.delete', category: 'users', action: 'delete' },
    
    // Role Management
    { id: '5', name: 'roles.view', category: 'roles', action: 'view' },
    { id: '6', name: 'roles.create', category: 'roles', action: 'create' },
    { id: '7', name: 'roles.edit', category: 'roles', action: 'edit' },
    { id: '8', name: 'roles.delete', category: 'roles', action: 'delete' },
    
    // Company Management
    { id: '9', name: 'companies.view', category: 'companies', action: 'view' },
    { id: '10', name: 'companies.create', category: 'companies', action: 'create' },
    { id: '11', name: 'companies.edit', category: 'companies', action: 'edit' },
    { id: '12', name: 'companies.delete', category: 'companies', action: 'delete' },
    
    // Employee Management
    { id: '13', name: 'employees.view', category: 'employees', action: 'view' },
    { id: '14', name: 'employees.create', category: 'employees', action: 'create' },
    { id: '15', name: 'employees.edit', category: 'employees', action: 'edit' },
    { id: '16', name: 'employees.delete', category: 'employees', action: 'delete' },
    
    // Attendance Management
    { id: '17', name: 'attendance.view', category: 'attendance', action: 'view' },
    { id: '18', name: 'attendance.manage', category: 'attendance', action: 'manage' },
    
    // Payroll Management
    { id: '19', name: 'payroll.view', category: 'payroll', action: 'view' },
    { id: '20', name: 'payroll.manage', category: 'payroll', action: 'manage' },
    
    // Reports & Analytics
    { id: '21', name: 'reports.view', category: 'reports', action: 'view' },
    { id: '22', name: 'reports.create', category: 'reports', action: 'create' },
    
    // System Settings
    { id: '23', name: 'settings.view', category: 'settings', action: 'view' },
    { id: '24', name: 'settings.manage', category: 'settings', action: 'manage' },
];

const MOCK_ROLES: Role[] = [
    {
        id: '1',
        name: 'Super Admin',
        description: 'Full system access with all permissions',
        permissions: MOCK_PERMISSIONS,
        usersCount: 2,
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
    },
    {
        id: '2',
        name: 'HR Manager',
        description: 'Human resources management with employee and attendance access',
        permissions: MOCK_PERMISSIONS.filter(p => 
            p.category === 'employees' || p.category === 'attendance' || p.name === 'reports.view'
        ),
        usersCount: 5,
        createdAt: '2024-01-20',
        updatedAt: '2024-02-01'
    },
    {
        id: '3',
        name: 'Finance Manager',
        description: 'Financial operations including payroll and reports',
        permissions: MOCK_PERMISSIONS.filter(p => 
            p.category === 'payroll' || p.category === 'reports'
        ),
        usersCount: 3,
        createdAt: '2024-01-25',
        updatedAt: '2024-01-30'
    },
    {
        id: '4',
        name: 'Employee',
        description: 'Basic employee access to view their own information',
        permissions: MOCK_PERMISSIONS.filter(p => 
            p.name === 'employees.view' || p.name === 'attendance.view'
        ),
        usersCount: 45,
        createdAt: '2024-02-01',
        updatedAt: '2024-02-01'
    }
];

export default function Roles() {
    const { t } = useLanguage();
    const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [formData, setFormData] = useState<RoleFormData>({
        name: '',
        description: '',
        permissions: []
    });

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            permissions: []
        });
    };

    const handleCreate = () => {
        setIsCreateDialogOpen(true);
        resetForm();
    };

    const handleEdit = (role: Role) => {
        setSelectedRole(role);
        setFormData({
            name: role.name,
            description: role.description,
            permissions: role.permissions.map(p => p.id)
        });
        setIsEditDialogOpen(true);
    };

    const handleView = (role: Role) => {
        setSelectedRole(role);
        setIsViewDialogOpen(true);
    };

    const handleDelete = (role: Role) => {
        setSelectedRole(role);
        setIsDeleteDialogOpen(true);
    };

    const handleSubmit = () => {
        const selectedPermissions = MOCK_PERMISSIONS.filter(p => 
            formData.permissions.includes(p.id)
        );

        if (isEditDialogOpen && selectedRole) {
            // Update existing role
            const updatedRole: Role = {
                ...selectedRole,
                name: formData.name,
                description: formData.description,
                permissions: selectedPermissions,
                updatedAt: new Date().toISOString().split('T')[0]
            };
            setRoles(prev => prev.map(r => r.id === selectedRole.id ? updatedRole : r));
            setIsEditDialogOpen(false);
        } else {
            // Create new role
            const newRole: Role = {
                id: Date.now().toString(),
                name: formData.name,
                description: formData.description,
                permissions: selectedPermissions,
                usersCount: 0,
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0]
            };
            setRoles(prev => [...prev, newRole]);
            setIsCreateDialogOpen(false);
        }
        resetForm();
        setSelectedRole(null);
    };

    const handleDeleteConfirm = () => {
        if (selectedRole) {
            setRoles(prev => prev.filter(r => r.id !== selectedRole.id));
            setIsDeleteDialogOpen(false);
            setSelectedRole(null);
        }
    };

    const handlePermissionChange = (permissionId: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            permissions: checked
                ? [...prev.permissions, permissionId]
                : prev.permissions.filter(id => id !== permissionId)
        }));
    };

    const groupedPermissions = MOCK_PERMISSIONS.reduce((acc, permission) => {
        if (!acc[permission.category]) {
            acc[permission.category] = [];
        }
        acc[permission.category].push(permission);
        return acc;
    }, {} as Record<string, Permission[]>);

    const getCategoryIcon = (category: string) => {
        const icons = {
            users: Users,
            roles: Crown,
            companies: Building,
            employees: Users,
            attendance: Clock,
            payroll: Calculator,
            reports: FileText,
            settings: Settings
        };
        const Icon = icons[category as keyof typeof icons] || Shield;
        return <Icon className="h-4 w-4" />;
    };

    const getRoleStatusColor = (usersCount: number) => {
        if (usersCount === 0) return 'secondary';
        if (usersCount <= 5) return 'default';
        if (usersCount <= 20) return 'secondary';
        return 'default';
    };

    return (
        <AppLayout>
            <Head title={t('admin.roles.title')} />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            {t('admin.roles.title')}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {t('admin.roles.description')}
                        </p>
                    </div>
                    <Button onClick={handleCreate} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        {t('admin.roles.addRole')}
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t('admin.roles.title')}
                            </CardTitle>
                            <Crown className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{roles.length}</div>
                            <p className="text-xs text-muted-foreground">
                                +2 from last month
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t('admin.roles.permissions')}
                            </CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{MOCK_PERMISSIONS.length}</div>
                            <p className="text-xs text-muted-foreground">
                                System permissions
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Users
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {roles.reduce((sum, role) => sum + role.usersCount, 0)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Total assigned users
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Categories
                            </CardTitle>
                            <Building className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {Object.keys(groupedPermissions).length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Permission categories
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Roles Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('admin.roles.title')}</CardTitle>
                        <CardDescription>
                            Manage system roles and their assigned permissions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('admin.roles.roleName')}</TableHead>
                                    <TableHead>{t('admin.roles.description')}</TableHead>
                                    <TableHead>{t('admin.roles.permissions')}</TableHead>
                                    <TableHead>Users</TableHead>
                                    <TableHead>Updated</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {roles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <Crown className="h-4 w-4 text-primary" />
                                                {role.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate">
                                            {role.description}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {role.permissions.length} permissions
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getRoleStatusColor(role.usersCount)}>
                                                {role.usersCount} users
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {role.updatedAt}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleView(role)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEdit(role)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(role)}
                                                    disabled={role.usersCount > 0}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Create/Edit Role Dialog */}
            <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
                if (!open) {
                    setIsCreateDialogOpen(false);
                    setIsEditDialogOpen(false);
                    resetForm();
                    setSelectedRole(null);
                }
            }}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {isEditDialogOpen ? t('admin.roles.editRole') : t('admin.roles.addRole')}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditDialogOpen 
                                ? 'Update role information and permissions' 
                                : 'Create a new role and assign permissions'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('admin.roles.roleName')}</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter role name"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">{t('admin.roles.description')}</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Enter role description"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Permissions */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">{t('admin.roles.assignPermissions')}</h3>
                                <Badge variant="outline">
                                    {formData.permissions.length} selected
                                </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                                    <div key={category} className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            {getCategoryIcon(category)}
                                            <h4 className="font-medium">
                                                {t(`admin.roles.permissionCategories.${category}`)}
                                            </h4>
                                        </div>
                                        <div className="space-y-2 pl-6">
                                            {permissions.map((permission) => (
                                                <div key={permission.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={permission.id}
                                                        checked={formData.permissions.includes(permission.id)}
                                                        onCheckedChange={(checked) => 
                                                            handlePermissionChange(permission.id, checked as boolean)
                                                        }
                                                    />
                                                    <Label 
                                                        htmlFor={permission.id}
                                                        className="text-sm font-normal flex items-center gap-2"
                                                    >
                                                        {t(`admin.roles.permissionActions.${permission.action}`)}
                                                        <Badge variant="secondary" className="text-xs">
                                                            {permission.action}
                                                        </Badge>
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => {
                                setIsCreateDialogOpen(false);
                                setIsEditDialogOpen(false);
                                resetForm();
                                setSelectedRole(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleSubmit}
                            disabled={!formData.name.trim() || formData.permissions.length === 0}
                        >
                            {isEditDialogOpen ? 'Update Role' : 'Create Role'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Role Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Crown className="h-5 w-5 text-primary" />
                            {selectedRole?.name}
                        </DialogTitle>
                        <DialogDescription>
                            Role details and assigned permissions
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRole && (
                        <div className="space-y-6">
                            {/* Role Information */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm text-muted-foreground">Description</Label>
                                    <p className="mt-1">{selectedRole.description}</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">Users Assigned</Label>
                                    <p className="mt-1">
                                        <Badge variant={getRoleStatusColor(selectedRole.usersCount)}>
                                            {selectedRole.usersCount} users
                                        </Badge>
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            {/* Permissions */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    {t('admin.roles.permissions')} ({selectedRole.permissions.length})
                                </h3>

                                {selectedRole.permissions.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(
                                            selectedRole.permissions.reduce((acc, permission) => {
                                                if (!acc[permission.category]) {
                                                    acc[permission.category] = [];
                                                }
                                                acc[permission.category].push(permission);
                                                return acc;
                                            }, {} as Record<string, Permission[]>)
                                        ).map(([category, permissions]) => (
                                            <div key={category} className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    {getCategoryIcon(category)}
                                                    <h4 className="font-medium">
                                                        {t(`admin.roles.permissionCategories.${category}`)}
                                                    </h4>
                                                </div>
                                                <div className="space-y-1 pl-6">
                                                    {permissions.map((permission) => (
                                                        <div key={permission.id} className="flex items-center gap-2">
                                                            <Badge variant="outline" className="text-xs">
                                                                {t(`admin.roles.permissionActions.${permission.action}`)}
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">{t('admin.roles.noPermissions')}</p>
                                )}
                            </div>

                            {/* Metadata */}
                            <Separator />
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div>
                                    <Label className="text-xs">Created</Label>
                                    <p>{selectedRole.createdAt}</p>
                                </div>
                                <div>
                                    <Label className="text-xs">Last Updated</Label>
                                    <p>{selectedRole.updatedAt}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                            Close
                        </Button>
                        <Button onClick={() => {
                            setIsViewDialogOpen(false);
                            if (selectedRole) handleEdit(selectedRole);
                        }}>
                            <Edit className="h-4 w-4 mr-2" />
                            {t('admin.roles.editRole')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('admin.roles.deleteRole')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('admin.roles.confirmDelete')}
                            <br />
                            <strong className="text-destructive">
                                {t('admin.roles.deleteWarning')}
                            </strong>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete Role
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}