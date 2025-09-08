import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    icon: LucideIcon;
    loading?: boolean;
}

export function StatsCard({ title, value, change, changeType = 'neutral', icon: Icon, loading = false }: StatsCardProps) {
    const getChangeColor = () => {
        switch (changeType) {
            case 'positive':
                return 'text-green-600 dark:text-green-400';
            case 'negative':
                return 'text-red-600 dark:text-red-400';
            default:
                return 'text-muted-foreground';
        }
    };

    return (
        <div className="transform transition-all duration-200 hover:scale-105">
            <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                    <div className="p-2 rounded-md bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {loading ? (
                            <div className="h-8 w-20 bg-muted animate-pulse rounded" />
                        ) : (
                            value
                        )}
                    </div>
                    {change && (
                        <p className={`text-xs ${getChangeColor()}`}>
                            {change}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}