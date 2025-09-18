import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { buttonVariants } from '@/Components/Ui/button';
import { Form, Link } from '@inertiajs/react';
import { Employee } from '@/Types';
import { cn } from '@/Lib/utils';
import FormButton from '../Ui/form-button';
import { InputError } from '../Ui/InputError';

export default function EditEmployeeInfoForm({ employee }: { employee: Employee }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Information</CardTitle>
            </CardHeader>
            <CardContent>
                <Form 
                    action={route('dashboard.employees.update', employee.username)} 
                    method="patch"
                    options={{ 
                        preserveScroll: true
                     }}
                >
                    {({ processing, errors }) => (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        name='name'
                                        defaultValue={employee.name}
                                        placeholder="Enter employee's full name"
                                    />
                                    <InputError message={errors?.name} className="mt-2" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name='phone'
                                        type='number'
                                        defaultValue={employee.phone?.toString()}
                                        placeholder="Enter employee's mobile phone"
                                    />
                                    <InputError message={errors?.phone} className="mt-2" />
                                </div>

                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    name='email'
                                    type="email"
                                    defaultValue={employee.email}
                                    placeholder="Enter employee's email address"
                                />
                                <InputError message={errors?.email} className="mt-2" />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Link
                                    href={route('dashboard.employees.show', employee.username)}
                                    className={cn(buttonVariants({ variant: 'outline' }))}
                                >
                                    Cancel
                                </Link>
                                <FormButton text="Save" loadingText="Saving..." isLoading={processing} />
                            </div>
                        </div>
                    )}
                </Form>
            </CardContent>
        </Card>
    )
}
