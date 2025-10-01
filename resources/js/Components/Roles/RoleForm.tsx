import React from 'react';
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Checkbox } from '@/Components/Ui/checkbox';
import { Badge } from '@/Components/Ui/badge';
import { Separator } from '@/Components/Ui/separator';
import { GroupedPermission } from '@/Types/roles';
import { useLanguage } from '@/Hooks/use-language';
import { Button } from '@/Components/Ui/button';
import InputError from '@/Components/input-error';
import { getPermissionCategoryIcon } from '@/Lib/permissions';

interface RoleFormProps {
    data: {
        name: string;
        permissions: string[];
    };
    setData: (key: string, value: string | string[]) => void;
    errors: Record<string, string>;
    groupedPermissions: Record<string, GroupedPermission[]>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    isEdit?: boolean;
}


export default function RoleForm({
    data,
    setData,
    errors,
    groupedPermissions,
    processing,
    onSubmit,
    isEdit = false,
}: RoleFormProps) {
    const { t } = useLanguage();

    const handlePermissionChange = (permissionId: string, checked: boolean) => {
        if (checked) {
            setData('permissions', [...data.permissions, permissionId]);
        } else {
            setData('permissions', data.permissions.filter(id => id !== permissionId));
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-2">
                    <Label htmlFor="name">
                        {t('admin.roles.roleName')} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="name"
                        placeholder="Enter role name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={errors.name ? 'border-red-500' : ''}
                    />
                    <InputError message={errors.name} />
                </div>

                <Separator />

                {/* Permissions */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{t('admin.roles.assignPermissions')}</h3>
                        <Badge variant="outline">
                            {data.permissions.length} selected
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(groupedPermissions).map(([category, permissions]) => (
                            <div key={category} className="space-y-3">
                                <div className="flex items-center gap-2">
                                    {getPermissionCategoryIcon(category)}
                                    <h4 className="font-medium">
                                        {t(`admin.roles.permissionCategories.${category}`) || category}
                                    </h4>
                                </div>
                                <div className="space-y-2 pl-6">
                                    {permissions.map((permission) => (
                                        <div key={permission.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`permission-${permission.id}`}
                                                checked={data.permissions.includes(permission.id.toString())}
                                                onCheckedChange={(checked) => 
                                                    handlePermissionChange(permission.id.toString(), checked as boolean)
                                                }
                                            />
                                            <Label 
                                                htmlFor={`permission-${permission.id}`}
                                                className="text-sm font-normal flex items-center gap-2"
                                            >
                                                {t(`admin.roles.permissionActions.${permission.action}`)}
                                                {/* <Badge variant="secondary" className="text-xs">
                                                    {permission.action}
                                                </Badge> */}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        {t('common.cancel')}
                    </Button>
                    <Button 
                        type="submit"
                        disabled={processing || !data.name.trim()}
                    >
                        {processing ? 'Saving...' : (isEdit ? 'Update Role' : 'Create Role')}
                    </Button>
                </div>
            </div>
        </form>
    );
}