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
import { EmploymentType } from '@/Types/employment-types';

interface EmploymentTypeFormProps {
    action: string;
    employmentType?: EmploymentType;
    method?: 'post' | 'put' | 'patch';
    onSuccess?: () => void;
}

export default function EmploymentTypeForm({
    action,
    employmentType,
    method = 'post',
    onSuccess,
}: EmploymentTypeFormProps) {
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
                            {/* Employment Type Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Employment Type Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter employment type name"
                                    required
                                    autoFocus
                                    defaultValue={employmentType?.name || ''}
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Enter employment type description"
                                    rows={4}
                                    defaultValue={employmentType?.description || ''}
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
                                    <Label>Employment Type Status</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Enable or disable this employment type
                                    </p>
                                </div>
                                <Switch
                                    name="is_active"
                                    defaultChecked={employmentType?.is_active ?? true}
                                />
                            </div>
                            <InputError message={errors.is_active} />
                        </CardContent>
                    </Card>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-4 pt-6 border-t">
                        <Link href="/dashboard/employment-types" className={buttonVariants({ variant: 'outline' })}>
                            Cancel
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? 'Saving...' : (employmentType ? 'Update Employment Type' : 'Create Employment Type')}
                        </Button>
                    </div>
                </div>
            )}
        </Form>
    )
}
