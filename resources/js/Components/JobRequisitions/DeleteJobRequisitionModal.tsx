import { JobRequisition } from '@/Types/job-requisitions';
import { DeleteModal } from '@/Components/Shared/DeleteModal';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface DeleteJobRequisitionModalProps {
    requisition: JobRequisition;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function DeleteJobRequisitionModal({ 
    requisition, 
    open, 
    onOpenChange, 
    onSuccess 
}: DeleteJobRequisitionModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            router.delete(route('dashboard.job-requisitions.destroy', requisition.id), {
                onSuccess: () => {
                    toast.success('Job requisition deleted successfully');
                    onSuccess();
                },
                onError: () => {
                    toast.error('Failed to delete job requisition');
                },
                onFinish: () => {
                    setIsDeleting(false);
                    onOpenChange(false);
                }
            });
        } catch {
            toast.error('Failed to delete job requisition');
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
            title={`Delete Job Requisition "${requisition.requisition_code}"`}
            description="Are you sure you want to delete this job requisition? This action cannot be undone."
            actionButtonText="Delete Job Requisition"
        >
            <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium">{requisition.requisition_code}</h4>
                    <p className="text-sm text-muted-foreground">
                        {requisition.jobTitle?.title || 'No job title'} - {requisition.department?.name || 'No department'}
                    </p>
                </div>

                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                    <p className="font-medium">Warning:</p>
                    <p>This action cannot be undone. This will permanently delete the job requisition.</p>
                </div>
            </div>
        </DeleteModal>
    );
}