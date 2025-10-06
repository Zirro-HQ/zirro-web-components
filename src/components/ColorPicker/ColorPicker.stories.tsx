import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'color' },
    defaultValue: { control: 'color' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showPanel: { control: 'boolean' },
    disabled: { control: 'boolean' },
    variant: { control: 'select', options: ['wheel', 'circle', 'sketch'] },
    allowCustom: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    label: 'Primary color',
    defaultValue: '#2C4BFF',
    showPanel: true,
    size: 'lg',
  },
};

export const WithPanel: Story = {
  args: {
    label: 'Primary color',
    defaultValue: '#2C4BFF',
    showPanel: true,
    size: 'lg',
  },
};

export const Bare: Story = {
  args: {
    label: 'Select color',
    defaultValue: '#8B5CF6',
    showPanel: false,
    size: 'lg',
  },
};

export const Controlled: Story = {
  render: args => {
    const [color, setColor] = useState('#2C4BFF');
    return (
      <div className='space-y-4'>
        <ColorPicker
          {...args}
          value={color}
          onChange={setColor}
          label='Background color'
        />
        <div className='text-sm text-gray-700'>Selected: {color}</div>
        <div
          className='w-20 h-20 rounded border border-gray-300'
          style={{ backgroundColor: color }}
        />
      </div>
    );
  },
  args: {
    showPanel: true,
    size: 'lg',
  },
};

export const Sizes: Story = {
  render: args => (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      <ColorPicker {...args} label='Small' size='sm' />
      <ColorPicker {...args} label='Medium' size='md' />
      <ColorPicker {...args} label='Large' size='lg' />
    </div>
  ),
  args: {
    defaultValue: '#2C4BFF',
    showPanel: true,
  },
};

export const PanelVsBare: Story = {
  render: args => (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>With Panel</h3>
        <ColorPicker {...args} label='Primary color' showPanel />
      </div>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Bare (Dropdown)</h3>
        <ColorPicker {...args} label='Primary color' showPanel={false} />
      </div>
    </div>
  ),
  args: {
    defaultValue: '#8B5CF6',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled color picker',
    defaultValue: '#D97706',
    disabled: true,
    showPanel: true,
    size: 'lg',
  },
};

export const WithCustomPicker: Story = {
  args: {
    label: 'Primary color',
    defaultValue: '#2C4BFF',
    showPanel: true,
    allowCustom: true,
    size: 'lg',
  },
};

export const CustomPickerControlled: Story = {
  render: args => {
    const [color, setColor] = useState('#2C4BFF');
    return (
      <div className='space-y-4'>
        <ColorPicker
          {...args}
          value={color}
          onChange={setColor}
          label='Custom color picker'
          allowCustom
        />
        <div className='text-sm text-gray-700'>Selected: {color}</div>
        <div
          className='w-20 h-20 rounded border border-gray-300'
          style={{ backgroundColor: color }}
        />
      </div>
    );
  },
  args: {
    showPanel: true,
    size: 'lg',
  },
};

export const EditIconDemo: Story = {
  render: args => (
    <div className='space-y-8'>
      <div className='p-4 border border-gray-200 rounded-lg bg-white'>
        <h3 className='text-lg font-semibold mb-4'>5-Column Grid Layout</h3>
        <p className='text-sm text-gray-600 mb-4'>
          Colors are arranged in a clean 5-column grid. The edit icon appears at
          the end to access custom colors.
        </p>
        <ColorPicker
          {...args}
          label='Color with edit icon'
          allowCustom
          showPanel
        />
      </div>

      <div className='p-4 border border-gray-200 rounded-lg bg-white'>
        <h3 className='text-lg font-semibold mb-4'>Different Sizes</h3>
        <div className='flex gap-6 items-start'>
          <ColorPicker
            {...args}
            label='Small'
            size='sm'
            allowCustom
            showPanel
          />
          <ColorPicker
            {...args}
            label='Medium'
            size='md'
            allowCustom
            showPanel
          />
          <ColorPicker
            {...args}
            label='Large'
            size='lg'
            allowCustom
            showPanel
          />
        </div>
      </div>

      <div className='p-4 border border-gray-200 rounded-lg bg-white'>
        <h3 className='text-lg font-semibold mb-4'>Custom Color Array</h3>
        <p className='text-sm text-gray-600 mb-4'>
          With fewer colors, the grid still maintains 5 columns per row.
        </p>
        <ColorPicker
          {...args}
          label='Brand colors'
          allowCustom
          showPanel
          colors={[
            '#2C4BFF',
            '#7C3AED',
            '#DB2777',
            '#DC2626',
            '#EA580C',
            '#D97706',
            '#65A30D',
            '#059669',
            '#0891B2',
            '#0284C7',
          ]}
        />
      </div>
    </div>
  ),
  args: {
    defaultValue: '#2C4BFF',
  },
};

