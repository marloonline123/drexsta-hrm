import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/Ui/dialog';
import RoleForm from './RoleForm';
import { RoleFormData } from '@/Types/roles';

interface CreateRoleModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    groupedPermissions: Record<string, any[]>;
}

export default function CreateRoleModal({ open, onOpenChange, groupedPermissions }: CreateRoleModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Omit<RoleFormData, 'description'>>({
        name: '',
        permissions: []
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dashboard.roles.store'), {
            onSuccess: () => {
                onOpenChange(false);
                reset();
            }
        });
    };

    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Create Role</DialogTitle>
                    <DialogDescription>
                        Create a new role and assign permissions
                    </DialogDescription>
                </DialogHeader>

                <RoleForm
                    data={data}
                    setData={(key, value) => setData(key as any, value)}
                    errors={errors}
                    groupedPermissions={groupedPermissions}
                    processing={processing}
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    );
}