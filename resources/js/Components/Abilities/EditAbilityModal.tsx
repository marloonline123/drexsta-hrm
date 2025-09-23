import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/Ui/dialog';
import AbilityForm from './AbilityForm';
import { Ability, AbilityFormData } from '@/Types/abilities';

interface EditAbilityModalProps {
    ability: Ability;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function EditAbilityModal({ ability, open, onOpenChange }: EditAbilityModalProps) {
    const { data, setData, put, processing, errors, reset } = useForm<AbilityFormData>({
        key: ability.key,
        label: ability.label,
        description: ability.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('dashboard.abilities.update', ability.id), {
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
                    <DialogTitle>Edit Ability</DialogTitle>
                    <DialogDescription>
                        Update the ability details
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