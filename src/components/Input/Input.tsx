import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';

const inputVariants = cva(
  'w-full border !border-black bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 !focus:border-black disabled:opacity-50 disabled:cursor-not-allowed font-jost',
  {
    variants: {
      size: {
        sm: 'px-3 py-2 text-sm rounded-md',
        md: 'px-4 py-3 text-base rounded-lg',
        lg: 'px-5 py-4 text-lg rounded-lg',
      },
      variant: {
        default: 'border-black',
        error: 'border-red-500 focus:ring-red-500',
        success: 'border-green-500 focus:ring-green-500',
      },
      multiline: {
        true: 'resize-vertical min-h-[120px]',
        false: '',
      },
      upload: {
        true: 'border-2 border-dashed border-gray-300 bg-[#F1F1F1] hover:border-gray-400 hover:bg-[#E8E8E8] cursor-pointer p-8 text-center',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      multiline: false,
      upload: false,
    },
  }
);

const labelVariants = cva('block font-jost font-normal text-gray-900', {
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

type BaseInputProps = {
  /** Label text displayed above the input */
  label?: string;
  /** Optional sub label content rendered to the right of the label row */
  subLabel?: React.ReactNode;
  /** Remove border radius, producing sharp corners */
  noBorderRadius?: boolean;
  /** Enable searchable dropdown (combobox) behavior */
  combobox?: boolean;
  /** Options for the combobox */
  options?: Array<{
    label: React.ReactNode;
    value: string;
    searchText?: string;
  }>;
  /** Controlled selected value (value of the chosen option) */
  selectedValue?: string | undefined;
  /** Default selected value (uncontrolled) */
  defaultSelectedValue?: string;
  /** Callback when an option is selected */
  onSelectOption?: (option: { label: React.ReactNode; value: string }) => void;
  /** Alignment of the selected value when displayed */
  comboboxAlign?: 'left' | 'center' | 'right';
  /** Helper text displayed below the input */
  helperText?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Whether to render as textarea for multiline input */
  multiline?: boolean;
  /** Number of rows for textarea (when multiline is true) */
  rows?: number;
  /** Whether to render as file upload input */
  upload?: boolean;
  /** Accepted file types for upload input */
  accept?: string;
  /** Maximum file size in MB for upload input */
  maxSize?: number;
  /** Upload area text */
  uploadText?: string;
  /** Upload area subtext */
  uploadSubtext?: string;
  /** Whether to allow multiple file uploads */
  multiple?: boolean;
  /** Maximum number of files allowed (only applies when multiple=true) */
  maxFiles?: number;
  /** Callback when files are uploaded */
  onFilesChange?: (files: File[]) => void;
  /** Callback when a file is deleted */
  onFileDelete?: (index: number) => void;
  /** Whether the input is required */
  required?: boolean;
  /** Accessible description for screen readers */
  'aria-describedby'?: string;
  /** Accessible label when label prop is not sufficient */
  'aria-label'?: string;
  /** Whether the input is invalid */
  'aria-invalid'?: boolean;
} & BaseProps &
  VariantProps<typeof inputVariants>;

type SingleLineInputProps = BaseInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    multiline?: false;
    upload?: false;
  };

type MultiLineInputProps = BaseInputProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
    multiline: true;
    upload?: false;
  };

type FileUploadInputProps = BaseInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    multiline?: false;
    upload: true;
    type?: 'file';
  };

export type InputProps =
  | SingleLineInputProps
  | MultiLineInputProps
  | FileUploadInputProps;

