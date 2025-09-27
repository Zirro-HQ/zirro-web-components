import {
  forwardRef,
  useState,
  useEffect,
  type InputHTMLAttributes,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';

const toggleVariants = cva(
  'relative inline-flex items-center rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[28px]',
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-12',
        xl: 'h-8 w-13',
      },
      variant: {
        default: '',
        text: '',
      },
      checked: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Default variant colors
      {
        variant: 'default',
        checked: true,
        class: 'bg-green-500 border-green-500 border-2',
      },
      {
        variant: 'default',
        checked: false,
        class: 'bg-gray-300 border-gray-300 border-2',
      },
      // Text variant colors with blue border when active
      {
        variant: 'text',
        checked: true,
        class: 'bg-white border-blue-600 border-4',
      },
      {
        variant: 'text',
        checked: false,
        class: 'bg-gray-200 border-gray-400 border-2',
      },
      // Text variant sizing - same as default since text is outside
      {
        variant: 'text',
        size: 'sm',
        class: 'h-5 w-9',
      },
      {
        variant: 'text',
        size: 'md',
        class: 'h-6 w-11',
      },
      {
        variant: 'text',
        size: 'lg',
        class: 'h-7 w-12',
      },
      {
        variant: 'text',
        size: 'xl',
        class: 'h-8 w-13',
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'default',
      checked: false,
    },
  }
);

const toggleThumbVariants = cva(
  'pointer-events-none inline-block rounded-full shadow transform ring-0 transition duration-200 ease-in-out',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
        xl: 'h-7 w-7',
      },
      variant: {
        default: '',
        text: '',
      },
      checked: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Default variant translations
      {
        variant: 'default',
        size: 'sm',
        checked: true,
        class: 'translate-x-4',
      },
      {
        variant: 'default',
        size: 'sm',
        checked: false,
        class: 'translate-x-0',
      },
      {
        variant: 'default',
        size: 'md',
        checked: true,
        class: 'translate-x-5',
      },
      {
        variant: 'default',
        size: 'md',
        checked: false,
        class: 'translate-x-0',
      },
      {
        variant: 'default',
        size: 'lg',
        checked: true,
        class: 'translate-x-5',
      },
      {
        variant: 'default',
        size: 'lg',
        checked: false,
        class: 'translate-x-0',
      },
      {
        variant: 'default',
        size: 'xl',
        checked: true,
        class: 'translate-x-5',
      },
      {
        variant: 'default',
        size: 'xl',
        checked: false,
        class: 'translate-x-0',
      },
      // Text variant translations - same as default since text is outside
      {
        variant: 'text',
        size: 'sm',
        checked: true,
        class: 'translate-x-4',
      },
      {
        variant: 'text',
        size: 'sm',
        checked: false,
        class: 'translate-x-0',
      },
      {
        variant: 'text',
        size: 'md',
        checked: true,
        class: 'translate-x-5',
      },
      {
        variant: 'text',
        size: 'md',
        checked: false,
        class: 'translate-x-0',
      },
      {
        variant: 'text',
        size: 'lg',
        checked: true,
        class: 'translate-x-5',
      },
      {
        variant: 'text',
        size: 'lg',
        checked: false,
        class: 'translate-x-0',
      },
      // Thumb colors for default variant
      {
        variant: 'default',
        checked: true,
        class: 'bg-white',
      },
      {
        variant: 'default',
        checked: false,
        class: 'bg-white',
      },
      // Thumb colors for text variant - ring style when active
      {
        variant: 'text',
        checked: true,
        class: 'bg-[#ACB8FF] border-4 border-blue-600',
      },
      {
        variant: 'text',
        checked: false,
        class: 'bg-white border-2 border-gray-300',
      },
      // Fixed 15px thumb size for text variant
      {
        variant: 'text',
        size: 'sm',
        class: 'w-[15px] h-[15px]',
      },
      {
        variant: 'text',
        size: 'md',
        class: 'w-[15px] h-[15px]',
      },
      {
        variant: 'text',
        size: 'lg',
        class: 'w-[15px] h-[15px]',
      },
      {
        variant: 'text',
        size: 'xl',
        class: 'w-[15px] h-[15px]',
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'default',
      checked: false,
    },
  }
);

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    BaseProps,
    VariantProps<typeof toggleVariants> {
  /** Whether the toggle is checked */
  checked?: boolean;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Callback fired when the toggle state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Label for the toggle (for accessibility) */
  label?: string;
  /** Description text for the toggle */
  description?: string;
  /** Whether to show the label */
  showLabel?: boolean;
  /** Text to show when toggle is unchecked (for text variant) */
  uncheckedText?: string;
  /** Text to show when toggle is checked (for text variant) */
  checkedText?: string;
}

