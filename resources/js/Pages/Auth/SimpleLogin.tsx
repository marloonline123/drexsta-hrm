import InputError from '@/Components/input-error';
import TextLink from '@/Components/text-link';
import { LanguageToggle } from '@/Components/language-toggle';
import AppearanceToggleDropdown from '@/Components/appearance-dropdown';
import { Button } from '@/Components/Ui/button';
import { Checkbox } from '@/Components/Ui/checkbox';
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Separator } from '@/Components/Ui/separator';
import { useLanguage } from '@/Hooks/use-language';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, Users, Chrome, ArrowLeft } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function SimpleLogin({ status, canResetPassword }: LoginProps) {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex">
            {/* Left side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
                <div className="relative z-10 flex flex-col justify-center px-12">
                    <div className="animate-in fade-in duration-1000">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                                <Users className="h-7 w-7 text-primary-foreground" />
                            </div>
                            <span className="text-3xl font-bold">HRM Pro</span>
                        </div>
                        
                        <h1 className="text-4xl font-bold mb-4 leading-tight">
                            Welcome back to the future of HR management
                        </h1>
                        
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            Streamline your HR processes with our comprehensive platform designed for modern teams.
                        </p>
                        
                        <div className="space-y-4">
                            {[
                                'Complete employee lifecycle management',
                                'Automated payroll and attendance tracking',
                                'Advanced analytics and reporting',
                                'Multi-language and multi-branch support'
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 animate-in slide-in-from-left duration-500"
                                    style={{ animationDelay: `${200 + index * 100}ms` }}
                                >
                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                    <span className="text-muted-foreground">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Floating elements for visual appeal */}
                <div className="absolute top-20 right-20 opacity-10 animate-pulse">
                    <Users className="h-24 w-24 text-primary" />
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {/* Header with controls */}
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back to Home</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <LanguageToggle />
                            <AppearanceToggleDropdown />
                        </div>
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom duration-600">
                        <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm">
                            <CardHeader className="text-center pb-2">
                                <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                        <Users className="h-5 w-5 text-primary-foreground" />
                                    </div>
                                    <span className="text-xl font-bold">HRM Pro</span>
                                </div>
                                <CardTitle className="text-2xl">Sign In</CardTitle>
                                <CardDescription>
                                    Enter your credentials to access your account
                                </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="space-y-6">
                                <Head title="Sign In" />

                                {status && (
                                    <div className="p-3 text-center text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 rounded-lg animate-in fade-in">
                                        {status}
                                    </div>
                                )}

                                {/* OAuth Buttons */}
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full group" type="button">
                                        <Chrome className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                                        Continue with Google
                                    </Button>
                                    <Button variant="outline" className="w-full group" type="button">
                                        <svg className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 2.87-1.84 3.7-.46.36-.96.61-1.49.78-.18.06-.37.09-.55.11-.36.05-.71.09-1.08.09-.96 0-1.88-.22-2.71-.62-.83-.4-1.55-.97-2.09-1.66-.54-.69-.82-1.49-.82-2.34 0-.28.02-.56.07-.83.08-.45.23-.88.43-1.27.2-.39.46-.73.77-1.02.31-.29.67-.52 1.06-.68.39-.16.81-.24 1.24-.24.43 0 .84.08 1.23.24.39.16.74.39 1.04.68.3.29.55.63.73 1.02.18.39.27.82.27 1.27 0 .36-.05.7-.14 1.04z"/>
                                        </svg>
                                        Continue with Microsoft
                                    </Button>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <Separator className="w-full" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-card px-2 text-muted-foreground">
                                            Or continue with email
                                        </span>
                                    </div>
                                </div>

                                <Form method="post" action={route('login')} resetOnSuccess={['password']} className="space-y-4">
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        required
                                                        autoFocus
                                                        tabIndex={1}
                                                        autoComplete="email"
                                                        placeholder="name@company.com"
                                                        className="h-11 transition-all focus:scale-[1.02]"
                                                    />
                                                    <InputError message={errors.email} />
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="password">Password</Label>
                                                        {canResetPassword && (
                                                            <TextLink href={route('password.request')} className="text-sm hover:underline" tabIndex={5}>
                                                                Forgot password?
                                                            </TextLink>
                                                        )}
                                                    </div>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        required
                                                        tabIndex={2}
                                                        autoComplete="current-password"
                                                        placeholder="Enter your password"
                                                        className="h-11 transition-all focus:scale-[1.02]"
                                                    />
                                                    <InputError message={errors.password} />
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <Checkbox id="remember" name="remember" tabIndex={3} />
                                                    <Label htmlFor="remember" className="text-sm">
                                                        Remember me
                                                    </Label>
                                                </div>
                                            </div>

                                            <Button 
                                                type="submit" 
                                                className="w-full h-11 group" 
                                                tabIndex={4} 
                                                disabled={processing}
                                            >
                                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                                {processing ? 'Signing in...' : 'Sign In'}
                                            </Button>
                                        </>
                                    )}
                                </Form>

                                <div className="text-center text-sm text-muted-foreground">
                                    Don't have an account?{' '}
                                    <TextLink href={route('register')} tabIndex={5} className="hover:underline">
                                        Create account
                                    </TextLink>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}