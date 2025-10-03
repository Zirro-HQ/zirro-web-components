import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Layout, HomeIcon, type NavigationSection } from './Layout';

// Additional icons for the stories
const BookingPageIcon = ({ className }: { className?: string }) => (
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

const AppointmentsIcon = ({ className }: { className?: string }) => (
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
      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    />
  </svg>
);

const ServicesIcon = ({ className }: { className?: string }) => (
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
      d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z'
    />
  </svg>
);

const CustomersIcon = ({ className }: { className?: string }) => (
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
      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
    />
  </svg>
);

const DiscountsIcon = ({ className }: { className?: string }) => (
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
      d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
    />
  </svg>
);

const MessagingIcon = ({ className }: { className?: string }) => (
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
      d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
    />
  </svg>
);

const AppsIcon = ({ className }: { className?: string }) => (
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
      d='M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z'
    />
  </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
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
      d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
    />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
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
      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
    />
  </svg>
);

const MoreIcon = ({ className }: { className?: string }) => (
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
      d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
    />
  </svg>
);

// Sample navigation sections matching the sidebar image
const dashboardNavigationSections: NavigationSection[] = [
  {
    id: 'main',
    title: '',
    items: [
      {
        id: 'home',
        label: 'HOME',
        icon: HomeIcon,
        active: true,
      },
    ],
  },
  {
    id: 'booking',
    title: 'BOOKING',
    items: [
      {
        id: 'booking-page',
        label: 'BOOKING PAGE',
        icon: BookingPageIcon,
      },
      {
        id: 'appointments',
        label: 'APPOINTMENTS',
        icon: AppointmentsIcon,
      },
      {
        id: 'services',
        label: 'SERVICES',
        icon: ServicesIcon,
      },
    ],
  },
  {
    id: 'marketing',
    title: 'MARKETING',
    items: [
      {
        id: 'customers',
        label: 'CUSTOMERS',
        icon: CustomersIcon,
      },
      {
        id: 'discounts',
        label: 'DISCOUNTS',
        icon: DiscountsIcon,
      },
      {
        id: 'messaging',
        label: 'MESSAGING',
        icon: MessagingIcon,
      },
    ],
  },
  {
    id: 'channels',
    title: 'CHANNELS',
    items: [
      {
        id: 'booking-page-channel',
        label: 'BOOKING PAGE',
        icon: BookingPageIcon,
      },
      {
        id: 'mpos',
        label: 'MPOS',
        icon: AppsIcon,
      },
    ],
  },
];

// Legacy navigation items for backward compatibility
const dashboardNavigation = dashboardNavigationSections.flatMap(
  section => section.items
);

// Mobile bottom navigation (first 5 items)
const mobileNavigation = [
  {
    id: 'home',
    label: 'Home',
    icon: HomeIcon,
    active: true,
  },
  {
    id: 'booking-page',
    label: 'Booking Page',
    icon: BookingPageIcon,
  },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: AppointmentsIcon,
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: CustomersIcon,
  },
  {
    id: 'more',
    label: 'More',
    icon: MoreIcon,
  },
];

// Sample user profile
const sampleUser = {
  name: 'Xtratouch Unis...',
  email: 'xtratouch@example.com',
  initials: 'XU',
};

// Sample top bar actions
const topBarActions = [
  {
    id: 'search',
    label: 'Search',
    icon: SearchIcon,
    onClick: () => console.log('Search clicked'),
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: BellIcon,
    badge: 3,
    onClick: () => console.log('Notifications clicked'),
  },
];

