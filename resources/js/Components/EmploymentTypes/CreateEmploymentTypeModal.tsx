import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/Ui/dialog';
import EmploymentTypeForm from './EmploymentTypeForm';

interface CreateEmploymentTypeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function CreateEmploymentTypeModal({ open, onOpenChange, onSuccess }: CreateEmploymentTypeModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create Employment Type</DialogTitle>
                    <DialogDescription>
                        Add a new employment type to categorize your employee contracts.
                    </DialogDescription>
                </DialogHeader>

                {/* Employment Type Form */}
                <EmploymentTypeForm
                    action={route('dashboard.employment-types.store')}
                    method="post"
                    onSuccess={onSuccess}
                />
            </DialogContent>
        </Dialog>
    );
}