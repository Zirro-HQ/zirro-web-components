import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Versatile input component supporting both single-line and multi-line text input with labels, helper text, and error states.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Visual variant of the input',
    },
    multiline: {
      control: 'boolean',
      description: 'Whether to render as textarea',
    },
    upload: {
      control: 'boolean',
      description: 'Whether to render as file upload',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below input',
    },
    error: {
      control: 'text',
      description: 'Error message displayed below input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Basic examples
export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'Must be at least 3 characters long',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    error: 'Password must be at least 8 characters',
    value: 'short',
  },
};

// Examples from your images
export const BusinessName: Story = {
  render: () => (
    <div className='w-full max-w-md space-y-1'>
      <div className='flex justify-between items-center mb-2'>
        <span className='text-base font-jost text-gray-900'>Business name</span>
        <span className='text-sm font-jost text-gray-600'>
          deolawigs.zirro.app
        </span>
      </div>
      <Input placeholder='e.g Deola Bakery' className='text-gray-500' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Business name input field as shown in your design with custom header layout.',
      },
    },
  },
};

export const Tagline: Story = {
  render: () => (
    <div className='w-full max-w-md'>
      <Input
        label='Tagline'
        placeholder='e.g Quality Hair, Great Prices'
        className='text-gray-500'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tagline input field matching your design.',
      },
    },
  },
};

export const AboutBusiness: Story = {
  render: () => (
    <div className='w-full max-w-md'>
      <Input
        label='About your business (optional)'
        placeholder='Describe your products (optional)'
        multiline
        rows={6}
        className='text-gray-500'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multi-line textarea for business description as shown in your design.',
      },
    },
  },
};

// Single file upload example from your image
export const BrandLogo: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className='w-full max-w-md space-y-4'>
        <Input
          label='Brand logo'
          upload
          accept='image/*'
          uploadText='Click to upload your store logo'
          uploadSubtext='PNG, JPG up to 2MB'
          onFilesChange={(newFiles: File[]) => {
            console.log('Files uploaded:', newFiles);
            setFiles(newFiles);
          }}
          onFileDelete={(index: number) => {
            console.log('File deleted at index:', index);
            setFiles([]);
          }}
        />
        {files.length > 0 && (
          <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
            <p className='text-sm text-green-800 font-medium'>
              ✅ File uploaded: {files[0]?.name}
            </p>
            <p className='text-xs text-green-600 mt-1'>
              Size: {((files[0]?.size || 0) / 1024).toFixed(1)} KB
            </p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Single file upload input for brand logo. Shows replace/delete options after upload with custom upload icon. File uploads work in real applications - Storybook shows feedback when files are selected.',
      },
    },
  },
};

// Multiple file upload example
export const GalleryImages: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className='w-full max-w-md space-y-4'>
        <Input
          label='Gallery images'
          upload
          multiple
          maxFiles={6}
          accept='image/*'
          uploadText='Upload gallery images'
          uploadSubtext='PNG, JPG up to 2MB each'
          onFilesChange={(newFiles: File[]) => {
            console.log('Files uploaded:', newFiles);
            setFiles(prev => [...prev, ...newFiles]);
          }}
          onFileDelete={(index: number) => {
            console.log('File deleted at index:', index);
            setFiles(prev => prev.filter((_, i) => i !== index));
          }}
        />
        {files.length > 0 && (
          <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
            <p className='text-sm text-blue-800 font-medium mb-2'>
              📁 {files.length} file(s) uploaded:
            </p>
            <div className='space-y-1'>
              {files.map((file, index) => (
                <div
                  key={index}
                  className='flex justify-between items-center text-xs text-blue-700'
                >
                  <span className='truncate'>{file.name}</span>
                  <span>{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multiple file upload input for gallery images. Shows uploaded images in a grid with delete buttons and upload more option. File uploads work in real applications - Storybook shows feedback when files are selected.',
      },
    },
  },
};

// Interactive multi-image upload story
export const MultiImageUploadInteractive: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className='w-full max-w-2xl space-y-6'>
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold text-gray-900'>
            Product Gallery Upload
          </h3>
          <p className='text-gray-600'>
            Upload multiple images for your product gallery. You can add more
            images at any time.
          </p>
        </div>

        <Input
          label='Product Images'
          upload
          multiple
          maxFiles={8}
          accept='image/*'
          uploadText='Upload product images'
          uploadSubtext='PNG, JPG, WEBP up to 5MB each (max 8 files)'
          onFilesChange={(newFiles: File[]) => {
            console.log('New files uploaded:', newFiles);
            setFiles(prev => [...prev, ...newFiles]);
          }}
          onFileDelete={(index: number) => {
            console.log('File deleted at index:', index);
            setFiles(prev => prev.filter((_, i) => i !== index));
          }}
        />

        {files.length > 0 && (
          <div className='space-y-4'>
            <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
              <h4 className='text-sm font-medium text-blue-900 mb-2'>
                📸 {files.length} image{files.length !== 1 ? 's' : ''} uploaded
              </h4>
              <div className='grid grid-cols-2 gap-2 text-xs text-blue-700'>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center'
                  >
                    <span className='truncate'>{file.name}</span>
                    <span className='ml-2 text-blue-600'>
                      {(file.size / (1024 * 1024)).toFixed(1)} MB
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex justify-between items-center text-sm text-gray-600'>
              <span>Total: {files.length} files</span>
              <span>
                Size:{' '}
                {(
                  files.reduce((acc, file) => acc + file.size, 0) /
                  (1024 * 1024)
                ).toFixed(1)}{' '}
                MB
              </span>
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive multi-image upload with real file handling, progress tracking, and detailed file information. Perfect for product galleries or image collections.',
      },
    },
  },
};

