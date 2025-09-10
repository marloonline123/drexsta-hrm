import React from 'react'
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Textarea } from '@/Components/Ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Switch } from '@/Components/Ui/switch';
import { ImageUpload } from '@/Components/Ui/image-upload';
import InputError from '@/Components/input-error';
import { useLanguage } from '@/Hooks/use-language';
import { Button, buttonVariants } from '../Ui/button';
import { Save } from 'lucide-react';
import { Form, Link } from '@inertiajs/react';
import { Company } from '@/Types/companies';

interface CompanyFormProps {
    action: string;
    company?: Company;
    method?: 'post' | 'put' | 'patch';
}
export default function CompanyForm({
    action,
    company,
    method = 'post',
}: CompanyFormProps) {
    const { t } = useLanguage();

    return (
        <Form
            action={action}
            method='post'
            encType="multipart/form-data"
        >
            {({ processing, errors }) => (
                <div className="space-y-6">
                    { method === 'put' && (
                        <input type="hidden" name="_method" value="PUT" />
                    )}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('companies.basicInfo')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Company Name & Industry */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        {t('companies.companyNameRequired')} <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder={t('companies.companyNamePlaceholder')}
                                        required
                                        autoFocus
                                        defaultValue={company?.name || ''}
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="industry">
                                        {t('companies.industryRequired')} <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="industry"
                                        name="industry"
                                        placeholder={t('companies.industryPlaceholder')}
                                        required
                                        defaultValue={company?.industry || ''}
                                    />
                                    <InputError message={errors.industry} />
                                </div>
                            </div>

                            {/* Email & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t('companies.email')}</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder={t('companies.emailPlaceholder')}
                                        defaultValue={company?.email || ''}
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">{t('companies.phone')}</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder={t('companies.phonePlaceholder')}
                                        defaultValue={company?.phone || ''}
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <Label htmlFor="address">{t('companies.address')}</Label>
                                <Textarea
                                    id="address"
                                    name="address"
                                    placeholder={t('companies.addressPlaceholder')}
                                    rows={3}
                                    defaultValue={company?.address || ''}
                                />
                                <InputError message={errors.address} />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">{t('companies.description')}</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder={t('companies.descriptionPlaceholder')}
                                    rows={4}
                                    defaultValue={company?.description || ''}
                                />
                                <InputError message={errors.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('companies.companyLogo')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ImageUpload
                                name="logo_image"
                                label=''
                                error={errors.logo}
                                maxSize={5}
                                value={company?.logo_url || ''}
                                description={t('companies.logoDescription')}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('companies.status')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>{t('companies.companyStatus')}</Label>
                                    <p className="text-sm text-muted-foreground">
                                        {t('companies.companyStatusDescription')}
                                    </p>
                                </div>
                                <Switch
                                    name="is_active"
                                    defaultChecked={company?.is_active ?? true}
                                    defaultValue={company?.is_active ? '1' : '0'}
                                />
                            </div>
                            <InputError message={errors.is_active} />
                        </CardContent>
                    </Card>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-4 pt-6 border-t">
                        <Link href={route('dashboard.companies.index')} className={buttonVariants({ variant: 'outline' })}>
                            {t('common.cancel')}
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? t('companies.saving') : t('companies.saveCompanyButton')}
                        </Button>
                    </div>
                </div>
            )}
        </Form>
    )
}
