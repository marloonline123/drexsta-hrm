import { Head } from '@inertiajs/react';
import { Building, MapPin, DollarSign, User, Calendar, Send } from 'lucide-react';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Badge } from '@/Components/Ui/badge';
import { Label } from '@/Components/Ui/label';
import { Input } from '@/Components/Ui/input';
import { Textarea } from '@/Components/Ui/textarea';
import { JobPosting } from '@/Types/job-postings';
import { useLanguage } from '@/Hooks/use-language';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface JobPostingShowProps {
  posting: JobPosting;
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function PublicJobPostingShow({ posting, flash }: JobPostingShowProps) {
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
    post(route('jobs.apply', posting.id), {
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
    <div className="min-h-screen bg-background">
      <Head title={`${t('publicJobs.jobTitle')} - ${posting.title}`} />

      {flash?.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {flash.success}
        </div>
      )}

      {flash?.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {flash.error}
        </div>
      )}

      {/* Job Header */}
      <div className="bg-gradient-to-r from-primary to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{posting.title}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  <span>{posting.jobRequisition?.department?.name || 'Department N/A'}</span>
                </div>
                {posting.location && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{posting.location}</span>
                  </div>
                )}
                {posting.is_remote && (
                  <Badge variant="secondary" className="bg-white text-primary">
                    {t('publicJobs.remote')}
                  </Badge>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge className="bg-white text-primary text-lg py-2 px-4">
                {posting.employmentType.name}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('publicJobs.jobDescription')}</CardTitle>
              </CardHeader>
              <CardContent>
                {posting.description ? (
                  <div 
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: posting.description }}
                  />
                ) : (
                  <p className="text-muted-foreground">{t('publicJobs.noDescription')}</p>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{t('publicJobs.requirements')}</CardTitle>
              </CardHeader>
              <CardContent>
                {posting.requirements ? (
                  <div 
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: posting.requirements }}
                  />
                ) : (
                  <p className="text-muted-foreground">{t('publicJobs.noRequirements')}</p>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{t('publicJobs.responsibilities')}</CardTitle>
              </CardHeader>
              <CardContent>
                {posting.responsibilities ? (
                  <div 
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: posting.responsibilities }}
                  />
                ) : (
                  <p className="text-muted-foreground">{t('publicJobs.noResponsibilities')}</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with Application Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t('publicJobs.jobDetails')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {posting.min_salary && posting.max_salary && (
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <p className="font-medium">{t('publicJobs.salary')}</p>
                      <p className="text-muted-foreground">
                        {posting.min_salary.toLocaleString()} - {posting.max_salary.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {posting.experience_years !== null && (
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <p className="font-medium">{t('publicJobs.experience')}</p>
                      <p className="text-muted-foreground">
                        {posting.experience_years} {posting.experience_years === 1 ? t('publicJobs.year') : t('publicJobs.years')}
                      </p>
                    </div>
                  </div>
                )}

                {posting.education_level && (
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <p className="font-medium">{t('publicJobs.education')}</p>
                      <p className="text-muted-foreground">{posting.education_level}</p>
                    </div>
                  </div>
                )}

                {posting.target_start_date && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <p className="font-medium">{t('publicJobs.startDate')}</p>
                      <p className="text-muted-foreground">
                        {new Date(posting.target_start_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{t('publicJobs.applyForPosition')}</CardTitle>
                <CardDescription>
                  {t('publicJobs.applyDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">
                        {t('publicJobs.firstName')} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="first_name"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        required
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
                      rows={4}
                      value={data.cover_letter}
                      onChange={(e) => setData('cover_letter', e.target.value)}
                      placeholder={t('publicJobs.coverLetterPlaceholder')}
                    />
                    {errors.cover_letter && (
                      <p className="text-sm text-destructive">{errors.cover_letter}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={processing}>
                    <Send className="h-4 w-4 mr-2" />
                    {processing ? t('publicJobs.submitting') : t('publicJobs.submitApplication')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}