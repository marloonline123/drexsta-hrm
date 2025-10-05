import React from 'react';
import { Form } from '@inertiajs/react';
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Textarea } from '@/Components/Ui/textarea';
import { Switch } from '@/Components/Ui/switch';
import { InputError } from '@/Components/Ui/InputError';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { PaymentMethod } from '@/Types/payment-methods';
import { useLanguage } from '@/Hooks/use-language';
import FormButton from '../Ui/form-button';

interface PaymentMethodFormProps {
    action: string;
    paymentMethod?: PaymentMethod;
    method?: 'post' | 'put' | 'patch';
}

export default function PaymentMethodForm({
    action,
    paymentMethod,
    method = 'post',
}: PaymentMethodFormProps) {
    const { t } = useLanguage();

    return (
        <Form action={action} method="post" encType="multipart/form-data">
            {({ processing, errors }) => (
                <div className="space-y-6">
                    {method === 'put' && (
                        <input type="hidden" name="_method" value="PUT" />
                    )}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('paymentMethods.details', 'Payment Method Details')}</CardTitle>
                            <CardDescription>
                                {t('paymentMethods.detailsDescription', 'Configure the payment method settings')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    {t('common.name', 'Name')} <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder={t('paymentMethods.namePlaceholder', 'e.g., Bank Transfer, Credit Card')}
                                    required
                                    autoFocus
                                    defaultValue={paymentMethod?.name || ''}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    {t('common.description', 'Description')}
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder={t('paymentMethods.descriptionPlaceholder', 'Describe how this payment method works...')}
                                    rows={3}
                                    defaultValue={paymentMethod?.description || ''}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>{t('paymentMethods.active', 'Active')}</Label>
                                    <p className="text-sm text-muted-foreground">
                                        {t('paymentMethods.activeDescription', 'Inactive payment methods won\'t be available for employees to select')}
                                    </p>
                                </div>
                                <Switch
                                    name="is_active"
                                    defaultChecked={paymentMethod?.is_active ?? true}
                                    defaultValue={paymentMethod?.is_active ? '1' : '0'}
                                />
                            </div>
                            <InputError message={errors.is_active} />

                            <div className="flex gap-4 pt-4">
                                <FormButton isLoading={processing}
                                    text={t('common.save', 'Save')}
                                    loadingText={t('common.saving', 'Saving...')}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Form>
    );
}