import React, { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps, LoadingState } from '@/types';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none font-bricolage',
  {
    variants: {
      variant: {
        // Primary blue button (CREATE ORDER, SHARE STOREFRONT)
        primary:
          'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm',

        // Secondary light button (Previous)
        secondary:
          'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',

        // Outline button (LEARN MORE)
        outline:
          'border-2 border-gray-900 bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-500',

        // Dark button (Next, UPDATE STATUS)
        dark: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500 shadow-sm',

        // Ghost/subtle button (Preview)
        ghost:
          'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700 focus:ring-gray-500',

        // Disabled state (NEXT disabled)
        disabled: 'bg-gray-200 text-gray-400 cursor-not-allowed',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg font-semibold',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    BaseProps,
    LoadingState,
    VariantProps<typeof buttonVariants> {
  /** Button content when loading */
  loadingText?: string;
  /** Icon component to display */
  Icon?: React.ComponentType<{ className?: string }>;
  /** Position of the icon relative to text */
  iconPosition?: 'left' | 'right';
  /** Accessible description for screen readers */
  'aria-describedby'?: string;
  /** Accessible label when button text is not descriptive enough */
  'aria-label'?: string;
  /** Whether the button controls an expanded element */
  'aria-expanded'?: boolean;
  /** ID of the element controlled by this button */
  'aria-controls'?: string;
  /** Whether the button represents a pressed state (for toggle buttons) */
  'aria-pressed'?: boolean;
}

/**
 * Versatile button component with multiple variants and sizes
 *
 * Uses "Bricolage Grotesque" font by default, but can be overridden with className prop.
 *
 * @example
 * ```tsx
 * // Default font (Bricolage Grotesque)
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 *
 * // Custom font override
 * <Button variant="primary" className="font-sans">
 *   Custom Font
 * </Button>
 * ```
 */
// Loading spinner component for reusability
const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    />
    <path
      className='opacity-75'
      fill='currentColor'
      d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    />
  </svg>
);

// Arrow icon for next/navigation buttons
const ArrowIcon = ({
  direction = 'right',
  className,
}: {
  direction?: 'left' | 'right';
  className?: string;
}) => (
  <svg
    className={cn('w-5 h-5', className)}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
    />
  </svg>
);

// Eye icon for preview buttons
const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('w-5 h-5', className)}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
    />
  </svg>
);

// Plus icon for create buttons
const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('w-5 h-5', className)}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 4v16m8-8H4'
    />
  </svg>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      loadingText = 'Loading...',
      Icon,
      iconPosition = 'left',
      children,
      disabled,
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      'aria-expanded': ariaExpanded,
      'aria-controls': ariaControls,
      'aria-pressed': ariaPressed,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading || variant === 'disabled';
    const effectiveVariant = isDisabled ? 'disabled' : variant;

    // Helper to render content with proper spacing
    const renderContent = () => {
      if (isLoading) {
        return (
          <>
            <LoadingSpinner className='w-4 h-4' />
            {loadingText}
          </>
        );
      }

      const iconElement = Icon ? <Icon className='w-5 h-5' /> : null;

      if (iconPosition === 'right') {
        return (
          <>
            {children}
            {iconElement}
          </>
        );
      }

      return (
        <>
          {iconElement}
          {children}
        </>
      );
    };

    return (
      <button
        className={cn(
          buttonVariants({ variant: effectiveVariant, size, fullWidth }),
          className
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-describedby={ariaDescribedby}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-pressed={ariaPressed}
        aria-busy={isLoading}
        {...props}
      >
        {renderContent()}
        {/* Screen reader only text for loading state */}
        {isLoading && <span className='sr-only'>{loadingText}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Export icon components for external use
export { ArrowIcon, EyeIcon, PlusIcon, LoadingSpinner };