// Upload icon component
const UploadIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('w-8 h-8', className)}
    width='32'
    height='32'
    viewBox='0 0 32 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      opacity='0.2'
      d='M27 6V26H5V6C5 5.46957 5.21071 4.96086 5.58579 4.58579C5.96086 4.21071 6.46957 4 7 4H25C25.5304 4 26.0391 4.21071 26.4142 4.58579C26.7893 4.96086 27 5.46957 27 6Z'
      fill='currentColor'
    />
    <path
      d='M28 17.9998V25.9998C28 26.265 27.8946 26.5194 27.7071 26.7069C27.5196 26.8945 27.2652 26.9998 27 26.9998H5C4.73478 26.9998 4.48043 26.8945 4.29289 26.7069C4.10536 26.5194 4 26.265 4 25.9998V17.9998C4 17.7346 4.10536 17.4802 4.29289 17.2927C4.48043 17.1052 4.73478 16.9998 5 16.9998C5.26522 16.9998 5.51957 17.1052 5.70711 17.2927C5.89464 17.4802 6 17.7346 6 17.9998V24.9998H26V17.9998C26 17.7346 26.1054 17.4802 26.2929 17.2927C26.4804 17.1052 26.7348 16.9998 27 16.9998C27.2652 16.9998 27.5196 17.1052 27.7071 17.2927C27.8946 17.4802 28 17.7346 28 17.9998ZM11.7075 9.70731L15 6.41356V17.9998C15 18.265 15.1054 18.5194 15.2929 18.7069C15.4804 18.8945 15.7348 18.9998 16 18.9998C16.2652 18.9998 16.5196 18.8945 16.7071 18.7069C16.8946 18.5194 17 18.265 17 17.9998V6.41356L20.2925 9.70731C20.4801 9.89495 20.7346 10.0004 21 10.0004C21.2654 10.0004 21.5199 9.89495 21.7075 9.70731C21.8951 9.51967 22.0006 9.26517 22.0006 8.99981C22.0006 8.73445 21.8951 8.47995 21.7075 8.29231L16.7075 3.29231C16.6146 3.19933 16.5043 3.12557 16.3829 3.07525C16.2615 3.02493 16.1314 2.99902 16 2.99902C15.8686 2.99902 15.7385 3.02493 15.6171 3.07525C15.4957 3.12557 15.3854 3.19933 15.2925 3.29231L10.2925 8.29231C10.1049 8.47995 9.99944 8.73445 9.99944 8.99981C9.99944 9.26517 10.1049 9.51967 10.2925 9.70731C10.4801 9.89495 10.7346 10.0004 11 10.0004C11.2654 10.0004 11.5199 9.89495 11.7075 9.70731Z'
      fill='#000000'
    />
  </svg>
);

// Plus icon for upload more
const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('w-6 h-6', className)}
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

// Delete icon
const DeleteIcon = ({ className }: { className?: string }) => (
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
      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
    />
  </svg>
);

/**
 * Versatile input component supporting both single-line and multi-line text input
 *
 * Uses "Jost" font by default to match the Text component.
 * Supports labels, helper text, error states, and different sizes.
 *
 * @example
 * ```tsx
 * // Single line input with label
 * <Input
 *   label="Business name"
 *   placeholder="e.g Deola Bakery"
 * />
 *
 * // Multi-line textarea
 * <Input
 *   label="About your business (optional)"
 *   placeholder="Describe your products (optional)"
 *   multiline
 *   rows={6}
 * />
 *
 * // Input with error state
 * <Input
 *   label="Email"
 *   variant="error"
 *   error="Please enter a valid email address"
 * />
 *
 * // Single file upload input
 * <Input
 *   label="Brand logo"
 *   upload
 *   accept="image/*"
 *   uploadText="Click to upload your store logo"
 *   uploadSubtext="PNG, JPG up to 2MB"
 *   onFilesChange={(files) => console.log('Files uploaded:', files)}
 * />
 *
 * // Multiple file upload input
 * <Input
 *   label="Gallery images"
 *   upload
 *   multiple
 *   maxFiles={5}
 *   uploadText="Upload gallery images"
 *   uploadSubtext="PNG, JPG up to 2MB each"
 *   accept="image/*"
 *   onFilesChange={(files) => console.log('Files uploaded:', files)}
 *   onFileDelete={(index) => console.log('File deleted at index:', index)}
 * />
 * ```
 */