/**
 * Accessible toggle component with keyboard navigation and ARIA support
 *
 * Features:
 * - Full keyboard accessibility (Space/Enter to toggle)
 * - ARIA attributes for screen readers
 * - Controlled and uncontrolled modes
 * - Multiple sizes (sm, md, lg)
 * - Smooth animations
 * - Focus management
 *
 * @example
 * ```tsx
 * // Controlled toggle
 * <Toggle
 *   checked={isEnabled}
 *   onCheckedChange={setIsEnabled}
 *   label="Enable notifications"
 *   description="Receive email notifications"
 * />
 *
 * // Uncontrolled toggle
 * <Toggle
 *   defaultChecked={true}
 *   label="Dark mode"
 *   size="lg"
 * />
 *
 * // Text toggle variants
 * <Toggle
 *   variant="text"
 *   checked={isAccepted}
 *   onCheckedChange={setIsAccepted}
 *   label="Accept terms"
 *   uncheckedText="No"
 *   checkedText="Yes"
 * />
 *
 * <Toggle
 *   variant="text"
 *   checked={isOpen}
 *   onCheckedChange={setIsOpen}
 *   label="Store status"
 *   uncheckedText="Closed"
 *   checkedText="Open"
 * />
 *
 * // Simple toggle without label
 * <Toggle
 *   checked={value}
 *   onCheckedChange={setValue}
 *   aria-label="Toggle feature"
 * />
 * ```
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = 'md',
      variant = 'default',
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      onChange,
      label,
      description,
      showLabel = true,
      uncheckedText = 'No',
      checkedText = 'Yes',
      disabled,
      className,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    // Handle controlled vs uncontrolled state
    const [internalChecked, setInternalChecked] = useState(
      controlledChecked ?? defaultChecked
    );

    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    // Sync internal state with controlled prop
    useEffect(() => {
      if (isControlled) {
        setInternalChecked(controlledChecked);
      }
    }, [controlledChecked, isControlled]);

    const handleToggle = () => {
      if (disabled) return;

      const newChecked = !checked;

      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      onCheckedChange?.(newChecked);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      handleToggle();
      onChange?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        handleToggle();
      }
    };

    // Generate unique IDs for accessibility
    const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;
    const labelId = label ? `${toggleId}-label` : undefined;
    const descriptionId = description ? `${toggleId}-description` : undefined;

    // Build aria-describedby
    const describedBy =
      [ariaDescribedBy, descriptionId].filter(Boolean).join(' ') || undefined;

    const toggleElement =
      variant === 'text' ? (
        <div className='flex items-center space-x-3'>
          <button
            type='button'
            role='switch'
            aria-checked={checked}
            aria-label={ariaLabel || (label && !showLabel ? label : undefined)}
            aria-labelledby={
              ariaLabelledBy || (showLabel && labelId ? labelId : undefined)
            }
            aria-describedby={describedBy}
            disabled={disabled}
            className={cn(
              toggleVariants({ size, variant, checked }),
              className
            )}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
          >
            {/* Hidden input for form integration */}
            <input
              ref={ref}
              type='checkbox'
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
              className='sr-only'
              id={toggleId}
              {...props}
            />

            {/* Toggle thumb */}
            <span
              className={toggleThumbVariants({ size, variant, checked })}
              aria-hidden='true'
            />
          </button>

          {/* Text label next to toggle */}
          <span
            className={cn(
              'font-medium transition-colors duration-200 text-black',
              size === 'sm'
                ? 'text-sm'
                : size === 'md'
                  ? 'text-base'
                  : 'text-lg'
            )}
            aria-hidden='true'
          >
            {checked ? checkedText : uncheckedText}
          </span>
        </div>
      ) : (
        <button
          type='button'
          role='switch'
          aria-checked={checked}
          aria-label={ariaLabel || (label && !showLabel ? label : undefined)}
          aria-labelledby={
            ariaLabelledBy || (showLabel && labelId ? labelId : undefined)
          }
          aria-describedby={describedBy}
          disabled={disabled}
          className={cn(toggleVariants({ size, variant, checked }), className)}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          {/* Hidden input for form integration */}
          <input
            ref={ref}
            type='checkbox'
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className='sr-only'
            id={toggleId}
            {...props}
          />

          {/* Toggle thumb */}
          <span
            className={toggleThumbVariants({ size, variant, checked })}
            aria-hidden='true'
          />
        </button>
      );

    // If no label or description, return just the toggle
    if (!label && !description) {
      return toggleElement;
    }

    // Return toggle with label and description
    return (
      <div className='flex items-start space-x-3'>
        {toggleElement}

        {(label || description) && (
          <div className='flex flex-col'>
            {label && showLabel && (
              <label
                id={labelId}
                htmlFor={toggleId}
                className='text-sm font-medium text-gray-900 cursor-pointer'
              >
                {label}
              </label>
            )}
            {description && (
              <p id={descriptionId} className='text-sm text-gray-500 mt-1'>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';
