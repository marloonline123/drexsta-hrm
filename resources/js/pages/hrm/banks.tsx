import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    CreditCard,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Building,
    MapPin,
    Phone,
    Globe,
    Hash,
    CheckCircle,
    XCircle
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Banks',
        href: '/hrm/banks',
    },
];

export default function BanksPage() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isAddBankOpen, setIsAddBankOpen] = useState(false);
    
    // Mock bank data
    const banks = [
        {
            id: 1,
            name: 'First National Bank',
            code: 'FNB001',
            swiftCode: 'FNBKUS33',
            routingNumber: '123456789',
            address: '123 Banking Street, New York, NY 10001',
            phone: '+1 (555) 123-4567',
            website: 'www.firstnational.com',
            contactPerson: 'John Smith',
            contactEmail: 'john.smith@firstnational.com',
            status: 'active',
            accountsCount: 45,
            createdAt: '2023-01-15'
        },
        {
            id: 2,
            name: 'Global Commerce Bank',
            code: 'GCB002',
            swiftCode: 'GCBKUS44',
            routingNumber: '987654321',
            address: '456 Commerce Ave, Chicago, IL 60601',
            phone: '+1 (555) 987-6543',
            website: 'www.globalcommerce.com',
            contactPerson: 'Sarah Johnson',
            contactEmail: 'sarah.johnson@globalcommerce.com',
            status: 'active',
            accountsCount: 32,
            createdAt: '2022-08-20'
        },
        {
            id: 3,
            name: 'Metro Credit Union',
            code: 'MCU003',
            swiftCode: 'MCUOUS55',
            routingNumber: '456789123',
            address: '789 Union Plaza, Los Angeles, CA 90210',
            phone: '+1 (555) 456-7890',
            website: 'www.metrocreditunion.com',
            contactPerson: 'Maria Garcia',
            contactEmail: 'maria.garcia@metrocreditunion.com',
            status: 'inactive',
            accountsCount: 8,
            createdAt: '2023-03-10'
        }
    ];

    const statusOptions = [
        { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
        { value: 'inactive', label: 'Inactive', color: 'bg-gray-100 text-gray-800' },
        { value: 'suspended', label: 'Suspended', color: 'bg-red-100 text-red-800' }
    ];

    const getStatusBadge = (status: string) => {
        const statusConfig = statusOptions.find(s => s.value === status);
        return (
            <Badge className={statusConfig?.color || 'bg-gray-100 text-gray-800'}>
                {statusConfig?.label || status}
            </Badge>
        );
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'inactive':
            case 'suspended':
                return <XCircle className="h-4 w-4 text-red-600" />;
            default:
                return <XCircle className="h-4 w-4 text-gray-600" />;
        }
    };

    const filteredBanks = banks.filter(bank => {
        const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            bank.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            bank.swiftCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            bank.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || bank.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Banks" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <CreditCard className="h-8 w-8" />
                            Banks
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage banking partners and financial institutions for payroll operations.
                        </p>
                    </div>
                    <Dialog open={isAddBankOpen} onOpenChange={setIsAddBankOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Bank
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Add New Bank</DialogTitle>
                                <DialogDescription>
                                    Add a new banking partner for payroll and financial operations.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="bankName">Bank Name</Label>
                                        <Input id="bankName" placeholder="e.g., First National Bank" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bankCode">Bank Code</Label>
                                        <Input id="bankCode" placeholder="e.g., FNB001" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="swiftCode">SWIFT Code</Label>
                                        <Input id="swiftCode" placeholder="e.g., FNBKUS33" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="routingNumber">Routing Number</Label>
                                        <Input id="routingNumber" placeholder="e.g., 123456789" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" placeholder="Full bank address" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" placeholder="+1 (555) 123-4567" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="website">Website</Label>
                                        <Input id="website" placeholder="www.bank.com" />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button variant="outline" onClick={() => setIsAddBankOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={() => setIsAddBankOpen(false)}>
                                        Add Bank
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex-1 min-w-64">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search banks by name, code, SWIFT, or contact person..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <Select value={filterStatus} onValueChange={setFilterStatus}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        {statusOptions.map(status => (
                                            <SelectItem key={status.value} value={status.value}>
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Banks Grid */}
                <div className="grid gap-4">
                    {filteredBanks.map((bank, index) => (
                        <Card 
                            key={bank.id} 
                            className="hover:shadow-lg transition-all duration-200 group cursor-pointer animate-in fade-in slide-in-from-bottom"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                                {bank.name}
                                            </CardTitle>
                                            {getStatusIcon(bank.status)}
                                            {getStatusBadge(bank.status)}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Hash className="h-3 w-3" />
                                                <span>{bank.code}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Building className="h-3 w-3" />
                                                <span>SWIFT: {bank.swiftCode}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span>{bank.accountsCount} accounts</span>
                                            </div>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Eye className="h-4 w-4 mr-2" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Edit className="h-4 w-4 mr-2" />
                                                Edit Bank
                                            </DropdownMenuItem>
                                            <Separator className="my-1" />
                                            <DropdownMenuItem className="text-red-600">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete Bank
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-2 text-muted-foreground">
                                            <MapPin className="h-4 w-4 mt-0.5" />
                                            <div>
                                                <p className="font-medium">Address</p>
                                                <p className="text-sm">{bank.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Phone className="h-4 w-4" />
                                            <span>{bank.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Globe className="h-4 w-4" />
                                            <span>{bank.website}</span>
                                        </div>
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex items-center justify-between text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Contact: </span>
                                        <span className="font-medium">{bank.contactPerson}</span>
                                        <span className="text-muted-foreground"> ({bank.contactEmail})</span>
                                    </div>
                                    <div className="text-muted-foreground">
                                        Routing: <span className="font-mono">{bank.routingNumber}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredBanks.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No banks found</h3>
                            <p className="text-muted-foreground mb-4">
                                {searchTerm || filterStatus 
                                    ? 'Try adjusting your search or filter criteria.'
                                    : 'Get started by adding your first banking partner.'}
                            </p>
                            {!(searchTerm || filterStatus) && (
                                <Button onClick={() => setIsAddBankOpen(true)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add First Bank
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}