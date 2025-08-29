import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/use-language';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Mail,
    Phone,
    MapPin,
    Clock,
    MessageCircle,
    Users,
    Headphones,
    Globe
} from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const { t, isRTL } = useLanguage();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const contactMethods = [
        {
            icon: Mail,
            title: 'Email Us',
            description: 'Send us an email and we\'ll respond within 24 hours',
            primary: 'support@hrmpro.com',
            secondary: 'sales@hrmpro.com',
            action: 'Send Email'
        },
        {
            icon: Phone,
            title: 'Call Us',
            description: 'Speak directly with our support team',
            primary: '+1 (555) 123-4567',
            secondary: '+1 (555) 987-6543',
            action: 'Call Now'
        },
        {
            icon: MessageCircle,
            title: 'Live Chat',
            description: 'Chat with our team in real-time',
            primary: 'Available 24/7',
            secondary: 'Average response: 2 minutes',
            action: 'Start Chat'
        }
    ];

    const offices = [
        {
            city: 'New York',
            address: '123 Business Street, Suite 100\nNew York, NY 10001\nUnited States',
            phone: '+1 (555) 123-4567',
            email: 'ny@hrmpro.com'
        },
        {
            city: 'London',
            address: '456 Tech Avenue\nLondon EC1A 1BB\nUnited Kingdom',
            phone: '+44 20 7123 4567',
            email: 'london@hrmpro.com'
        },
        {
            city: 'Dubai',
            address: 'Business Bay Tower\nDubai, UAE',
            phone: '+971 4 123 4567',
            email: 'dubai@hrmpro.com'
        }
    ];

    return (
        <>
            <Head title="Contact Us - HRM Pro" />
            
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
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
                    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-700">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Get in Touch
                        </h1>
                        
                        <p className="text-xl text-muted-foreground mb-8">
                            Have questions? We'd love to hear from you. Send us a message 
                            and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                        {contactMethods.map((method, index) => (
                            <div
                                key={index}
                                className="animate-in slide-in-from-bottom duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="p-3 rounded-2xl bg-primary/10 w-fit mx-auto mb-4">
                                            <method.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">{method.title}</CardTitle>
                                        <CardDescription className="text-base">
                                            {method.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <p className="font-semibold">{method.primary}</p>
                                        <p className="text-sm text-muted-foreground">{method.secondary}</p>
                                        <Button className="w-full mt-4">{method.action}</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-16 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <div className="animate-in fade-in slide-in-from-left duration-700">
                            <Card className="p-8">
                                <CardHeader className="px-0 pt-0">
                                    <CardTitle className="text-2xl">Send us a message</CardTitle>
                                    <CardDescription>
                                        Fill out the form below and we'll get back to you as soon as possible.
                                    </CardDescription>
                                </CardHeader>
                                
                                <CardContent className="px-0 space-y-6">
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium mb-2 block">
                                                    First Name *
                                                </label>
                                                <Input
                                                    value={formData.firstName}
                                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                    placeholder="John"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium mb-2 block">
                                                    Last Name *
                                                </label>
                                                <Input
                                                    value={formData.lastName}
                                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                    placeholder="Doe"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">
                                                Email *
                                            </label>
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                placeholder="john@company.com"
                                                required
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium mb-2 block">
                                                    Company
                                                </label>
                                                <Input
                                                    value={formData.company}
                                                    onChange={(e) => handleInputChange('company', e.target.value)}
                                                    placeholder="Your Company"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium mb-2 block">
                                                    Phone
                                                </label>
                                                <Input
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">
                                                Inquiry Type
                                            </label>
                                            <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select inquiry type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="sales">Sales Inquiry</SelectItem>
                                                    <SelectItem value="support">Technical Support</SelectItem>
                                                    <SelectItem value="billing">Billing Question</SelectItem>
                                                    <SelectItem value="partnership">Partnership</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">
                                                Subject *
                                            </label>
                                            <Input
                                                value={formData.subject}
                                                onChange={(e) => handleInputChange('subject', e.target.value)}
                                                placeholder="How can we help you?"
                                                required
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">
                                                Message *
                                            </label>
                                            <Textarea
                                                value={formData.message}
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('message', e.target.value)}
                                                placeholder="Tell us more about your inquiry..."
                                                className="min-h-32"
                                                required
                                            />
                                        </div>
                                        
                                        <Button type="submit" className="w-full">
                                            Send Message
                                            <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Info & Hours */}
                        <div className="space-y-8 animate-in fade-in slide-in-from-right duration-700">
                            {/* Support Hours */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-6 w-6 text-primary" />
                                        <CardTitle>Support Hours</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span className="font-semibold">9:00 AM - 6:00 PM EST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="font-semibold">10:00 AM - 4:00 PM EST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span className="text-muted-foreground">Closed</span>
                                    </div>
                                    <div className="pt-2 border-t">
                                        <p className="text-sm text-muted-foreground">
                                            Emergency support available 24/7 for Enterprise customers
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Links */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Headphones className="h-6 w-6 text-primary" />
                                        <CardTitle>Need Immediate Help?</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Users className="h-4 w-4 mr-2" />
                                        Schedule a Demo
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        Start Live Chat
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <Globe className="h-4 w-4 mr-2" />
                                        Help Center
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Response Time */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Expected Response Times</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span>Sales Inquiries</span>
                                        <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                                            &lt; 2 hours
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Technical Support</span>
                                        <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                                            &lt; 24 hours
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>General Inquiries</span>
                                        <span className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                                            &lt; 48 hours
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Office Locations */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Our Global Offices
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Visit us at one of our offices around the world
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {offices.map((office, index) => (
                            <div
                                key={index}
                                className="animate-in fade-in slide-in-from-bottom duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Card className="h-full hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-4">
                                            <MapPin className="h-6 w-6 text-primary" />
                                            <CardTitle className="text-xl">{office.city}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold mb-2">Address</h4>
                                            <p className="text-muted-foreground whitespace-pre-line text-sm">
                                                {office.address}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Contact</h4>
                                            <p className="text-sm text-muted-foreground">{office.phone}</p>
                                            <p className="text-sm text-muted-foreground">{office.email}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {[
                            {
                                question: "How quickly can I get started?",
                                answer: "You can sign up and start using HRM Pro immediately. Our setup wizard will guide you through the initial configuration in under 10 minutes."
                            },
                            {
                                question: "Do you offer migration assistance?",
                                answer: "Yes, we provide free migration assistance for all paid plans. Our team will help you migrate your data from your existing HR system."
                            },
                            {
                                question: "Is my data secure?",
                                answer: "Absolutely. We use industry-standard encryption and security measures. Your data is stored in secure, SOC 2 compliant data centers."
                            },
                            {
                                question: "Can I integrate with other tools?",
                                answer: "Yes, HRM Pro integrates with popular tools like Slack, Microsoft Teams, QuickBooks, and many others. We also provide API access for custom integrations."
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
        </>
    );
}