import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';

const cardVariants = cva('rounded-xl transition-all duration-200', {
  variants: {
    variant: {
      // Default card with white background and no shadow
      default: 'bg-white border border-gray-200',

      // Elevated card with more prominent shadow
      elevated:
        'bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] hover:shadow-lg border-0',

      // Gradient card for progress/status indicators
      gradient:
        'bg-gradient-to-r from-yellow-200 via-purple-200 to-blue-200 border-0',

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
  /** Custom background image URL */
  backgroundImage?: string;
  /** Custom background color */
  backgroundColor?: string;
  /** Whether to remove border radius */
  noBorderRadius?: boolean;
  /** Whether to remove border */
  noBorder?: boolean;
  /** Custom padding (overrides padding variant) */
  customPadding?: string;
  /** Whether the card is in disabled/empty state */
  disabled?: boolean;
  /** Header text for empty state */
  emptyStateHeader?: string;
  /** Description text for empty state */
  emptyStateDescription?: string;
  /** Action button for empty state */
  emptyStateAction?: {
    label: string;
    onClick: () => void;
  };
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
 * // Card with custom background image
 * <Card
 *   backgroundImage="/hero-image.jpg"
 *   noBorderRadius
 *   customPadding="p-12"
 * >
 *   Hero content
 * </Card>
 *
 * // Card with custom background color
 * <Card backgroundColor="#f3f4f6" customPadding="px-4 py-8">
 *   Custom styled content
 * </Card>
 *
 * // Card without border
 * <Card noBorder>
 *   <p>Clean card without border</p>
 * </Card>
 *
 * // Disabled/Empty state card
 * <Card
 *   disabled
 *   emptyStateHeader="NOTHING HERE"
 *   emptyStateDescription="Bookings will show up here. You can also manually create an appointment."
 *   emptyStateAction={{
 *     label: "SETUP YOUR SCHEDULE",
 *     onClick: () => console.log("Setup clicked")
 *   }}
 * />
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      interactive,
      backgroundImage,
      backgroundColor,
      noBorderRadius,
      noBorder,
      customPadding,
      disabled,
      emptyStateHeader,
      emptyStateDescription,
      emptyStateAction,
      children,
      onClick,
      style,
      ...props
    },
    ref
  ) => {
    const isInteractive = interactive || !!onClick;

    const customStyles = {
      ...(backgroundImage && {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }),
      ...(backgroundColor && { backgroundColor }),
      ...style,
    };

    // Render empty state if disabled
    if (disabled) {
      return (
        <div
          className={cn(
            cardVariants({
              variant,
              padding: customPadding ? 'none' : padding,
              interactive: false,
            }),
            'relative overflow-hidden',
            noBorderRadius && 'rounded-none',
            noBorder && 'border-0',
            customPadding && customPadding,
            className
          )}
          style={customStyles}
          ref={ref}
          {...props}
        >
          {/* Blurred background overlay */}
          <div className='absolute inset-0 bg-white/80 backdrop-blur-md'></div>

          {/* Content */}
          <div className='relative z-10 flex flex-col items-center justify-center text-center py-12 px-6'>
            {emptyStateHeader && (
              <h3 className='text-xl font-bold text-gray-900 mb-3'>
                {emptyStateHeader}
              </h3>
            )}
            {emptyStateDescription && (
              <p className='text-gray-600 mb-6 max-w-sm leading-relaxed'>
                {emptyStateDescription}
              </p>
            )}
            {emptyStateAction && (
              <button
                onClick={emptyStateAction.onClick}
                className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition-colors duration-200'
              >
                {emptyStateAction.label}
              </button>
            )}
          </div>

          {/* Background content to blur */}
          <div className='absolute inset-0 opacity-20 pointer-events-none'>
            {children}
          </div>
        </div>
      );
    }

    return (
      <div
        className={cn(
          cardVariants({
            variant,
            padding: customPadding ? 'none' : padding,
            interactive: isInteractive,
          }),
          noBorderRadius && 'rounded-none',
          noBorder && 'border-0',
          customPadding && customPadding,
          className
        )}
        style={{
          ...customStyles,
          borderRadius: noBorderRadius ? 0 : '1.875rem',
        }}
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
