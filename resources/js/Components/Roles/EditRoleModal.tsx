import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/Ui/dialog';
import RoleForm from './RoleForm';
import { Role } from '@/Types/roles';

interface EditRoleModalProps {
    role: Role;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    groupedPermissions: Record<string, string[]>;
}

export default function EditRoleModal({ role, open, onOpenChange, groupedPermissions }: EditRoleModalProps) {
    const { data, setData, put, processing, errors, reset } = useForm<{ name: string; permissions: string[] }>({
        name: role.name,
        permissions: role.permissions.map(p => p.id.toString())
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('dashboard.roles.update', role.id), {
            onSuccess: () => {
                onOpenChange(false);
            },
            preserveScroll: true,
        });
    };

    useEffect(() => {
        if (open) {
            setData({
                name: role.name,
                permissions: role.permissions.map(p => p.id.toString())
            });
        } else {
            reset();
        }
    }, [open, role, setData, reset]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Edit Role</DialogTitle>
                    <DialogDescription>
                        Update role information and permissions
                    </DialogDescription>
                </DialogHeader>

                <RoleForm
                    data={data}
                    setData={(key, value) => setData(key, value)}
                    errors={errors}
                    groupedPermissions={groupedPermissions}
                    processing={processing}
                    onSubmit={handleSubmit}
                    isEdit={true}
                />
            </DialogContent>
        </Dialog>
    );
}