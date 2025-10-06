import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { SketchPicker } from 'react-color';
import { cn } from '@/utils/cn';

// Edit icon component
const EditIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
    <path d='m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z' />
  </svg>
);

const colorPickerVariants = cva('relative inline-block font-jost', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const colorWheelVariants = cva(
  'rounded-full border-2 border-gray-200 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: 'hover:border-gray-300',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  }
);

const panelVariants = cva(
  'bg-[#F1F1F1] transition-all duration-200 font-jost',
  {
    variants: {
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface ColorPickerProps
  extends VariantProps<typeof colorPickerVariants> {
  /** Label for the color picker */
  label?: string;
  /** Current color value (hex format) */
  value?: string;
  /** Default color value (hex format) */
  defaultValue?: string;
  /** Callback fired when color changes */
  onChange?: (color: string) => void;
  /** Whether to show the color picker in a panel */
  showPanel?: boolean;
  /** Whether the color picker is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Predefined color palette */
  colors?: string[];
  /** Whether to show the color wheel or just the circle picker */
  variant?: 'wheel' | 'circle' | 'sketch';
  /** Whether to allow custom color input */
  allowCustom?: boolean;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA description for accessibility */
  'aria-describedby'?: string;
}

/**
 * ColorPicker component for selecting colors with accessibility support
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   label="Primary color"
 *   defaultValue="#2C4BFF"
 *   onChange={(color) => console.log(color)}
 *   showPanel
 * />
 * ```
 */
export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      label,
      value,
      defaultValue = '#2C4BFF',
      onChange,
      showPanel = false,
      disabled = false,
      className,
      size = 'md',
      colors = [
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#8bc34a',
        '#cddc39',
        '#ffeb3b',
        '#ffc107',
        '#ff9800',
        '#ff5722',
        '#795548',
        '#9e9e9e',
        '#607d8b',
        '#000000',
      ],
      variant = 'circle',
      allowCustom = false,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const [showCustomPicker, setShowCustomPicker] = useState(false);
    const [portalPosition, setPortalPosition] = useState({ top: 0, left: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const portalRef = useRef<HTMLDivElement>(null);

    const currentValue = value ?? internalValue;

    const handleColorChange = useCallback(
      (color: any) => {
        const hexColor = color.hex;
        if (!value) {
          setInternalValue(hexColor);
        }
        onChange?.(hexColor);
      },
      [onChange, value]
    );

    const handleToggle = useCallback(() => {
      if (!disabled) {
        if (!isOpen && buttonRef.current) {
          // Calculate position for portal
          const buttonRect = buttonRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;

          // Estimate picker dimensions based on current state
          const pickerWidth = allowCustom ? 280 : 200; // Account for both modes
          const pickerHeight = allowCustom ? 400 : 140; // Account for both modes

          let top = buttonRect.bottom + 8; // 8px gap
          let left = buttonRect.left;

          // Adjust if picker would go off-screen vertically
          if (top + pickerHeight > viewportHeight) {
            top = buttonRect.top - pickerHeight - 8;
          }

          // Adjust if picker would go off-screen horizontally
          if (left + pickerWidth > viewportWidth) {
            left = viewportWidth - pickerWidth - 16;
          }

          // Ensure minimum margins
          top = Math.max(16, top);
          left = Math.max(16, left);

          setPortalPosition({ top, left });
        }
        setIsOpen(prev => !prev);
      }
    }, [disabled, isOpen, allowCustom]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleToggle();
        } else if (event.key === 'Escape' && isOpen) {
          setIsOpen(false);
          buttonRef.current?.focus();
        }
      },
      [handleToggle, isOpen]
    );

    // Close picker when clicking outside or on scroll/resize
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node) &&
          portalRef.current &&
          !portalRef.current.contains(event.target as Node) &&
          isOpen
        ) {
          setIsOpen(false);
        }
      };

      const handleScroll = () => {
        if (isOpen) {
          setIsOpen(false);
        }
      };

      const handleResize = () => {
        if (isOpen) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleResize);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
          window.removeEventListener('scroll', handleScroll, true);
          window.removeEventListener('resize', handleResize);
        };
      }

      return undefined;
    }, [isOpen]);

    const colorWheel = (
      <button
        ref={buttonRef}
        type='button'
        className={cn(colorWheelVariants({ size, disabled }))}
        style={{ backgroundColor: currentValue }}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={
          ariaLabel || `Select color, current color is ${currentValue}`
        }
        aria-describedby={ariaDescribedBy}
        aria-expanded={isOpen}
        aria-haspopup='dialog'
        role='button'
      />
    );

    const colorPicker = (
      <div className='p-4 bg-[#F1F1F1] shadow-lg font-jost'>
        {showCustomPicker && allowCustom ? (
          <div>
            <button
              type='button'
              onClick={() => setShowCustomPicker(false)}
              className='mb-3 px-3 py-1 text-xs transition-colors font-jost bg-gray-100 text-gray-600 hover:bg-gray-200'
            >
              ← Back to presets
            </button>
            <SketchPicker
              color={currentValue}
              onChange={handleColorChange}
              disableAlpha
              presetColors={[]}
              width='240px'
            />
          </div>
        ) : (
          <div className='grid grid-cols-5 gap-2 max-w-fit'>
            {colors.map(color => (
              <button
                key={color}
                type='button'
                className={cn(
                  'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  size === 'sm'
                    ? 'w-5 h-5'
                    : size === 'md'
                      ? 'w-6 h-6'
                      : 'w-7 h-7'
                )}
                style={{
                  backgroundColor: color,
                  borderRadius: '50%',
                  border:
                    currentValue === color
                      ? '2px solid #000'
                      : '1px solid #ccc',
                }}
                onClick={() => handleColorChange({ hex: color })}
                aria-label={`Select color ${color}`}
              />
            ))}
            {allowCustom && (
              <button
                type='button'
                className={cn(
                  'border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center text-gray-600 hover:text-gray-800',
                  size === 'sm'
                    ? 'w-5 h-5'
                    : size === 'md'
                      ? 'w-6 h-6'
                      : 'w-7 h-7'
                )}
                style={{ borderRadius: '50%' }}
                onClick={() => setShowCustomPicker(true)}
                aria-label='Open custom color picker'
              >
                <EditIcon size={size === 'sm' ? 10 : size === 'md' ? 12 : 14} />
              </button>
            )}
          </div>
        )}
      </div>
    );

    const portalOverlay =
      isOpen && typeof window !== 'undefined'
        ? createPortal(
            <div
              ref={portalRef}
              role='dialog'
              aria-label='Color picker'
              className='fixed z-[9999]'
              style={{
                top: `${portalPosition.top}px`,
                left: `${portalPosition.left}px`,
              }}
            >
              {colorPicker}
            </div>,
            document.body
          )
        : null;

    return (
      <>
        <div
          ref={ref}
          className={cn(colorPickerVariants({ size }), className)}
          {...props}
        >
          <div ref={containerRef} className='relative'>
            {label && (
              <label className='block text-base font-medium text-gray-700 mb-2'>
                {label}
              </label>
            )}

            {showPanel ? (
              <div className={cn(panelVariants({ size }))}>
                <div className='flex items-center gap-3'>
                  {colorWheel}
                  <span className='text-gray-600'>Select color from wheel</span>
                </div>
              </div>
            ) : (
              colorWheel
            )}
          </div>
        </div>
        {portalOverlay}
      </>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';
