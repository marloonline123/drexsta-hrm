import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '@/hooks/use-language';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Package,
    CheckCircle,
    X,
    Users,
    BarChart3,
    Headphones,
    Zap,
    Crown,
    Building,
    Shield,
    Sparkles
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Subscriptions',
        href: '/subscriptions',
    },
];

export default function SubscriptionsPage() {
    const { t } = useLanguage();
    const [isAnnual, setIsAnnual] = useState(false);
    const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('');
    
    const currentPlan = 'professional';
    
    // Mock subscription plans
    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            description: 'Perfect for small teams getting started',
            monthlyPrice: 19,
            annualPrice: 190,
            icon: Package,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            features: [
                'Up to 10 employees',
                'Basic reporting',
                'Email support',
                'Mobile app access',
                '5GB storage'
            ],
            limitations: [
                'No API access',
                'No advanced analytics',
                'No priority support'
            ]
        },
        {
            id: 'professional',
            name: 'Professional',
            description: 'Advanced features for growing businesses',
            monthlyPrice: 49,
            annualPrice: 490,
            icon: Building,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
            popular: true,
            features: [
                'Up to 100 employees',
                'Advanced reporting & analytics',
                'Priority email support',
                'API access',
                'Custom fields',
                'Advanced permissions',
                '50GB storage',
                'Integrations'
            ],
            limitations: [
                'No phone support',
                'No white-label options'
            ]
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'Complete solution for large organizations',
            monthlyPrice: 99,
            annualPrice: 990,
            icon: Crown,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
            features: [
                'Unlimited employees',
                'Advanced analytics & insights',
                '24/7 phone & email support',
                'Full API access',
                'Custom integrations',
                'White-label options',
                'Unlimited storage',
                'Dedicated account manager',
                'Advanced security features',
                'Single Sign-On (SSO)',
                'Custom reporting'
            ],
            limitations: []
        }
    ];

    const addons = [
        {
            id: 'advanced_analytics',
            name: 'Advanced Analytics',
            description: 'Deep insights and custom dashboards',
            monthlyPrice: 15,
            annualPrice: 150,
            icon: BarChart3
        },
        {
            id: 'priority_support',
            name: 'Priority Support',
            description: '24/7 phone and chat support',
            monthlyPrice: 25,
            annualPrice: 250,
            icon: Headphones
        },
        {
            id: 'api_access',
            name: 'Extended API Access',
            description: 'Higher rate limits and advanced endpoints',
            monthlyPrice: 20,
            annualPrice: 200,
            icon: Zap
        }
    ];

    const getPrice = (plan: any) => {
        const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
        const period = isAnnual ? 'year' : 'month';
        return { price, period };
    };

    const getDiscount = (monthlyPrice: number, annualPrice: number) => {
        const annualEquivalent = monthlyPrice * 12;
        const discount = ((annualEquivalent - annualPrice) / annualEquivalent) * 100;
        return Math.round(discount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscriptions" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold">Choose Your Plan</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Select the perfect plan for your organization. Upgrade or downgrade at any time.
                    </p>
                    
                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4">
                        <Label htmlFor="billing-toggle" className={!isAnnual ? 'font-medium' : ''}>
                            Monthly
                        </Label>
                        <Switch
                            id="billing-toggle"
                            checked={isAnnual}
                            onCheckedChange={setIsAnnual}
                        />
                        <Label htmlFor="billing-toggle" className={isAnnual ? 'font-medium' : ''}>
                            Annual
                        </Label>
                        {isAnnual && (
                            <Badge className="bg-green-100 text-green-800">
                                Save up to 20%
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {plans.map((plan) => {
                        const { price, period } = getPrice(plan);
                        const Icon = plan.icon;
                        const isCurrentPlan = currentPlan === plan.id;
                        
                        return (
                            <Card 
                                key={plan.id} 
                                className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-lg' : ''} ${isCurrentPlan ? 'border-primary' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-primary text-primary-foreground">
                                            <Sparkles className="h-3 w-3 mr-1" />
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}
                                {isCurrentPlan && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-green-100 text-green-800">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Current Plan
                                        </Badge>
                                    </div>
                                )}
                                
                                <CardHeader className="text-center">
                                    <div className={`inline-flex p-3 rounded-lg ${plan.bgColor} mb-2 mx-auto`}>
                                        <Icon className={`h-6 w-6 ${plan.color}`} />
                                    </div>
                                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                    <div className="pt-4">
                                        <div className="flex items-baseline justify-center">
                                            <span className="text-4xl font-bold">${price}</span>
                                            <span className="text-muted-foreground">/{period}</span>
                                        </div>
                                        {isAnnual && (
                                            <p className="text-sm text-green-600 mt-1">
                                                Save {getDiscount(plan.monthlyPrice, plan.annualPrice)}%
                                            </p>
                                        )}
                                    </div>
                                </CardHeader>
                                
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        {plan.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                        {plan.limitations.map((limitation, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <X className="h-4 w-4 text-red-400" />
                                                <span className="text-sm text-muted-foreground">{limitation}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="pt-4">
                                        {isCurrentPlan ? (
                                            <Button className="w-full" disabled>
                                                Current Plan
                                            </Button>
                                        ) : (
                                            <Dialog open={isUpgradeOpen && selectedPlan === plan.id} onOpenChange={(open) => {
                                                setIsUpgradeOpen(open);
                                                if (!open) setSelectedPlan('');
                                            }}>
                                                <DialogTrigger asChild>
                                                    <Button 
                                                        className="w-full" 
                                                        variant={plan.popular ? 'default' : 'outline'}
                                                        onClick={() => setSelectedPlan(plan.id)}
                                                    >
                                                        {plan.id === 'starter' && currentPlan !== 'starter' ? 'Downgrade' : 'Upgrade'}
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Confirm Plan Change</DialogTitle>
                                                        <DialogDescription>
                                                            Are you sure you want to {plan.id === 'starter' && currentPlan !== 'starter' ? 'downgrade' : 'upgrade'} to the {plan.name} plan?
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <div className="p-4 bg-muted rounded-lg">
                                                            <div className="flex justify-between items-center">
                                                                <span>New Plan:</span>
                                                                <span className="font-medium">{plan.name}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span>Price:</span>
                                                                <span className="font-medium">${price}/{period}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span>Effective:</span>
                                                                <span className="font-medium">Next billing cycle</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end gap-2">
                                                            <Button variant="outline" onClick={() => {
                                                                setIsUpgradeOpen(false);
                                                                setSelectedPlan('');
                                                            }}>
                                                                Cancel
                                                            </Button>
                                                            <Button onClick={() => {
                                                                setIsUpgradeOpen(false);
                                                                setSelectedPlan('');
                                                            }}>
                                                                Confirm Change
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Add-ons Section */}
                <div className="space-y-6 max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Add-ons</h2>
                        <p className="text-muted-foreground">
                            Enhance your plan with additional features
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {addons.map((addon) => {
                            const { price, period } = getPrice(addon);
                            const Icon = addon.icon;
                            
                            return (
                                <Card key={addon.id} className="text-center">
                                    <CardHeader>
                                        <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-2 mx-auto">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg">{addon.name}</CardTitle>
                                        <CardDescription>{addon.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-baseline justify-center mb-4">
                                            <span className="text-2xl font-bold">${price}</span>
                                            <span className="text-muted-foreground">/{period}</span>
                                        </div>
                                        <Button variant="outline" className="w-full">
                                            Add to Plan
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* FAQ or Help Section */}
                <Card className="max-w-4xl mx-auto">
                    <CardHeader className="text-center">
                        <CardTitle>Need Help Choosing?</CardTitle>
                        <CardDescription>
                            Our team is here to help you find the perfect plan for your organization
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="outline">
                                <Headphones className="h-4 w-4 mr-2" />
                                Contact Sales
                            </Button>
                            <Button variant="outline">
                                <Shield className="h-4 w-4 mr-2" />
                                View Security Features
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}