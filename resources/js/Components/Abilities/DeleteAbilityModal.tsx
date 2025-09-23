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
import { Ability } from '@/Types/abilities';
import { Button } from '@/Components/Ui/button';
import { Trash2, AlertTriangle } from 'lucide-react';

interface DeleteAbilityModalProps {
    ability: Ability;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteAbilityModal({ ability, open, onOpenChange }: DeleteAbilityModalProps) {
    const [processing, setProcessing] = React.useState(false);

    const handleDelete = () => {
        setProcessing(true);
        router.delete(route('dashboard.abilities.destroy', ability.id), {
            onSuccess: () => {
                onOpenChange(false);
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Delete Ability
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the ability <span className="font-semibold">{ability.label}</span>? 
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={processing}
                        className="flex items-center gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        {processing ? 'Deleting...' : 'Delete'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}