import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Form, Head } from '@inertiajs/react';
import { JobPosting } from '@/Types/job-postings';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Label } from '@/Components/Ui/label';
import { Input } from '@/Components/Ui/input';
import { Textarea } from '@/Components/Ui/textarea';
import { Send } from 'lucide-react';
import { InputError } from '@/Components/Ui/InputError';
import { t } from 'i18next';

interface ApplyProps {
    posting: JobPosting;
    company: {
        id: number;
        name: string;
        slug: string;
    }
}

const Apply = ({ posting, company }: ApplyProps) => {
    return (
        <PublicLayout>
            <Head title={`${t('publicJobs.applyForPosition')} | ${posting.title}`} />
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">{t('publicJobs.applyForPosition')}</CardTitle>
                        <CardDescription>{posting.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form 
                            action={route('jobs.apply.store', { company: company.slug, jobPosting: posting.slug })} 
                            className="space-y-6"
                            method='post'
                            encType="multipart/form-data"
                            options={{ 
                                preserveScroll: true,
                            }}
                            resetOnSuccess
                        >
                            {({processing, errors}) => (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="">
                                            <Label htmlFor="name">
                                                {t('publicJobs.name')} <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                required
                                                autoFocus
                                            />
                                            <InputError message={errors?.name} />
                                        </div>
                                        <div className="">
                                            <Label htmlFor="phone">{t('publicJobs.phone')}</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                            />
                                            <InputError message={errors?.phone} />
                                        </div>
                                    </div>

                                    <div className="">
                                        <Label htmlFor="email">
                                            {t('publicJobs.email')} <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                        />
                                        <InputError message={errors?.email} />
                                    </div>

                                    <div className="">
                                        <Label htmlFor="cover_letter">{t('publicJobs.coverLetter')}</Label>
                                        <Textarea
                                            id="cover_letter"
                                            name="cover_letter"
                                            rows={5}
                                            placeholder={t('publicJobs.coverLetterPlaceholder')}
                                        />
                                        <InputError message={errors?.cover_letter} />
                                    </div>

                                    <div>
                                        <Label htmlFor='resume_file'>{t('publicJobs.resume')}</Label>
                                        <Input id="resume_file" name="resume_file" type="file" />
                                        <InputError message={errors?.resume_file} />
                                    </div>

                                    <Button type="submit" className="w-full" size="lg" disabled={processing}>
                                        <Send className="h-4 w-4 mr-2" />
                                        {processing ? t('publicJobs.submitting') : t('publicJobs.submitApplication')}
                                    </Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </PublicLayout>
    );
};

export default Apply;