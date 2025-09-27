import type { ReactNode } from 'react';

/**
 * Base props that all components should extend
 */
export interface BaseProps {
  /** Additional CSS classes */
  className?: string | undefined;
  /** Children elements */
  children?: ReactNode;
  /** Test ID for testing purposes */
  'data-testid'?: string;
}

/**
 * Common size variants used across components
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Common color variants used across components
 */
export type Variant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'outline'
  | 'ghost';

/**
 * Loading state type
 */
export interface LoadingState {
  isLoading?: boolean;
  loadingText?: string;
}

/**
 * Disabled state type
 */
export interface DisabledState {
  disabled?: boolean;
  disabledReason?: string;
}
