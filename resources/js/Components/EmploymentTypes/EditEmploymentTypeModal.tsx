import { EmploymentType } from '@/Types/employment-types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/Ui/dialog';
import EmploymentTypeForm from './EmploymentTypeForm';

interface EditEmploymentTypeModalProps {
    employmentType: EmploymentType;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function EditEmploymentTypeModal({ 
    employmentType, 
    open, 
    onOpenChange, 
    onSuccess 
}: EditEmploymentTypeModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Employment Type</DialogTitle>
                    <DialogDescription>
                        Update the employment type information.
                    </DialogDescription>
                </DialogHeader>

                {/* Employment Type Form */}
                <EmploymentTypeForm 
                    action={route('dashboard.employment-types.update', employmentType.id)}
                    method="put"
                    employmentType={employmentType}
                    onSuccess={onSuccess}
                />
            </DialogContent>
        </Dialog>
    );
}