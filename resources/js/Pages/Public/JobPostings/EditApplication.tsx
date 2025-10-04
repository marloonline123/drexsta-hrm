import { Head } from '@inertiajs/react';
import { Building, MapPin, Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Label } from '@/Components/Ui/label';
import { Input } from '@/Components/Ui/input';
import { Textarea } from '@/Components/Ui/textarea';
import { useLanguage } from '@/Hooks/use-language';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface EditApplicationProps {
  application: any;
  posting: any;
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function EditApplication({ application, posting, flash }: EditApplicationProps) {
  const { t } = useLanguage();
  
  const { data, setData, put, processing, errors } = useForm({
    first_name: application.first_name || '',
    last_name: application.last_name || '',
    email: application.email || '',
    phone: application.phone || '',
    cover_letter: application.cover_letter || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('applications.update', application.application_token), {
      onSuccess: () => {
        toast.success(t('publicJobs.applicationUpdateSuccess'));
      },
      onError: () => {
        toast.error(t('publicJobs.applicationUpdateError'));
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Head title={t('publicJobs.editApplication')} />

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

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('publicJobs.editApplicationFor')} {posting.title}</h1>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{t('publicJobs.editYourApplication')}</CardTitle>
              <CardDescription>
                {t('publicJobs.editApplicationDescription')}
              </CardDescription>
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
                    disabled
                  />
                  <p className="text-sm text-muted-foreground">
                    {t('publicJobs.emailCannotChange')}
                  </p>
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
                    rows={6}
                    value={data.cover_letter}
                    onChange={(e) => setData('cover_letter', e.target.value)}
                    placeholder={t('publicJobs.coverLetterPlaceholder')}
                  />
                  {errors.cover_letter && (
                    <p className="text-sm text-destructive">{errors.cover_letter}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button type="submit" className="flex-1" disabled={processing}>
                    <Send className="h-4 w-4 mr-2" />
                    {processing ? t('publicJobs.updating') : t('publicJobs.updateApplication')}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {t('publicJobs.goBack')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}