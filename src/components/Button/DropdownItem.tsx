import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';

export interface DropdownItemProps
  extends HTMLAttributes<HTMLDivElement>,
    BaseProps {
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Icon component to display */
  Icon?: React.ComponentType<{ className?: string }>;
  /** Item content */
  children: React.ReactNode;
}

/**
 * Dropdown item component for use within Button dropdown content
 *
 * @example
 * ```tsx
 * <Button
 *   dropdownContent={
 *     <>
 *       <DropdownItem>Edit</DropdownItem>
 *       <DropdownItem>Delete</DropdownItem>
 *       <DropdownItem disabled>Archive</DropdownItem>
 *     </>
 *   }
 * >
 *   Actions
 * </Button>
 * ```
 */
export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, disabled, Icon, children, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors',
          disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
          className
        )}
        onClick={disabled ? undefined : onClick}
        role='menuitem'
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        {...props}
      >
        {Icon && <Icon className='w-4 h-4' />}
        {children}
      </div>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';
