import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Versatile text component with customizable size and weight. Uses Jost font by default.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['extrasmall', 'small', 'medium', 'large'],
      description: 'Size of the text',
    },
    weight: {
      control: 'select',
      options: ['normal', 'heavy'],
      description: 'Weight of the text',
    },
    as: {
      control: 'select',
      options: [
        'span',
        'p',
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'label',
      ],
      description: 'HTML element to render as',
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
  },
  args: {
    children: 'Sample text content',
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// Basic sizes
export const ExtraSmall: Story = {
  args: {
    size: 'extrasmall',
    children: 'Extra small text (0.75rem)',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small text (0.875rem)',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium text (1rem) - Default',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large text (1.25rem)',
  },
};

// Weight variations
export const Normal: Story = {
  args: {
    weight: 'normal',
    children: 'Normal weight (400) - Default',
  },
};

export const Heavy: Story = {
  args: {
    weight: 'heavy',
    children: 'Heavy weight (700)',
  },
};

// Size and weight combinations
export const AllSizes: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <h3 className='text-sm font-semibold text-gray-600'>
          Normal Weight (400)
        </h3>
        <div className='space-y-1'>
          <Text size='extrasmall'>Extra small text (0.75rem)</Text>
          <Text size='small'>Small text (0.875rem)</Text>
          <Text size='medium'>Medium text (1rem) - Default</Text>
          <Text size='large'>Large text (1.25rem)</Text>
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='text-sm font-semibold text-gray-600'>
          Heavy Weight (700)
        </h3>
        <div className='space-y-1'>
          <Text size='extrasmall' weight='heavy'>
            Extra small heavy text
          </Text>
          <Text size='small' weight='heavy'>
            Small heavy text
          </Text>
          <Text size='medium' weight='heavy'>
            Medium heavy text
          </Text>
          <Text size='large' weight='heavy'>
            Large heavy text
          </Text>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Different HTML elements
export const HTMLElements: Story = {
  render: () => (
    <div className='space-y-4'>
      <Text as='h1' size='large' weight='heavy'>
        H1 Heading
      </Text>
      <Text as='h2' size='large'>
        H2 Heading
      </Text>
      <Text as='p'>Paragraph text with default styling</Text>
      <Text as='span' size='small'>
        Inline span text
      </Text>
      <Text as='label' size='small' weight='heavy'>
        Form Label
      </Text>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Font customization
export const FontCustomization: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <h3 className='text-sm font-semibold text-gray-600'>
          Default Font (Jost)
        </h3>
        <Text size='large'>Default Jost font text</Text>
      </div>

      <div className='space-y-2'>
        <h3 className='text-sm font-semibold text-gray-600'>
          Custom Font Override
        </h3>
        <Text size='large' className='font-sans'>
          Sans serif font override
        </Text>
        <Text size='large' className='font-bricolage'>
          Bricolage Grotesque font override
        </Text>
        <Text size='large' className='font-mono'>
          Monospace font override
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Text uses Jost by default, but can be overridden using the className prop.',
      },
    },
    layout: 'padded',
  },
};

// Real-world usage examples
export const UsageExamples: Story = {
  render: () => (
    <div className='max-w-md space-y-6'>
      {/* Card example */}
      <div className='border rounded-lg p-4 space-y-2'>
        <Text as='h3' size='large' weight='heavy'>
          Total Revenue
        </Text>
        <Text size='small' className='text-gray-600'>
          Your website will not be accessible by customers. They'd be met with a
          "currently under maintenance" page when they visit your storefront
          link
        </Text>
      </div>

      {/* Form example */}
      <div className='space-y-3'>
        <Text as='label' size='small' weight='heavy'>
          Set your page vibe with color, font, logo and more
        </Text>
        <div className='border rounded px-3 py-2'>
          <Text size='small' className='text-gray-500'>
            Enter your content here...
          </Text>
        </div>
      </div>

      {/* Status message */}
      <div className='bg-blue-50 border border-blue-200 rounded p-3'>
        <Text size='small' weight='heavy' className='text-blue-800'>
          Information
        </Text>
        <Text size='extrasmall' className='text-blue-700 mt-1'>
          This is an informational message with extra small text.
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Real-world examples showing how the Text component can be used in different contexts.',
      },
    },
    layout: 'padded',
  },
};
