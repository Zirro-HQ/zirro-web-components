import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline:
          'text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        success: 'bg-green-100 text-green-800 hover:bg-green-200',
        warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        info: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
        purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs rounded-full',
        md: 'px-3 py-1 text-sm rounded-full',
        lg: 'px-4 py-1.5 text-base rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    BaseProps,
    VariantProps<typeof badgeVariants> {
  /** Custom background color */
  backgroundColor?: string;
  /** Custom text color */
  textColor?: string;
}

/**
 * Badge component for displaying status, labels, or counts
 *
 * Supports multiple variants and sizes for different use cases.
 *
 * @example
 * ```tsx
 * // Default badge
 * <Badge>New</Badge>
 *
 * // Success badge
 * <Badge variant="success">Active</Badge>
 *
 * // Custom colors
 * <Badge backgroundColor="#3b82f6" textColor="white">
 *   396 x 31
 * </Badge>
 *
 * // Large size
 * <Badge size="lg" variant="info">
 *   Premium
 * </Badge>
 * ```
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      backgroundColor,
      textColor,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const customStyles = {
      ...(backgroundColor && { backgroundColor }),
      ...(textColor && { color: textColor }),
      ...style,
    };

    return (
      <div
        className={cn(badgeVariants({ variant, size }), className)}
        style={customStyles}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
