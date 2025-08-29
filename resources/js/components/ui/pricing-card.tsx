import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface PricingCardProps {
    title: string;
    description: string;
    price: {
        monthly: number;
        yearly: number;
    };
    isYearly: boolean;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
    onSelect: () => void;
    delay?: number;
}

export function PricingCard({
    title,
    description,
    price,
    isYearly,
    features,
    isPopular = false,
    buttonText,
    onSelect,
    delay = 0
}: PricingCardProps) {
    const displayPrice = isYearly ? price.yearly : price.monthly;
    const periodText = isYearly ? '/year' : '/month';

    return (
        <div className="h-full">
            <Card className={`h-full relative hover:shadow-2xl transition-all duration-300 ${
                isPopular ? 'border-primary shadow-xl scale-105' : 'hover:scale-105'
            }`}>
                {isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground px-4 py-1">
                            Most Popular
                        </Badge>
                    </div>
                )}
                
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription className="text-base">{description}</CardDescription>
                    <div className="pt-4">
                        <span className="text-4xl font-bold">${displayPrice}</span>
                        <span className="text-muted-foreground">{periodText}</span>
                        {isYearly && (
                            <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                                Save 20% annually
                            </div>
                        )}
                    </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                        </div>
                    ))}
                </CardContent>
                
                <CardFooter>
                    <Button 
                        className={`w-full ${isPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
                        variant={isPopular ? 'default' : 'outline'}
                        onClick={onSelect}
                    >
                        {buttonText}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}