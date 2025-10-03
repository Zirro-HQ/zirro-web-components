import type { Meta, StoryObj } from '@storybook/react';
import { Button, ArrowIcon, EyeIcon, PlusIcon } from './Button';
import { DropdownItem } from './DropdownItem';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Versatile button component with multiple variants, sizes, and built-in icons.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'dark', 'ghost', 'disabled'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether button takes full width of container',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether button is disabled',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of icon relative to text',
    },
    Icon: {
      control: false,
      description: 'Icon component to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Basic variants matching your designs
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'CREATE ORDER',
    Icon: PlusIcon,
    iconPosition: 'left',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Previous',
    Icon: () => <ArrowIcon direction='left' />,
    iconPosition: 'left',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'LEARN MORE',
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: 'Next',
    Icon: ArrowIcon,
    iconPosition: 'right',
  },
};

export const DarkStatus: Story = {
  args: {
    variant: 'dark',
    children: 'UPDATE STATUS',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Preview',
    Icon: EyeIcon,
    iconPosition: 'left',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'disabled',
    children: 'NEXT',
  },
};

export const ShareStorefront: Story = {
  args: {
    variant: 'primary',
    children: 'SHARE STOREFRONT',
    size: 'lg',
  },
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Button variant='primary' size='sm'>
        Small
      </Button>
      <Button variant='primary' size='md'>
        Medium
      </Button>
      <Button variant='primary' size='lg'>
        Large
      </Button>
    </div>
  ),
};

// Loading states
export const Loading: Story = {
  args: {
    variant: 'primary',
    children: 'CREATE ORDER',
    isLoading: true,
    loadingText: 'Creating...',
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'SHARE STOREFRONT',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-4 max-w-md'>
      <Button variant='primary' Icon={PlusIcon} iconPosition='left'>
        CREATE ORDER
      </Button>
      <Button
        variant='secondary'
        Icon={() => <ArrowIcon direction='left' />}
        iconPosition='left'
      >
        Previous
      </Button>
      <Button variant='outline'>LEARN MORE</Button>
      <Button variant='dark' Icon={ArrowIcon} iconPosition='right'>
        Next
      </Button>
      <Button variant='dark'>UPDATE STATUS</Button>
      <Button variant='ghost' Icon={EyeIcon} iconPosition='left'>
        Preview
      </Button>
      <Button variant='disabled'>NEXT</Button>
      <Button variant='primary' size='lg'>
        SHARE STOREFRONT
      </Button>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Font customization example
export const FontCustomization: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='space-y-2'>
        <h3 className='text-sm font-semibold text-gray-600'>
          Default Font (Bricolage Grotesque)
        </h3>
        <Button variant='primary'>Default Button Font</Button>
      </div>

      <div className='space-y-2'>
        <h3 className='text-sm font-semibold text-gray-600'>
          Custom Font Override
        </h3>
        <Button variant='primary' className='font-sans'>
          Sans Serif Font
        </Button>
        <Button variant='outline' className='font-mono'>
          Monospace Font
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Buttons use Bricolage Grotesque by default, but can be overridden using the className prop.',
      },
    },
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const handleClick = () => {
      alert('Button clicked!');
    };

    return (
      <div className='flex flex-col gap-4'>
        <Button
          variant='primary'
          onClick={handleClick}
          Icon={PlusIcon}
          iconPosition='left'
        >
          CREATE ORDER
        </Button>
        <Button variant='outline' onClick={handleClick}>
          LEARN MORE
        </Button>
        <Button
          variant='dark'
          onClick={handleClick}
          Icon={ArrowIcon}
          iconPosition='right'
        >
          Next
        </Button>
      </div>
    );
  },
};

// Dropdown Examples
export const BasicDropdown: Story = {
  render: () => (
    <Button
      variant='primary'
      dropdownContent={
        <>
          <DropdownItem>Edit</DropdownItem>
          <DropdownItem>Copy</DropdownItem>
          <DropdownItem>Delete</DropdownItem>
        </>
      }
    >
      Actions
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic dropdown button with menu items.',
      },
    },
  },
};

export const BookingsDropdown: Story = {
  render: () => (
    <Button
      variant='primary'
      size='lg'
      className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full'
      dropdownContent={
        <>
          <DropdownItem>📅 View All Bookings</DropdownItem>
          <DropdownItem>➕ New Booking</DropdownItem>
          <DropdownItem>📊 Booking Analytics</DropdownItem>
          <DropdownItem>⚙️ Booking Settings</DropdownItem>
        </>
      }
    >
      📅 BOOKINGS
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Bookings dropdown button styled like the image provided.',
      },
    },
  },
};

export const DropdownWithIcons: Story = {
  render: () => (
    <Button
      variant='outline'
      dropdownContent={
        <>
          <DropdownItem Icon={EyeIcon}>View Details</DropdownItem>
          <DropdownItem Icon={PlusIcon}>Add Item</DropdownItem>
          <DropdownItem Icon={ArrowIcon}>Navigate</DropdownItem>
        </>
      }
    >
      Menu with Icons
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with icons in menu items.',
      },
    },
  },
};

export const DropdownWithDisabledItems: Story = {
  render: () => (
    <Button
      variant='secondary'
      dropdownContent={
        <>
          <DropdownItem>Available Action</DropdownItem>
          <DropdownItem disabled>Disabled Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
        </>
      }
    >
      Mixed States
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with both enabled and disabled menu items.',
      },
    },
  },
};
