import React from 'react';
import { Head } from '@inertiajs/react';
import { Briefcase } from 'lucide-react';
import { EmploymentType } from '@/Types/employment-types'; import { Department } from '@/Types/deparments';
import { JobTitle } from '@/Types/job-titles';
import JobRequistionForm from '@/Components/JobRequisitions/JobRequistionForm';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { useForm } from '@inertiajs/react';
import { JobRequisitionForm } from '@/Types/job-requisitions';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard.index'),
  },
  {
    title: 'Job Requisitions',
    href: route('dashboard.job-requisitions.index'),
  },
  {
    title: 'Create',
    href: route('dashboard.job-requisitions.create'),
  },
];

interface JobRequisitionsCreateProps {
  employmentTypes: EmploymentType[];
  departments: Department[];
  jobTitles: JobTitle[];
}

export default function JobRequisitionsCreate({ departments, jobTitles, employmentTypes }: JobRequisitionsCreateProps) {
  const { data, setData, post, processing, errors } = useForm<JobRequisitionForm>({
    department_id: '',
    job_title_id: '',
    number_of_positions: 1,
    job_description: '',
    requirements: '',
    employment_type_id: '',
    min_salary: '',
    max_salary: '',
    target_start_date: '',
    reason: '',
    status: 'pending_approval',
    additional_notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('dashboard.job-requisitions.store'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Job Requisition - Administration" />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="h-8 w-8" />
              Create Job Requisition
            </h1>
            <p className="text-muted-foreground">
              Create a new job requisition for recruitment
            </p>
          </div>
        </div>

        <JobRequistionForm 
          departments={departments}
          jobTitles={jobTitles}
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

