import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';

const drawerVariants = cva(
  'fixed top-0 right-0 h-full bg-white shadow-2xl transform transition-all duration-300 ease-in-out z-50',
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
      // We keep the state variant to preserve the API, but avoid applying translate classes
      // to prevent clashes with inline transforms used for reliability in consumers.
      state: {
        closed: '',
        open: '',
      },
    },
    defaultVariants: {
      size: 'lg',
      state: 'closed',
    },
  }
);

const backdropVariants = cva(
  'fixed inset-0 transition-all duration-300 ease-in-out z-40',
  {
    variants: {
      state: {
        closed: 'opacity-0 pointer-events-none',
        open: 'opacity-100',
      },
      variant: {
        blur: 'bg-black/20 backdrop-blur-sm',
        dim: 'bg-black/40',
        transparent: 'bg-transparent',
      },
    },
    defaultVariants: {
      state: 'closed',
      variant: 'blur',
    },
  }
);

export interface DrawerModalProps
  extends BaseProps,
    VariantProps<typeof drawerVariants> {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Drawer title */
  title?: string;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Backdrop variant */
  backdropVariant?: 'blur' | 'dim' | 'transparent';
  /** Whether clicking backdrop closes drawer */
  closeOnBackdropClick?: boolean;
  /** Whether pressing escape closes drawer */
  closeOnEscape?: boolean;
  /** Children content */
  children: React.ReactNode;
}

const CloseIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M18 6L6 18M6 6L18 18'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

/**
 * Right-side drawer modal component with backdrop blur
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <DrawerModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Booking Details"
 * >
 *   <div>Modal content here</div>
 * </DrawerModal>
 * ```
 */
export const DrawerModal: React.FC<DrawerModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'lg',
  showCloseButton = true,
  backdropVariant = 'blur',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  children,
  className,
  ...props
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  // Mount/visibility states ensure CSS transitions run on first open and on close
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Handle responsive width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isVisible && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, [isVisible]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const drawerContent = (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          backdropVariants({
            state: isVisible ? 'open' : 'closed',
            variant: backdropVariant,
          })
        )}
        onClick={handleBackdropClick}
        aria-hidden='true'
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(drawerVariants({ size }), className)}
        style={
          {
            width: isMobile
              ? '100vw'
              : size === 'sm'
                ? '320px'
                : size === 'md'
                  ? '384px'
                  : size === 'xl'
                    ? '600px'
                    : '500px', // lg default
            // Force transform/opacity inline to avoid missing Tailwind classes in consumer builds
            transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
            opacity: isVisible ? 1 : 0,
          } as React.CSSProperties
        }
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? 'drawer-title' : undefined}
        {...props}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className='flex items-center justify-between border-b border-gray-200 p-6'>
            {title && (
              <h2
                id='drawer-title'
                className='text-lg font-semibold text-gray-900'
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className='rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                aria-label='Close drawer'
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            'flex-1 overflow-y-auto p-6 transform transition-all duration-500 ease-out',
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          )}
          style={{
            transitionDelay: isVisible ? '150ms' : '0ms',
          }}
        >
          {children}
        </div>
      </div>
    </>
  );

  // Mount closed, then open on next frame so transition runs; delay unmount on close
  useEffect(() => {
    // Clear any pending async work to avoid races
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isOpen) {
      // Mount immediately
      setIsMounted(true);
      // Start from closed state explicitly
      setIsVisible(false);
      // Ensure the element renders in the closed state and a layout pass occurs
      rafRef.current = requestAnimationFrame(() => {
        void drawerRef.current?.offsetWidth; // reflow
        // Double RAF to ensure styles are committed before toggling
        rafRef.current = requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else if (isMounted) {
      // Begin closing transition and unmount after duration
      setIsVisible(false);
      timeoutRef.current = window.setTimeout(() => setIsMounted(false), 300);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen, isMounted]);

  // Only render while mounted (open or closing)
  if (!isMounted) {
    return null;
  }

  // Render in portal
  return typeof document !== 'undefined'
    ? createPortal(drawerContent, document.body)
    : null;
};

DrawerModal.displayName = 'DrawerModal';
