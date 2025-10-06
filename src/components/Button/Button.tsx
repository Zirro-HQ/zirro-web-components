import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  type ButtonHTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';
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

        // Soft blue pill used for actions like SHARE (per design)
        share:
          'bg-[#DDE0FF] text-[#2C4BFF] hover:bg-[#D0D5FF] focus:ring-[#2C4BFF]/40',
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
  /** Dropdown content (makes this a dropdown button) */
  dropdownContent?: React.ReactNode;
  /** Whether dropdown is controlled externally */
  dropdownOpen?: boolean;
  /** Callback when dropdown open state changes */
  onDropdownToggle?: (open: boolean) => void;
  /** Custom dropdown container className */
  dropdownClassName?: string;
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

// Chevron down icon for dropdown buttons
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('w-4 h-4', className)}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 9l-7 7-7-7'
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
      dropdownContent,
      dropdownOpen: controlledOpen,
      onDropdownToggle,
      dropdownClassName,
      onClick,
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      'aria-expanded': ariaExpanded,
      'aria-controls': ariaControls,
      'aria-pressed': ariaPressed,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Use controlled state if provided, otherwise use internal state
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setIsOpen = onDropdownToggle || setInternalOpen;

    const isDropdown = !!dropdownContent;
    const isDisabled = disabled || isLoading || variant === 'disabled';
    const effectiveVariant = isDisabled ? 'disabled' : variant;

    // Handle click outside to close dropdown
    useEffect(() => {
      if (!isDropdown || !isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          buttonRef.current &&
          dropdownRef.current &&
          !buttonRef.current.contains(event.target as Node) &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
          buttonRef.current?.focus();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isDropdown, isOpen, setIsOpen]);

    // Handle button click
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDropdown) {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
      onClick?.(event);
    };

    // Get button position for dropdown positioning
    const getDropdownPosition = () => {
      if (!buttonRef.current) return { top: 0, left: 0, width: 0 };

      const rect = buttonRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY + 4, // 4px gap
        left: rect.left + window.scrollX,
        width: rect.width,
      };
    };

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
      const dropdownIcon = isDropdown ? (
        <ChevronDownIcon
          className={cn(
            'transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      ) : null;

      if (iconPosition === 'right') {
        return (
          <>
            {children}
            {iconElement}
            {dropdownIcon}
          </>
        );
      }

      return (
        <>
          {iconElement}
          {children}
          {dropdownIcon}
        </>
      );
    };

    // Render dropdown portal
    const renderDropdown = () => {
      if (!isDropdown || !isOpen || typeof window === 'undefined') return null;

      const position = getDropdownPosition();

      return createPortal(
        <div
          ref={dropdownRef}
          className={cn(
            'absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-max',
            dropdownClassName
          )}
          style={{
            top: position.top,
            left: position.left,
            minWidth: position.width,
          }}
        >
          {dropdownContent}
        </div>,
        document.body
      );
    };

    return (
      <>
        <button
          ref={node => {
            // @ts-ignore - We need to assign to current for internal ref
            buttonRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref && 'current' in ref) {
              // @ts-ignore - We need to assign to current for forwarded ref
              ref.current = node;
            }
          }}
          className={cn(
            buttonVariants({ variant: effectiveVariant, size, fullWidth }),
            className
          )}
          disabled={isDisabled}
          onClick={handleClick}
          aria-disabled={isDisabled}
          aria-describedby={ariaDescribedby}
          aria-label={ariaLabel}
          aria-expanded={isDropdown ? isOpen : ariaExpanded}
          aria-controls={ariaControls}
          aria-pressed={ariaPressed}
          aria-busy={isLoading}
          aria-haspopup={isDropdown ? 'menu' : undefined}
          {...props}
        >
          {renderContent()}
          {/* Screen reader only text for loading state */}
          {isLoading && <span className='sr-only'>{loadingText}</span>}
        </button>
        {renderDropdown()}
      </>
    );
  }
);

Button.displayName = 'Button';

// Export icon components for external use
export { ArrowIcon, EyeIcon, PlusIcon, LoadingSpinner, ChevronDownIcon };
