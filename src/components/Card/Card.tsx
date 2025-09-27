import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';

const cardVariants = cva('rounded-2xl transition-all duration-200', {
  variants: {
    variant: {
      // Default card with white background and subtle shadow
      default: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',

      // Elevated card with more prominent shadow
      elevated:
        'bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] hover:shadow-lg border-0',

      // Gradient card for progress/status indicators
      gradient:
        'bg-gradient-to-r from-yellow-200 via-purple-200 to-blue-200 border-0 shadow-sm',

      // Outlined card with dashed border (for events/appointments)
      outlined: 'bg-white border-2 border-dashed border-gray-300',

      // Flat card with no shadow or border
      flat: 'bg-white border-0 shadow-none',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    interactive: {
      true: 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
    interactive: false,
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    BaseProps,
    VariantProps<typeof cardVariants> {
  /** Whether the card should be interactive (clickable) */
  interactive?: boolean;
}

/**
 * Versatile card component for displaying content in containers
 *
 * Supports multiple variants including gradient backgrounds, outlined borders,
 * and interactive states for different use cases.
 *
 * @example
 * ```tsx
 * // Default card
 * <Card>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Card>
 *
 * // Interactive gradient card
 * <Card variant="gradient" interactive onClick={handleClick}>
 *   Progress content
 * </Card>
 *
 * // Outlined card for events
 * <Card variant="outlined" padding="lg">
 *   Event details
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, padding, interactive, children, onClick, ...props },
    ref
  ) => {
    const isInteractive = interactive || !!onClick;

    return (
      <div
        className={cn(
          cardVariants({
            variant,
            padding,
            interactive: isInteractive,
          }),
          className
        )}
        ref={ref}
        onClick={onClick}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={
          isInteractive
            ? e => {
                if ((e.key === 'Enter' || e.key === ' ') && onClick) {
                  e.preventDefault();
                  onClick(e as any);
                }
              }
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
