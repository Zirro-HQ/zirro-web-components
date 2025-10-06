import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tabs } from './Tabs';

// Mock icons for the stories
const GeneralIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 9c0 5-4 9-9 9s-9-4-9-9m9 9c0-5 4-9 9-9s9 4 9 9'
    />
  </svg>
);

const DesignIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z'
    />
  </svg>
);

const FeaturesIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z'
    />
  </svg>
);

const SEOIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    />
  </svg>
);

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'underline', 'pills'],
      description: 'Visual variant of the tabs',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tabs',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Position of the icon relative to the label',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether all tabs are disabled',
    },
    ariaLabel: {
      control: 'text',
      description: 'Aria label for the tab list',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const settingsTabs = [
  {
    id: 'general',
    label: 'General',
    icon: GeneralIcon,
    content: (
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Your page's basics</h3>
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Business name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            placeholder='e.g Deola Bakery'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='text-sm text-gray-600'>deolawigs.zirro.app</div>
      </div>
    ),
  },
  {
    id: 'design',
    label: 'Design',
    icon: DesignIcon,
    content: (
      <div className='space-y-6'>
        <h3 className='text-lg font-semibold'>Set your page vibe</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Primary color
            </label>
            <div className='flex items-center gap-3 p-4 border border-gray-200 rounded-lg'>
              <div className='w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-blue-500'></div>
              <span className='text-sm text-gray-600'>
                Select color from wheel
              </span>
            </div>
          </div>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Background color
            </label>
            <div className='flex items-center gap-3 p-4 border border-gray-200 rounded-lg'>
              <div className='w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-purple-500'></div>
              <span className='text-sm text-gray-600'>
                Select color from wheel
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'features',
    label: 'Features',
    icon: FeaturesIcon,
    content: (
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Page Features</h3>
        <p className='text-gray-600'>
          Configure the features available on your page.
        </p>
        <div className='space-y-3'>
          <label className='flex items-center gap-3'>
            <input type='checkbox' className='rounded' defaultChecked />
            <span>Enable contact form</span>
          </label>
          <label className='flex items-center gap-3'>
            <input type='checkbox' className='rounded' defaultChecked />
            <span>Show social media links</span>
          </label>
          <label className='flex items-center gap-3'>
            <input type='checkbox' className='rounded' />
            <span>Enable online booking</span>
          </label>
        </div>
      </div>
    ),
  },
  {
    id: 'seo',
    label: 'SEO',
    icon: SEOIcon,
    content: (
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Search Engine Optimization</h3>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Page title
            </label>
            <input
              type='text'
              placeholder='Enter page title'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Meta description
            </label>
            <textarea
              placeholder='Enter meta description'
              rows={3}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    items: settingsTabs,
    defaultActiveTab: 'general',
    variant: 'default',
    size: 'md',
  },
};

export const SettingsExample: Story = {
  args: {
    items: settingsTabs,
    defaultActiveTab: 'general',
    variant: 'underline',
    size: 'md',
    ariaLabel: 'Settings navigation',
  },
};

export const UnderlineVariant: Story = {
  args: {
    items: settingsTabs,
    defaultActiveTab: 'design',
    variant: 'underline',
    size: 'md',
  },
};

export const PillsVariant: Story = {
  args: {
    items: settingsTabs,
    defaultActiveTab: 'features',
    variant: 'pills',
    size: 'md',
  },
};

export const SmallSize: Story = {
  args: {
    items: settingsTabs,
    defaultActiveTab: 'general',
    variant: 'underline',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    items: settingsTabs,
    defaultActiveTab: 'general',
    variant: 'underline',
    size: 'lg',
  },
};

export const WithDisabledTab: Story = {
  args: {
    items: [
      settingsTabs[0]!,
      settingsTabs[1]!,
      {
        ...settingsTabs[2]!,
        disabled: true,
      },
      settingsTabs[3]!,
    ],
    defaultActiveTab: 'general',
    variant: 'underline',
    size: 'md',
  },
};

export const AllDisabled: Story = {
  args: {
    items: settingsTabs,
    defaultActiveTab: 'general',
    variant: 'underline',
    size: 'md',
    disabled: true,
  },
};

export const WithoutIcons: Story = {
  args: {
    items: settingsTabs.map(tab => {
      const { icon, ...tabWithoutIcon } = tab;
      return tabWithoutIcon;
    }),
    defaultActiveTab: 'general',
    variant: 'underline',
    size: 'md',
  },
};

export const IconPositions: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Icon Left (Default)</h3>
        <Tabs
          items={settingsTabs}
          variant='underline'
          size='md'
          iconPosition='left'
          defaultActiveTab='general'
        />
      </div>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Icon Right</h3>
        <Tabs
          items={settingsTabs}
          variant='underline'
          size='md'
          iconPosition='right'
          defaultActiveTab='general'
        />
      </div>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Icon Top</h3>
        <Tabs
          items={settingsTabs}
          variant='underline'
          size='md'
          iconPosition='top'
          defaultActiveTab='general'
        />
      </div>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Icon Bottom</h3>
        <Tabs
          items={settingsTabs}
          variant='underline'
          size='md'
          iconPosition='bottom'
          defaultActiveTab='general'
        />
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: args => {
    const [activeTab, setActiveTab] = React.useState('general');

    return (
      <div className='space-y-4'>
        <div className='flex gap-2'>
          <button
            onClick={() => setActiveTab('general')}
            className='px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded'
          >
            Go to General
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className='px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded'
          >
            Go to Design
          </button>
        </div>
        <Tabs {...args} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    );
  },
  args: {
    items: settingsTabs,
    variant: 'underline',
    size: 'md',
  },
};

export const UrlPersistence: Story = {
  render: () => (
    <div className='space-y-6'>
      <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
        <h3 className='text-lg font-semibold mb-2'>URL Persistence Demo</h3>
        <p className='text-sm text-gray-600 mb-4'>
          This tab component persists the active tab in the URL. Try switching
          tabs and refreshing the page - the selected tab will be maintained.
          The URL will show `?tab=design` or `?tab=features` etc.
        </p>
        <p className='text-xs text-gray-500'>
          Note: URL changes are visible in the browser's address bar when
          viewing this story in isolation.
        </p>
      </div>

      <Tabs
        items={settingsTabs}
        variant='underline'
        size='lg'
        persistInUrl={true}
        urlParamName='tab'
        defaultActiveTab='general'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates URL parameter persistence. The active tab is saved to the URL and persists across page reloads.',
      },
    },
  },
};