export const PresetVsCustom: Story = {
  render: args => (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Preset Colors Only</h3>
        <p className='text-sm text-gray-600 mb-4'>
          Just the preset color circles without the edit icon.
        </p>
        <ColorPicker {...args} label='Brand colors' allowCustom={false} />
      </div>
      <div>
        <h3 className='text-lg font-semibold mb-4'>With Custom Picker</h3>
        <p className='text-sm text-gray-600 mb-4'>
          Preset colors with edit icon at the end for custom colors.
        </p>
        <ColorPicker {...args} label='Any color' allowCustom />
      </div>
    </div>
  ),
  args: {
    defaultValue: '#8B5CF6',
    showPanel: true,
    size: 'lg',
  },
};

export const CustomColors: Story = {
  args: {
    label: 'Brand colors',
    defaultValue: '#2C4BFF',
    showPanel: true,
    size: 'lg',
    colors: [
      '#2C4BFF',
      '#7C3AED',
      '#DB2777',
      '#DC2626',
      '#EA580C',
      '#D97706',
      '#65A30D',
      '#059669',
      '#0891B2',
      '#0284C7',
      '#6366F1',
      '#8B5CF6',
      '#EC4899',
      '#EF4444',
      '#F97316',
    ],
  },
};

export const PortalDemo: Story = {
  render: args => (
    <div className='space-y-8'>
      <div className='p-4 border border-gray-200 rounded-lg bg-gray-50'>
        <h3 className='text-lg font-semibold mb-4'>Portal Behavior</h3>
        <p className='text-sm text-gray-600 mb-4'>
          The color picker opens in a portal overlay with #F1F1F1 background and
          Jost font. Notice how the container doesn't expand when the picker
          opens.
        </p>
        <div className='flex gap-4 items-start'>
          <ColorPicker {...args} label='Color 1' showPanel />
          <ColorPicker {...args} label='Color 2' showPanel={false} />
          <div className='text-sm text-gray-500'>
            Clean styling without borders or border-radius
          </div>
        </div>
      </div>

      <div className='p-4 border border-gray-200 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>In Constrained Space</h3>
        <p className='text-sm text-gray-600 mb-4'>
          Even in small containers, the picker opens in an overlay with
          consistent styling.
        </p>
        <div className='w-48 h-32 p-4 border border-dashed border-gray-300 bg-gray-50 overflow-hidden'>
          <ColorPicker {...args} label='Constrained' showPanel allowCustom />
        </div>
      </div>
    </div>
  ),
  args: {
    defaultValue: '#2C4BFF',
    size: 'md',
  },
};

export const AccessibilityDemo: Story = {
  render: args => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Keyboard Navigation</h3>
        <p className='text-sm text-gray-600 mb-4'>
          Use Tab to focus, Enter/Space to open, Escape to close, Arrow keys to
          navigate colors
        </p>
        <ColorPicker
          {...args}
          label='Accessible color picker'
          aria-describedby='color-help'
        />
        <div id='color-help' className='text-xs text-gray-500 mt-2'>
          Choose a color from the available palette
        </div>
      </div>
    </div>
  ),
  args: {
    defaultValue: '#2C4BFF',
    showPanel: true,
    size: 'lg',
  },
};
