import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fully accessible toggle component with keyboard navigation, ARIA support, and smooth animations. Perfect for settings, preferences, and feature toggles.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the toggle',
    },
    variant: {
      control: 'select',
      options: ['default', 'text'],
      description: 'Toggle variant - default or text with custom labels',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the toggle is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text for the toggle',
    },
    description: {
      control: 'text',
      description: 'Description text for the toggle',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the label',
    },
    uncheckedText: {
      control: 'text',
      description: 'Text to show when unchecked (text variant only)',
    },
    checkedText: {
      control: 'text',
      description: 'Text to show when checked (text variant only)',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback when toggle state changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// Basic toggle examples
export const Default: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Receive email notifications when someone mentions you',
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    label: 'Dark mode',
    description: 'Use dark theme across the application',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Premium feature',
    description: 'This feature requires a premium subscription',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    label: 'System setting',
    description: 'This setting is managed by your system administrator',
  },
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Toggle Sizes</h3>

        <div className='space-y-3'>
          <Toggle
            size='sm'
            defaultChecked={true}
            label='Small toggle'
            description='Compact size for dense layouts'
          />

          <Toggle
            size='md'
            defaultChecked={true}
            label='Medium toggle'
            description='Default size for most use cases'
          />

          <Toggle
            size='lg'
            defaultChecked={true}
            label='Large toggle'
            description='Larger size for better accessibility'
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle component in different sizes: small, medium, and large.',
      },
    },
  },
};

// Interactive controlled example
export const ControlledToggle: Story = {
  render: () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
      <div className='space-y-6 w-full max-w-md'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Settings Panel</h3>

          <div className='space-y-4 p-4 border border-gray-200 rounded-lg'>
            <Toggle
              checked={isEnabled}
              onCheckedChange={setIsEnabled}
              label='Enable feature'
              description='Turn on the new experimental feature'
            />

            <Toggle
              checked={notifications}
              onCheckedChange={setNotifications}
              label='Push notifications'
              description='Receive notifications on your device'
            />

            <Toggle
              checked={darkMode}
              onCheckedChange={setDarkMode}
              label='Dark mode'
              description='Use dark theme for better night viewing'
            />
          </div>

          <div className='p-4 bg-gray-50 rounded-lg text-sm'>
            <h4 className='font-medium mb-2'>Current Settings:</h4>
            <ul className='space-y-1 text-gray-600'>
              <li>Feature enabled: {isEnabled ? '✅ Yes' : '❌ No'}</li>
              <li>Notifications: {notifications ? '✅ On' : '❌ Off'}</li>
              <li>Dark mode: {darkMode ? '🌙 On' : '☀️ Off'}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example showing controlled toggles with real-time state updates.',
      },
    },
  },
};

// Without labels (icon-only)
export const WithoutLabels: Story = {
  render: () => (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Icon-Only Toggles</h3>
        <p className='text-gray-600 text-sm'>
          Toggles without visible labels (using aria-label for accessibility)
        </p>

        <div className='flex items-center space-x-4'>
          <Toggle defaultChecked={false} aria-label='Enable WiFi' size='sm' />
          <Toggle
            defaultChecked={true}
            aria-label='Enable Bluetooth'
            size='md'
          />
          <Toggle
            defaultChecked={false}
            aria-label='Enable Location Services'
            size='lg'
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Toggles without visible labels, using aria-label for screen reader accessibility.',
      },
    },
  },
};

// Form integration example
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
      newsletter: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      alert('Form submitted! Check console for data.');
    };

    return (
      <form onSubmit={handleSubmit} className='w-full max-w-md space-y-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Notification Preferences</h3>

          <div className='space-y-4'>
            <Toggle
              name='emailNotifications'
              checked={formData.emailNotifications}
              onCheckedChange={checked =>
                setFormData(prev => ({ ...prev, emailNotifications: checked }))
              }
              label='Email notifications'
              description='Receive important updates via email'
            />

            <Toggle
              name='smsNotifications'
              checked={formData.smsNotifications}
              onCheckedChange={checked =>
                setFormData(prev => ({ ...prev, smsNotifications: checked }))
              }
              label='SMS notifications'
              description='Receive urgent alerts via text message'
            />

            <Toggle
              name='marketingEmails'
              checked={formData.marketingEmails}
              onCheckedChange={checked =>
                setFormData(prev => ({ ...prev, marketingEmails: checked }))
              }
              label='Marketing emails'
              description='Receive promotional offers and product updates'
            />

            <Toggle
              name='newsletter'
              checked={formData.newsletter}
              onCheckedChange={checked =>
                setFormData(prev => ({ ...prev, newsletter: checked }))
              }
              label='Weekly newsletter'
              description='Get our weekly digest of news and tips'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'
          >
            Save Preferences
          </button>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing how to integrate toggles in a form with proper name attributes and state management.',
      },
    },
  },
};

