import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { buttonVariants } from '@/Components/Ui/button';
import { Form, Link } from '@inertiajs/react';
import { Employee } from '@/Types';
import { cn } from '@/Lib/utils';
import FormButton from '../Ui/form-button';
import { InputError } from '../Ui/InputError';
import { Key, KeySquare } from 'lucide-react';

export default function EditEmployeePasswordForm({ employee }: { employee: Employee }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Information</CardTitle>
            </CardHeader>
            <CardContent>
                <Form 
                    action={route('dashboard.employees.update-password', employee.username)} 
                    method="patch"
                    resetOnSuccess
                    options={{ 
                        preserveScroll: true
                     }}
                >
                    {({ processing, errors }) => (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="flex items-center gap-2">
                                        <Key className="h-4 w-4" />
                                        New Password
                                    </Label>
                                    <Input
                                        id="password"
                                        name='password'
                                        type="password"
                                        placeholder="Leave blank to keep current password"
                                        defaultValue=''
                                    />
                                    <InputError message={errors?.password} className='mt-2' />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation" className='flex items-center gap-2'>
                                        <KeySquare className="h-4 w-4" />
                                        Confirm New Password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        placeholder="Confirm new password"
                                        defaultValue=''
                                    />
                                    <InputError message={errors?.password_confirmation} className='mt-2' />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Link
                                    href={route('dashboard.employees.show', employee.username)}
                                    className={cn(buttonVariants({ variant: 'outline' }))}
                                >
                                    Cancel
                                </Link>
                                <FormButton text="Save Password" loadingText="Saving..." isLoading={processing} />
                            </div>
                        </div>
                    )}
                </Form>
            </CardContent>
        </Card>
    )
}
