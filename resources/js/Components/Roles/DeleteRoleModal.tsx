import React from 'react';
import { router } from '@inertiajs/react';
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
import { Role } from '@/Types/roles';

interface DeleteRoleModalProps {
    role: Role;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteRoleModal({ role, open, onOpenChange }: DeleteRoleModalProps) {
    const handleDelete = () => {
        router.delete(route('dashboard.roles.destroy', role.id), {
            onSuccess: () => {
                onOpenChange(false);
            }
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Role</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the role "{role.name}"?
                        <br />
                        <strong className="text-destructive">
                            This action cannot be undone and will permanently delete this role.
                        </strong>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Delete Role
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}