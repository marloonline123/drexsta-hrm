import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/Ui/table';
import { Department } from '@/Types/deparments';
import DepartmentTableRow from './DepartmentTableRow';
import { Building } from 'lucide-react';
import { t } from 'i18next';

export default function DepartmentsList({ departments }: { departments: Department[] }) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Department Management</CardTitle>
                <CardDescription>
                    View and manage all organizational departments
                </CardDescription>
            </CardHeader>
            <CardContent>
                {departments.length > 0 ? (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Manager</TableHead>
                                    <TableHead>Employees</TableHead>
                                    <TableHead>Budget</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="w-[70px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {departments.map((department) => (
                                    <DepartmentTableRow key={department.id} department={department} />
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">{t('departments.noCompanies')}</h3>
                            <p className="text-muted-foreground">
                                {t('departments.createFirst')}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    )
}
