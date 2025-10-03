import type { Meta, StoryObj } from '@storybook/react';
import { Copy } from './Copy';

const meta: Meta<typeof Copy> = {
  title: 'Components/Copy',
  component: Copy,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable copy component with clipboard functionality and visual feedback states.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The text/content to copy to clipboard',
    },
    text: {
      control: 'text',
      description: 'Custom text to display (defaults to "COPY")',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost', 'solid'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Hide text and show only icon',
    },
    successDuration: {
      control: 'number',
      description: 'Success message duration in milliseconds',
    },
    successText: {
      control: 'text',
      description: 'Custom success text',
    },
    errorText: {
      control: 'text',
      description: 'Custom error text',
    },
  },
  args: {
    value: 'xtratouch.dev.zirro.app',
    text: 'COPY',
    successDuration: 2000,
    successText: 'Copied!',
    errorText: 'Failed',
  },
};

export default meta;
type Story = StoryObj<typeof Copy>;

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    text: 'Copy URL',
    value: 'https://example.com',
  },
};

export const Variants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Copy value='default variant' variant='default' />
      <Copy value='outline variant' variant='outline' />
      <Copy value='ghost variant' variant='ghost' />
      <Copy value='solid variant' variant='solid' />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Copy value='small size' size='sm' text='Small' />
      <Copy value='medium size' size='md' text='Medium' />
      <Copy value='large size' size='lg' text='Large' />
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Copy value='icon only default' iconOnly variant='default' />
      <Copy value='icon only outline' iconOnly variant='outline' />
      <Copy value='icon only ghost' iconOnly variant='ghost' />
      <Copy value='icon only solid' iconOnly variant='solid' />
    </div>
  ),
};

export const CustomIcon: Story = {
  args: {
    value: 'custom icon example',
    text: 'Copy',
    icon: (
      <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
        <path d='M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.707 5.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L7 7.586l3.293-3.293a1 1 0 111.414 1.414z' />
      </svg>
    ),
  },
};

export const LongContent: Story = {
  args: {
    value:
      'This is a very long text that someone might want to copy to their clipboard',
    text: 'Copy Long Text',
  },
};

export const WithCallbacks: Story = {
  args: {
    value: 'callback example',
    onCopySuccess: (value: string) => {
      console.log('Successfully copied:', value);
      alert(`Copied: ${value}`);
    },
    onCopyError: (error: Error) => {
      console.error('Copy failed:', error);
      alert('Copy failed!');
    },
  },
};

export const DomainExample: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex items-center justify-between rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4'>
        <span className='text-lg font-semibold text-gray-900'>
          xtratouch.dev.zirro.app
        </span>
        <Copy value='xtratouch.dev.zirro.app' variant='default' />
      </div>

      <div className='flex items-center justify-between rounded-2xl border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 p-4'>
        <span className='text-lg font-semibold text-white'>
          mybarbershop.com
        </span>
        <Copy
          value='mybarbershop.com'
          variant='outline'
          className='border-gray-500 bg-gray-800 text-gray-200 hover:bg-gray-700'
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const ResponsiveUsage: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='max-w-sm'>
        <h3 className='mb-2 text-sm font-semibold text-gray-600'>Mobile</h3>
        <div className='flex items-center justify-between rounded-lg bg-gray-100 p-3'>
          <span className='truncate text-sm'>very-long-domain.com</span>
          <Copy value='very-long-domain.com' iconOnly size='sm' />
        </div>
      </div>

      <div className='max-w-lg'>
        <h3 className='mb-2 text-sm font-semibold text-gray-600'>Desktop</h3>
        <div className='flex items-center justify-between rounded-lg bg-gray-100 p-4'>
          <span className='text-base'>regular-domain.com</span>
          <Copy value='regular-domain.com' size='md' />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
