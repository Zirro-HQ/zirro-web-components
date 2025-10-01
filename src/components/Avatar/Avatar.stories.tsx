import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'Avatar component for displaying user profile pictures or initials. Supports images with fallback to initials, multiple sizes and variants.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Avatar size',
    },
    variant: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Avatar shape variant',
    },
    color: {
      control: 'select',
      options: [
        'blue',
        'gray',
        'green',
        'red',
        'yellow',
        'purple',
        'pink',
        'indigo',
      ],
      description: 'Background color for initials',
    },
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image',
    },
    fallback: {
      control: 'text',
      description: 'Fallback text (usually initials)',
    },
    name: {
      control: 'text',
      description: 'Name to generate initials from',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Basic Examples
export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    alt: 'Profile picture',
    name: 'John Doe',
  },
};

export const WithFallback: Story = {
  args: {
    name: 'Jane Smith',
    fallback: 'JS',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Avatar name='John Doe' size='xs' />
      <Avatar name='John Doe' size='sm' />
      <Avatar name='John Doe' size='md' />
      <Avatar name='John Doe' size='lg' />
      <Avatar name='John Doe' size='xl' />
      <Avatar name='John Doe' size='2xl' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available avatar sizes from xs to 2xl.',
      },
    },
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Avatar name='John Doe' variant='circle' size='lg' />
      <Avatar name='John Doe' variant='square' size='lg' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Circle and square avatar variants.',
      },
    },
  },
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className='flex items-center gap-4 flex-wrap'>
      <Avatar name='John Doe' color='blue' size='lg' />
      <Avatar name='Jane Smith' color='gray' size='lg' />
      <Avatar name='Bob Wilson' color='green' size='lg' />
      <Avatar name='Alice Brown' color='red' size='lg' />
      <Avatar name='Charlie Davis' color='yellow' size='lg' />
      <Avatar name='Diana Evans' color='purple' size='lg' />
      <Avatar name='Frank Miller' color='pink' size='lg' />
      <Avatar name='Grace Taylor' color='indigo' size='lg' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available color variants for avatar backgrounds.',
      },
    },
  },
};

// User Profile Examples
export const UserProfiles: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <Avatar
          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          name='John Doe'
          size='md'
        />
        <div>
          <p className='font-medium'>John Doe</p>
          <p className='text-sm text-gray-600'>john@example.com</p>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <Avatar name='Jane Smith' color='green' size='md' />
        <div>
          <p className='font-medium'>Jane Smith</p>
          <p className='text-sm text-gray-600'>jane@example.com</p>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <Avatar
          name='Xtratouch Unis...'
          fallback='XU'
          color='purple'
          size='md'
        />
        <div>
          <p className='font-medium'>Xtratouch Unis...</p>
          <p className='text-sm text-gray-600'>xtratouch@example.com</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of avatars used in user profile contexts.',
      },
    },
  },
};

// Error Handling
export const ImageError: Story = {
  args: {
    src: 'https://invalid-url.jpg',
    name: 'John Doe',
    alt: 'Profile picture',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Avatar gracefully falls back to initials when image fails to load.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Avatar name='' fallback='?' size='md' />
      <Avatar name='A' size='md' />
      <Avatar name='Very Long Name That Should Be Truncated' size='md' />
      <Avatar name='John Doe Smith Wilson' size='md' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Edge cases: empty name, single character, long names, and multiple words.',
      },
    },
  },
};