// Demo story showing uploaded states (for Storybook preview)
export const UploadStatesDemo: Story = {
  render: () => (
    <div className='w-full max-w-4xl space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Single upload - empty state */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Single Upload - Empty</h3>
          <Input
            label='Brand logo'
            upload
            uploadText='Click to upload your store logo'
            uploadSubtext='PNG, JPG up to 2MB'
          />
        </div>

        {/* Single upload - uploaded state (simulated) */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>
            Single Upload - Uploaded
          </h3>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Brand logo
            </label>
            <div className='bg-gray-50 rounded-lg p-6 text-center space-y-4'>
              <div className='w-20 h-20 mx-auto rounded-lg overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>IMG</span>
              </div>
              <div className='text-sm text-gray-600 font-jost'>
                brand-logo.png
              </div>
              <div className='flex justify-center space-x-6'>
                <button className='text-gray-900 font-jost hover:text-gray-700 transition-colors'>
                  Replace
                </button>
                <button className='text-red-500 font-jost hover:text-red-700 transition-colors'>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Multiple upload - empty state */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>
            Multiple Upload - Empty
          </h3>
          <Input
            label='Gallery images'
            upload
            multiple
            maxFiles={4}
            uploadText='Upload gallery images'
            uploadSubtext='PNG, JPG up to 2MB each (max 4 files)'
          />
        </div>

        {/* Multiple upload - with images (simulated) */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>
            Multiple Upload - With Images
          </h3>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Gallery images
            </label>
            <div className='flex flex-wrap gap-4'>
              {/* Upload more button */}
              <div className='w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-[#F1F1F1] hover:bg-[#E8E8E8] transition-colors cursor-pointer'>
                <svg
                  className='w-6 h-6 text-gray-400 mb-2'
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
                <span className='text-sm font-jost text-gray-600'>Upload</span>
              </div>

              {/* Mock uploaded images */}
              {[1, 2, 3].map(index => (
                <div key={index} className='relative group w-32 h-32'>
                  <div className='w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center'>
                    <span className='text-white font-bold'>IMG {index}</span>
                  </div>
                  <button className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600'>
                    <svg
                      className='w-4 h-4'
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
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demo showing all upload states without requiring actual file uploads. This demonstrates how the component looks in different states.',
      },
    },
  },
};

// Complete form example from your images
export const BusinessSetupForm: Story = {
  render: () => (
    <div className='w-full max-w-md space-y-6'>
      {/* Business name with custom header */}
      <div className='space-y-1'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-base font-jost text-gray-900'>
            Business name
          </span>
          <span className='text-sm font-jost text-gray-600'>
            deolawigs.zirro.app
          </span>
        </div>
        <Input placeholder='e.g Deola Bakery' className='text-gray-500' />
      </div>

      {/* Tagline */}
      <Input
        label='Tagline'
        placeholder='e.g Quality Hair, Great Prices'
        className='text-gray-500'
      />

      {/* About business */}
      <Input
        label='About your business (optional)'
        placeholder='Describe your products (optional)'
        multiline
        rows={6}
        className='text-gray-500'
      />

      {/* Brand logo upload */}
      <Input
        label='Brand logo'
        upload
        accept='image/*'
        uploadText='Click to upload your store logo'
        uploadSubtext='PNG, JPG up to 2MB'
        onFilesChange={(files: File[]) =>
          console.log('Brand logo files:', files)
        }
        onFileDelete={(index: number) =>
          console.log('Brand logo deleted:', index)
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete business setup form recreating the exact layout from your images.',
      },
    },
    layout: 'padded',
  },
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <div className='w-full max-w-md space-y-4'>
      <Input label='Small Input' placeholder='Small size input' size='sm' />
      <Input
        label='Medium Input (Default)'
        placeholder='Medium size input'
        size='md'
      />
      <Input label='Large Input' placeholder='Large size input' size='lg' />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Multiline variations
export const MultilineInputs: Story = {
  render: () => (
    <div className='w-full max-w-md space-y-4'>
      <Input
        label='Short Description'
        placeholder='Brief description...'
        multiline
        rows={3}
      />
      <Input
        label='Detailed Description'
        placeholder='Detailed description...'
        multiline
        rows={6}
      />
      <Input
        label='Long Form Content'
        placeholder='Long form content...'
        multiline
        rows={8}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// States
export const States: Story = {
  render: () => (
    <div className='w-full max-w-md space-y-4'>
      <Input label='Default State' placeholder='Normal input' />
      <Input
        label='Success State'
        placeholder='Valid input'
        variant='success'
        helperText='Looks good!'
      />
      <Input
        label='Error State'
        placeholder='Invalid input'
        variant='error'
        error='This field is required'
      />
      <Input label='Disabled State' placeholder='Disabled input' disabled />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// File upload variations
export const FileUploadVariations: Story = {
  render: () => (
    <div className='w-full max-w-md space-y-6'>
      <Input
        label='Profile Picture'
        upload
        accept='image/*'
        uploadText='Upload profile picture'
        uploadSubtext='PNG, JPG up to 5MB'
      />

      <Input
        label='Document Upload'
        upload
        accept='.pdf,.doc,.docx'
        uploadText='Upload document'
        uploadSubtext='PDF, DOC up to 10MB'
      />

      <Input
        label='Any File'
        upload
        uploadText='Upload any file'
        uploadSubtext='All file types up to 2MB'
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    return (
      <div className='w-full max-w-md space-y-4'>
        <Input
          label='Interactive Input'
          placeholder='Type something...'
          helperText='This input responds to your typing'
        />
        <Input
          label='Interactive Textarea'
          placeholder='Write a longer message...'
          multiline
          rows={4}
          helperText='This textarea expands as needed'
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
