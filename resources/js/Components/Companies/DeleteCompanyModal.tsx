import { Avatar, AvatarImage, AvatarFallback } from '@/Components/Ui/avatar';
import { DeleteModal } from '@/Components/Shared/DeleteModal';
import { router } from '@inertiajs/react';
import { Company } from '@/Types/companies';
import { t } from 'i18next';
import { useState } from 'react';

interface DeleteCompanyModalProps {
    company: Company;
    showDeleteModal: boolean;
    setShowDeleteModal: (show: boolean) => void;
}

export default function DeleteCompanyModal({ company, showDeleteModal, setShowDeleteModal }: DeleteCompanyModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDeleteCompany = async () => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            router.delete(route('dashboard.companies.destroy', company.slug));
            router.visit(route('dashboard.companies.index'));
        } catch (error) {
            console.error('Failed to delete company:', error);
        } finally {
            setShowDeleteModal(false);
            setIsDeleting(false);
        }
    };
    return (
        <>
            <DeleteModal
                open={showDeleteModal}
                onOpenChange={setShowDeleteModal}
                onConfirm={handleDeleteCompany}
                loading={isDeleting}
                title={`${t('companies.deleteCompany')} "${company.name}"`}
                description={`${t('companies.confirmDelete')} ${t('companies.deleteWarning')}`}
                actionButtonText={t('common.delete')}
            >
                <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                        {t('companies.confirmDelete')}
                    </p>
                    <div className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={company.logo_url} alt={company.name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    {company.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{company.name}</p>
                                <p className="text-sm text-muted-foreground">{company.industry}</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-destructive text-sm font-medium">
                        {t('companies.deleteWarning')}
                    </p>
                </div>
            </DeleteModal>
        </>
    )
}
