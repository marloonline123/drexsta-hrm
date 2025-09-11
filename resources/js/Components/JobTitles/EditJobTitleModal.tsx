import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/Ui/dialog';
import { JobTitle } from '@/Types/job-titles';
import JobTitleForm from './JobTitleForm';

interface EditJobTitleModalProps {
    jobTitle: JobTitle;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function EditJobTitleModal({ jobTitle, open, onOpenChange, onSuccess }: EditJobTitleModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Job Title</DialogTitle>
                    <DialogDescription>
                        Update the job title details.
                    </DialogDescription>
                </DialogHeader>

                {/* Job Title Form */}
                <JobTitleForm
                    jobTitle={jobTitle}
                    action={route('dashboard.job-titles.update', jobTitle.id)}
                    method="put"
                    onSuccess={onSuccess}
                />
            </DialogContent>
        </Dialog>
    );
}