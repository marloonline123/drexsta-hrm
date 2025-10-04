import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Button } from '@/Components/Ui/button';
import { Badge } from '@/Components/Ui/badge';
import { Label } from '@/Components/Ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { type BreadcrumbItem, JobApplication } from '@/Types';
import { Edit, Trash2, Briefcase, Mail, Phone, Download } from 'lucide-react';
import { DeleteModal } from '@/Components/Shared/DeleteModal';
import { toast } from 'sonner';
import UpdateStatusModal from '@/Components/JobApplications/UpdateStatusModal';

interface JobApplicationsShowProps {
  application: JobApplication;
}

export default function JobApplicationsShow({ application }: JobApplicationsShowProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'applied':
        return <Badge className="bg-blue-100 text-blue-800">Applied</Badge>;
      case 'under_review':
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case 'interview':
        return <Badge className="bg-purple-100 text-purple-800">Interview</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'hired':
        return <Badge className="bg-green-100 text-green-800">Hired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: route('dashboard.index'),
    },
    {
      title: 'Job Applications',
      href: route('dashboard.job-applications.index'),
    },
    {
      title: `${application.name} ${application.last_name}`,
      href: route('dashboard.job-applications.show', application.id),
    },
  ];

  const handleDelete = async () => {
    router.delete(route('dashboard.job-applications.destroy', application.id), {
      onSuccess: () => {
        toast.success('Job application deleted successfully.');
        router.visit(route('dashboard.job-applications.index'));
      },
      onError: () => {
        toast.error('Failed to delete job application.');
      }
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Job Application - ${application.name} ${application.last_name} - Administration`} />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="h-8 w-8" />
              Job Application Details
            </h1>
            <p className="text-muted-foreground">
              View details for {application.name} {application.last_name}'s application
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsUpdateModalOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Update Status
            </Button>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(true)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Applicant Information</CardTitle>
                <CardDescription>
                  Personal details of the job applicant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <p className="text-sm">{application.name} {application.last_name}</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <p className="text-sm flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {application.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {application.phone}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Applied Position</Label>
                    <p className="text-sm">{application.jobPosting.title}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Cover Letter</Label>
                  <p className="text-sm whitespace-pre-wrap">
                    {application.cover_letter || 'No cover letter provided'}
                  </p>
                </div>

                {application.resume_path && (
                  <div className="space-y-2">
                    <Label className='block'>Resume</Label>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/storage/${application.resume_path}`} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        Download Resume
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {application.custom_fields && Object.keys(application.custom_fields).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                  <CardDescription>
                    Custom fields from the application form
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(application.custom_fields).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Label>
                      <p className="text-sm">{String(value)}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Information</CardTitle>
                <CardDescription>
                  Key details about this application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Application Status</Label>
                  <div>{getStatusBadge(application.status)}</div>
                </div>

                <div className="space-y-2">
                  <Label>Applied Date</Label>
                  <p className="text-sm">
                    {new Date(application.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Last Updated</Label>
                  <p className="text-sm">
                    {new Date(application.updated_at).toLocaleDateString()}
                  </p>
                </div>

                {application.token_expires_at && (
                  <div className="space-y-2">
                    <Label>Edit Token Expires</Label>
                    <p className="text-sm">
                      {new Date(application.token_expires_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Posting Details</CardTitle>
                <CardDescription>
                  Information about the position applied for
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <p className="text-sm">{application.jobPosting.title}</p>
                </div>

                {application.jobPosting.location && (
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <p className="text-sm">{application.jobPosting.location}</p>
                  </div>
                )}

                {application.jobPosting.employmentType && (
                  <div className="space-y-2">
                    <Label>Employment Type</Label>
                    <p className="text-sm">{application.jobPosting.employmentType.name}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Update Status Modal */}
      <UpdateStatusModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        application={application}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        title="Delete Job Application"
        description={`Are you sure you want to delete the application from ${application.name} ${application.last_name}? This action cannot be undone.`}
      />
    </AppLayout>
  );
}