import React, { useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';
import { Text } from '../Text/Text';

const copyVariants = cva(
  'inline-flex items-center gap-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border-blue-300 bg-white text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
        outline:
          'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
        ghost:
          'border-transparent bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
        solid:
          'border-blue-600 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base',
      },
      state: {
        idle: '',
        copying: 'opacity-75 cursor-wait',
        success: 'border-green-300 bg-green-50 text-green-700',
        error: 'border-red-300 bg-red-50 text-red-700',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'idle',
    },
  }
);

const DefaultCopyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M13.5 2.5H6.5C5.94772 2.5 5.5 2.94772 5.5 3.5V4.5H4.5C3.94772 4.5 3.5 4.94772 3.5 5.5V12.5C3.5 13.0523 3.94772 13.5 4.5 13.5H11.5C12.0523 13.5 12.5 13.0523 12.5 12.5V11.5H13.5C14.0523 11.5 14.5 11.0523 14.5 10.5V3.5C14.5 2.94772 14.0523 2.5 13.5 2.5Z'
      stroke='currentColor'
      strokeWidth='1'
      fill='none'
    />
    <path
      d='M5.5 4.5V3.5C5.5 2.94772 5.94772 2.5 6.5 2.5H13.5C14.0523 2.5 14.5 2.94772 14.5 3.5V10.5C14.5 11.0523 14.0523 11.5 13.5 11.5H12.5'
      stroke='currentColor'
      strokeWidth='1'
      fill='none'
    />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M13.5 4.5L6 12L2.5 8.5'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export interface CopyProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    BaseProps,
    VariantProps<typeof copyVariants> {
  /** The text/content to copy to clipboard */
  value: string;
  /** Custom text to display (defaults to "COPY") */
  text?: string;
  /** Custom icon to display */
  icon?: React.ReactNode;
  /** Success message duration in milliseconds */
  successDuration?: number;
  /** Callback fired when copy succeeds */
  onCopySuccess?: (value: string) => void;
  /** Callback fired when copy fails */
  onCopyError?: (error: Error) => void;
  /** Custom success text */
  successText?: string;
  /** Custom error text */
  errorText?: string;
  /** Hide text and show only icon */
  iconOnly?: boolean;
}

/**
 * Copy component for clipboard functionality with visual feedback
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Copy value="Hello World" />
 *
 * // Custom text and styling
 * <Copy
 *   value="xtratouch.dev.zirro.app"
 *   text="Copy URL"
 *   variant="solid"
 *   size="lg"
 * />
 *
 * // Custom icon
 * <Copy
 *   value="API_KEY_123"
 *   icon={<KeyIcon />}
 *   text="Copy Key"
 * />
 *
 * // Icon only
 * <Copy
 *   value="content"
 *   iconOnly
 *   variant="ghost"
 * />
 * ```
 */
export const Copy: React.FC<CopyProps> = ({
  className,
  variant,
  size,
  value,
  text = 'COPY',
  icon,
  successDuration = 2000,
  onCopySuccess,
  onCopyError,
  successText = 'Copied!',
  errorText = 'Failed',
  iconOnly = false,
  ...props
}) => {
  const [copyState, setCopyState] = useState<
    'idle' | 'copying' | 'success' | 'error'
  >('idle');

  const handleCopy = useCallback(async () => {
    if (copyState === 'copying') return;

    setCopyState('copying');

    try {
      await navigator.clipboard.writeText(value);
      setCopyState('success');
      onCopySuccess?.(value);

      setTimeout(() => {
        setCopyState('idle');
      }, successDuration);
    } catch (error) {
      setCopyState('error');
      onCopyError?.(error as Error);

      setTimeout(() => {
        setCopyState('idle');
      }, successDuration);
    }
  }, [value, copyState, onCopySuccess, onCopyError, successDuration]);

  const getDisplayText = () => {
    switch (copyState) {
      case 'copying':
        return 'Copying...';
      case 'success':
        return successText;
      case 'error':
        return errorText;
      default:
        return text;
    }
  };

  const getIcon = () => {
    if (copyState === 'success') {
      return <CheckIcon className='text-current' />;
    }

    if (icon) {
      return icon;
    }

    return <DefaultCopyIcon className='text-current' />;
  };

  return (
    <button
      className={cn(
        copyVariants({ variant, size, state: copyState }),
        className
      )}
      onClick={handleCopy}
      disabled={copyState === 'copying'}
      aria-label={`Copy ${value} to clipboard`}
      title={`Copy ${value} to clipboard`}
      {...props}
    >
      {getIcon()}
      {!iconOnly && (
        <Text
          as='span'
          size={
            size === 'sm' ? 'extrasmall' : size === 'lg' ? 'large' : 'small'
          }
          weight='semibold'
          className='text-current'
        >
          {getDisplayText()}
        </Text>
      )}
    </button>
  );
};

Copy.displayName = 'Copy';
