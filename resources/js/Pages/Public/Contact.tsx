import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm } from '@inertiajs/react';
import { useLanguage } from '@/Hooks/use-language';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Label } from '@/Components/Ui/label';
import { Input } from '@/Components/Ui/input';
import { Textarea } from '@/Components/Ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Company } from '@/Types/companies';

interface ContactProps {
    company: Company;
}

export default function Contact({ company }: ContactProps) {
    const { t } = useLanguage();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.store', { company: company.slug }), {
            onSuccess: () => {
                toast.success(t('contact.success'));
                reset();
            },
            onError: () => {
                toast.error(t('contact.error'));
            }
        });
    };

    return (
        <PublicLayout>
            <Head title={t('public.contact')} />
            <div className="grid md:grid-cols-2 gap-16">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                        {t('contact.title')}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        {t('contact.subtitle')}
                    </p>
                    <div className="mt-10 space-y-6">
                        <div className="flex items-start">
                            <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold">{t('contact.email')}</h3>
                                <a href="mailto:contact@drexsta.com" className="text-muted-foreground hover:text-primary">
                                    contact@drexsta.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold">{t('contact.phone')}</h3>
                                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold">{t('contact.address')}</h3>
                                <p className="text-muted-foreground">123 Drexsta Lane, Tech City, 12345</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>{t('contact.formTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('contact.name')}</Label>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">{t('contact.email')}</Label>
                                <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} required />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">{t('contact.subject')}</Label>
                                <Input id="subject" value={data.subject} onChange={e => setData('subject', e.target.value)} required />
                                {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">{t('contact.message')}</Label>
                                <Textarea id="message" rows={5} value={data.message} onChange={e => setData('message', e.target.value)} required />
                                {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing ? t('contact.sending') : t('contact.sendMessage')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </PublicLayout>
    );
}
