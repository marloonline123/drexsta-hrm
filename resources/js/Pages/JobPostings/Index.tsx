import { Head } from '@inertiajs/react';
import { Building, MapPin, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Badge } from '@/Components/Ui/badge';
import { JobPosting } from '@/Types/job-postings';
import { useLanguage } from '@/Hooks/use-language';
import { PaginatedData } from '@/Types/global';

interface JobPostingsIndexProps {
  postings: PaginatedData<JobPosting>;
}

export default function PublicJobPostingsIndex({ postings }: JobPostingsIndexProps) {
  const { t } = useLanguage();
  const postingsData = postings.data;
  console.log('postingsData', postings);
  

  return (
    <div className="min-h-screen bg-background">
      <Head title={t('publicJobs.title')} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('publicJobs.heroTitle')}</h1>
          <p className="text-xl mb-8">{t('publicJobs.heroDescription')}</p>
        </div>
      </div>

      {/* Job Listings */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{t('publicJobs.openPositions')}</h2>
          <p className="text-muted-foreground">{t('publicJobs.browsePositions')}</p>
        </div>

        {postingsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postingsData.map((posting) => (
              <Card key={posting.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span>{posting.title}</span>
                    {posting.is_remote && (
                      <Badge variant="secondary">{t('publicJobs.remote')}</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center mt-2">
                      <Building className="h-4 w-4 mr-2" />
                      <span>
                        {posting.jobRequisition?.department?.name || 'Department N/A'}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {posting.location && (
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{posting.location}</span>
                    </div>
                  )}

                  {posting.min_salary && posting.max_salary && (
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {posting.min_salary.toLocaleString()} - {posting.max_salary.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center mb-4">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm capitalize">
                      {posting.employmentType.name.replace('_', ' ')}
                    </span>
                  </div>

                  {posting.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {posting.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </p>
                  )}
                </CardContent>
                <div className="px-6 pb-6">
                  <Button asChild className="w-full">
                    <a href={route('jobs.show', posting.id)}>
                      {t('publicJobs.viewDetails')}
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('publicJobs.noPositions')}</h3>
            <p className="text-muted-foreground">
              {t('publicJobs.checkBackLater')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}