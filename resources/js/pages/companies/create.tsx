import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from '@/components/ui/image-upload';
import InputError from '@/components/input-error';
import { useLanguage } from '@/hooks/use-language';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Building, Save, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Companies',
        href: '/companies',
    },
    {
        title: 'Create Company',
        href: '/companies/create',
    },
];

export default function CreateCompany() {
    const { t, isRTL } = useLanguage();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleLogoChange = (file: File | null) => {
        setSelectedFile(file);
    };

    // Dynamic breadcrumbs with translations
    const translatedBreadcrumbs: BreadcrumbItem[] = [
        {
            title: t('nav.dashboard'),
            href: '/dashboard',
        },
        {
            title: t('nav.companies'),
            href: '/companies',
        },
        {
            title: t('companies.createCompany'),
            href: '/companies/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={translatedBreadcrumbs}>
            <Head title={t('companies.createCompany')} />
            
            <div className={`p-6 ${isRTL ? 'rtl' : 'ltr'}`}>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <a href="/companies">
                            <ArrowLeft className="h-4 w-4" />
                        </a>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Building className="h-6 w-6" />
                            {t('companies.createCompany')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('companies.addNewCompany')}
                        </p>
                    </div>
                </div>

                <Form 
                    method="post" 
                    action="/companies"
                    encType="multipart/form-data"
                    className="max-w-4xl"
                >
                    {({ processing, errors }) => (
                        <div className="space-y-6">
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
                                        />
                                        <InputError message={errors.address} />
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description">{t('common.description')}</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder={t('companies.descriptionPlaceholder')}
                                            rows={4}
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
                                        name="logo"
                                        label={t('companies.companyLogo')}
                                        onChange={handleLogoChange}
                                        error={errors.logo}
                                        maxSize={5}
                                        description={t('companies.logoDescription')}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('common.status')}</CardTitle>
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
                                            defaultChecked={true}
                                        />
                                    </div>
                                    <InputError message={errors.is_active} />
                                </CardContent>
                            </Card>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end gap-4 pt-6 border-t">
                                <Button variant="outline" type="button" asChild>
                                    <a href="/companies">{t('common.cancel')}</a>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    <Save className="h-4 w-4 mr-2" />
                                    {processing ? t('companies.creating') : t('companies.createCompanyButton')}
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}