import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';

const avatarVariants = cva(
  'inline-flex items-center justify-center font-medium text-white select-none',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
      },
      variant: {
        circle: 'rounded-full',
        square: 'rounded-lg',
      },
      color: {
        blue: 'bg-blue-600',
        gray: 'bg-gray-600',
        green: 'bg-green-600',
        red: 'bg-red-600',
        yellow: 'bg-yellow-600',
        purple: 'bg-purple-600',
        pink: 'bg-pink-600',
        indigo: 'bg-indigo-600',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'circle',
      color: 'blue',
    },
  }
);

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    BaseProps,
    VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback text (usually initials) */
  fallback?: string;
  /** Name to generate initials from if fallback not provided */
  name?: string;
  /** Whether to show the name label next to the avatar */
  showName?: boolean;
  /** Position of the name label relative to the avatar */
  namePosition?: 'right' | 'bottom';
}

/**
 * Avatar component for displaying user profile pictures or initials
 *
 * Supports images with fallback to initials, multiple sizes and variants.
 * Automatically generates initials from name if fallback not provided.
 *
 * @example
 * ```tsx
 * // With image
 * <Avatar src="/avatar.jpg" alt="John Doe" />
 *
 * // With initials fallback
 * <Avatar name="John Doe" fallback="JD" />
 *
 * // Auto-generated initials with name label
 * <Avatar name="John Doe" size="lg" color="green" showName />
 *
 * // Name below avatar
 * <Avatar name="Jane Smith" showName namePosition="bottom" />
 *
 * // Custom styling
 * <Avatar
 *   name="Jane Smith"
 *   size="xl"
 *   variant="square"
 *   color="purple"
 *   showName
 * />
 * ```
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size,
      variant,
      color,
      src,
      alt,
      fallback,
      name,
      showName = false,
      namePosition = 'right',
      ...props
    },
    ref
  ) => {
    // Generate initials from name if fallback not provided
    const getInitials = (name: string): string => {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const displayText = fallback || (name ? getInitials(name) : '?');

    const avatarElement = (
      <div className={cn(avatarVariants({ size, variant, color }))}>
        {src ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className={cn(
              'h-full w-full object-cover',
              variant === 'circle' ? 'rounded-full' : 'rounded-lg'
            )}
            onError={e => {
              // Hide image on error to show fallback
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <span className='leading-none'>{displayText}</span>
        )}
      </div>
    );

    if (!showName || !name) {
      return (
        <div ref={ref} className={cn(className)} {...props}>
          {avatarElement}
        </div>
      );
    }

    const containerClass = cn(
      'inline-flex items-center',
      namePosition === 'right' ? 'gap-3' : 'flex-col gap-2',
      className
    );

    return (
      <div ref={ref} className={containerClass} {...props}>
        {avatarElement}
        <span
          className={cn(
            'font-medium text-gray-900',
            namePosition === 'bottom' && 'text-center text-sm'
          )}
        >
          {name}
        </span>
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
