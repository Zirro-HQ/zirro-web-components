import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';
import { ArrowIcon } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Versatile card component for displaying content in containers with multiple variants and interactive states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'gradient', 'outlined', 'flat'],
      description: 'Visual style variant of the card',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding inside the card',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is interactive (clickable)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic variants
export const Default: Story = {
  args: {
    children: (
      <div>
        <Text as='h3' size='large' weight='heavy'>
          Default Card
        </Text>
        <Text size='small' className='text-gray-600 mt-2'>
          A simple card with white background and subtle shadow.
        </Text>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <Text as='h3' size='large' weight='heavy'>
          Elevated Card
        </Text>
        <Text size='small' className='text-gray-600 mt-2'>
          Card with more prominent shadow for emphasis.
        </Text>
      </div>
    ),
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: (
      <div>
        <Text as='h3' size='large' weight='heavy'>
          Gradient Card
        </Text>
        <Text size='small' className='text-gray-700 mt-2'>
          Perfect for progress indicators and status displays.
        </Text>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div>
        <Text as='h3' size='large' weight='heavy'>
          Outlined Card
        </Text>
        <Text size='small' className='text-gray-600 mt-2'>
          Dashed border style, great for events and appointments.
        </Text>
      </div>
    ),
  },
};

// Real-world examples based on your images

// Progress/Setup Card (like "Complete setup")
export const ProgressCard: Story = {
  render: () => (
    <Card variant='gradient' interactive className='max-w-md'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          {/* Progress Ring */}
          <div className='relative w-12 h-12'>
            <svg className='w-12 h-12 transform -rotate-90' viewBox='0 0 36 36'>
              <path
                className='text-gray-300'
                stroke='currentColor'
                strokeWidth='3'
                fill='none'
                d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
              />
              <path
                className='text-blue-600'
                stroke='currentColor'
                strokeWidth='3'
                strokeDasharray='20, 80'
                strokeLinecap='round'
                fill='none'
                d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
              />
            </svg>
          </div>

          <div>
            <Text as='h3' size='large' weight='heavy' className='text-gray-900'>
              Complete setup
            </Text>
            <Text size='small' className='text-gray-700'>
              1 of 5 completed
            </Text>
          </div>
        </div>

        <ArrowIcon className='w-6 h-6 text-blue-600' />
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Progress card with gradient background, progress indicator, and interactive state.',
      },
    },
  },
};

// Feature Card (like "Design" card)
export const FeatureCard: Story = {
  render: () => (
    <Card variant='elevated' interactive className='max-w-sm'>
      {/* Image/Icon Area */}
      <div className='mb-4 h-32 bg-gradient-to-br from-pink-400 to-green-300 rounded-xl flex items-center justify-center'>
        <Text className='text-6xl font-bold text-white/30'>Aa</Text>
      </div>

      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <Text
            as='h3'
            size='large'
            weight='heavy'
            className='text-gray-900 mb-2'
          >
            Design
          </Text>
          <Text size='small' className='text-gray-600 leading-relaxed'>
            Set your page vibe with color, font, logo and more
          </Text>
        </div>

        <ArrowIcon className='w-5 h-5 text-gray-400 mt-1 ml-4 flex-shrink-0' />
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Feature card with image area, title, description, and navigation arrow.',
      },
    },
  },
};

