import { Card, CardContent } from '@/Components/Ui/card';
import { LucideIcon } from 'lucide-react';

interface EmptyResourceProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function EmptyResource({ icon: Icon, title, description }: EmptyResourceProps) {
  return (
      <Card>
          <CardContent className="p-12 text-center">
              <Icon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">{title}</h3>
              <p className="text-muted-foreground">
                  {description}
              </p>
          </CardContent>
      </Card>
  )
}
