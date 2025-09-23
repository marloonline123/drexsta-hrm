import { Card, CardContent } from '@/Components/Ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/Ui/avatar';
import {
    Mail,
    Phone,
    FileText,
    CheckCircle,
    XCircle,
    AlertCircle,
    MoreHorizontal, Edit, Users, Eye, Trash2,
    MoreVertical,
    Shield,
    IdCard,
    Warehouse,
    Handshake
} from 'lucide-react';
import { Employee } from '@/Types';
import { Badge } from '../Ui/badge';
import { Button } from '../Ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/Ui/dropdown-menu';
import { Link } from '@inertiajs/react';

export default function EmployeeItem({ employee, index }: { employee: Employee, index: number }) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-100 text-green-800">Active</Badge>;
            case 'inactive':
                return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
            case 'on_leave':
                return <Badge className="bg-yellow-100 text-yellow-800">On Leave</Badge>;
            case 'terminated':
                return <Badge className="bg-red-100 text-red-800">Terminated</Badge>;
            default:
                return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'on_leave':
                return <AlertCircle className="h-4 w-4 text-yellow-600" />;
            case 'inactive':
            case 'terminated':
                return <XCircle className="h-4 w-4 text-red-600" />;
            default:
                return <AlertCircle className="h-4 w-4 text-gray-600" />;
        }
    };
    return (
        <Card
            className="hover:shadow-lg transition-all duration-200 group cursor-pointer animate-in fade-in slide-in-from-bottom"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-12 w-12 border-2 border-muted">
                            <AvatarImage src="" alt={employee.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                    {employee.name}
                                </h3>
                                {getStatusIcon(employee.email_verified_at ? 'active' : 'inactive')}
                                {employee.email_verified_at ?
                                    <Badge className="bg-green-100 text-green-800">Active</Badge> :
                                    <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                                }
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        <span>{employee.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        <span>{employee.username}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        <span>Joined: {new Date(employee.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                            <a href={route('dashboard.employees.show', employee.username)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                            </a>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                            <a href={route('dashboard.employees.edit', employee.username)}>
                                <Edit className="h-4 w-4" />
                            </a>
                        </Button> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <Link href={route('dashboard.employees.show', employee.username)}>
                                    <DropdownMenuItem>
                                        <Eye className="mr-2 h-4 w-4" />
                                        View
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={route('dashboard.employees.edit', employee.username)}>
                                    <DropdownMenuItem>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <Link href={route('dashboard.employees.assign-roles', employee.username)}>
                                    <DropdownMenuItem>
                                        <Shield className="mr-2 h-4 w-4" />
                                        Assign Roles
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={route('dashboard.employees.assign-abilities', employee.username)}>
                                    <DropdownMenuItem>
                                        <Handshake className="mr-2 h-4 w-4" />
                                        Assign Abilities
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={route('dashboard.employees.assign-departments', employee.username)}>
                                    <DropdownMenuItem>
                                        <Warehouse className="mr-2 h-4 w-4" />
                                        Assign Departments
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={route('dashboard.employees.assign-roles', employee.username)}>
                                    <DropdownMenuItem>
                                        <IdCard className="mr-2 h-4 w-4" />
                                        Assign Job Titles
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
