import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge component for displaying status, labels, or counts. Supports multiple variants and sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'success',
        'warning',
        'info',
        'purple',
      ],
      description: 'Badge style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
    },
    textColor: {
      control: 'color',
      description: 'Custom text color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Basic Examples
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Badge variant='default'>Default</Badge>
      <Badge variant='secondary'>Secondary</Badge>
      <Badge variant='destructive'>Destructive</Badge>
      <Badge variant='outline'>Outline</Badge>
      <Badge variant='success'>Success</Badge>
      <Badge variant='warning'>Warning</Badge>
      <Badge variant='info'>Info</Badge>
      <Badge variant='purple'>Purple</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants with different semantic meanings.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Badge size='sm' variant='info'>
        Small
      </Badge>
      <Badge size='md' variant='info'>
        Medium
      </Badge>
      <Badge size='lg' variant='info'>
        Large
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge sizes from small to large.',
      },
    },
  },
};

// Custom Colors
export const CustomColors: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Badge backgroundColor='#3b82f6' textColor='white'>
        396 x 31
      </Badge>
      <Badge backgroundColor='#f97316' textColor='white'>
        BOOKINGS
      </Badge>
      <Badge backgroundColor='#10b981' textColor='white'>
        Active
      </Badge>
      <Badge backgroundColor='#8b5cf6' textColor='white'>
        Premium
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with custom background and text colors.',
      },
    },
  },
};

// Status Indicators
export const StatusIndicators: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Badge variant='success'>Online</Badge>
      <Badge variant='warning'>Pending</Badge>
      <Badge variant='destructive'>Offline</Badge>
      <Badge variant='info'>Processing</Badge>
      <Badge variant='secondary'>Draft</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common status indicators using semantic variants.',
      },
    },
  },
};

// Numbers and Counts
export const NumbersAndCounts: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Badge variant='info' size='sm'>
        5
      </Badge>
      <Badge variant='success' size='md'>
        12
      </Badge>
      <Badge variant='warning' size='lg'>
        99+
      </Badge>
      <Badge backgroundColor='#ef4444' textColor='white' size='sm'>
        3
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges used for displaying numbers and counts.',
      },
    },
  },
};

// Header Example (like in the image)
export const HeaderExample: Story = {
  render: () => (
    <div className='flex items-center justify-between w-full max-w-4xl p-4 bg-white border rounded-lg'>
      {/* Left: Brand */}
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center'>
          <span className='text-white text-sm'>✂️</span>
        </div>
        <span className='font-semibold text-gray-900'>
          Xtratouch Unisex Barbershop
        </span>
      </div>

      {/* Center: Status Badge */}
      <Badge backgroundColor='#3b82f6' textColor='white' size='md'>
        396 x 31
      </Badge>

      {/* Right: Actions */}
      <div className='flex items-center gap-4'>
        <Badge backgroundColor='#f97316' textColor='white' size='lg'>
          📅 BOOKINGS
        </Badge>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-600'>⚡ ZirroPro</span>
          <Badge variant='warning' size='sm'>
            14 days left
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of badges used in a header layout similar to the provided image.',
      },
    },
  },
};
