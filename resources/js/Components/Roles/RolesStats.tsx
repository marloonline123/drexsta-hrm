import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Crown, Shield, Users, Building } from 'lucide-react';
import { PaginatedData } from '@/Types/global';
import { Role } from '@/Types/roles';

interface RolesStatsProps {
    roles: PaginatedData<Role>;
    groupedPermissions: Record<string, any[]>;
}

export default function RolesStats({ roles, groupedPermissions }: RolesStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Roles
                    </CardTitle>
                    <Crown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{roles.meta.total}</div>
                    <p className="text-xs text-muted-foreground">
                        +2 from last month
                    </p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Permissions
                    </CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {Object.values(groupedPermissions).flat().length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        System permissions
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Active Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {roles.data.reduce((sum, role) => sum + role.users_count, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Total assigned users
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Categories
                    </CardTitle>
                    <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {Object.keys(groupedPermissions).length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Permission categories
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}