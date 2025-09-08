import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { StatsCard } from '@/Components/Ui/stats-card';
import { Button } from '@/Components/Ui/button';
import { Badge } from '@/Components/Ui/badge';
import { useLanguage } from '@/Hooks/use-language';
import AppLayout from '@/layouts/AppLayout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Users,
    UserCheck,
    Calendar,
    DollarSign,
    TrendingUp,
    Clock,
    Plus,
    BarChart3,
    Bell,
    CheckCircle,
    AlertCircle,
    UserPlus,
    CreditCard,
    Activity,
    Zap
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { t } = useLanguage();
    
    // Mock data - in real app this would come from props or API
    const stats = [
        {
            title: t('dashboard.totalEmployees'),
            value: 142,
            change: '+12 this month',
            changeType: 'positive' as const,
            icon: Users
        },
        {
            title: t('dashboard.activeEmployees'),
            value: 138,
            change: '+5 this week',
            changeType: 'positive' as const,
            icon: UserCheck
        },
        {
            title: t('dashboard.pendingLeaves'),
            value: 8,
            change: '-2 from yesterday',
            changeType: 'negative' as const,
            icon: Calendar
        },
        {
            title: t('dashboard.monthlyPayroll'),
            value: '$285,420',
            change: '+3.2% from last month',
            changeType: 'positive' as const,
            icon: DollarSign
        }
    ];

    const recentActivities = [
        {
            id: 1,
            type: 'leave_request',
            user: 'Sarah Johnson',
            action: 'submitted a leave request',
            time: '2 hours ago',
            status: 'pending',
            avatar: null
        },
        {
            id: 2,
            type: 'employee_added',
            user: 'Admin',
            action: 'added new employee John Smith',
            time: '4 hours ago',
            status: 'completed',
            avatar: null
        },
        {
            id: 3,
            type: 'payroll_processed',
            user: 'System',
            action: 'processed payroll for March 2024',
            time: '1 day ago',
            status: 'completed',
            avatar: null
        },
        {
            id: 4,
            type: 'attendance_alert',
            user: 'Michael Brown',
            action: 'has been marked as late',
            time: '2 days ago',
            status: 'warning',
            avatar: null
        }
    ];

    const quickActions = [
        {
            title: t('dashboard.addEmployee'),
            description: 'Add a new employee to the system',
            icon: UserPlus,
            href: '/employees/create',
            color: 'bg-blue-500'
        },
        {
            title: t('dashboard.processPayroll'),
            description: 'Process monthly payroll',
            icon: CreditCard,
            href: '/payroll/process',
            color: 'bg-green-500'
        },
        {
            title: t('dashboard.viewReports'),
            description: 'View analytics and reports',
            icon: BarChart3,
            href: '/reports',
            color: 'bg-purple-500'
        },
        {
            title: 'Attendance Review',
            description: 'Review attendance records',
            icon: Clock,
            href: '/attendance',
            color: 'bg-orange-500'
        }
    ];

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'leave_request':
                return Calendar;
            case 'employee_added':
                return UserPlus;
            case 'payroll_processed':
                return CreditCard;
            case 'attendance_alert':
                return AlertCircle;
            default:
                return Activity;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('nav.dashboard')} />
            
            <div className="space-y-6 p-6">
                {/* Welcome Section */}
                <div className="flex items-center justify-between animate-in fade-in slide-in-from-bottom duration-500">
                    <div>
                        <h1 className="text-3xl font-bold">{t('dashboard.welcome')}</h1>
                        <p className="text-muted-foreground mt-1">
                            Here's what's happening with your team today.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Bell className="h-4 w-4 mr-2" />
                            Notifications
                        </Button>
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Quick Add
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatsCard
                            key={index}
                            {...stat}
                        />
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Recent Activities */}
                    <div className="lg:col-span-2">
                        <div className="animate-in fade-in slide-in-from-bottom duration-500 delay-200">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Activity className="h-5 w-5" />
                                        {t('dashboard.recentActivities')}
                                    </CardTitle>
                                    <CardDescription>
                                        Latest updates from your organization
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {recentActivities.map((activity) => {
                                        const IconComponent = getActivityIcon(activity.type);
                                        return (
                                            <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                                <div className={`p-2 rounded-lg bg-primary/10`}>
                                                    <IconComponent className="h-4 w-4 text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium">
                                                        <span className="font-semibold">{activity.user}</span>
                                                        {' '}{activity.action}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs text-muted-foreground">
                                                            {activity.time}
                                                        </span>
                                                        <Badge 
                                                            variant={activity.status === 'completed' ? 'default' : activity.status === 'pending' ? 'secondary' : 'destructive'}
                                                            className="text-xs"
                                                        >
                                                            {activity.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="pt-2">
                                        <Button variant="ghost" className="w-full">
                                            View all activities
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <div className="animate-in fade-in slide-in-from-bottom duration-500 delay-300">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Zap className="h-5 w-5" />
                                        {t('dashboard.quickActions')}
                                    </CardTitle>
                                    <CardDescription>
                                        Common tasks and shortcuts
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {quickActions.map((action, index) => (
                                        <Button
                                            key={index}
                                            variant="ghost"
                                            className="w-full justify-start h-auto p-4"
                                            asChild
                                        >
                                            <a href={action.href}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${action.color} text-white`}>
                                                        <action.icon className="h-4 w-4" />
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="font-semibold text-sm">
                                                            {action.title}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {action.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </Button>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Performance Overview */}
                <div className="animate-in fade-in slide-in-from-bottom duration-500 delay-400">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Performance Overview
                            </CardTitle>
                            <CardDescription>
                                Key metrics and trends for this month
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950">
                                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-green-600">94%</div>
                                    <div className="text-sm text-muted-foreground">Attendance Rate</div>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                                    <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-blue-600">87%</div>
                                    <div className="text-sm text-muted-foreground">Task Completion</div>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950">
                                    <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-purple-600">4.8</div>
                                    <div className="text-sm text-muted-foreground">Employee Satisfaction</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
