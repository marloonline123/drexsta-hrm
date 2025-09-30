import { Form, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Employee } from '@/Types/employees';
import { router } from '@inertiajs/react';
import { User, Warehouse } from 'lucide-react';
import { Separator } from '@/Components/Ui/separator';
import { Badge } from '@/Components/Ui/badge';
import { Checkbox } from '@/Components/Ui/checkbox';
import { useState } from 'react';
import FormButton from '@/Components/Ui/form-button';
import InputError from '@/Components/input-error';
import { truncateText } from '@/Lib/utils';
import { JobTitle } from '@/Types/job-titles';

interface AssignJobTitlesProps {
    employee: Employee;
    jobTitles: JobTitle[];
}

export default function AssignJobTitles({ employee, jobTitles }: AssignJobTitlesProps) {
    console.log(employee);
    const [selectedJobTitles, setSelectedJobTitles] = useState<number[]>(
        employee.jobTitles?.map(jobTitle => jobTitle.id) || []
    );



    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard.index'),
        },
        {
            title: 'Employees',
            href: route('dashboard.employees.index'),
        },
        {
            title: employee.name,
            href: route('dashboard.employees.show', employee.username),
        },
        {
            title: 'Assign Job Titles',
            href: route('dashboard.employees.assign-jobTitles', employee.username),
        },
    ];

    const handleJobTitlesToggle = (jobTitleId: number) => {
        setSelectedJobTitles(prev =>
            prev.includes(jobTitleId)
                ? prev.filter(id => id !== jobTitleId)
                : [...prev, jobTitleId]
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Assign Job Titles - ${employee.name}`} />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Warehouse className="h-8 w-8" />
                            Assign Job Titles
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage Job Titles for employee: {employee.name}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Employee Info Card */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Employee</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="bg-primary/10 rounded-full p-4">
                                        <User className="h-12 w-12 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold">{employee.name}</h3>
                                        <p className="text-muted-foreground">{employee.email}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className="font-semibold mb-2">Current Job Titles</h4>
                                    {employee.jobTitles && employee.jobTitles.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {employee.jobTitles.map((department) => (
                                                <Badge key={department.id} variant="secondary" className="mr-2 mb-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                                                    {department.title}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground text-sm">No Job Titles assigned</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* jobTitles Assignment Card */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Available Job Titles</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Form action={route('dashboard.employees.assign-jobTitles', employee.username)} method='post' className="space-y-6">
                                    {({ processing, errors }) => (
                                        <>
                                            {jobTitles && jobTitles.length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {jobTitles.map((jobTitle) => (
                                                        <label
                                                            htmlFor={`jobTitle-${jobTitle.id}`}
                                                            key={jobTitle.id}
                                                            className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                                                        >
                                                            <Checkbox
                                                                id={`jobTitle-${jobTitle.id}`}
                                                                name="jobTitles[]"
                                                                value={jobTitle.id}
                                                                checked={selectedJobTitles.includes(jobTitle.id)}
                                                                onCheckedChange={() => handleJobTitlesToggle(jobTitle.id)}
                                                            />
                                                            <div className="flex-1">
                                                                <div
                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                >
                                                                    {jobTitle.title}
                                                                </div>
                                                                {jobTitle.description && (
                                                                    <p className="text-xs text-muted-foreground mt-1">
                                                                        {truncateText(jobTitle.description, 100)}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <InputError message={errors?.jobTitles} className="mt-2" />
                                                        </label>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <Warehouse className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                                    <h3 className="text-lg font-semibold mb-2">No Job Titles available</h3>
                                                    <p className="text-muted-foreground">
                                                        Create Job Titles first to assign them to employees.
                                                    </p>
                                                </div>
                                            )}

                                            <div className="flex justify-end gap-3 pt-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => router.visit(route('dashboard.employees.index'))}
                                                >
                                                    Cancel
                                                </Button>
                                                <FormButton text='Assign Job Titles' loadingText='Assigning...' type="submit" isLoading={processing} />
                                            </div>
                                        </>
                                    )}
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
