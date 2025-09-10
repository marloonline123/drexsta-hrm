import { EmploymentType } from '@/Types/employment-types';
import { DeleteModal } from '@/Components/Shared/DeleteModal';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface DeleteEmploymentTypeModalProps {
    employmentType: EmploymentType;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function DeleteEmploymentTypeModal({ 
    employmentType, 
    open, 
    onOpenChange, 
    onSuccess 
}: DeleteEmploymentTypeModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            router.delete(route('dashboard.employment-types.destroy', employmentType.id), {
                onSuccess: () => {
                    toast.success('Employment type deleted successfully');
                    onSuccess();
                },
                onError: () => {
                    toast.error('Failed to delete employment type');
                },
                onFinish: () => {
                    setIsDeleting(false);
                    onOpenChange(false);
                }
            });
        } catch {
            toast.error('Failed to delete employment type');
            setIsDeleting(false);
            onOpenChange(false);
        }
    };

    return (
        <DeleteModal
            open={open}
            onOpenChange={onOpenChange}
            onConfirm={handleDelete}
            loading={isDeleting}
            title={`Delete Employment Type "${employmentType.name}"`}
            description="Are you sure you want to delete this employment type? This action cannot be undone."
            actionButtonText="Delete Employment Type"
        >
            <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium">{employmentType.name}</h4>
                    <p className="text-sm text-muted-foreground">
                        {employmentType.description || 'No description'}
                    </p>
                </div>

                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                    <p className="font-medium">Warning:</p>
                    <p>This action cannot be undone. This will permanently delete the employment type.</p>
                </div>
            </div>
        </DeleteModal>
    );
}