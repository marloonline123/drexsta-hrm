import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm } from '@inertiajs/react';
import { useLanguage } from '@/Hooks/use-language';
import { JobPosting } from '@/Types/job-postings';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Label } from '@/Components/Ui/label';
import { Input } from '@/Components/Ui/input';
import { Textarea } from '@/Components/Ui/textarea';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

interface ApplyProps {
    posting: JobPosting;
    company: {
        id: number;
        name: string;
        slug: string;
    }
}

const Apply = ({ posting, company }: ApplyProps) => {
    const { t } = useLanguage();

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        cover_letter: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('jobs.apply.store', { company: company.slug, jobPosting: posting.slug }), {
            onSuccess: () => {
                toast.success(t('publicJobs.applicationSuccess'));
                reset();
            },
            onError: () => {
                toast.error(t('publicJobs.applicationError'));
            }
        });
    };

    return (
        <PublicLayout>
            <Head title={`${t('publicJobs.applyFor')} ${posting.title}`} />
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">{t('publicJobs.applyForPosition')}</CardTitle>
                        <CardDescription>{posting.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">
                                        {t('publicJobs.firstName')} <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="first_name"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        required
                                        autoFocus
                                    />
                                    {errors.first_name && (
                                        <p className="text-sm text-destructive">{errors.first_name}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last_name">
                                        {t('publicJobs.lastName')} <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="last_name"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        required
                                    />
                                    {errors.last_name && (
                                        <p className="text-sm text-destructive">{errors.last_name}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    {t('publicJobs.email')} <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">{t('publicJobs.phone')}</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                                {errors.phone && (
                                    <p className="text-sm text-destructive">{errors.phone}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cover_letter">{t('publicJobs.coverLetter')}</Label>
                                <Textarea
                                    id="cover_letter"
                                    rows={5}
                                    value={data.cover_letter}
                                    onChange={(e) => setData('cover_letter', e.target.value)}
                                    placeholder={t('publicJobs.coverLetterPlaceholder')}
                                />
                                {errors.cover_letter && (
                                    <p className="text-sm text-destructive">{errors.cover_letter}</p>
                                )}
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-4">Resume/CV</h3>
                                {/* Simple file upload for now, can be improved later */}
                                <Input id="resume" type="file" />
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={processing}>
                                <Send className="h-4 w-4 mr-2" />
                                {processing ? t('publicJobs.submitting') : t('publicJobs.submitApplication')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </PublicLayout>
    );
};

export default Apply;