// Sample content components
const DashboardContent = () => (
  <div className='p-6'>
    <div className='mb-6'>
      <div className='rounded-lg bg-white p-6 shadow-sm'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>₦0.00</h2>
          <div className='text-blue-500'>
            <svg
              className='h-12 w-12'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1}
                d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
              />
            </svg>
          </div>
        </div>
        <div className='space-y-2 text-sm text-gray-600'>
          <div>
            Total Appointments <span className='font-semibold'>0</span>
          </div>
          <div>
            Appointment value <span className='font-semibold'>₦2,940.00</span>
          </div>
        </div>
      </div>
    </div>

    <div className='mb-6 rounded-lg bg-white p-6 shadow-sm'>
      <div className='mb-4 flex items-center justify-center'>
        <div className='rounded-full border-2 border-dashed border-gray-300 px-6 py-2 text-sm text-gray-500'>
          NO DATA TO SHOW
        </div>
      </div>
      <div className='h-32 bg-gray-50 rounded'></div>
    </div>

    <div className='rounded-lg bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Complete setup</h3>
          <p className='text-sm text-gray-600'>1 of 5 completed</p>
        </div>
        <svg
          className='h-6 w-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      </div>
    </div>

    <div className='mt-6'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Upcoming appointments</h3>
        <button className='text-sm text-blue-600 hover:text-blue-800'>
          SEE ALL
        </button>
      </div>
      <div className='rounded-lg bg-white p-8 text-center shadow-sm'>
        <h4 className='mb-2 text-lg font-semibold'>NOTHING HERE</h4>
        <p className='mb-4 text-gray-600'>
          Bookings will show up here. You can also manually create an
          appointment.
        </p>
        <button className='rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700'>
          SETUP YOUR SCHEDULE
        </button>
      </div>
    </div>
  </div>
);

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive dashboard layout component with sidebar navigation, mobile bottom nav, and top bar. Includes comprehensive accessibility features and responsive design.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dashboard', 'fullscreen'],
      description: 'Layout variant',
    },
    topBarVariant: {
      control: 'select',
      options: ['default', 'transparent', 'gradient'],
      description: 'Top bar styling variant',
    },
    bottomNavVariant: {
      control: 'select',
      options: ['default', 'dark'],
      description: 'Bottom navigation styling variant',
    },
    defaultCollapsed: {
      control: 'boolean',
      description: 'Whether sidebar starts collapsed',
    },
    showSidebar: {
      control: 'boolean',
      description: 'Whether to show the sidebar',
    },
    showBottomNav: {
      control: 'boolean',
      description: 'Whether to show bottom navigation on mobile',
    },
    showTopBar: {
      control: 'boolean',
      description: 'Whether to show the top bar',
    },
    fontFamily: {
      control: 'text',
      description: 'Custom font family for the layout',
    },
    contentAreaBackground: {
      control: 'color',
      description: 'Custom background color for the main content area',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

// Basic Examples
export const Default: Story = {
  args: {
    title: '',
    navigationSections: dashboardNavigationSections,
    user: sampleUser,
    topBarActions,
    children: <div />,
    showTopBar: false,
    logo: (
      <svg
        width='23'
        height='23'
        viewBox='0 0 23 23'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clip-path='url(#clip0_7241_891)'>
          <path
            d='M20.6506 2.72683C21.4857 3.56193 22.0322 4.54886 22.2904 5.68763C22.5789 6.82636 22.5864 8.04864 22.3131 9.35442C22.0398 10.6602 21.4857 12.004 20.6506 13.3856C19.8458 14.7673 18.7754 16.1262 17.4392 17.4624C16.6194 18.2823 15.7615 19.0187 14.8656 19.6716C13.9698 20.3245 13.074 20.8711 12.1782 21.3114C11.2823 21.7517 10.3941 22.0782 9.51347 22.2907C8.64802 22.5185 7.84328 22.6096 7.0993 22.564C5.36838 22.473 3.87282 21.7973 2.61259 20.5371C1.80786 19.7323 1.23089 18.8365 0.88167 17.8496C0.562817 16.8626 0.471718 15.815 0.608367 14.7066C0.69947 14.0385 0.889263 13.3173 1.17775 12.5429C1.48142 11.7534 1.85341 10.9563 2.29373 10.1516C2.76442 9.34683 3.28826 8.54968 3.86523 7.76016C4.47256 6.9706 5.11785 6.23421 5.80111 5.55097C6.59067 4.76142 7.42576 4.04779 8.3064 3.4101C9.2174 2.77238 10.1208 2.23337 11.0167 1.79305C11.9277 1.36791 12.8159 1.05665 13.6813 0.859266C14.562 0.646697 15.3743 0.563187 16.1183 0.608737C17.0141 0.65429 17.8188 0.851673 18.5325 1.20089C19.2613 1.53493 19.9673 2.04358 20.6506 2.72683ZM19.8307 3.22789C18.7374 2.13468 17.1963 2.0208 15.2073 2.88626C13.2182 3.75172 10.8648 5.54338 8.14698 8.2612C2.66573 13.7425 1.04869 17.6067 3.29585 19.8538C4.40422 20.9622 5.91499 21.1216 7.8281 20.3321C9.7716 19.5425 12.0871 17.804 14.7746 15.1165C17.5987 12.2924 19.4283 9.88585 20.2634 7.89681C21.1137 5.92295 20.9694 4.36664 19.8307 3.22789Z'
            fill='#2C4BFF'
          />
        </g>
        <defs>
          <clipPath id='clip0_7241_891'>
            <rect width='23' height='23' fill='white' />
          </clipPath>
        </defs>
      </svg>
    ),
  },
};

export const CollapsedSidebar: Story = {
  args: {
    title: 'Dashboard',
    navigationSections: dashboardNavigationSections,
    user: sampleUser,
    defaultCollapsed: true,
    topBarActions,
    children: <DashboardContent />,
  },
};

export const WithoutTopBar: Story = {
  args: {
    navigationItems: dashboardNavigation,
    user: sampleUser,
    showTopBar: false,
    children: <DashboardContent />,
  },
};

export const WithoutSidebar: Story = {
  args: {
    title: 'Mobile Only Layout',
    navigationItems: mobileNavigation,
    showSidebar: false,
    topBarActions,
    children: <DashboardContent />,
  },
};

// Top Bar Variants
export const GradientTopBar: Story = {
  args: {
    title: 'Dashboard',
    navigationItems: dashboardNavigation,
    user: sampleUser,
    topBarVariant: 'gradient',
    topBarActions,
    children: <DashboardContent />,
  },
};

export const TransparentTopBar: Story = {
  args: {
    title: 'Dashboard',
    navigationItems: dashboardNavigation,
    user: sampleUser,
    topBarVariant: 'transparent',
    topBarActions,
    children: <DashboardContent />,
  },
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('home');
    const [collapsed, setCollapsed] = useState(false);

    const navigationWithActive = dashboardNavigation.map(item => ({
      ...item,
      active: item.id === activeItem,
    }));

    return (
      <Layout
        title='Interactive Dashboard'
        navigationItems={navigationWithActive}
        user={sampleUser}
        topBarActions={topBarActions}
        defaultCollapsed={collapsed}
        onNavigationClick={item => setActiveItem(item.id)}
        onSidebarToggle={setCollapsed}
      >
        <div className='p-6'>
          <div className='rounded-lg bg-white p-6 shadow-sm'>
            <h2 className='mb-4 text-xl font-semibold'>Interactive Layout</h2>
            <p className='mb-4 text-gray-600'>
              Click on navigation items to see the active state change. Use the
              collapse button to toggle the sidebar.
            </p>
            <div className='space-y-2'>
              <p>
                <strong>Active Item:</strong> {activeItem}
              </p>
              <p>
                <strong>Sidebar Collapsed:</strong> {collapsed ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example showing navigation state management and sidebar toggle functionality.',
      },
    },
  },
};

