import React from 'react';
import { Head } from '@inertiajs/react';
import { Briefcase } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { useForm } from '@inertiajs/react';
import { JobPosting, JobPostingForm } from '@/Types/job-postings';
import JobPostingFormComponent from '@/Components/JobPostings/JobPostingForm';
import { useLanguage } from '@/Hooks/use-language';
import { JobRequisition } from '@/Types/job-requisitions';
import { EmploymentType } from '@/Types/employment-types';

interface JobPostingsEditProps {
  posting: JobPosting;
  requisitions: JobRequisition[];
  employmentTypes: EmploymentType[];
}

export default function JobPostingsEdit({ posting, requisitions, employmentTypes }: JobPostingsEditProps) {
  const { t } = useLanguage();
  const { data, setData, put, processing, errors } = useForm<JobPostingForm>({
    job_requisition_id: posting.job_requisition_id || 0,
    title: posting.title || '',
    description: posting.description || '',
    requirements: posting.requirements || '',
    location: posting.location || '',
    min_salary: posting.min_salary?.toString() || '',
    max_salary: posting.max_salary?.toString() || '',
    employment_type_id: posting.employment_type_id || '',
    target_start_date: posting.target_start_date || '',
    closing_date: posting.closing_date || '',
    status: posting.status || 'draft',
    benefits: posting.benefits || '',
    responsibilities: posting.responsibilities || '',
    experience_years: posting.experience_years || '',
    education_level: posting.education_level || '',
    is_remote: posting.is_remote || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('dashboard.job-postings.update', posting.id));
  };

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
      href: route('dashboard.job-postings.edit', posting.id),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Job Posting - Administration" />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="h-8 w-8" />
              {t('jobPostings.editTitle')}
            </h1>
            <p className="text-muted-foreground">
              {t('jobPostings.editDescription', { title: posting.title })}
            </p>
          </div>
        </div>

        <JobPostingFormComponent 
          requisitions={requisitions}
          employmentTypes={employmentTypes}
          data={data}
          setData={setData}
          processing={processing}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      </div>
    </AppLayout>
  );
}