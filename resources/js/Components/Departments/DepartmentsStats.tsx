import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { formatCurrency } from '@/Lib/utils';
import { Department } from '@/Types/deparments';
import { PaginatedData } from '@/Types/global';
import { Building, Crown, User, Users } from 'lucide-react';


export default function DepartmentsStats({ departments }: { departments: PaginatedData<Department> }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
                    <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{departments.meta.total}</div>
                    <p className="text-xs text-muted-foreground">
                        +2 from last month
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Departments</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {departments.data.filter(d => d.is_active).length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {Math.round((departments.meta.active_departments_count / departments.meta.total) * 100)}% of total
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {departments.meta.employees_count}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Across all departments
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                    <Crown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {formatCurrency(departments.data.reduce((sum, dept) => sum + dept.annual_budget, 0))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Annual allocation
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
