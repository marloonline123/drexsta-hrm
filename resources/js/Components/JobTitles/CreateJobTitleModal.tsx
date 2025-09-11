import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/Ui/dialog';
import JobTitleForm from './JobTitleForm';

interface CreateJobTitleModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function CreateJobTitleModal({ open, onOpenChange, onSuccess }: CreateJobTitleModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create Job Title</DialogTitle>
                    <DialogDescription>
                        Add a new job title to categorize your employee positions.
                    </DialogDescription>
                </DialogHeader>

                {/* Job Title Form */}
                <JobTitleForm
                    action={route('dashboard.job-titles.store')}
                    method="post"
                    onSuccess={onSuccess}
                />
            </DialogContent>
        </Dialog>
    );
}