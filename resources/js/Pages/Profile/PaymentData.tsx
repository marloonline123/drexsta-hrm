import { type BreadcrumbItem, type SharedData } from '@/Types';
import { Form, Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

import HeadingSmall from '@/Components/heading-small';
import InputError from '@/Components/input-error';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/Ui/select';
import { Switch } from '@/Components/Ui/switch';
import { Textarea } from '@/Components/Ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import ProfileLayout from '@/Layouts/Profile/Layout';
import { ProfilePageProps } from '@/Types/main';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: route('dashboard.profile.edit'),
    },
    {
        title: 'Payment Data',
        href: route('dashboard.profile.payment-data.edit'),
    },
];

export default function PaymentData({ paymentMethods, userPaymentData }: ProfilePageProps) {
    const { auth } = usePage<SharedData>().props;
    const [selectedMethod, setSelectedMethod] = useState(
        userPaymentData.length > 0 ? userPaymentData[0].payment_method_id : ''
    );
    const [customDetails, setCustomDetails] = useState(
        userPaymentData.length > 0 ? userPaymentData[0].custom_details : {}
    );
    const [isActive, setIsActive] = useState(
        userPaymentData.length > 0 ? userPaymentData[0].is_active : true
    );

    const selectedPaymentMethod = paymentMethods.find(method => method.id === parseInt(selectedMethod));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payment Data" />

            <ProfileLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Payment Data"
                        description="Manage your payment method preferences"
                    />

                    <Form
                        method="post"
                        action={route('dashboard.profile.payment-data.update')}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Payment Method</CardTitle>
                                        <CardDescription>
                                            Select your preferred payment method for salary payments
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="payment_method">Payment Method</Label>
                                            <Select
                                                value={selectedMethod}
                                                onValueChange={setSelectedMethod}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a payment method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {paymentMethods.map((method) => (
                                                        <SelectItem key={method.id} value={method.id.toString()}>
                                                            {method.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.payment_method_id} />
                                        </div>

                                        {selectedPaymentMethod && (
                                            <div className="space-y-4">
                                                <div className="p-4 bg-muted rounded-lg">
                                                    <h4 className="font-medium mb-2">Method Details</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {selectedPaymentMethod.description}
                                                    </p>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="custom_details">Additional Details</Label>
                                                    <Textarea
                                                        id="custom_details"
                                                        name="custom_details"
                                                        value={JSON.stringify(customDetails, null, 2)}
                                                        onChange={(e) => {
                                                            try {
                                                                setCustomDetails(JSON.parse(e.target.value));
                                                            } catch {
                                                                // Invalid JSON, keep current value
                                                            }
                                                        }}
                                                        placeholder="Enter additional payment details as JSON"
                                                        rows={4}
                                                    />
                                                    <p className="text-sm text-muted-foreground">
                                                        Enter any additional details required for this payment method
                                                    </p>
                                                    <InputError message={errors.custom_details} />
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id="is_active"
                                                        checked={isActive}
                                                        onCheckedChange={setIsActive}
                                                        name="is_active"
                                                    />
                                                    <Label htmlFor="is_active">Active</Label>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing || !selectedMethod}>
                                        Save Payment Data
                                    </Button>

                                    {recentlySuccessful && (
                                        <p className="text-sm text-green-600">Payment data saved successfully</p>
                                    )}
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </ProfileLayout>
        </AppLayout>
    );
}