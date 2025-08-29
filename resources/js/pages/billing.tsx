import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '@/hooks/use-language';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    CreditCard,
    Download,
    Calendar,
    DollarSign,
    FileText,
    Plus,
    Edit,
    Trash2,
    CheckCircle,
    AlertTriangle,
    Clock,
    Receipt
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Billing',
        href: '/billing',
    },
];

export default function BillingPage() {
    const { t } = useLanguage();
    const [isAddPaymentMethodOpen, setIsAddPaymentMethodOpen] = useState(false);
    
    // Mock billing data
    const currentPlan = {
        name: 'Professional',
        price: 49,
        billingCycle: 'monthly',
        nextBillingDate: '2024-02-27',
        status: 'active',
        features: ['Up to 100 employees', 'Advanced reporting', 'Priority support', 'API access']
    };
    
    const paymentMethods = [
        {
            id: 1,
            type: 'visa',
            lastFour: '4242',
            expiryMonth: 12,
            expiryYear: 2025,
            isDefault: true
        },
        {
            id: 2,
            type: 'mastercard',
            lastFour: '8888',
            expiryMonth: 8,
            expiryYear: 2026,
            isDefault: false
        }
    ];
    
    const invoices = [
        {
            id: 'INV-2024-001',
            date: '2024-01-27',
            amount: 49,
            status: 'paid',
            description: 'Professional Plan - January 2024'
        },
        {
            id: 'INV-2023-012',
            date: '2023-12-27',
            amount: 49,
            status: 'paid',
            description: 'Professional Plan - December 2023'
        },
        {
            id: 'INV-2023-011',
            date: '2023-11-27',
            amount: 49,
            status: 'paid',
            description: 'Professional Plan - November 2023'
        }
    ];

    const getCardIcon = (type: string) => {
        switch (type) {
            case 'visa':
                return '💳';
            case 'mastercard':
                return '💳';
            default:
                return '💳';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
            case 'paid':
                return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>;
            case 'pending':
                return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
            case 'overdue':
                return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />Overdue</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Billing" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <CreditCard className="h-8 w-8" />
                            Billing & Payments
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your subscription, payment methods, and billing history.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Current Plan */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Current Plan
                                    {getStatusBadge(currentPlan.status)}
                                </CardTitle>
                                <CardDescription>
                                    You're currently on the {currentPlan.name} plan
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold">{currentPlan.name} Plan</h3>
                                            <p className="text-muted-foreground">
                                                ${currentPlan.price}/{currentPlan.billingCycle}
                                            </p>
                                        </div>
                                        <Button variant="outline">
                                            Change Plan
                                        </Button>
                                    </div>
                                    <Separator />
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Next billing date</p>
                                            <p className="font-medium">{new Date(currentPlan.nextBillingDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Amount</p>
                                            <p className="font-medium">${currentPlan.price}.00</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-2">Plan includes:</p>
                                        <ul className="text-sm space-y-1">
                                            {currentPlan.features.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Methods */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Payment Methods
                                    <Dialog open={isAddPaymentMethodOpen} onOpenChange={setIsAddPaymentMethodOpen}>
                                        <DialogTrigger asChild>
                                            <Button size="sm">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Payment Method
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add Payment Method</DialogTitle>
                                                <DialogDescription>
                                                    Add a new credit or debit card to your account.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="cardNumber">Card Number</Label>
                                                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="expiry">Expiry Date</Label>
                                                        <Input id="expiry" placeholder="MM/YY" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cvv">CVV</Label>
                                                        <Input id="cvv" placeholder="123" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                                                    <Input id="cardholderName" placeholder="John Doe" />
                                                </div>
                                                <div className="flex justify-end gap-2 pt-4">
                                                    <Button variant="outline" onClick={() => setIsAddPaymentMethodOpen(false)}>
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={() => setIsAddPaymentMethodOpen(false)}>
                                                        Add Card
                                                    </Button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </CardTitle>
                                <CardDescription>
                                    Manage your saved payment methods
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{getCardIcon(method.type)}</span>
                                                <div>
                                                    <p className="font-medium">•••• •••• •••• {method.lastFour}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Expires {method.expiryMonth}/{method.expiryYear}
                                                    </p>
                                                </div>
                                                {method.isDefault && (
                                                    <Badge variant="secondary">Default</Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Billing Summary */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Billing Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Current Plan</span>
                                        <span className="font-medium">${currentPlan.price}/mo</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Next Payment</span>
                                        <span className="font-medium">
                                            {new Date(currentPlan.nextBillingDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between font-medium">
                                        <span>Total Due</span>
                                        <span>${currentPlan.price}.00</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" className="w-full justify-start">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Invoice
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Update Billing Date
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Billing History
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Invoice History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Invoices</CardTitle>
                        <CardDescription>
                            View and download your recent billing invoices
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {invoices.map((invoice) => (
                                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Receipt className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{invoice.id}</p>
                                            <p className="text-sm text-muted-foreground">{invoice.description}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(invoice.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="font-medium">${invoice.amount}.00</p>
                                            {getStatusBadge(invoice.status)}
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}