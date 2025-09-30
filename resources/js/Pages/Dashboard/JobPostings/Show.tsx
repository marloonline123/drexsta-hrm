import { Head } from '@inertiajs/react';
import { Briefcase, Calendar, MapPin, DollarSign, User, Clock, Edit } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Badge } from '@/Components/Ui/badge';
import { JobPosting } from '@/Types/job-postings';
import { useLanguage } from '@/Hooks/use-language';

interface JobPostingShowProps {
  posting: JobPosting;
}

export default function JobPostingShow({ posting }: JobPostingShowProps) {
  const { t } = useLanguage();
  console.log('Posting:', posting);
  
  
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('nav.dashboard'),
      href: route('dashboard.index'),
    },
    {
      title: t('nav.jobPostings'),
      href: route('dashboard.job-postings.index'),
    },
    {
      title: posting.title,
      href: route('dashboard.job-postings.show', posting.id),
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">{t('jobPostings.status.draft')}</Badge>;
      case 'open':
        return <Badge className="bg-green-100 text-green-800">{t('jobPostings.status.open')}</Badge>;
      case 'closed':
        return <Badge variant="outline">{t('jobPostings.status.closed')}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Job Posting - ${posting.title}`} />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="h-8 w-8" />
              {posting.title}
            </h1>
            <p className="text-muted-foreground">
              {posting.jobRequisition?.jobTitle?.title} - {posting.jobRequisition?.department?.name}
            </p>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline">
              <a href={route('dashboard.job-postings.edit', posting.id)}>
                <Edit className="h-4 w-4 mr-2" />
                {t('jobPostings.edit')}
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('jobPostings.show.jobDescription')}</CardTitle>
              </CardHeader>
              <CardContent>
                {posting.description ? (
                  <div 
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: posting.description.replace(/\n/g, '<br />') }}
                  />
                ) : (
                  <p className="text-muted-foreground">{t('jobPostings.show.noDescription')}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('jobPostings.show.requirements')}</CardTitle>
              </CardHeader>
              <CardContent>
                {posting.requirements ? (
                  <div 
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: posting.requirements.replace(/\n/g, '<br />') }}
                  />
                ) : (
                  <p className="text-muted-foreground">{t('jobPostings.show.noRequirements')}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('jobPostings.show.responsibilities')}</CardTitle>
              </CardHeader>
              <CardContent>
                {posting.responsibilities ? (
                  <div 
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: posting.responsibilities.replace(/\n/g, '<br />') }}
                  />
                ) : (
                  <p className="text-muted-foreground">{t('jobPostings.show.noResponsibilities')}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('jobPostings.show.benefits')}</CardTitle>
              </CardHeader>
              <CardContent>
                {posting.benefits ? (
                  <div 
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: posting.benefits.replace(/\n/g, '<br />') }}
                  />
                ) : (
                  <p className="text-muted-foreground">{t('jobPostings.show.noBenefits')}</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('jobPostings.show.overview')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('jobPostings.show.status')}</span>
                  <span>{getStatusBadge(posting.status)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('jobPostings.show.employmentType')}</span>
                  <span>{posting.employmentType.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('jobPostings.show.requisition')}</span>
                  <span>{posting.jobRequisition?.requisition_code || 'N/A'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('jobPostings.show.applications')}</span>
                  <span>{posting.applications_count || 0}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('jobPostings.show.details')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {posting.min_salary && posting.max_salary && (
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('jobPostings.show.salary')}</p>
                      <p className="text-muted-foreground">
                        {posting.min_salary.toLocaleString()} - {posting.max_salary.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {(posting.location || posting.is_remote) && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('jobPostings.show.location')}</p>
                      <p className="text-muted-foreground">
                        {posting.is_remote ? t('jobPostings.show.remote') : posting.location}
                      </p>
                    </div>
                  </div>
                )}

                {posting.experience_years !== null && (
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('jobPostings.show.experience')}</p>
                      <p className="text-muted-foreground">
                        {posting.experience_years} {posting.experience_years === 1 ? t('jobPostings.show.year') : t('jobPostings.show.years')}
                      </p>
                    </div>
                  </div>
                )}

                {posting.education_level && (
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('jobPostings.show.education')}</p>
                      <p className="text-muted-foreground">{posting.education_level}</p>
                    </div>
                  </div>
                )}

                {posting.target_start_date && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('jobPostings.show.startDate')}</p>
                      <p className="text-muted-foreground">
                        {new Date(posting.target_start_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {posting.closing_date && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('jobPostings.show.closingDate')}</p>
                      <p className="text-muted-foreground">
                        {new Date(posting.closing_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}