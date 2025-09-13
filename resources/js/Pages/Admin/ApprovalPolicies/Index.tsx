import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/Ui/table';
import { Badge } from '@/Components/Ui/badge';
import { Edit } from 'lucide-react';
import { PageProps, router } from '@inertiajs/core';
import { Ability, ApprovalPolicy } from '@/Types/approval-policies';
import { ApprovalPolicyEditModal } from '@/Components/ApprovalPolicies/ApprovalPolicyEditModal';
import { toast } from 'sonner';
import AppLayout from '@/layouts/AppLayout';
import { BreadcrumbItem } from '@/Types';
import { t } from 'i18next';

interface ApprovalPoliciesPageProps extends PageProps {
  policies: ApprovalPolicy[];
  abilities: Ability[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: t('nav.dashboard'),
        href: route('dashboard.index'),
    },
    {
        title: t('nav.approvalPolicies'),
        href: route('dashboard.approval-policies.index'),
    },
];

export default function ApprovalPoliciesIndex({ policies, abilities }: ApprovalPoliciesPageProps) {
  const [editingPolicy, setEditingPolicy] = useState<ApprovalPolicy | null>(null);
  console.log('Policies:', policies);
  

  const handleEdit = (policy: ApprovalPolicy) => {
    setEditingPolicy(policy);
  };

  const handleUpdateSteps = (policyId: number, newSteps: string[]) => {
    router.patch(route('dashboard.approval-policies.update', policyId), {
      steps: newSteps,
    }, {
      onSuccess: () => {
        toast.success('Approval policy updated successfully.');
      },
      onError: () => {
        toast.error('Failed to update approval policy.');
      },
      onFinish: () => {
        setEditingPolicy(null);
      }
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Approval Policies" />
      
      <div className='space-y-6 p-6'>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Approval Policies</h1>
            <p className="text-muted-foreground">
              Manage approval workflows and required abilities for different actions
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Approval Policies</CardTitle>
            <CardDescription>
              Configure the required abilities for different approval actions.
              You can reorder or remove abilities from each policy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Required Abilities</TableHead>
                  <TableHead>Steps Count</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="font-medium">{policy.action}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {policy.steps.length > 0 ? (
                          policy.steps.map((step, index) => {
                            const ability = abilities.find(a => a.key === step);
                            return (
                              <Badge key={index} variant="secondary">
                                {ability ? ability.label : step}
                              </Badge>
                            );
                          })
                        ) : (
                          <Badge variant="outline">No approval required</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{policy.steps.length}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(policy)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {editingPolicy && (
          <ApprovalPolicyEditModal
            policy={editingPolicy}
            abilities={abilities}
            onClose={() => setEditingPolicy(null)}
            onUpdateSteps={handleUpdateSteps}
          />
        )}
      </div>
    </AppLayout>
  );
}