// With Badges and Notifications
export const WithBadges: Story = {
  args: {
    title: 'Dashboard',
    navigationItems: [
      dashboardNavigation[0]!,
      dashboardNavigation[1]!,
      { ...dashboardNavigation[2]!, badge: 5 },
      dashboardNavigation[3]!,
      { ...dashboardNavigation[4]!, badge: 12 },
      dashboardNavigation[5]!,
      { ...dashboardNavigation[6]!, badge: 2 },
      dashboardNavigation[7]!,
    ],
    user: sampleUser,
    topBarActions: [
      ...topBarActions,
      {
        id: 'messages',
        label: 'Messages',
        icon: MessagingIcon,
        badge: 15,
        onClick: () => console.log('Messages clicked'),
      },
    ],
    children: <DashboardContent />,
  },
};

// Custom Logo Example
export const WithCustomLogo: Story = {
  args: {
    title: 'ZirroPro',
    logo: (
      <div className='flex items-center gap-2'>
        <div className='flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold'>
          Z
        </div>
        <span className='text-lg font-semibold text-white'>ZirroPro</span>
      </div>
    ),
    navigationItems: dashboardNavigation,
    user: sampleUser,
    topBarActions,
    children: <DashboardContent />,
  },
};

// Custom Font Example
export const WithCustomFont: Story = {
  args: {
    title: 'Dashboard',
    navigationItems: dashboardNavigation,
    user: sampleUser,
    fontFamily: 'Georgia, serif',
    topBarActions,
    children: <DashboardContent />,
  },
};

