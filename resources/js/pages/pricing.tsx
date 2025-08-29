import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PricingCard } from '@/components/ui/pricing-card';
import { useLanguage } from '@/hooks/use-language';
import { Head, Link } from '@inertiajs/react';
import { Check, X, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function Pricing() {
    const { t, isRTL } = useLanguage();
    const [isYearly, setIsYearly] = useState(false);

    const pricingPlans = [
        {
            title: t('pricing.freeTrial'),
            description: 'Perfect for small teams getting started',
            price: { monthly: 0, yearly: 0 },
            features: [
                'Up to 10 employees',
                'Basic HR management',
                'Attendance tracking',
                'Basic reporting',
                'Email support',
                'Mobile app access',
                '14-day trial period'
            ],
        },
        {
            title: t('pricing.pro'),
            description: 'Ideal for growing businesses',
            price: { monthly: 29, yearly: 290 },
            features: [
                'Up to 100 employees',
                'Advanced HR features',
                'Payroll management',
                'Leave management',
                'Priority support',
                'Advanced reporting',
                'API access',
                'Custom workflows',
                'Data export/import'
            ],
            isPopular: true,
        },
        {
            title: t('pricing.proPlus'),
            description: 'For large organizations with complex needs',
            price: { monthly: 59, yearly: 590 },
            features: [
                'Unlimited employees',
                'All Pro features',
                'Multi-branch support',
                'Advanced analytics',
                'Dedicated support',
                'White-label options',
                'Custom integrations',
                'SSO authentication',
                'Advanced security',
                'Custom training'
            ],
        },
    ];

    const comparisonFeatures = [
        {
            category: 'Employee Management',
            features: [
                { name: 'Employee profiles', free: true, pro: true, proPlus: true },
                { name: 'Department management', free: true, pro: true, proPlus: true },
                { name: 'Role-based permissions', free: false, pro: true, proPlus: true },
                { name: 'Custom fields', free: false, pro: true, proPlus: true },
                { name: 'Bulk operations', free: false, pro: false, proPlus: true },
                { name: 'Multi-branch support', free: false, pro: false, proPlus: true },
            ]
        },
        {
            category: 'Attendance & Time',
            features: [
                { name: 'Clock in/out', free: true, pro: true, proPlus: true },
                { name: 'Time tracking', free: true, pro: true, proPlus: true },
                { name: 'Overtime calculation', free: false, pro: true, proPlus: true },
                { name: 'Shift management', free: false, pro: true, proPlus: true },
                { name: 'Geofencing', free: false, pro: false, proPlus: true },
                { name: 'Biometric integration', free: false, pro: false, proPlus: true },
            ]
        },
        {
            category: 'Payroll & Benefits',
            features: [
                { name: 'Basic payroll', free: false, pro: true, proPlus: true },
                { name: 'Tax calculations', free: false, pro: true, proPlus: true },
                { name: 'Benefits management', free: false, pro: true, proPlus: true },
                { name: 'Loan management', free: false, pro: false, proPlus: true },
                { name: 'Custom deductions', free: false, pro: false, proPlus: true },
                { name: 'Multi-currency', free: false, pro: false, proPlus: true },
            ]
        },
        {
            category: 'Reporting & Analytics',
            features: [
                { name: 'Basic reports', free: true, pro: true, proPlus: true },
                { name: 'Advanced analytics', free: false, pro: true, proPlus: true },
                { name: 'Custom reports', free: false, pro: false, proPlus: true },
                { name: 'Real-time dashboards', free: false, pro: false, proPlus: true },
                { name: 'Data export', free: false, pro: true, proPlus: true },
                { name: 'API access', free: false, pro: true, proPlus: true },
            ]
        }
    ];

    return (
        <>
            <Head title="Pricing - HRM Pro" />
            
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <ArrowLeft className="h-5 w-5" />
                            <span>Back to Home</span>
                        </Link>
                        
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost">{t('auth.login')}</Button>
                            </Link>
                            <Link href="/register">
                                <Button>{t('landing.startFreeTrial')}</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-background to-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <div
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Simple, Transparent Pricing
                        </h1>
                        
                        <p className="text-xl text-muted-foreground mb-8">
                            Choose the perfect plan for your organization. Start free and scale as you grow.
                        </p>
                        
                        {/* Billing Toggle */}
                        <div className="flex items-center justify-center gap-4 mb-12">
                            <span className={isYearly ? 'text-muted-foreground' : 'text-foreground'}>
                                {t('pricing.monthly')}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsYearly(!isYearly)}
                                className="relative h-6 w-11 rounded-full p-0"
                            >
                                <div className={`absolute inset-0.5 h-5 w-5 rounded-full bg-primary transition-transform ${
                                    isYearly ? 'translate-x-5' : 'translate-x-0'
                                }`} />
                            </Button>
                            <span className={isYearly ? 'text-foreground' : 'text-muted-foreground'}>
                                {t('pricing.yearly')}
                            </span>
                            {isYearly && (
                                <Badge variant="secondary">{t('pricing.save20')}</Badge>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <PricingCard
                                key={index}
                                {...plan}
                                isYearly={isYearly}
                                buttonText={plan.price.monthly === 0 ? 'Start Free Trial' : 'Get Started'}
                                onSelect={() => console.log(`Selected ${plan.title}`)}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section className="py-16 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Compare Plans
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            See what's included in each plan
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                        <Card className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-4 font-semibold">Features</th>
                                            <th className="text-center p-4 font-semibold">Free Trial</th>
                                            <th className="text-center p-4 font-semibold">Professional</th>
                                            <th className="text-center p-4 font-semibold">Pro+</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparisonFeatures.map((category, categoryIndex) => (
                                            <>
                                                <tr key={categoryIndex} className="bg-muted/30">
                                                    <td colSpan={4} className="p-4 font-semibold">
                                                        {category.category}
                                                    </td>
                                                </tr>
                                                {category.features.map((feature, featureIndex) => (
                                                    <tr key={featureIndex} className="border-b">
                                                        <td className="p-4">{feature.name}</td>
                                                        <td className="p-4 text-center">
                                                            {feature.free ? (
                                                                <Check className="h-5 w-5 text-green-600 mx-auto" />
                                                            ) : (
                                                                <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                            )}
                                                        </td>
                                                        <td className="p-4 text-center">
                                                            {feature.pro ? (
                                                                <Check className="h-5 w-5 text-green-600 mx-auto" />
                                                            ) : (
                                                                <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                            )}
                                                        </td>
                                                        <td className="p-4 text-center">
                                                            {feature.proPlus ? (
                                                                <Check className="h-5 w-5 text-green-600 mx-auto" />
                                                            ) : (
                                                                <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {[
                            {
                                question: "Can I change my plan at any time?",
                                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                            },
                            {
                                question: "Is there a setup fee?",
                                answer: "No, there are no setup fees. You only pay for your chosen subscription plan."
                            },
                            {
                                question: "What payment methods do you accept?",
                                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
                            },
                            {
                                question: "Can I cancel my subscription?",
                                answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
                            },
                            {
                                question: "Do you offer refunds?",
                                answer: "We offer a 30-day money-back guarantee for all paid plans if you're not satisfied."
                            }
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="animate-in fade-in slide-in-from-bottom duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-700">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Ready to Get Started?
                        </h2>
                        
                        <p className="text-xl text-muted-foreground mb-8">
                            Join thousands of companies already using HRM Pro to streamline their HR processes.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="text-lg px-8 py-6">
                                    Start 14-Day Free Trial
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                                    Contact Sales
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}