export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      className,
      size,
      variant,
      label,
      helperText,
      subLabel,
      error,
      multiline = false,
      upload = false,
      rows = 4,
      accept = 'image/*',
      maxSize = 2,
      uploadText = 'Click to upload your store logo',
      uploadSubtext = 'PNG, JPG up to 2MB',
      multiple = false,
      maxFiles = 10,
      onFilesChange,
      onFileDelete,
      required = false,
      noBorderRadius = false,
      combobox = false,
      options = [],
      selectedValue,
      defaultSelectedValue,
      onSelectOption,
      comboboxAlign = 'left',
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      'aria-invalid': ariaInvalid,
      id,
      ...props
    },
    ref
  ) => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Generate unique IDs for accessibility
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = helperText ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    // Combine aria-describedby with helper text and error IDs
    const describedBy =
      [ariaDescribedby, helperTextId, errorId].filter(Boolean).join(' ') ||
      undefined;

    // Determine if input is invalid
    const isInvalid = ariaInvalid || !!error || variant === 'error';
    const effectiveVariant = error ? 'error' : variant;

    const inputClasses = cn(
      inputVariants({
        size,
        variant: effectiveVariant,
        multiline,
        upload,
      }),
      noBorderRadius && 'rounded-none',
      className
    );

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      if (multiple) {
        const currentCount = uploadedFiles.length;
        const availableSlots = maxFiles - currentCount;
        const filesToAdd = files.slice(0, availableSlots);

        if (filesToAdd.length > 0) {
          setUploadedFiles(prev => [...prev, ...filesToAdd]);
          onFilesChange?.(filesToAdd);
        }

        // Show warning if some files were rejected
        if (files.length > filesToAdd.length) {
          console.warn(
            `Only ${filesToAdd.length} files added. Maximum ${maxFiles} files allowed.`
          );
        }
      } else {
        setUploadedFiles(files);
        onFilesChange?.(files);
      }
    };

    const handleFileDelete = (index: number) => {
      setUploadedFiles(prev => prev.filter((_, i) => i !== index));
      onFileDelete?.(index);
    };

    const triggerFileInput = () => {
      fileInputRef.current?.click();
    };

    const handleReplaceFile = () => {
      // Reset the input and trigger file selection
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.onchange = e => {
        const files = Array.from((e.target as HTMLInputElement).files || []);
        setUploadedFiles(files);
        onFilesChange?.(files);
      };
      input.click();
    };

    // Combobox state
    const [isOpenCombo, setIsOpenCombo] = useState(false);
    const [internalSelected, setInternalSelected] = useState<
      string | undefined
    >(defaultSelectedValue);
    const comboButtonRef = useRef<HTMLDivElement>(null);
    const comboListRef = useRef<HTMLUListElement>(null);

    const currentValue =
      selectedValue !== undefined ? selectedValue : internalSelected;
    const selectedOption = options.find(o => o.value === currentValue);
    const filtered = options;

    // Close on outside click/escape
    useEffect(() => {
      if (!combobox || !isOpenCombo) return;
      const onDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpenCombo(false);
      };
      const onClick = (e: MouseEvent) => {
        if (
          !comboButtonRef.current?.contains(e.target as Node) &&
          !comboListRef.current?.contains(e.target as Node)
        ) {
          setIsOpenCombo(false);
        }
      };
      document.addEventListener('keydown', onDown);
      document.addEventListener('mousedown', onClick);
      return () => {
        document.removeEventListener('keydown', onDown);
        document.removeEventListener('mousedown', onClick);
      };
    }, [combobox, isOpenCombo]);

    const handleSelect = (opt: { label: React.ReactNode; value: string }) => {
      if (selectedValue === undefined) setInternalSelected(opt.value);
      onSelectOption?.(opt);
      setIsOpenCombo(false);
      // no search state to clear
    };

    let inputElement;

    if (upload) {
      // File upload input
      inputElement = (
        <div className='space-y-4'>
          {uploadedFiles.length === 0 ? (
            // Initial upload state
            <div
              className={cn(inputClasses, 'cursor-pointer')}
              onClick={triggerFileInput}
              role='button'
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  triggerFileInput();
                }
              }}
              aria-label={ariaLabel || `${uploadText}. ${uploadSubtext}`}
            >
              <input
                type='file'
                accept={accept}
                multiple={multiple}
                className='sr-only'
                onChange={handleFileChange}
                ref={fileInputRef}
                id={inputId}
                required={required}
                aria-describedby={describedBy}
                aria-label={ariaLabel || `${uploadText}. ${uploadSubtext}`}
                aria-invalid={isInvalid}
                {...(props as InputHTMLAttributes<HTMLInputElement>)}
              />
              <UploadIcon className='text-gray-400 m-auto mb-4' />
              <div className='space-y-2'>
                <p className='text-base font-jost text-gray-900'>
                  {uploadText}
                </p>
                <p className='text-sm font-jost text-gray-500'>
                  {uploadSubtext}
                </p>
              </div>
            </div>
          ) : !multiple && uploadedFiles.length > 0 ? (
            // Single file uploaded - show replace/delete view
            <div className='bg-gray-50 rounded-lg p-6 text-center space-y-4'>
              <div className='w-20 h-20 mx-auto rounded-lg overflow-hidden bg-gray-200'>
                {uploadedFiles[0] &&
                uploadedFiles[0].type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(uploadedFiles[0])}
                    alt='Uploaded file'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full bg-gray-800 flex items-center justify-center'>
                    <span className='text-white text-xs font-bold'>FILE</span>
                  </div>
                )}
              </div>
              <div className='text-sm text-gray-600 font-jost'>
                {uploadedFiles[0]?.name}
              </div>
              <div className='flex justify-center space-x-6'>
                <button
                  type='button'
                  onClick={handleReplaceFile}
                  className='text-gray-900 font-jost hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded'
                  aria-label={`Replace ${uploadedFiles[0]?.name || 'uploaded file'}`}
                >
                  Replace
                </button>
                <button
                  type='button'
                  onClick={() => handleFileDelete(0)}
                  className='text-red-500 font-jost hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded'
                  aria-label={`Delete ${uploadedFiles[0]?.name || 'uploaded file'}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            // Multiple files uploaded - show gallery view
            <div className={cn(inputClasses, 'space-y-4')}>
              <div className='flex flex-wrap gap-4'>
                {/* Upload more button - only show if under maxFiles limit */}
                {uploadedFiles.length < maxFiles && (
                  <div
                    className='w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-[#F1F1F1] hover:bg-[#E8E8E8] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    onClick={triggerFileInput}
                    role='button'
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        triggerFileInput();
                      }
                    }}
                    aria-label={`Upload more files. ${uploadedFiles.length} of ${maxFiles} files uploaded.`}
                  >
                    <input
                      type='file'
                      accept={accept}
                      multiple={multiple}
                      className='sr-only'
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                    <PlusIcon className='text-gray-400 mb-2' />
                    <span className='text-sm font-jost text-gray-600'>
                      Upload
                    </span>
                  </div>
                )}

                {/* Uploaded images */}
                {uploadedFiles.map((file, index) => (
                  <div key={index} className='relative group w-32 h-32'>
                    <div className='w-full h-full bg-gray-200 rounded-lg overflow-hidden'>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <button
                      type='button'
                      onClick={() => handleFileDelete(index)}
                      className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:opacity-100'
                      aria-label={`Delete ${file.name}`}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                ))}
              </div>

              {/* File count indicator */}
              {uploadedFiles.length > 0 && (
                <div className='text-center text-sm text-gray-500'>
                  {uploadedFiles.length} of {maxFiles} files uploaded
                  {uploadedFiles.length >= maxFiles && (
                    <span className='block text-xs text-amber-600 mt-1'>
                      Maximum files reached. Delete files to upload more.
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      );
    } else if (multiline) {
      // Textarea
      inputElement = (
        <textarea
          className={inputClasses}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          rows={rows}
          id={inputId}
          required={required}
          aria-describedby={describedBy}
          aria-label={ariaLabel}
          aria-invalid={isInvalid}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      );
    } else if (combobox) {
      // Accessible combobox (searchable select)
      inputElement = (
        <div className='relative w-full' ref={comboButtonRef}>
          <div
            role='combobox'
            aria-expanded={isOpenCombo}
            aria-controls={`${inputId}-listbox`}
            aria-haspopup='listbox'
            className={cn(
              inputClasses,
              'flex items-center w-full',
              comboboxAlign === 'center'
                ? 'justify-center'
                : comboboxAlign === 'right'
                  ? 'justify-end'
                  : 'justify-start'
            )}
            onClick={() => setIsOpenCombo(o => !o)}
          >
            <input className='sr-only' readOnly value='' aria-hidden />
            <span
              className={cn(
                'pointer-events-none select-none text-gray-900 w-full block truncate',
                comboboxAlign === 'center'
                  ? 'text-center'
                  : comboboxAlign === 'right'
                    ? 'text-right'
                    : 'text-left'
              )}
            >
              {selectedOption ? selectedOption.label : ''}
            </span>
          </div>
          {isOpenCombo && (
            <ul
              id={`${inputId}-listbox`}
              role='listbox'
              ref={comboListRef}
              className='absolute z-50 mt-2 max-h-56 w-full overflow-auto rounded-md border border-black bg-white shadow-lg'
            >
              {filtered.map(opt => (
                <li
                  key={opt.value}
                  role='option'
                  aria-selected={opt.value === currentValue}
                  className={cn(
                    'cursor-pointer px-4 py-2 hover:bg-gray-100',
                    opt.value === currentValue && 'bg-gray-100'
                  )}
                  onClick={() => handleSelect(opt)}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    } else {
      // Regular input
      inputElement = (
        <input
          className={inputClasses}
          ref={ref as React.Ref<HTMLInputElement>}
          id={inputId}
          required={required}
          aria-describedby={describedBy}
          aria-label={ariaLabel}
          aria-invalid={isInvalid}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      );
    }

    return (
      <div className='w-full'>
        {(label || subLabel) && (
          <div className='mb-2 flex items-baseline justify-between gap-4'>
            {label && (
              <label htmlFor={inputId} className={cn(labelVariants({ size }))}>
                {label}
                {required && (
                  <span aria-hidden='true' className='ml-1 text-[#F00606]'>
                    *
                  </span>
                )}
              </label>
            )}
            {subLabel && (
              <div className='text-base font-jost text-gray-900'>
                {subLabel}
              </div>
            )}
          </div>
        )}

        {inputElement}

        {helperText && !error && (
          <p id={helperTextId} className='mt-2 text-sm text-gray-600'>
            {helperText}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            className='mt-2 text-sm text-red-600'
            role='alert'
            aria-live='polite'
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
