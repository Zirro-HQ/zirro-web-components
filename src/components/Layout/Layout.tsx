import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';
import { Avatar } from '../Avatar';

const layoutVariants = cva('min-h-screen bg-gray-50', {
  variants: {
    variant: {
      dashboard: 'flex',
      fullscreen: 'block',
    },
  },
  defaultVariants: {
    variant: 'dashboard',
  },
});

const sidebarVariants = cva(
  'fixed left-0 top-0 z-40 h-screen w-64 transform text-white transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col',
  {
    variants: {
      collapsed: {
        true: 'w-16',
        false: 'w-64',
      },
      mobile: {
        open: 'translate-x-0',
        closed: '-translate-x-full',
      },
    },
    defaultVariants: {
      collapsed: false,
      mobile: 'closed',
    },
  }
);

const mainContentVariants = cva(
  'flex-1 transition-all duration-300 ease-in-out',
  {
    variants: {
      sidebarCollapsed: {
        true: 'lg:ml-16',
        false: 'lg:ml-64',
      },
    },
    defaultVariants: {
      sidebarCollapsed: false,
    },
  }
);

const topBarVariants = cva(
  'sticky top-0 z-30 flex h-16 items-center justify-between px-4 shadow-sm lg:px-6',
  {
    variants: {
      variant: {
        default: 'lg:bg-white lg:border-b lg:border-gray-200 bg-black',
        transparent: 'bg-transparent border-transparent shadow-none',
        gradient:
          'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const bottomNavVariants = cva(
  'fixed bottom-0 left-0 right-0 z-30 px-4 py-2 lg:hidden',
  {
    variants: {
      variant: {
        default: 'bg-black',
        dark: 'bg-gray-900 border-gray-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const sectionHeaderVariants = cva(
  'px-3 py-2 text-xs font-semibold uppercase tracking-wider',
  {
    variants: {
      collapsed: {
        true: 'sr-only',
        false: 'block',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
);

export interface NavigationItem {
  /** Unique identifier for the navigation item */
  id: string;
  /** Display label */
  label: string;
  /** Icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** URL or route path */
  href?: string;
  /** Whether this item is currently active */
  active?: boolean;
  /** Badge/notification count */
  badge?: string | number;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Submenu items */
  children?: NavigationItem[];
}

export interface NavigationSection {
  /** Section identifier */
  id: string;
  /** Section title/header */
  title: string;
  /** Navigation items in this section */
  items: NavigationItem[];
}

export interface UserProfile {
  /** User's display name */
  name: string;
  /** User's email or subtitle */
  email?: string;
  /** User's avatar URL */
  avatar?: string;
  /** User's initials (fallback for avatar) */
  initials?: string;
}

export interface TopBarAction {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Click handler */
  onClick: () => void;
  /** Badge/notification count */
  badge?: string | number;
  /** Whether the action is disabled */
  disabled?: boolean;
}

export interface LayoutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    BaseProps,
    VariantProps<typeof layoutVariants> {
  /** Navigation sections for sidebar (grouped navigation) */
  navigationSections?: NavigationSection[];
  /** Navigation items for sidebar and bottom nav (legacy support) */
  navigationItems?: NavigationItem[];
  /** User profile information */
  user?: UserProfile;
  /** Top bar title - can be string or JSX element */
  title?: React.ReactNode;
  /** Top bar actions/buttons */
  topBarActions?: TopBarAction[];
  /** Whether sidebar is initially collapsed */
  defaultCollapsed?: boolean;
  /** Whether to show the sidebar */
  showSidebar?: boolean;
  /** Whether to show the bottom navigation */
  showBottomNav?: boolean;
  /** Whether to show the top bar */
  showTopBar?: boolean;
  /** Top bar variant */
  topBarVariant?: 'default' | 'transparent' | 'gradient';
  /** Bottom nav variant */
  bottomNavVariant?: 'default' | 'dark';
  /** Custom logo component */
  logo?: React.ReactNode;
  /** Custom sidebar background color */
  sidebarBgColor?: string;
  /** Custom border color for sidebar sections */
  sidebarBorderColor?: string;
  /** Custom active text color */
  activeTextColor?: string;
  /** Custom active icon color */
  activeIconColor?: string;
  /** Custom inactive text color */
  inactiveTextColor?: string;
  /** Custom font family for the layout */
  fontFamily?: string;
  /** Mobile top bar content (overrides default mobile header) */
  mobileTopBarContent?: React.ReactNode;
  /** Brand info for mobile top bar */
  brandInfo?: {
    name: string;
    icon?: React.ReactNode;
    subtitle?: string;
  };
  /** Callback when navigation item is clicked */
  onNavigationClick?: (item: NavigationItem) => void;
  /** Callback when sidebar collapse state changes */
  onSidebarToggle?: (collapsed: boolean) => void;

  sideBarExpandLabel?: string;
  sideBarCollapseIcon?: React.ReactNode;
  /** Main content */
  children: React.ReactNode;
}

// Default icons for common navigation items
const HomeIcon = ({ className }: { className?: string }) => (
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
      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    />
  </svg>
);

const ChevronLeftIcon = ({ className }: { className?: string }) => (
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
      d='M15 19l-7-7 7-7'
    />
  </svg>
);

/**
 * Responsive Layout component with sidebar navigation and mobile bottom nav
 *
 * Provides a complete dashboard layout with responsive navigation,
 * user profile, top bar actions, and proper accessibility support.
 *
 * @example
 * ```tsx
 * // Basic dashboard layout
 * <Layout
 *   title="Dashboard"
 *   user={{ name: "John Doe", email: "john@example.com" }}
 *   navigationItems={[
 *     { id: 'home', label: 'Home', icon: HomeIcon, active: true },
 *     { id: 'bookings', label: 'Bookings', icon: CalendarIcon, badge: 5 }
 *   ]}
 * >
 *   <div>Main content here</div>
 * </Layout>
 *
 * // With custom actions
 * <Layout
 *   topBarActions={[
 *     { id: 'notifications', label: 'Notifications', icon: BellIcon, badge: 3 }
 *   ]}
 *   onNavigationClick={(item) => router.push(item.href)}
 * >
 *   <YourContent />
 * </Layout>
 * ```
 */
export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  (
    {
      className,
      variant,
      navigationSections,
      navigationItems,
      user,
      title,
      topBarActions = [],
      defaultCollapsed = false,
      showSidebar = true,
      showBottomNav = true,
      showTopBar = true,
      topBarVariant = 'default',
      bottomNavVariant = 'default',
      logo,
      sidebarBgColor = '#000000',
      sidebarBorderColor = '#80808033',
      activeTextColor = '#FFFFFF',
      activeIconColor = '#2C4BFF',
      inactiveTextColor = '#808080',
      fontFamily,
      mobileTopBarContent,
      brandInfo,
      sideBarExpandLabel = 'COLLAPSE',
      sideBarCollapseIcon,
      onNavigationClick,
      onSidebarToggle,
      children,
      ...props
    },
    ref
  ) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultCollapsed);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
      // Close mobile menu when screen size changes to desktop
      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setMobileMenuOpen(false);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSidebarToggle = () => {
      const newCollapsed = !sidebarCollapsed;
      setSidebarCollapsed(newCollapsed);
      onSidebarToggle?.(newCollapsed);
    };

    const handleMobileMenuToggle = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleNavigationClick = useCallback(
      (item: NavigationItem) => {
        if (item.disabled) return;

        // Close mobile menu when navigation item is clicked
        setMobileMenuOpen(false);

        if (item.onClick) {
          item.onClick();
        } else {
          onNavigationClick?.(item);
        }
      },
      [onNavigationClick]
    );

    const renderNavigationItem = useCallback(
      (item: NavigationItem, isMobile = false) => {
        const Icon = item.icon;
        const isActive = item.active;

        return (
          <button
            key={item.id}
            onClick={() => handleNavigationClick(item)}
            disabled={item.disabled}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
              isMobile ? 'flex-col gap-1 text-xs' : '',
              !isMobile && sidebarCollapsed
                ? 'justify-center px-2'
                : 'justify-start',
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
            style={{
              color: isActive ? activeTextColor : inactiveTextColor,
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.color = activeTextColor;
                const icon = e.currentTarget.querySelector('svg') as SVGElement;
                if (icon) icon.style.color = activeIconColor;
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.color = inactiveTextColor;
                const icon = e.currentTarget.querySelector('svg') as SVGElement;
                if (icon) icon.style.color = inactiveTextColor;
              }
            }}
            data-active={isActive}
            aria-current={isActive ? 'page' : undefined}
            title={sidebarCollapsed && !isMobile ? item.label : undefined}
          >
            <div
              className='relative'
              style={{
                color: isActive ? activeIconColor : 'inherit',
              }}
            >
              <Icon
                className={cn(
                  isMobile ? 'h-5 w-5' : 'h-5 w-5',
                  'flex-shrink-0'
                )}
              />
              {item.badge && (
                <span className='absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white'>
                  {typeof item.badge === 'number' && item.badge > 9
                    ? '9+'
                    : item.badge}
                </span>
              )}
            </div>
            {(!sidebarCollapsed || isMobile) && (
              <span className={cn('truncate', isMobile && 'text-center')}>
                {item.label}
              </span>
            )}
          </button>
        );
      },
      [
        handleNavigationClick,
        sidebarCollapsed,
        activeTextColor,
        activeIconColor,
        inactiveTextColor,
      ]
    );

    const renderUserProfile = useCallback(() => {
      if (!user) return null;

      return (
        <div
          className={cn(
            'flex items-center gap-3 p-4',
            sidebarCollapsed && 'justify-center px-2'
          )}
          style={{ borderTop: `1px solid ${sidebarBorderColor}` }}
        >
          <Avatar
            {...(user.avatar && { src: user.avatar })}
            name={user.name}
            {...(user.initials && { fallback: user.initials })}
            size='sm'
            color='blue'
          />
          {!sidebarCollapsed && (
            <div className='min-w-0 flex-1'>
              <p className='truncate text-sm font-medium text-white'>
                {user.name}
              </p>
              {user.email && (
                <p className='truncate text-xs text-[#808080]'>{user.email}</p>
              )}
            </div>
          )}
        </div>
      );
    }, [user, sidebarCollapsed]);

    return (
      <div
        ref={ref}
        className={cn(layoutVariants({ variant }), className)}
        style={{
          fontFamily: fontFamily || undefined,
          ...props.style,
        }}
        {...props}
      >
        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div
            className='fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden'
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden='true'
          />
        )}

        {/* Sidebar */}
        {showSidebar && (
          <aside
            className={cn(
              sidebarVariants({
                collapsed: sidebarCollapsed,
                mobile: mobileMenuOpen ? 'open' : 'closed',
              })
            )}
            style={{ backgroundColor: sidebarBgColor }}
            aria-label='Main navigation'
          >
            {/* Sidebar header */}
            <div
              className={cn(
                'flex h-16 items-center px-4 pt-10',
                sidebarCollapsed && 'justify-center px-2'
              )}
            >
              {logo ? (
                logo
              ) : (
                <div className='flex items-center gap-2'>
                  <div className='h-8 w-8 rounded bg-blue-600' />
                  {!sidebarCollapsed && (
                    <div className='text-lg font-semibold text-white'>
                      {title || 'Dashboard'}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav
              className='flex-1 p-4 overflow-y-auto'
              aria-label='Sidebar navigation'
            >
              {navigationSections
                ? navigationSections.map((section, sectionIndex) => (
                    <div
                      key={section.id}
                      className={sectionIndex > 0 ? 'mt-8' : ''}
                    >
                      <h3
                        className={sectionHeaderVariants({
                          collapsed: sidebarCollapsed,
                        })}
                        style={{ color: inactiveTextColor }}
                      >
                        {section.title}
                      </h3>
                      <div className='space-y-2 mt-3'>
                        {section.items.map(item => renderNavigationItem(item))}
                      </div>
                    </div>
                  ))
                : navigationItems?.map(item => renderNavigationItem(item))}
            </nav>

            {/* Bottom section - always at bottom */}
            <div className='mt-auto'>
              {/* Sidebar toggle button */}
              <div
                className='p-4'
                style={{ borderTop: `1px solid ${sidebarBorderColor}` }}
              >
                <button
                  onClick={handleSidebarToggle}
                  className={cn(
                    'hidden w-full items-center rounded-lg p-2 text-[#808080] hover:bg-gray-800 hover:text-white lg:flex transition-colors',
                    sidebarCollapsed ? 'justify-center' : 'justify-start gap-3'
                  )}
                  aria-label={
                    sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
                  }
                >
                  {sideBarCollapseIcon ? (
                    sideBarCollapseIcon
                  ) : (
                    <ChevronLeftIcon
                      className={cn(
                        'h-5 w-5 transition-transform duration-200 flex-shrink-0',
                        sidebarCollapsed && 'rotate-180'
                      )}
                    />
                  )}
                  {!sidebarCollapsed && (
                    <span className='text-sm font-medium uppercase tracking-wider'>
                      {sideBarExpandLabel}
                    </span>
                  )}
                </button>
              </div>

              {/* User profile */}
              {renderUserProfile()}
            </div>
          </aside>
        )}

        {/* Main content area */}
        <div
          className={cn(
            mainContentVariants({
              sidebarCollapsed: showSidebar ? sidebarCollapsed : false,
            }),
            !showSidebar && 'ml-0'
          )}
        >
          {/* Top bar */}
          {showTopBar && (
            <header className={cn(topBarVariants({ variant: topBarVariant }))}>
              {/* Mobile custom top bar */}
              {mobileTopBarContent ? (
                <div className='lg:hidden w-full'>{mobileTopBarContent}</div>
              ) : (
                // Mobile default layout with user and brand info
                <div className='lg:hidden w-full flex items-center justify-between'>
                  {/* Left: User Avatar */}
                  {user && (
                    <div className='flex items-center gap-3'>
                      <button
                        onClick={handleMobileMenuToggle}
                        className='rounded-lg p-1'
                        aria-label='Open navigation menu'
                      >
                        <Avatar
                          {...(user.avatar && { src: user.avatar })}
                          name={user.name}
                          {...(user.initials && { fallback: user.initials })}
                          size='sm'
                          color='blue'
                        />
                      </button>
                    </div>
                  )}

                  {/* Center: User Name */}
                  {user && (
                    <div className='flex-1 text-center'>
                      <h1 className='text-lg font-semibold text-white truncate'>
                        {user.name}
                      </h1>
                    </div>
                  )}

                  {/* Right: Brand Info */}
                  {brandInfo && (
                    <div className='flex items-center gap-2'>
                      {brandInfo.icon}
                      <div className='text-right'>
                        <div className='text-sm font-semibold text-white'>
                          {brandInfo.name}
                        </div>
                        {brandInfo.subtitle && (
                          <div className='text-xs text-gray-300'>
                            {brandInfo.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Desktop layout */}
              <div className='hidden lg:flex w-full items-center justify-between'>
                <div className='flex items-center gap-4'>
                  {/* Title */}
                  {title && (
                    <h1 className='text-lg font-semibold text-gray-900'>
                      {title}
                    </h1>
                  )}
                </div>

                {/* Top bar actions */}
                {topBarActions.length > 0 && (
                  <div className='flex items-center gap-2'>
                    {topBarActions.map(action => {
                      const ActionIcon = action.icon;
                      return (
                        <button
                          key={action.id}
                          onClick={action.onClick}
                          disabled={action.disabled}
                          className='relative rounded-lg p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50'
                          aria-label={action.label}
                          title={action.label}
                        >
                          <ActionIcon className='h-5 w-5' />
                          {action.badge && (
                            <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white'>
                              {typeof action.badge === 'number' &&
                              action.badge > 9
                                ? '9+'
                                : action.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </header>
          )}

          {/* Main content */}
          <main
            className={cn('flex-1', showBottomNav && 'pb-16 lg:pb-0')}
            role='main'
            aria-label='Main content'
          >
            {children}
          </main>
        </div>

        {/* Bottom navigation (mobile only) */}
        {showBottomNav && (
          <nav
            className={cn(bottomNavVariants({ variant: bottomNavVariant }))}
            aria-label='Mobile navigation'
          >
            <div className='flex justify-around'>
              {(navigationSections
                ? navigationSections.flatMap(section => section.items)
                : navigationItems || []
              )
                .slice(0, 5)
                .map(item => renderNavigationItem(item, true))}
            </div>
          </nav>
        )}
      </div>
    );
  }
);

Layout.displayName = 'Layout';

// Export commonly used icons
export { HomeIcon, ChevronLeftIcon };
