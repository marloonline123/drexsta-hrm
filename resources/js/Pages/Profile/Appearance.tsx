import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/Components/appearance-tabs';
import HeadingSmall from '@/Components/heading-small';
import { type BreadcrumbItem } from '@/Types';

import AppLayout from '@/layouts/AppLayout';
import ProfileLayout from '@/layouts/Profile/Layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: route('dashboard.profile.appearance'),
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <ProfileLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </ProfileLayout>
        </AppLayout>
    );
}
