import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Form, router } from '@inertiajs/react';
import { InputError } from '../Ui/InputError';
import { LoaderCircle } from 'lucide-react';
import { EmployeeFormData } from '@/Types/employees';

interface EmployeeFormProps {
    action: string;
    method?: string;
    formData?: EmployeeFormData;
}
export default function EmployeeForm({ action, method = 'post', formData }: EmployeeFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Employee Information</CardTitle>
            </CardHeader>
            <CardContent>
                <Form action={action} method={'post'} encType="multipart/form-data">
                    {({ processing, errors }) => (
                        <div className="space-y-6">
                            {method !== 'post' && <Input name='_method' value={method} className='hidden' />}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        name='name'
                                        value={formData?.name}
                                        placeholder="Enter employee's full name"
                                    />
                                    <InputError message={errors?.name} className="mt-2" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name='phone'
                                        type="number"
                                        value={formData?.phone}
                                        placeholder="Enter employee's phone number"
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
                                    value={formData?.email}
                                    placeholder="Enter employee's email address"
                                />
                                <InputError message={errors?.email} className="mt-2" />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit(route('dashboard.employees.index'))}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <span className='flex gap-2'>
                                            <LoaderCircle className="h-4 w-4 animate-spin" /> Saving...
                                        </span>
                                        ) : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>
            </CardContent>
        </Card>
    )
}
