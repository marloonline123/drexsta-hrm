import React from 'react'
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Textarea } from '@/Components/Ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Switch } from '@/Components/Ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/Ui/avatar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/Ui/select';
import InputError from '@/Components/input-error';
import { Button, buttonVariants } from '../Ui/button';
import { Save } from 'lucide-react';
import { Form, Link } from '@inertiajs/react';

interface Employee {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    position: string;
}

interface Department {
    id: number;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    annual_budget: number;
    manager: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
}

interface DepartmentFormProps {
    action: string;
    department?: Department;
    employees: Employee[];
    method?: 'post' | 'put' | 'patch';
}

export default function DepartmentForm({
    action,
    department,
    employees = [],
    method = 'post',
}: DepartmentFormProps) {
    return (
        <Form
            action={action}
            method='post'
        >
            {({ processing, errors }) => (
                <div className="space-y-6">
                    {method === 'put' && (
                        <input type="hidden" name="_method" value="PUT" />
                    )}
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Department Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Department Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter department name"
                                    required
                                    autoFocus
                                    defaultValue={department?.name || ''}
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Enter department description"
                                    rows={4}
                                    defaultValue={department?.description || ''}
                                />
                                <InputError message={errors.description} />
                            </div>

                            {/* Annual Budget */}
                            <div className="space-y-2">
                                <Label htmlFor="annual_budget">Annual Budget</Label>
                                <Input
                                    id="annual_budget"
                                    name="annual_budget"
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                    defaultValue={department?.annual_budget || ''}
                                />
                                <InputError message={errors.annual_budget} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Department Manager</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="manager_id">
                                    Select Manager <span className="text-destructive">*</span>
                                </Label>
                                <Select 
                                    name="manager_id" 
                                    defaultValue={department?.manager?.id?.toString() || ''}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a manager" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {employees.map((employee) => (
                                            <SelectItem key={employee.id} value={employee.id.toString()}>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={employee.avatar} />
                                                        <AvatarFallback>
                                                            {employee.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{employee.name}</div>
                                                        <div className="text-sm text-muted-foreground">{employee.position}</div>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.manager_id} />
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
                                    <Label>Department Status</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Enable or disable this department
                                    </p>
                                </div>
                                <Switch
                                    name="is_active"
                                    defaultChecked={department?.is_active ?? true}
                                />
                            </div>
                            <InputError message={errors.is_active} />
                        </CardContent>
                    </Card>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-4 pt-6 border-t">
                        <Link href="/dashboard/departments" className={buttonVariants({ variant: 'outline' })}>
                            Cancel
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? 'Saving...' : (department ? 'Update Department' : 'Create Department')}
                        </Button>
                    </div>
                </div>
            )}
        </Form>
    )
}