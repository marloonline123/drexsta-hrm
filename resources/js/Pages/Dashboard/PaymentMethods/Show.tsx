import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button, buttonVariants } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Badge } from '@/Components/Ui/badge';
import AppLayout from '@/Layouts/AppLayout';
import { BreadcrumbItem } from '@/Types';
import { PaymentMethod } from '@/Types/payment-methods';
import PaymentMethodDeleteModal from '@/Components/PaymentMethods/PaymentMethodDeleteModal';
import { t } from 'i18next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: t('nav.admin'),
        href: '/admin',
    },
    {
        title: t('nav.paymentMethods', 'Payment Methods'),
        href: route('dashboard.payment-methods.index'),
    },
    {
        title: t('paymentMethods.show', 'View Payment Method'),
        href: route('dashboard.payment-methods.show', 0), // Will be replaced
    },
];

interface ShowProps {
    paymentMethod: PaymentMethod;
}

export default function Show({ paymentMethod }: ShowProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    // Update breadcrumb with actual payment method name
    breadcrumbs[2].title = paymentMethod.name;
    breadcrumbs[2].href = route('dashboard.payment-methods.show', paymentMethod.id);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={paymentMethod.name} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('dashboard.payment-methods.index')} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t('common.back', 'Back')}
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {paymentMethod.name}
                            </h1>
                            <p className="text-muted-foreground">
                                {t('paymentMethods.viewDescription', 'Payment method details and settings')}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={route('dashboard.payment-methods.edit', paymentMethod.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                {t('common.edit', 'Edit')}
                            </Link>
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => setDeleteModalOpen(true)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t('common.delete', 'Delete')}
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('paymentMethods.details', 'Details')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    {t('common.name', 'Name')}
                                </label>
                                <p className="text-sm font-medium">{paymentMethod.name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    {t('common.description', 'Description')}
                                </label>
                                <p className="text-sm">{paymentMethod.description || t('common.na', 'N/A')}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    {t('common.status', 'Status')}
                                </label>
                                <div className="mt-1">
                                    <Badge variant={paymentMethod.is_active ? 'default' : 'secondary'}>
                                        {paymentMethod.is_active ? t('common.active', 'Active') : t('common.inactive', 'Inactive')}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('common.metadata', 'Metadata')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    {t('common.createdAt', 'Created')}
                                </label>
                                <p className="text-sm">{new Date(paymentMethod.created_at).toLocaleString()}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    {t('common.updatedAt', 'Updated')}
                                </label>
                                <p className="text-sm">{new Date(paymentMethod.updated_at).toLocaleString()}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    {t('common.id', 'ID')}
                                </label>
                                <p className="text-sm font-mono">{paymentMethod.id}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <PaymentMethodDeleteModal
                paymentMethod={paymentMethod}
                open={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
            />
        </AppLayout>
    );
}