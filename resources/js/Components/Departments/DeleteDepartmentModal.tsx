import { DeleteModal } from '@/Components/Shared/DeleteModal';
import { router } from '@inertiajs/react';
import { t } from 'i18next';
import { useState } from 'react';
import { Department } from '@/Types/deparments';

interface DeleteDepartmentModalProps {
    department: Department;
    showDeleteModal: boolean;
    setShowDeleteModal: (show: boolean) => void
}

export default function DeleteDepartmentModal({ department, showDeleteModal, setShowDeleteModal }: DeleteDepartmentModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDeleteDepartment = async () => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            router.delete(route('dashboard.departments.destroy', department.slug), {
                onError: (error) => {
                    console.error('Failed to delete department:', error);
                },
                onFinish: () => {
                    setShowDeleteModal(false);
                    setIsDeleting(false);
                }
            });
        } catch (error) {
            console.error('Failed to delete department:', error);
            setShowDeleteModal(false);
            setIsDeleting(false);
        }
    };
    return (
        <>
            {/* <DropdownMenuItem
                onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteModal(true);
                }}
                className="text-destructive"
            >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
            </DropdownMenuItem> */}
            <DeleteModal
                open={showDeleteModal}
                onOpenChange={setShowDeleteModal}
                onConfirm={handleDeleteDepartment}
                loading={isDeleting}
                title={`${t('departments.deleteDepartment')} "${department.name}"`}
                description={`${t('departments.confirmDelete')} ${t('departments.deleteWarning')}`}
                actionButtonText={t('common.delete')}
            >
                <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                        {t('departments.confirmDelete')}
                    </p>
                    <div className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                            <div>
                                <p className="font-medium">{department.name}</p>
                                <p className="text-sm text-muted-foreground">{department.manager?.name}</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-destructive text-sm font-medium">
                        {t('departments.deleteWarning')}
                    </p>
                </div>
            </DeleteModal>
        </>
    )
}
