import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    delay?: number;
}

export function FeatureCard({ title, description, icon: Icon, delay = 0 }: FeatureCardProps) {
    return (
        <div className="h-full hover:scale-105 transition-transform duration-300">
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/30">
                <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 rounded-2xl bg-primary/10 w-fit">
                        <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <CardDescription className="text-base leading-relaxed">
                        {description}
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    );
}