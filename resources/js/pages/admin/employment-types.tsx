import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Briefcase,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Users,
    Calendar,
    DollarSign
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Administration',
        href: '/admin',
    },
    {
        title: 'Employment Types',
        href: '/admin/employment-types',
    },
];

export default function EmploymentTypesPage() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddTypeOpen, setIsAddTypeOpen] = useState(false);
    
    // Mock employment types data
    const employmentTypes = [
        {
            id: 1,
            name: 'Full-time',
            description: 'Standard full-time employment with full benefits',
            hoursPerWeek: 40,
            benefits: true,
            status: 'active',
            employeeCount: 125,
            createdAt: '2023-01-15'
        },
        {
            id: 2,
            name: 'Part-time',
            description: 'Part-time employment with limited benefits',
            hoursPerWeek: 20,
            benefits: false,
            status: 'active',
            employeeCount: 32,
            createdAt: '2023-02-10'
        },
        {
            id: 3,
            name: 'Contract',
            description: 'Fixed-term contract employment',
            hoursPerWeek: 40,
            benefits: false,
            status: 'active',
            employeeCount: 18,
            createdAt: '2023-03-05'
        },
        {
            id: 4,
            name: 'Intern',
            description: 'Internship program for students and recent graduates',
            hoursPerWeek: 30,
            benefits: false,
            status: 'active',
            employeeCount: 8,
            createdAt: '2023-06-01'
        }
    ];

    const getStatusBadge = (status: string) => {
        return status === 'active' ? (
            <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
            </Badge>
        ) : (
            <Badge className="bg-red-100 text-red-800">
                <XCircle className="h-3 w-3 mr-1" />
                Inactive
            </Badge>
        );
    };

    const filteredTypes = employmentTypes.filter(type =>
        type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employment Types" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Briefcase className="h-8 w-8" />
                            Employment Types
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage different employment types and their configurations.
                        </p>
                    </div>
                    <Dialog open={isAddTypeOpen} onOpenChange={setIsAddTypeOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Employment Type
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Employment Type</DialogTitle>
                                <DialogDescription>
                                    Create a new employment type configuration.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="typeName">Type Name</Label>
                                    <Input id="typeName" placeholder="e.g., Full-time" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea 
                                        id="description" 
                                        placeholder="Describe this employment type..."
                                        className="min-h-20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hoursPerWeek">Hours per Week</Label>
                                    <Input id="hoursPerWeek" type="number" placeholder="40" />
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button variant="outline" onClick={() => setIsAddTypeOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={() => setIsAddTypeOpen(false)}>
                                        Create Type
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search and Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="md:col-span-2">
                        <CardContent className="p-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search employment types..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Types</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold">{employmentTypes.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold">
                                {employmentTypes.reduce((sum, type) => sum + type.employeeCount, 0)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Employment Types Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTypes.map((type) => (
                        <Card key={type.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{type.name}</CardTitle>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Edit className="h-4 w-4 mr-2" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="flex items-center gap-2">
                                    {getStatusBadge(type.status)}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm mb-4">{type.description}</p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            Hours/Week
                                        </span>
                                        <span className="font-medium">{type.hoursPerWeek}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-2 text-muted-foreground">
                                            <Users className="h-4 w-4" />
                                            Employees
                                        </span>
                                        <span className="font-medium">{type.employeeCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-2 text-muted-foreground">
                                            <DollarSign className="h-4 w-4" />
                                            Benefits
                                        </span>
                                        <span className="font-medium">
                                            {type.benefits ? 'Included' : 'Not Included'}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredTypes.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No employment types found</h3>
                            <p className="text-muted-foreground">
                                {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first employment type.'}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}