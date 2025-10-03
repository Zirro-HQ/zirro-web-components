import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DrawerModal } from './DrawerModal';

const meta: Meta<typeof DrawerModal> = {
  title: 'Components/DrawerModal',
  component: DrawerModal,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the drawer is open',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the drawer',
    },
    backdropVariant: {
      control: 'select',
      options: ['blur', 'dim', 'transparent'],
      description: 'Backdrop effect variant',
    },
    title: {
      control: 'text',
      description: 'Drawer title',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show close button',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether clicking backdrop closes drawer',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing escape closes drawer',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DrawerModal>;

// Interactive wrapper for Storybook
const DrawerModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='p-8'>
      <button
        onClick={() => setIsOpen(true)}
        className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
      >
        Open Drawer
      </button>

      <div className='mt-4 p-4 bg-gray-100 rounded-lg'>
        <h3 className='text-lg font-semibold mb-2'>Dashboard Content</h3>
        <p>
          This is the main dashboard content that will be blurred when the
          drawer opens.
        </p>
        <div className='grid grid-cols-3 gap-4 mt-4'>
          <div className='bg-white p-4 rounded shadow'>Card 1</div>
          <div className='bg-white p-4 rounded shadow'>Card 2</div>
          <div className='bg-white p-4 rounded shadow'>Card 3</div>
        </div>
      </div>

      <DrawerModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className='space-y-6'>
          <p>
            This is the drawer content. Click outside or press Escape to close.
          </p>

          <div>
            <h3 className='text-lg font-semibold mb-2'>Sample Content</h3>
            <p className='text-gray-600 mb-4'>
              This drawer slides in from the right with a backdrop blur effect.
            </p>
          </div>

          <div className='space-y-4'>
            <div className='border rounded-lg p-4'>
              <h4 className='font-medium'>Section 1</h4>
              <p className='text-sm text-gray-600'>Some content here</p>
            </div>
            <div className='border rounded-lg p-4'>
              <h4 className='font-medium'>Section 2</h4>
              <p className='text-sm text-gray-600'>More content here</p>
            </div>
          </div>

          <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700'>
            Primary Action
          </button>
        </div>
      </DrawerModal>
    </div>
  );
};

export const Default: Story = {
  render: DrawerModalWrapper,
  args: {
    title: 'Drawer Modal',
    size: 'lg',
    backdropVariant: 'blur',
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
};

export const BookingDetails: Story = {
  render: DrawerModalWrapper,
  args: {
    title: 'Booking Details',
    size: 'lg',
    backdropVariant: 'blur',
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
};

export const SmallDrawer: Story = {
  render: DrawerModalWrapper,
  args: {
    title: 'Small Drawer',
    size: 'sm',
    backdropVariant: 'blur',
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
};

export const ExtraLargeDrawer: Story = {
  render: DrawerModalWrapper,
  args: {
    title: 'Extra Large Drawer',
    size: 'xl',
    backdropVariant: 'blur',
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
};

export const DimBackdrop: Story = {
  render: DrawerModalWrapper,
  args: {
    title: 'Dim Backdrop',
    size: 'lg',
    backdropVariant: 'dim',
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
};

export const NoTitle: Story = {
  render: DrawerModalWrapper,
  args: {
    size: 'lg',
    backdropVariant: 'blur',
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
};
