import React from 'react'
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Textarea } from '@/Components/Ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Switch } from '@/Components/Ui/switch';
import InputError from '@/Components/input-error';
import { Button, buttonVariants } from '../Ui/button';
import { Save } from 'lucide-react';
import { Form, Link } from '@inertiajs/react';
import { JobTitle } from '@/Types/job-titles';

interface JobTitleFormProps {
    action: string;
    jobTitle?: JobTitle;
    method?: 'post' | 'put' | 'patch';
    onSuccess?: () => void;
}

export default function JobTitleForm({
    action,
    jobTitle,
    method = 'post',
    onSuccess,
}: JobTitleFormProps) {
    return (
        <Form
            action={action}
            method={method}
            onSuccess={onSuccess}
        >
            {({ processing, errors }) => (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Job Title Name */}
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Job Title Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Enter job title name"
                                    required
                                    autoFocus
                                    defaultValue={jobTitle?.title || ''}
                                />
                                <InputError message={errors.title} />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Enter job title description"
                                    rows={4}
                                    defaultValue={jobTitle?.description || ''}
                                />
                                <InputError message={errors.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Job Title Status</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Enable or disable this job title
                                    </p>
                                </div>
                                <Switch
                                    name="is_active"
                                    defaultChecked={jobTitle?.is_active ?? true}
                                />
                            </div>
                            <InputError message={errors.is_active} />
                        </CardContent>
                    </Card>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-4 pt-6 border-t">
                        <Link href="/dashboard/job-titles" className={buttonVariants({ variant: 'outline' })}>
                            Cancel
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? 'Saving...' : (jobTitle ? 'Update Job Title' : 'Create Job Title')}
                        </Button>
                    </div>
                </div>
            )}
        </Form>
    )
}