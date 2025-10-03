import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';

const drawerVariants = cva(
  'fixed top-0 right-0 h-full bg-white shadow-2xl transform transition-all duration-300 ease-in-out z-50 w-full md:w-auto',
  {
    variants: {
      size: {
        sm: 'md:w-80',
        md: 'md:w-96',
        lg: 'md:w-[500px]',
        xl: 'md:w-[600px]',
      },
      state: {
        closed: 'translate-x-full opacity-0',
        open: 'translate-x-0 opacity-100',
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
    if (isOpen && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, [isOpen]);

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
            state: isOpen ? 'open' : 'closed',
            variant: backdropVariant,
          })
        )}
        onClick={handleBackdropClick}
        aria-hidden='true'
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          drawerVariants({
            size,
            state: isOpen ? 'open' : 'closed',
          }),
          className
        )}
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
        <div className='flex-1 overflow-y-auto p-6'>{children}</div>
      </div>
    </>
  );

  // Render in portal
  return typeof document !== 'undefined'
    ? createPortal(drawerContent, document.body)
    : null;
};

DrawerModal.displayName = 'DrawerModal';
