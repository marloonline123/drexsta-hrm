import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { DeleteModal } from '@/Components/Shared/DeleteModal';
import { PaymentMethod } from '@/Types/payment-methods';
import { t } from 'i18next';

interface PaymentMethodDeleteModalProps {
    paymentMethod: PaymentMethod;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function PaymentMethodDeleteModal({
    paymentMethod,
    open,
    onOpenChange,
}: PaymentMethodDeleteModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await router.delete(route('dashboard.payment-methods.destroy', paymentMethod.id), {
                onSuccess: () => {
                    onOpenChange(false);
                },
                onFinish: () => {
                    setIsDeleting(false);
                }
            });
        } catch (error) {
            console.error('Failed to delete payment method:', error);
            setIsDeleting(false);
        }
    };

    return (
        <DeleteModal
            open={open}
            onOpenChange={onOpenChange}
            onConfirm={handleDelete}
            loading={isDeleting}
            title={t('paymentMethods.deleteTitle', 'Delete Payment Method')}
            description={t('paymentMethods.deleteDescription', 'Are you sure you want to delete this payment method? This action cannot be undone.')}
            actionButtonText={t('paymentMethods.deleteButton', 'Delete Payment Method')}
        >
            <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <span className="text-sm font-medium text-primary">
                                {paymentMethod.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className="font-semibold">{paymentMethod.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {paymentMethod.description || t('common.na', 'N/A')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <span className="text-sm text-destructive">
                        {t('paymentMethods.deleteWarning', 'This will permanently remove the payment method and cannot be undone.')}
                    </span>
                </div>
            </div>
        </DeleteModal>
    );
}