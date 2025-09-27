import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';

const textVariants = cva('font-jost', {
  variants: {
    size: {
      extrasmall: 'text-xs', // 0.75rem
      small: 'text-sm', // 0.875rem
      medium: 'text-base', // 1rem
      large: 'text-xl', // 1.25rem
    },
    weight: {
      normal: 'font-normal', // 400
      heavy: 'font-bold', // 700
    },
  },
  defaultVariants: {
    size: 'medium',
    weight: 'normal',
  },
});

export interface TextProps
  extends HTMLAttributes<HTMLSpanElement>,
    BaseProps,
    VariantProps<typeof textVariants> {
  /** HTML element to render as */
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label';
}

/**
 * Versatile text component with customizable size and weight
 *
 * Uses "Jost" font by default, but can be overridden with className prop.
 *
 * @example
 * ```tsx
 * // Default text (medium size, normal weight)
 * <Text>Default text</Text>
 *
 * // Large heavy text
 * <Text size="large" weight="heavy">
 *   Important heading
 * </Text>
 *
 * // Custom element and font override
 * <Text as="h2" className="font-sans">
 *   Custom heading
 * </Text>
 * ```
 */
export const Text = forwardRef<HTMLElement, TextProps>(
  (
    { className, size, weight, as: Component = 'span', children, ...props },
    ref
  ) => {
    return (
      <Component
        className={cn(textVariants({ size, weight }), className)}
        ref={ref as any}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
