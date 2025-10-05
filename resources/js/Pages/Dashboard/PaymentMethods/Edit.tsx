import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { buttonVariants } from '@/Components/Ui/button';
import AppLayout from '@/Layouts/AppLayout';
import { BreadcrumbItem } from '@/Types';
import PaymentMethodForm from '@/Components/PaymentMethods/PaymentMethodForm';
import { PaymentMethod } from '@/Types/payment-methods';
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
        title: t('paymentMethods.edit', 'Edit Payment Method'),
        href: route('dashboard.payment-methods.edit', 0), // Will be replaced
    },
];

interface EditProps {
    paymentMethod: PaymentMethod;
}

export default function Edit({ paymentMethod }: EditProps) {
    // Update breadcrumb with actual payment method name
    breadcrumbs[2].title = t('paymentMethods.edit', 'Edit') + ' ' + paymentMethod.name;
    breadcrumbs[2].href = route('dashboard.payment-methods.edit', paymentMethod.id);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('paymentMethods.edit', 'Edit Payment Method')} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link href={route('dashboard.payment-methods.index')} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t('common.back', 'Back')}
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {t('paymentMethods.edit', 'Edit Payment Method')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('paymentMethods.editDescription', 'Update payment method settings')}
                        </p>
                    </div>
                </div>

                <PaymentMethodForm
                    action={route('dashboard.payment-methods.update', paymentMethod.id)}
                    paymentMethod={paymentMethod}
                    method="put"
                />
            </div>
        </AppLayout>
    );
}