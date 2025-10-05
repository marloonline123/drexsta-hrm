import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { buttonVariants } from '@/Components/Ui/button';
import AppLayout from '@/Layouts/AppLayout';
import { BreadcrumbItem } from '@/Types';
import PaymentMethodForm from '@/Components/PaymentMethods/PaymentMethodForm';
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
        title: t('paymentMethods.create', 'Create Payment Method'),
        href: route('dashboard.payment-methods.create'),
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('paymentMethods.create', 'Create Payment Method')} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link href={route('dashboard.payment-methods.index')} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t('common.back', 'Back')}
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {t('paymentMethods.create', 'Create Payment Method')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('paymentMethods.createDescription', 'Add a new payment method for your organization')}
                        </p>
                    </div>
                </div>

                <PaymentMethodForm
                    action={route('dashboard.payment-methods.store')}
                    method="post"
                />
            </div>
        </AppLayout>
    );
}