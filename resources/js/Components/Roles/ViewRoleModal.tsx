import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/Ui/dialog';
import { Button } from '@/Components/Ui/button';
import { Badge } from '@/Components/Ui/badge';
import { Separator } from '@/Components/Ui/separator';
import { Crown, Shield } from 'lucide-react';
import { Role } from '@/Types/roles';
import { getPermissionCategoryIcon } from '@/Lib/permissions';
import { Permission } from '@/Types/permissions';

interface ViewRoleModalProps {
    role: Role;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ViewRoleModal({ role, open, onOpenChange }: ViewRoleModalProps) {
    const getRoleStatusColor = (usersCount: number) => {
        if (usersCount === 0) return 'secondary';
        if (usersCount <= 5) return 'default';
        if (usersCount <= 20) return 'secondary';
        return 'default';
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-primary" />
                        {role.name}
                    </DialogTitle>
                    <DialogDescription>
                        Role details and assigned permissions
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Role Information */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-muted-foreground">Users Assigned</label>
                            <p className="mt-1">
                                <Badge variant={getRoleStatusColor(role.users_count)}>
                                    {role.users_count} users
                                </Badge>
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Permissions */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Permissions ({role.permissions.length})
                        </h3>

                        {role.permissions.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(
                                    role.permissions.reduce((acc, permission) => {
                                        // Extract category from permission name (e.g., users.view -> users)
                                        const category = permission.name.split('.')[0] || 'general';
                                        if (!acc[category]) {
                                            acc[category] = [];
                                        }
                                        acc[category].push(permission);
                                        return acc;
                                    }, {} as Record<string, Permission[]>)
                                ).map(([category, permissions]) => (
                                    <div key={category} className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            {getPermissionCategoryIcon(category)}
                                            <h4 className="font-medium">
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </h4>
                                        </div>
                                        <div className="space-y-1 pl-6">
                                            {permissions.map((permission) => (
                                                <div key={permission.id} className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {permission.name.split('.')[1] || permission.name}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No permissions assigned to this role</p>
                        )}
                    </div>

                    {/* Metadata */}
                    <Separator />
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                            <label className="text-xs">Created</label>
                            <p>{role.created_at}</p>
                        </div>
                        <div>
                            <label className="text-xs">Last Updated</label>
                            <p>{role.updated_at}</p>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}