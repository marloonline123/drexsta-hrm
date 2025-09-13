import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Button, buttonVariants } from '@/Components/Ui/button';
import { Label } from '@/Components/Ui/label';
import { Input } from '@/Components/Ui/input';
import { Textarea } from '@/Components/Ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/Ui/select';
import { Save, ArrowLeft } from 'lucide-react';
import { EmploymentType } from '@/Types/employment-types';
import { Department } from '@/Types/deparments';
import { JobTitle } from '@/Types/job-titles';
import { Link } from '@inertiajs/react';
import { JobRequisitionForm } from '@/Types/job-requisitions';
import { InputError } from '@/Components/Ui/InputError';

interface JobRequisitionsCreateProps {
    employmentTypes: EmploymentType[];
    departments: Department[];
    jobTitles: JobTitle[];
    handleSubmit: (e: React.FormEvent) => void;
    data: JobRequisitionForm;
    setData: (key: string, value: string | number) => void;
    processing: boolean;
    errors: Record<string, string>;
}

export default function JobRequistionForm({ departments, jobTitles, employmentTypes, handleSubmit, data, setData, processing, errors }: JobRequisitionsCreateProps) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Information */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Job Details</CardTitle>
                            <CardDescription>
                                Provide details about the position to be filled
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="department_id">
                                        Department <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={data.department_id.toString()}
                                        onValueChange={(value) => setData('department_id', parseInt(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departments.map((department) => (
                                                <SelectItem key={department.id} value={department.id.toString()}>
                                                    {department.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors?.department_id} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="job_title_id">
                                        Job Title <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={data.job_title_id.toString()}
                                        onValueChange={(value) => setData('job_title_id', parseInt(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select job title" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {jobTitles.map((jobTitle) => (
                                                <SelectItem key={jobTitle.id} value={jobTitle.id.toString()}>
                                                    {jobTitle.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors?.job_title_id} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="number_of_positions">
                                    Number of Positions <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="number_of_positions"
                                    type="number"
                                    min="1"
                                    value={data.number_of_positions}
                                    onChange={(e) => setData('number_of_positions', parseInt(e.target.value) || 1)}
                                />
                                <InputError message={errors?.number_of_positions} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="job_description">Job Description</Label>
                                <Textarea
                                    id="job_description"
                                    rows={4}
                                    value={data.job_description || ''}
                                    onChange={(e) => setData('job_description', e.target.value)}
                                    placeholder="Describe the role, responsibilities, and duties..."
                                />
                                <InputError message={errors?.job_description} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="requirements">Requirements</Label>
                                <Textarea
                                    id="requirements"
                                    rows={4}
                                    value={data.requirements || ''}
                                    onChange={(e) => setData('requirements', e.target.value)}
                                    placeholder="List the qualifications, skills, and experience required..."
                                />
                                <InputError message={errors?.requirements} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Information</CardTitle>
                            <CardDescription>
                                Provide additional details about the requisition
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="reason">Reason for Requisition</Label>
                                <Textarea
                                    id="reason"
                                    rows={3}
                                    value={data.reason || ''}
                                    onChange={(e) => setData('reason', e.target.value)}
                                    placeholder="Explain why this position is needed..."
                                />
                                <InputError message={errors?.reason} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="additional_notes">Additional Notes</Label>
                                <Textarea
                                    id="additional_notes"
                                    rows={3}
                                    value={data.additional_notes || ''}
                                    onChange={(e) => setData('additional_notes', e.target.value)}
                                    placeholder="Any other relevant information..."
                                />
                                <InputError message={errors?.additional_notes} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Employment Details</CardTitle>
                            <CardDescription>
                                Specify employment terms and conditions
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="employment_type_id">Employment Type</Label>
                                <Select
                                    value={data.employment_type_id.toString()}
                                    onValueChange={(value) => setData('employment_type_id', parseInt(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Employment Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {employmentTypes.map((employmentType) => (
                                            <SelectItem key={employmentType.id} value={employmentType.id.toString()}>
                                                {employmentType.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors?.employment_type_id} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="min_salary">Min Salary</Label>
                                    <Input
                                        id="min_salary"
                                        type="number"
                                        step="0.01"
                                        value={data.min_salary || ''}
                                        onChange={(e) => setData('min_salary', e.target.value)}
                                        placeholder="0.00"
                                    />
                                    <InputError message={errors?.min_salary} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="max_salary">Max Salary</Label>
                                    <Input
                                        id="max_salary"
                                        type="number"
                                        step="0.01"
                                        value={data.max_salary || ''}
                                        onChange={(e) => setData('max_salary', e.target.value)}
                                        placeholder="0.00"
                                    />
                                    <InputError message={errors?.max_salary} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="target_start_date">Target Start Date</Label>
                                <Input
                                    id="target_start_date"
                                    type="date"
                                    value={data.target_start_date || ''}
                                    onChange={(e) => setData('target_start_date', e.target.value)}
                                />
                                <InputError message={errors?.target_start_date} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col gap-3">
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? 'Saving...' : 'Saving Requisition'}
                        </Button>
                        <Link
                            href={route('dashboard.job-requisitions.index')}
                            className={buttonVariants({ variant: 'outline' })}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to List
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    )
}
