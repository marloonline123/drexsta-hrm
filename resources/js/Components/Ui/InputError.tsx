import { cn } from '@/Lib/utils';
import React from 'react';

interface InputErrorProps {
  message?: string;
  className?: string;
}

export const InputError = React.forwardRef<HTMLParagraphElement, InputErrorProps>(
  ({ message, className, ...props }, ref) => {
    if (!message) return null;
    
    return (
      <p
        ref={ref}
        className={cn('text-sm text-destructive', className)}
        {...props}
      >
        {message}
      </p>
    );
  }
);

InputError.displayName = 'InputError';