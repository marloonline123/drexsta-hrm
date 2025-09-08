import { Button } from '@/Components/Ui/button';
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Textarea } from '@/Components/Ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Switch } from '@/Components/Ui/switch';
import { ImageUpload } from '@/Components/Ui/image-upload';
import InputError from '@/Components/input-error';
import { useLanguage } from '@/Hooks/use-language';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Building, Save, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Company {
    id: number;
    name: string;
    industry: string;
    slug: string;
    phone?: string;
    email?: string;
    address?: string;
    description?: string;
    logo_path?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface EditCompanyProps {
    company: Company;
}

export default function EditCompany({ company }: EditCompanyProps) {
    const { t, isRTL } = useLanguage();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [removeLogo, setRemoveLogo] = useState(false);

    const currentLogoUrl = company.logo_path && !removeLogo 
        ? `/storage/${company.logo_path}` 
        : null;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('nav.dashboard'),
            href: '/dashboard',
        },
        {
            title: t('nav.companies'),
            href: '/companies',
        },
        {
            title: company.name,
            href: `/companies/${company.id}`,
        },
        {
            title: t('common.edit'),
            href: `/companies/${company.id}/edit`,
        },
    ];

    const handleLogoChange = (file: File | null) => {
        setSelectedFile(file);
        if (file) {
            setRemoveLogo(false);
        }
    };

    const handleRemoveLogo = () => {
        setRemoveLogo(true);
        setSelectedFile(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${t('companies.editCompanyTitle')} - ${company.name}`} />
            
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
                            {t('companies.editCompanyTitle')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('companies.updateCompanyInfo')} {company.name}
                        </p>
                    </div>
                </div>

                <Form 
                    method="patch" 
                    action={`/companies/${company.id}`}
                    encType="multipart/form-data"
                    className="max-w-4xl"
                >
                    {({ processing, errors }) => (
                        <div className="space-y-6">
                            {/* Hidden field for logo removal */}
                            {removeLogo && (
                                <input type="hidden" name="remove_logo" value="1" />
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
                                                defaultValue={company.name}
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
                                                defaultValue={company.industry}
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
                                                defaultValue={company.email || ''}
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
                                                defaultValue={company.phone || ''}
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
                                            defaultValue={company.address || ''}
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
                                            defaultValue={company.description || ''}
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
                                        label={currentLogoUrl ? t('companies.changeLogo') : t('companies.uploadLogo')}
                                        value={currentLogoUrl}
                                        onChange={handleLogoChange}
                                        onRemove={handleRemoveLogo}
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
                                            defaultChecked={company.is_active}
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
                                    {processing ? t('companies.updating') : t('companies.updateCompanyButton')}
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}