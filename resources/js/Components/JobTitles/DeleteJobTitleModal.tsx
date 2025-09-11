import { router } from '@inertiajs/react';
import { DeleteModal } from '@/Components/Shared/DeleteModal';
import { JobTitle } from '@/Types/job-titles';
import { useLanguage } from '@/Hooks/use-language';

interface DeleteJobTitleModalProps {
    jobTitle: JobTitle;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function DeleteJobTitleModal({ jobTitle, open, onOpenChange, onSuccess }: DeleteJobTitleModalProps) {
    const { t } = useLanguage();

    return (
        <DeleteModal
            open={open}
            onOpenChange={onOpenChange}
            onConfirm={() => {
                router.delete(route('dashboard.job-titles.destroy', jobTitle.id), {
                    onSuccess: () => {
                        onSuccess();
                    },
                });
            }}
            title={t('common.confirmDelete') || 'Confirm Delete'}
            description={`${t('common.deleteWarning') || 'This action cannot be undone.'} ${t('admin.jobTitles.deleteWarning') ? t('admin.jobTitles.deleteWarning') : `Are you sure you want to delete the job title "${jobTitle.title}"?`}`}
        />
    );
}
