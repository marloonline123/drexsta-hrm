import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Button } from '@/Components/Ui/button';
import { JobTitle } from '@/Types/job-titles';
import { PaginatedData } from '@/Types/global';
import JobTitlesStats from '@/Components/JobTitles/JobTitlesStats';
import JobTitlesList from '@/Components/JobTitles/JobTitlesList';
import CreateJobTitleModal from '@/Components/JobTitles/CreateJobTitleModal';
import { Plus, BadgeCheck } from 'lucide-react';
import Filter from '@/Components/Shared/Filter';
import Pagination from '@/Components/Shared/Pagination';
import { useState } from 'react';
import EmptyResource from '@/Components/Shared/EmptyResource';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Job Titles',
        href: route('dashboard.job-titles.index'),
    },
];

interface JobTitlesIndexProps {
    jobTitles: PaginatedData<JobTitle>;
}

export default function JobTitlesIndex({ jobTitles }: JobTitlesIndexProps) {
    const jobTitlesData = jobTitles?.data || [];
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    console.log('Job Titles:', jobTitles);
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Job Titles - Administration" />

            <div className="flex-1 space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <BadgeCheck className="h-8 w-8" />
                            Job Titles
                        </h1>
                        <p className="text-muted-foreground">
                            Manage job title categories for your organization
                        </p>
                    </div>

                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Job Title
                    </Button>
                </div>

                {/* Overview Cards */}
                {jobTitles && (
                    <JobTitlesStats jobTitles={jobTitles} />
                )}

                {/* Filters and Search */}
                <Filter
                    routeName='dashboard.job-titles.index'
                    fields={{
                        search: { type: 'text', placeholder: 'Search by title or description' },
                        status: {
                            type: 'select', 
                            placeholder: 'Select Status', 
                            options: [
                                { value: 'all', label: 'All' },
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                            ]
                        },
                    }}
                />

                {/* Job Titles List */}
                {jobTitlesData.length === 0 ? (
                    <EmptyResource 
                        icon={BadgeCheck}
                        title="No Job Titles Found"
                        description="Create a new job title to get started."
                    />
                ) : jobTitles ? (
                    <JobTitlesList 
                        jobTitles={jobTitlesData} 
                    />
                ) : null}

                {/* Pagination */}
                <Pagination
                    meta={jobTitles.meta}
                />
            </div>

            {/* Create Modal */}
            <CreateJobTitleModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                onSuccess={() => {
                    setIsCreateModalOpen(false);
                }}
            />
        </AppLayout>
    );
}