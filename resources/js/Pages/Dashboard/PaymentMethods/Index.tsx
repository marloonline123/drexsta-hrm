import { Head, Link } from '@inertiajs/react';
import { Plus, MoreHorizontal, Eye, Edit, Trash2, CreditCard } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/Ui/table';
import { Badge } from '@/Components/Ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/Ui/dropdown-menu';
import AppLayout from '@/Layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { type PaginatedPaymentMethods, type PaymentMethod } from '@/Types/payment-methods';
import PaymentMethodDeleteModal from '@/Components/PaymentMethods/PaymentMethodDeleteModal';
import { t } from 'i18next';
import EmptyResource from '@/Components/Shared/EmptyResource';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: t('nav.admin'),
        href: '/admin',
    },
    {
        title: t('nav.paymentMethods', 'Payment Methods'),
        href: route('dashboard.payment-methods.index'),
    },
];

interface IndexProps {
    paymentMethods: PaginatedPaymentMethods;
}

export default function Index({ paymentMethods }: IndexProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);

    const handleDeleteClick = (paymentMethod: PaymentMethod) => {
        setSelectedPaymentMethod(paymentMethod);
        setDeleteModalOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('nav.paymentMethods', 'Payment Methods')} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {t('nav.paymentMethods', 'Payment Methods')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('paymentMethods.description', 'Manage payment methods available for employees')}
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('dashboard.payment-methods.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            {t('paymentMethods.addMethod', 'Add Payment Method')}
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('paymentMethods.list', 'Payment Methods')}</CardTitle>
                        <CardDescription>
                            {t('paymentMethods.listDescription', 'All payment methods configured for your organization')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        

                        {paymentMethods.data.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('common.name', 'Name')}</TableHead>
                                        <TableHead>{t('common.description', 'Description')}</TableHead>
                                        <TableHead>{t('common.status', 'Status')}</TableHead>
                                        <TableHead>{t('common.createdAt', 'Created')}</TableHead>
                                        <TableHead className="text-right">{t('common.actions', 'Actions')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paymentMethods.data.map((method) => (
                                        <TableRow key={method.id}>
                                            <TableCell className="font-medium">{method.name}</TableCell>
                                            <TableCell>{method.description || '-'}</TableCell>
                                            <TableCell>
                                                <Badge variant={method.is_active ? 'default' : 'secondary'}>
                                                    {method.is_active ? t('common.active', 'Active') : t('common.inactive', 'Inactive')}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{new Date(method.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('dashboard.payment-methods.show', method.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                {t('common.view', 'View')}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('dashboard.payment-methods.edit', method.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                {t('common.edit', 'Edit')}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDeleteClick(method)}
                                                            className="text-destructive focus:text-destructive"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            {t('common.delete', 'Delete')}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <EmptyResource 
                                title={t('paymentMethods.empty', 'No payment methods found')} 
                                description={t('paymentMethods.emptyDescription', 'You have not added any payment methods yet')} 
                                icon={CreditCard}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>

            {selectedPaymentMethod && (
                <PaymentMethodDeleteModal
                    paymentMethod={selectedPaymentMethod}
                    open={deleteModalOpen}
                    onOpenChange={setDeleteModalOpen}
                />
            )}
        </AppLayout>
    );
}