// Accessibility demonstration
export const AccessibilityDemo: Story = {
  render: () => (
    <div className='space-y-6 w-full max-w-2xl'>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Accessibility Features</h3>
        <p className='text-gray-600 text-sm'>
          This toggle component includes comprehensive accessibility features:
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <h4 className='font-medium'>Keyboard Navigation</h4>
            <div className='space-y-3'>
              <Toggle
                defaultChecked={false}
                label='Tab to focus'
                description='Use Tab key to focus this toggle'
              />
              <Toggle
                defaultChecked={true}
                label='Space to toggle'
                description='Press Space or Enter to toggle'
              />
            </div>
          </div>

          <div className='space-y-4'>
            <h4 className='font-medium'>Screen Reader Support</h4>
            <div className='space-y-3'>
              <Toggle
                defaultChecked={false}
                label='ARIA attributes'
                description="Proper role='switch' and aria-checked"
              />
              <Toggle
                defaultChecked={true}
                label='Label association'
                description='Labels properly associated with controls'
              />
            </div>
          </div>
        </div>

        <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <h4 className='font-medium text-blue-900 mb-2'>
            Accessibility Checklist ✅
          </h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Keyboard navigation (Tab, Space, Enter)</li>
            <li>• Screen reader support (role="switch", aria-checked)</li>
            <li>• Focus management and visual indicators</li>
            <li>• Proper label association</li>
            <li>• Disabled state handling</li>
            <li>• Color contrast compliance</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of the comprehensive accessibility features built into the Toggle component.',
      },
    },
  },
};

// Interactive playground
// Text toggle variants
export const TextVariants: Story = {
  render: () => (
    <div className='space-y-6 w-full max-w-md'>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Text Toggle Variants</h3>
        <p className='text-gray-600 text-sm'>
          Flexible text toggles that can display any pair of labels
        </p>

        <div className='space-y-4'>
          <Toggle
            variant='text'
            defaultChecked={true}
            label='Accept terms and conditions'
            uncheckedText='No'
            checkedText='Yes'
          />

          <Toggle
            variant='text'
            defaultChecked={false}
            label='Store status'
            uncheckedText='Closed'
            checkedText='Open'
          />

          <Toggle
            variant='text'
            defaultChecked={true}
            label='Feature availability'
            uncheckedText='Inactive'
            checkedText='Active'
          />

          <Toggle
            variant='text'
            defaultChecked={false}
            label='Connection status'
            uncheckedText='Off'
            checkedText='On'
          />

          <Toggle
            variant='text'
            defaultChecked={true}
            label='Visibility setting'
            uncheckedText='Hidden'
            checkedText='Visible'
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Text toggle variants with customizable labels. Perfect for Yes/No, Open/Close, Active/Inactive, and other binary states.',
      },
    },
  },
};

// Text toggle sizes
export const TextToggleSizes: Story = {
  render: () => (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Text Toggle Sizes</h3>

        <div className='space-y-3'>
          <Toggle
            variant='text'
            size='sm'
            defaultChecked={true}
            label='Small text toggle'
            uncheckedText='No'
            checkedText='Yes'
          />

          <Toggle
            variant='text'
            size='md'
            defaultChecked={true}
            label='Medium text toggle'
            uncheckedText='Closed'
            checkedText='Open'
          />

          <Toggle
            variant='text'
            size='lg'
            defaultChecked={true}
            label='Large text toggle'
            uncheckedText='Inactive'
            checkedText='Active'
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Text toggle component in different sizes with custom text labels.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className='w-full max-w-md space-y-4'>
        <Toggle
          checked={checked}
          onCheckedChange={setChecked}
          label='Interactive toggle'
          description='Click to toggle the state'
        />

        <div className='p-4 bg-gray-50 rounded-lg'>
          <p className='text-sm text-gray-600'>
            Current state: <strong>{checked ? 'ON' : 'OFF'}</strong>
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
