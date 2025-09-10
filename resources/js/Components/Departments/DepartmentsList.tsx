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
import EmptyResource from '../Shared/EmptyResource';

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
                        <EmptyResource icon={Building} title={t('departments.noCompanies')} text={t('departments.noDepartments')} />
                )}
            </CardContent>
        </Card>
    )
}