export const MobileResponsive: Story = {
  render: () => (
    <div className='space-y-8'>
      <div className='p-4 bg-orange-50 border border-orange-200 rounded-lg'>
        <h3 className='text-lg font-semibold mb-2'>Mobile Responsive Demo</h3>
        <p className='text-sm text-gray-600 mb-4'>
          Resize your browser or view on mobile to see responsive behavior:
        </p>
        <ul className='text-xs text-gray-500 space-y-1 mb-4'>
          <li>• Horizontal scrolling on mobile when tabs don't fit</li>
          <li>• Smaller padding and gaps on mobile</li>
          <li>• Icons and text scale appropriately</li>
          <li>• Hidden scrollbars for clean appearance</li>
        </ul>
      </div>

      <div className='space-y-6'>
        <div>
          <h4 className='text-md font-semibold mb-3'>
            Many Tabs (Horizontal Scroll)
          </h4>
          <Tabs
            items={[
              {
                id: 'tab1',
                label: 'Dashboard',
                content: <div className='p-4'>Dashboard content</div>,
              },
              {
                id: 'tab2',
                label: 'Analytics',
                content: <div className='p-4'>Analytics content</div>,
              },
              {
                id: 'tab3',
                label: 'Reports',
                content: <div className='p-4'>Reports content</div>,
              },
              {
                id: 'tab4',
                label: 'Settings',
                content: <div className='p-4'>Settings content</div>,
              },
              {
                id: 'tab5',
                label: 'Users',
                content: <div className='p-4'>Users content</div>,
              },
              {
                id: 'tab6',
                label: 'Billing',
                content: <div className='p-4'>Billing content</div>,
              },
              {
                id: 'tab7',
                label: 'Support',
                content: <div className='p-4'>Support content</div>,
              },
              {
                id: 'tab8',
                label: 'Integrations',
                content: <div className='p-4'>Integrations content</div>,
              },
            ]}
            variant='underline'
            size='md'
            defaultActiveTab='tab1'
          />
        </div>

        <div>
          <h4 className='text-md font-semibold mb-3'>
            Pills Variant (Mobile Responsive)
          </h4>
          <Tabs
            items={settingsTabs}
            variant='pills'
            size='sm'
            defaultActiveTab='general'
          />
        </div>

        <div>
          <h4 className='text-md font-semibold mb-3'>Large Size with Icons</h4>
          <Tabs
            items={settingsTabs}
            variant='underline'
            size='lg'
            iconPosition='top'
            defaultActiveTab='general'
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates mobile responsive behavior with horizontal scrolling, smaller spacing, and adaptive sizing.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