// Event/Appointment Card (like "Trimming" card)
export const EventCard: Story = {
  render: () => (
    <Card variant='outlined' padding='lg' className='max-w-lg'>
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          <Text
            as='h3'
            size='large'
            weight='heavy'
            className='text-gray-900 mb-1'
          >
            Trimming
          </Text>
          <Text size='small' className='text-gray-600'>
            with Joseph Adesina
          </Text>
        </div>

        <div className='text-right mr-6'>
          <Text size='large' weight='heavy' className='text-gray-900'>
            9:30AM - 10:30AM
          </Text>
        </div>

        <Button variant='outline' size='sm'>
          View details
        </Button>
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Event card with dashed border, event details, time, and action button.',
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl'>
      <Card variant='default'>
        <Text as='h4' weight='heavy'>
          Default
        </Text>
        <Text size='small' className='text-gray-600 mt-1'>
          Standard card with border and subtle shadow
        </Text>
      </Card>

      <Card variant='elevated'>
        <Text as='h4' weight='heavy'>
          Elevated
        </Text>
        <Text size='small' className='text-gray-600 mt-1'>
          Prominent shadow for emphasis
        </Text>
      </Card>

      <Card variant='gradient'>
        <Text as='h4' weight='heavy'>
          Gradient
        </Text>
        <Text size='small' className='text-gray-700 mt-1'>
          Colorful background for progress/status
        </Text>
      </Card>

      <Card variant='outlined'>
        <Text as='h4' weight='heavy'>
          Outlined
        </Text>
        <Text size='small' className='text-gray-600 mt-1'>
          Dashed border for events/appointments
        </Text>
      </Card>

      <Card variant='flat'>
        <Text as='h4' weight='heavy'>
          Flat
        </Text>
        <Text size='small' className='text-gray-600 mt-1'>
          No shadow or border, minimal style
        </Text>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Interactive examples
export const InteractiveCards: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl'>
      <Card
        variant='default'
        interactive
        onClick={() => alert('Default card clicked!')}
      >
        <Text as='h4' weight='heavy'>
          Clickable Card
        </Text>
        <Text size='small' className='text-gray-600 mt-1'>
          Click me to see interaction
        </Text>
      </Card>

      <Card
        variant='elevated'
        interactive
        onClick={() => alert('Elevated card clicked!')}
      >
        <Text as='h4' weight='heavy'>
          Hover & Click
        </Text>
        <Text size='small' className='text-gray-600 mt-1'>
          Hover and click for effects
        </Text>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive cards with hover and click effects.',
      },
    },
  },
};

// Padding variations
export const PaddingVariations: Story = {
  render: () => (
    <div className='space-y-4 max-w-md'>
      <Card padding='none' className='border'>
        <div className='bg-gray-100 p-2 text-center'>
          <Text size='small'>No Padding</Text>
        </div>
      </Card>

      <Card padding='sm'>
        <Text size='small'>Small Padding (p-4)</Text>
      </Card>

      <Card padding='md'>
        <Text size='small'>Medium Padding (p-6) - Default</Text>
      </Card>

      <Card padding='lg'>
        <Text size='small'>Large Padding (p-8)</Text>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different padding options for various content layouts.',
      },
    },
  },
};

// Custom Background Examples
export const CustomBackgrounds: Story = {
  render: () => (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      <Card
        backgroundColor='#1e40af'
        customPadding='p-8'
        className='text-white'
      >
        <h3 className='mb-2 text-lg font-semibold'>Custom Background Color</h3>
        <p className='text-blue-100'>
          Card with custom blue background color and custom padding.
        </p>
      </Card>

      <Card
        backgroundImage='https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop'
        customPadding='p-12'
        className='text-white'
      >
        <div className='bg-black bg-opacity-50 p-4 rounded'>
          <h3 className='mb-2 text-lg font-semibold'>Background Image</h3>
          <p>Card with custom background image and overlay.</p>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards with custom background colors and images.',
      },
    },
  },
};

// No Border Radius Example
export const NoBorderRadius: Story = {
  render: () => (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      <Card variant='default'>
        <h3 className='mb-2 text-lg font-semibold'>Default Border Radius</h3>
        <p className='text-gray-600'>Standard rounded corners.</p>
      </Card>

      <Card variant='default' noBorderRadius>
        <h3 className='mb-2 text-lg font-semibold'>No Border Radius</h3>
        <p className='text-gray-600'>Sharp corners for modern layouts.</p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of default rounded corners vs sharp corners.',
      },
    },
  },
};

// Custom Padding Examples
export const CustomPaddingExamples: Story = {
  render: () => (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      <Card customPadding='p-2' backgroundColor='#fef3c7'>
        <h4 className='text-sm font-semibold'>Minimal Padding</h4>
        <p className='text-xs text-gray-600'>p-2 custom padding</p>
      </Card>

      <Card customPadding='px-8 py-4' backgroundColor='#dbeafe'>
        <h4 className='text-sm font-semibold'>Asymmetric Padding</h4>
        <p className='text-xs text-gray-600'>px-8 py-4 custom padding</p>
      </Card>

      <Card customPadding='p-12' backgroundColor='#dcfce7'>
        <h4 className='text-sm font-semibold'>Large Padding</h4>
        <p className='text-xs text-gray-600'>p-12 custom padding</p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Examples of custom padding configurations using Tailwind classes.',
      },
    },
  },
};
