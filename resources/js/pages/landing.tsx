import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/use-language';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Users,
    Calculator,
    Clock,
    Calendar,
    Brain,
    BarChart3,
    Shield,
    Zap,
    Star,
    MapPin,
    Mail,
    Phone,
    ChevronDown,
    CheckCircle
} from 'lucide-react';
import { useState } from 'react';

export default function Landing() {
    const { t, isRTL } = useLanguage();
    const [isYearly, setIsYearly] = useState(false);

    const features = [
        {
            icon: Users,
            title: 'HR Management',
            description: 'Complete employee lifecycle management with modern tools and automation.',
        },
        {
            icon: Calculator,
            title: 'Payroll System',
            description: 'Automated payroll processing with tax calculations and compliance.',
        },
        {
            icon: Clock,
            title: 'Attendance Tracking',
            description: 'Real-time attendance monitoring with mobile check-in support.',
        },
        {
            icon: Calendar,
            title: 'Leave Management',
            description: 'Streamlined leave requests with automated approval workflows.',
        },
        {
            icon: Brain,
            title: 'AI Assistance',
            description: 'Smart insights and automated recommendations for better decisions.',
        },
        {
            icon: BarChart3,
            title: 'Advanced Reporting',
            description: 'Comprehensive analytics with customizable dashboards and reports.',
        },
    ];

    const pricingPlans = [
        {
            title: 'Free Trial',
            description: '14-day free trial with all features',
            monthlyPrice: 0,
            yearlyPrice: 0,
            features: [
                'Up to 10 employees',
                'Basic HR management',
                'Attendance tracking',
                'Email support',
                'Mobile app access'
            ],
        },
        {
            title: 'Professional',
            description: 'Perfect for growing teams',
            monthlyPrice: 29,
            yearlyPrice: 290,
            isPopular: true,
            features: [
                'Up to 100 employees',
                'Advanced HR features',
                'Payroll management',
                'Leave management',
                'Priority support',
                'Advanced reporting',
                'API access'
            ],
        },
        {
            title: 'Enterprise',
            description: 'For large organizations',
            monthlyPrice: 59,
            yearlyPrice: 590,
            features: [
                'Unlimited employees',
                'All Pro features',
                'Multi-branch support',
                'Custom workflows',
                'Dedicated support',
                'White-label options',
                'Advanced analytics'
            ],
        },
    ];

    return (
        <>
            <Head title="Modern HR Management System" />
            
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Users className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="font-bold text-xl">HRM Pro</span>
                        </div>
                        
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="hover:text-primary transition-colors">Features</a>
                            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
                            <a href="/about" className="hover:text-primary transition-colors">About</a>
                            <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Start Free Trial</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 pt-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto animate-in fade-in duration-1000">
                        <Badge className="mb-4 px-4 py-2">
                            <Zap className="h-4 w-4 mr-2" />
                            Now with AI-powered insights
                        </Badge>
                        
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Modern HR Management for Growing Teams
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                            Streamline your HR processes with our comprehensive SaaS solution. Manage employees, payroll, attendance, and more.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="text-lg px-8 py-6 group">
                                    Start Free Trial
                                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                                Schedule Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Powerful Features for Modern HR
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to manage your human resources efficiently and effectively.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group hover:scale-105 transition-all duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/30 group-hover:bg-gradient-to-br group-hover:from-primary/5 group-hover:to-primary/10">
                                    <CardHeader className="text-center pb-4">
                                        <div className="mx-auto mb-4 p-3 rounded-2xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                                            <feature.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <CardDescription className="text-base leading-relaxed">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Choose Your Plan
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            Start free, scale as you grow
                        </p>
                        
                        {/* Billing Toggle */}
                        <div className="flex items-center justify-center gap-4">
                            <span className={isYearly ? 'text-muted-foreground' : 'text-foreground'}>
                                Monthly
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
                                Yearly
                            </span>
                            {isYearly && (
                                <Badge variant="secondary">Save 20%</Badge>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricingPlans.map((plan, index) => {
                            const displayPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
                            const periodText = isYearly ? '/year' : '/month';
                            
                            return (
                                <div key={index} className="h-full">
                                    <Card className={`h-full relative hover:shadow-2xl transition-all duration-300 ${
                                        plan.isPopular ? 'border-primary shadow-xl scale-105' : 'hover:scale-105'
                                    }`}>
                                        {plan.isPopular && (
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                                                    Most Popular
                                                </Badge>
                                            </div>
                                        )}
                                        
                                        <CardHeader className="text-center pb-4">
                                            <CardTitle className="text-2xl">{plan.title}</CardTitle>
                                            <CardDescription className="text-base">{plan.description}</CardDescription>
                                            <div className="pt-4">
                                                <span className="text-4xl font-bold">${displayPrice}</span>
                                                <span className="text-muted-foreground">{periodText}</span>
                                                {isYearly && plan.yearlyPrice > 0 && (
                                                    <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                                                        Save 20% annually
                                                    </div>
                                                )}
                                            </div>
                                        </CardHeader>
                                        
                                        <CardContent className="space-y-4">
                                            {plan.features.map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-center gap-3">
                                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                                    <span className="text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </CardContent>
                                        
                                        <div className="p-6 pt-0">
                                            <Button 
                                                className={`w-full ${plan.isPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
                                                variant={plan.isPopular ? 'default' : 'outline'}
                                            >
                                                {plan.monthlyPrice === 0 ? 'Start Free Trial' : 'Get Started'}
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Ready to Transform Your HR?
                        </h2>
                        
                        <p className="text-xl text-muted-foreground mb-8">
                            Join thousands of companies already using HRM Pro to streamline their HR processes.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="text-lg px-8 py-6">
                                    Start Free Trial
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

            {/* Footer */}
            <footer className="bg-muted/30 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <Users className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <span className="font-bold text-xl">HRM Pro</span>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                Modern HR management for growing teams.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li><a href="/about" className="hover:text-foreground transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                                <li><a href="/contact" className="hover:text-foreground transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
                        <p>&copy; 2024 HRM Pro. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}