// Multiple Custom Fonts Example
export const WithModernFont: Story = {
  args: {
    title: 'Modern Dashboard',
    navigationItems: dashboardNavigation,
    user: sampleUser,
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    topBarActions,
    children: (
      <div className='p-6'>
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          <h2 className='mb-4 text-xl font-semibold'>Custom Font Demo</h2>
          <p className='mb-4 text-gray-600'>
            This layout uses the Inter font family, which provides excellent
            readability and modern aesthetics for dashboard interfaces.
          </p>
          <div className='space-y-2'>
            <p className='text-sm'>
              <strong>Font Family:</strong> "Inter", "Helvetica Neue", Arial,
              sans-serif
            </p>
            <p className='text-sm'>
              <strong>Applied to:</strong> Entire layout including sidebar,
              navigation, and content
            </p>
          </div>
        </div>
      </div>
    ),
  },
};

// Dark Bottom Navigation
export const DarkBottomNav: Story = {
  args: {
    title: 'Dashboard',
    navigationItems: dashboardNavigation,
    user: sampleUser,
    bottomNavVariant: 'dark',
    topBarActions,
    children: <DashboardContent />,
  },
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <Layout
      title='Accessibility Demo'
      navigationItems={dashboardNavigation}
      user={sampleUser}
      topBarActions={topBarActions}
    >
      <div className='p-6'>
        <div className='rounded-lg bg-blue-50 p-6'>
          <h2 className='mb-4 text-xl font-semibold text-blue-900'>
            Accessibility Features
          </h2>
          <ul className='space-y-2 text-sm text-blue-800'>
            <li>
              • <strong>Keyboard Navigation:</strong> Tab through all
              interactive elements
            </li>
            <li>
              • <strong>ARIA Landmarks:</strong> Proper navigation, main, and
              header roles
            </li>
            <li>
              • <strong>Screen Reader Support:</strong> Descriptive labels and
              current page indicators
            </li>
            <li>
              • <strong>Focus Management:</strong> Visible focus indicators and
              logical tab order
            </li>
            <li>
              • <strong>Responsive Design:</strong> Mobile-first approach with
              touch-friendly targets
            </li>
            <li>
              • <strong>Color Contrast:</strong> WCAG AA compliant color
              combinations
            </li>
            <li>
              • <strong>Semantic HTML:</strong> Proper heading hierarchy and
              landmark elements
            </li>
          </ul>
        </div>

        <div className='mt-6 rounded-lg bg-white p-6 shadow-sm'>
          <h3 className='mb-4 text-lg font-semibold'>Keyboard Shortcuts</h3>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <h4 className='font-medium'>Navigation</h4>
              <ul className='mt-2 space-y-1 text-sm text-gray-600'>
                <li>
                  <kbd className='px-2 py-1 bg-gray-100 rounded'>Tab</kbd> -
                  Next element
                </li>
                <li>
                  <kbd className='px-2 py-1 bg-gray-100 rounded'>
                    Shift + Tab
                  </kbd>{' '}
                  - Previous element
                </li>
                <li>
                  <kbd className='px-2 py-1 bg-gray-100 rounded'>Enter</kbd> -
                  Activate button/link
                </li>
                <li>
                  <kbd className='px-2 py-1 bg-gray-100 rounded'>Space</kbd> -
                  Activate button
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-medium'>Mobile</h4>
              <ul className='mt-2 space-y-1 text-sm text-gray-600'>
                <li>Touch-friendly 44px minimum target size</li>
                <li>Swipe gestures for mobile menu</li>
                <li>Voice control compatibility</li>
                <li>Screen reader announcements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive accessibility features following WCAG guidelines and best practices.',
      },
    },
  },
};

