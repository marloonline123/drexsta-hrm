import { Head, Link } from '@inertiajs/react';
import { DollarSign, User, Calendar } from 'lucide-react';
import { Button, buttonVariants } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Badge } from '@/Components/Ui/badge';
import { JobPosting } from '@/Types/job-postings';
import { useLanguage } from '@/Hooks/use-language';
import PublicLayout from '@/Layouts/PublicLayout';
import { cn } from '@/Lib/utils';

interface JobPostingShowProps {
  posting: JobPosting;
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function PublicJobPostingShow({ posting, flash }: JobPostingShowProps) {
  const { t } = useLanguage();

  return (
    <PublicLayout>
        <Head title={`${posting.title} at ${posting.company.name}`} />

        {flash?.success && (
            <div className="mb-4 rounded-md bg-green-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">{flash.success}</p>
                    </div>
                </div>
            </div>
        )}

        {flash?.error && (
             <div className="mb-4 rounded-md bg-red-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">{flash.error}</p>
                    </div>
                </div>
            </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{posting.title}</h1>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <p className="text-sm text-muted-foreground">{posting.company.name}</p>
                            <Badge>{posting.employmentType.name}</Badge>
                            {posting.location && <p className="text-sm text-muted-foreground">{posting.location}</p>}
                            {posting.is_remote && <Badge variant="secondary">{t('publicJobs.remote')}</Badge>}
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <Link href={route('jobs.apply', { company: posting.company.slug, jobPosting: posting.slug })}>
                            <Button size="lg">{t('publicJobs.applyNow')}</Button>
                        </Link>
                    </div>
                </div>

                <div className="mt-8 space-y-8">
                    {posting.description && (
                        <div>
                            <h2 className="text-xl font-bold text-foreground">{t('publicJobs.jobDescription')}</h2>
                            <div className="mt-4 prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: posting.description }} />
                        </div>
                    )}
                    {posting.responsibilities && (
                        <div>
                            <h2 className="text-xl font-bold text-foreground">{t('publicJobs.responsibilities')}</h2>
                            <div className="mt-4 prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: posting.responsibilities }} />
                        </div>
                    )}
                    {posting.requirements && (
                        <div>
                            <h2 className="text-xl font-bold text-foreground">{t('publicJobs.requirements')}</h2>
                            <div className="mt-4 prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: posting.requirements }} />
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 lg:mt-0 lg:col-span-4">
                <div className="sticky top-8 space-y-6">
                    <div className="lg:hidden">
                        <Link href={route('jobs.apply', { company: posting.company.slug, jobPosting: posting.slug })} className={cn("w-full", buttonVariants({ variant: 'default', size: 'lg' }))}>
                            {t('publicJobs.applyNow')}
                        </Link>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('publicJobs.jobDetails')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {posting.min_salary && posting.max_salary && (
                                <div className="flex items-start">
                                    <DollarSign className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                                    <div className="ml-3">
                                        <p className="font-semibold">{t('publicJobs.salary')}</p>
                                        <p className="text-sm text-muted-foreground">{posting.min_salary.toLocaleString()} - {posting.max_salary.toLocaleString()}</p>
                                    </div>
                                </div>
                            )}
                            {posting.experience_years !== null && (
                                <div className="flex items-start">
                                    <User className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                                    <div className="ml-3">
                                        <p className="font-semibold">{t('publicJobs.experience')}</p>
                                        <p className="text-sm text-muted-foreground">{posting.experience_years} {posting.experience_years === 1 ? t('publicJobs.year') : t('publicJobs.years')}</p>
                                    </div>
                                </div>
                            )}
                            {posting.education_level && (
                                <div className="flex items-start">
                                    <User className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                                    <div className="ml-3">
                                        <p className="font-semibold">{t('publicJobs.education')}</p>
                                        <p className="text-sm text-muted-foreground">{posting.education_level}</p>
                                    </div>
                                </div>
                            )}
                             {posting.target_start_date && (
                                <div className="flex items-start">
                                    <Calendar className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                                    <div className="ml-3">
                                        <p className="font-semibold">{t('publicJobs.startDate')}</p>
                                        <p className="text-sm text-muted-foreground">{new Date(posting.target_start_date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </PublicLayout>
  );
}