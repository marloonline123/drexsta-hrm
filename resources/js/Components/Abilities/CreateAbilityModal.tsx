import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/Ui/dialog';
import { AbilityFormData } from '@/Types/abilities';
import AbilityForm from './AbilityForm';

interface CreateAbilityModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateAbilityModal({ open, onOpenChange }: CreateAbilityModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm<AbilityFormData>({
        key: '',
        label: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dashboard.abilities.store'), {
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
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Create Ability</DialogTitle>
                    <DialogDescription>
                        Create a new ability for users in your organization
                    </DialogDescription>
                </DialogHeader>

                <AbilityForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    );
}