import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Users,
    Target,
    Heart,
    Shield,
    Zap,
    Globe,
    Award,
    TrendingUp,
    Clock,
    CheckCircle
} from 'lucide-react';

export default function About() {
    const { t, isRTL } = useLanguage();

    const values = [
        {
            icon: Users,
            title: 'People First',
            description: 'We believe in putting people at the center of everything we do. Our solutions are designed with the human experience in mind.'
        },
        {
            icon: Shield,
            title: 'Trust & Security',
            description: 'Your data security is our top priority. We maintain the highest standards of security and compliance.'
        },
        {
            icon: Zap,
            title: 'Innovation',
            description: 'We continuously innovate to provide cutting-edge solutions that solve real-world HR challenges.'
        },
        {
            icon: Globe,
            title: 'Global Reach',
            description: 'Our platform serves organizations worldwide with localized features and multilingual support.'
        }
    ];

    const stats = [
        {
            number: '10,000+',
            label: 'Companies Trust Us',
            icon: Users
        },
        {
            number: '1M+',
            label: 'Employees Managed',
            icon: TrendingUp
        },
        {
            number: '99.9%',
            label: 'Uptime Guaranteed',
            icon: Clock
        },
        {
            number: '50+',
            label: 'Countries Served',
            icon: Globe
        }
    ];

    const timeline = [
        {
            year: '2019',
            title: 'Founded',
            description: 'HRM Pro was founded with a vision to revolutionize human resource management.'
        },
        {
            year: '2020',
            title: 'First 1000 Users',
            description: 'Reached our first milestone of 1000 active users across 10 countries.'
        },
        {
            year: '2021',
            title: 'Series A Funding',
            description: 'Secured Series A funding to accelerate product development and global expansion.'
        },
        {
            year: '2022',
            title: 'AI Integration',
            description: 'Launched AI-powered insights and automation features.'
        },
        {
            year: '2023',
            title: 'Global Expansion',
            description: 'Expanded to 50+ countries with localized features and compliance.'
        },
        {
            year: '2024',
            title: 'Future Ready',
            description: 'Continuing to innovate with next-generation HR technology.'
        }
    ];

    return (
        <>
            <Head title="About Us - HRM Pro" />
            
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
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom duration-700">
                        <Badge className="mb-4 px-4 py-2">
                            <Heart className="h-4 w-4 mr-2" />
                            Our Story
                        </Badge>
                        
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Transforming HR Management
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                            We're on a mission to make human resource management simple, efficient, 
                            and enjoyable for organizations of all sizes around the world.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center animate-in fade-in slide-in-from-bottom duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="p-3 rounded-2xl bg-primary/10 w-fit mx-auto mb-4">
                                    <stat.icon className="h-8 w-8 text-primary" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                                <div className="text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div className="animate-in fade-in slide-in-from-left duration-700">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Our Journey
                            </h2>
                            
                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                HRM Pro was born from a simple observation: traditional HR systems 
                                were complex, expensive, and often failed to serve the real needs 
                                of growing businesses.
                            </p>
                            
                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                Our founders, experienced HR professionals and technologists, 
                                set out to create a solution that would be powerful yet simple, 
                                comprehensive yet affordable, and global yet personal.
                            </p>
                            
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Today, we're proud to serve thousands of organizations worldwide, 
                                helping them manage their most valuable asset: their people.
                            </p>
                        </div>

                        <div className="relative animate-in fade-in slide-in-from-right duration-700">
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                                <div className="text-center">
                                    <Target className="h-24 w-24 text-primary mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                                    <p className="text-muted-foreground">
                                        To empower organizations with intuitive HR tools that help 
                                        them build stronger, more engaged teams.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Our Values
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            These core values guide everything we do and shape how we build 
                            products and serve our customers.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="animate-in fade-in slide-in-from-bottom duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Card className="h-full hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="p-3 rounded-2xl bg-primary/10 w-fit mb-4">
                                            <value.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">{value.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base leading-relaxed">
                                            {value.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Our Timeline
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Key milestones in our journey
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {timeline.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-6 mb-8 last:mb-0 animate-in fade-in slide-in-from-bottom duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0 mt-2" />
                                    {index !== timeline.length - 1 && (
                                        <div className="w-px h-full bg-border mt-2" />
                                    )}
                                </div>
                                
                                <Card className="flex-1 hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary">{item.year}</Badge>
                                            <CardTitle className="text-lg">{item.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            {item.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Awards Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Recognition & Awards
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                title: 'Best HR Software 2024',
                                organization: 'TechReview Magazine',
                                description: 'Recognized for innovation in HR technology'
                            },
                            {
                                title: 'Startup of the Year',
                                organization: 'Global Business Awards',
                                description: 'Outstanding growth and market impact'
                            },
                            {
                                title: 'Customer Choice Award',
                                organization: 'Software Reviews',
                                description: 'Highest customer satisfaction rating'
                            }
                        ].map((award, index) => (
                            <div
                                key={index}
                                className="animate-in fade-in slide-in-from-bottom duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="p-3 rounded-2xl bg-primary/10 w-fit mx-auto mb-4">
                                            <Award className="h-8 w-8 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg">{award.title}</CardTitle>
                                        <CardDescription className="font-medium">
                                            {award.organization}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{award.description}</p>
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
                            Join Our Journey
                        </h2>
                        
                        <p className="text-xl text-muted-foreground mb-8">
                            Be part of the future of HR management. Start your free trial today 
                            and experience the difference.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="text-lg px-8 py-6">
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}