// Responsive Showcase
export const ResponsiveShowcase: Story = {
  render: () => (
    <Layout
      title='Responsive Layout'
      navigationItems={dashboardNavigation}
      user={sampleUser}
      topBarActions={topBarActions}
    >
      <div className='p-6'>
        <div className='space-y-6'>
          <div className='rounded-lg bg-white p-6 shadow-sm'>
            <h2 className='mb-4 text-xl font-semibold'>Responsive Behavior</h2>
            <div className='space-y-4'>
              <div>
                <h3 className='font-medium'>Desktop (≥1024px)</h3>
                <ul className='mt-2 space-y-1 text-sm text-gray-600'>
                  <li>• Fixed sidebar navigation</li>
                  <li>• Collapsible sidebar with toggle button</li>
                  <li>• Full top bar with actions</li>
                  <li>• No bottom navigation</li>
                </ul>
              </div>
              <div>
                <h3 className='font-medium'>Mobile (&lt;1024px)</h3>
                <ul className='mt-2 space-y-1 text-sm text-gray-600'>
                  <li>• Hidden sidebar (accessible via hamburger menu)</li>
                  <li>• Mobile-optimized top bar</li>
                  <li>• Bottom navigation with primary items</li>
                  <li>• Touch-friendly interface</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='rounded-lg bg-gray-50 p-4'>
              <h4 className='font-medium'>Sidebar Features</h4>
              <ul className='mt-2 space-y-1 text-xs text-gray-600'>
                <li>• Collapsible with icons</li>
                <li>• User profile section</li>
                <li>• Badge notifications</li>
                <li>• Smooth animations</li>
              </ul>
            </div>
            <div className='rounded-lg bg-gray-50 p-4'>
              <h4 className='font-medium'>Top Bar Features</h4>
              <ul className='mt-2 space-y-1 text-xs text-gray-600'>
                <li>• Customizable actions</li>
                <li>• Mobile hamburger menu</li>
                <li>• Multiple style variants</li>
                <li>• Notification badges</li>
              </ul>
            </div>
            <div className='rounded-lg bg-gray-50 p-4'>
              <h4 className='font-medium'>Mobile Navigation</h4>
              <ul className='mt-2 space-y-1 text-xs text-gray-600'>
                <li>• Bottom tab bar</li>
                <li>• Icon + label design</li>
                <li>• Active state indicators</li>
                <li>• Maximum 5 items</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates responsive behavior across different screen sizes and devices.',
      },
    },
  },
};

// Custom Content Area Background
export const CustomContentBackground: Story = {
  args: {
    title: 'Custom Background',
    navigationSections: dashboardNavigationSections,
    user: sampleUser,
    topBarActions,
    contentAreaBackground: '#f0f9ff', // Light blue background
    children: (
      <div className='p-6'>
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          <h2 className='mb-4 text-xl font-semibold'>
            Custom Content Background
          </h2>
          <p className='text-gray-600'>
            This layout demonstrates a custom background color for the main
            content area. The content area now has a light blue background
            (#f0f9ff) instead of the default.
          </p>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with custom background color for the main content area.',
      },
    },
  },
};
