import React from 'react';
import { Head } from '@inertiajs/react';
import { Briefcase } from 'lucide-react';
import { EmploymentType } from '@/Types/employment-types'; import { Department } from '@/Types/deparments';
import { JobTitle } from '@/Types/job-titles';
import JobRequistionForm from '@/Components/JobRequisitions/JobRequistionForm';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { useForm } from '@inertiajs/react';
import { JobRequisition, JobRequisitionForm } from '@/Types/job-requisitions';



interface JobRequisitionsEditProps {
  requisition: JobRequisition;
  employmentTypes: EmploymentType[];
  departments: Department[];
  jobTitles: JobTitle[];
}

export default function JobRequisitionsEdit({ requisition, departments, jobTitles, employmentTypes }: JobRequisitionsEditProps) {
  const { data, setData, put, processing, errors } = useForm<JobRequisitionForm>({
    department_id: requisition.department_id || '',
    job_title_id: requisition.job_title_id || '',
    number_of_positions: requisition.number_of_positions,
    job_description: requisition.job_description || '',
    requirements: requisition.requirements || '',
    employment_type_id: requisition.employment_type_id || '',
    min_salary: requisition.min_salary?.toString() || '',
    max_salary: requisition.max_salary?.toString() || '',
    target_start_date: requisition.target_start_date || '',
    status: requisition.status,
    reason: requisition.reason || '',
    additional_notes: requisition.additional_notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('dashboard.job-requisitions.update', requisition.id));
  };
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
      title: 'Edit',
      href: route('dashboard.job-requisitions.edit', requisition.id),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Job Requisition - Administration" />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="h-8 w-8" />
              Edit Job Requisition
            </h1>
            <p className="text-muted-foreground">
              Edit job requisition {requisition.requisition_code}
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