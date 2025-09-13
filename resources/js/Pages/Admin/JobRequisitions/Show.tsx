import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Button } from '@/Components/Ui/button';
import { Badge } from '@/Components/Ui/badge';
import { Label } from '@/Components/Ui/label';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Link } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { JobRequisition } from '@/Types/job-requisitions';
import DeleteJobRequisitionModal from '@/Components/JobRequisitions/DeleteJobRequisitionModal';



interface JobRequisitionsShowProps {
  requisition: JobRequisition;
}

export default function JobRequisitionsShow({ requisition }: JobRequisitionsShowProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'pending_approval':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'closed':
        return <Badge variant="outline">Closed</Badge>;
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
      title: 'Job Requisitions',
      href: route('dashboard.job-requisitions.index'),
    },
    {
      title: "Job Requisition " + requisition.requisition_code,
      href: route('dashboard.job-requisitions.show', requisition.id),
    },
  ];

  const handleDeleteSuccess = () => {
    router.visit(route('dashboard.job-requisitions.index'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Job Requisition ${requisition.requisition_code} - Administration`} />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="h-8 w-8" />
              Job Requisition Details
            </h1>
            <p className="text-muted-foreground">
              View details for requisition {requisition.requisition_code}
            </p>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={route('dashboard.job-requisitions.edit', requisition.id)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
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
                <CardTitle>Job Details</CardTitle>
                <CardDescription>
                  Information about the position to be filled
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <p className="text-sm">{requisition.department?.name || 'N/A'}</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <p className="text-sm">{requisition.jobTitle?.title || 'N/A'}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Number of Positions</Label>
                  <p className="text-sm">{requisition.number_of_positions}</p>
                </div>

                <div className="space-y-2">
                  <Label>Job Description</Label>
                  <p className="text-sm whitespace-pre-wrap">
                    {requisition.job_description || 'No description provided'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Requirements</Label>
                  <p className="text-sm whitespace-pre-wrap">
                    {requisition.requirements || 'No requirements specified'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>
                  Additional details about the requisition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Reason for Requisition</Label>
                  <p className="text-sm whitespace-pre-wrap">
                    {requisition.reason || 'No reason provided'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <p className="text-sm whitespace-pre-wrap">
                    {requisition.additional_notes || 'No additional notes'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Requisition Information</CardTitle>
                <CardDescription>
                  Key details about this requisition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Requisition Code</Label>
                  <p className="text-sm font-medium">{requisition.requisition_code}</p>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <div>{getStatusBadge(requisition.status)}</div>
                </div>

                <div className="space-y-2">
                  <Label>Requested By</Label>
                  <p className="text-sm">{requisition.requester?.name || 'N/A'}</p>
                </div>

                <div className="space-y-2">
                  <Label>Created At</Label>
                  <p className="text-sm">
                    {new Date(requisition.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Last Updated</Label>
                  <p className="text-sm">
                    {new Date(requisition.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employment Details</CardTitle>
                <CardDescription>
                  Employment terms and conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Employment Type</Label>
                  <p className="text-sm capitalize">
                    {requisition.employment_type?.name.replace('_', ' ')}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Salary Range</Label>
                  <p className="text-sm">
                    {requisition.min_salary ? `$${requisition.min_salary}` : 'N/A'} - 
                    {requisition.max_salary ? ` $${requisition.max_salary}` : ' N/A'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Target Start Date</Label>
                  <p className="text-sm">
                    {requisition.target_start_date 
                      ? new Date(requisition.target_start_date).toLocaleDateString()
                      : 'Not specified'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
              </div>
        
              <DeleteJobRequisitionModal
                requisition={requisition}
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onSuccess={handleDeleteSuccess}
              />
            </AppLayout>
          );
        }
        
        // Import statements for missing components
        import { Briefcase } from 'lucide-react';
