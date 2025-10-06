import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';

const tabsVariants = cva('flex flex-col', {
  variants: {
    variant: {
      default: '',
      underline: '',
      pills: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const tabsListVariants = cva('flex overflow-x-auto scrollbar-hide', {
  variants: {
    variant: {
      default: 'border-b border-gray-200',
      underline: 'border-b border-gray-200',
      pills: 'bg-gray-100 rounded-lg p-1',
    },
    size: {
      sm: 'gap-2 md:gap-4',
      md: 'gap-3 md:gap-6',
      lg: 'gap-4 md:gap-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const tabTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 data-[state=active]:text-black data-[state=active]:border-black',
        underline:
          'border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 data-[state=active]:text-black data-[state=active]:border-black',
        pills:
          'rounded-md hover:bg-white/50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm',
      },
      size: {
        sm: 'px-2 py-1.5 text-xs md:px-3',
        md: 'px-3 py-2 text-sm md:px-4',
        lg: 'px-4 py-3 text-sm md:px-6 md:text-base',
      },
      iconPosition: {
        left: 'flex-row gap-1 md:gap-2',
        right: 'flex-row-reverse gap-1 md:gap-2',
        top: 'flex-col gap-1',
        bottom: 'flex-col-reverse gap-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      iconPosition: 'left',
    },
  }
);

const tabContentVariants = cva(
  'mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md',
  {
    variants: {
      size: {
        sm: 'mt-2 md:mt-3',
        md: 'mt-3 md:mt-4',
        lg: 'mt-4 md:mt-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Tab label text */
  label: string;
  /** Optional icon component */
  icon?: React.ComponentType<{ className?: string }> | undefined;
  /** Optional icon to render when the tab is active */
  activeStateIcon?: React.ComponentType<{ className?: string }> | undefined;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Tab content */
  content: React.ReactNode;
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    BaseProps,
    VariantProps<typeof tabsVariants> {
  /** Array of tab items */
  items: TabItem[];
  /** Currently active tab ID */
  activeTab?: string;
  /** Callback when tab changes */
  onChange?: (tabId: string) => void;
  /** Default active tab ID */
  defaultActiveTab?: string;
  /** Whether tabs are disabled */
  disabled?: boolean;
  /** Custom aria-label for the tab list */
  ariaLabel?: string;
  /** Position of the icon relative to the label */
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Enable URL parameter persistence */
  persistInUrl?: boolean;
  /** URL parameter name for tab persistence (default: 'tab') */
  urlParamName?: string;
}

/**
 * Accessible navigation tab component
 *
 * Provides keyboard navigation, ARIA support, and multiple visual variants.
 * Perfect for settings panels, navigation, and content organization.
 *
 * @example
 * ```tsx
 * const tabs = [
 *   {
 *     id: 'general',
 *     label: 'General',
 *     icon: GeneralIcon,
 *     content: <GeneralSettings />
 *   },
 *   {
 *     id: 'design',
 *     label: 'Design',
 *     icon: DesignIcon,
 *     content: <DesignSettings />
 *   }
 * ];
 *
 * <Tabs
 *   items={tabs}
 *   defaultActiveTab="general"
 *   variant="underline"
 *   size="md"
 *   persistInUrl={true}
 *   urlParamName="tab"
 * />
 * ```
 */
export const Tabs: React.FC<TabsProps> = ({
  className,
  variant = 'default',
  size = 'md',
  items,
  activeTab,
  onChange,
  defaultActiveTab,
  disabled = false,
  ariaLabel = 'Navigation tabs',
  iconPosition = 'left',
  persistInUrl = false,
  urlParamName = 'tab',
  ...props
}) => {
  // URL parameter management
  const getUrlParams = () => {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  };

  const updateUrlParams = (newTab: string) => {
    if (typeof window === 'undefined') return;

    const searchParams = getUrlParams();
    searchParams.set(urlParamName, newTab);

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };

  // Get initial active tab from URL if persistence is enabled
  const getInitialActiveTab = () => {
    if (persistInUrl && typeof window !== 'undefined') {
      const urlTab = getUrlParams().get(urlParamName);
      if (urlTab && items.some(item => item.id === urlTab)) {
        return urlTab;
      }
    }
    return activeTab || defaultActiveTab || items[0]?.id || '';
  };

  const [internalActiveTab, setInternalActiveTab] =
    useState(getInitialActiveTab);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentActiveTab = activeTab || internalActiveTab;

  useEffect(() => {
    if (activeTab !== undefined) {
      setInternalActiveTab(activeTab);
    }
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    if (disabled) return;

    setInternalActiveTab(tabId);

    // Update URL parameters if persistence is enabled
    if (persistInUrl) {
      updateUrlParams(tabId);
    }

    onChange?.(tabId);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (disabled) return;

    let newIndex = index;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = index > 0 ? index - 1 : items.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = index < items.length - 1 ? index + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    // Skip disabled tabs
    while (items[newIndex]?.disabled && newIndex !== index) {
      if (event.key === 'ArrowLeft' || event.key === 'End') {
        newIndex = newIndex > 0 ? newIndex - 1 : items.length - 1;
      } else {
        newIndex = newIndex < items.length - 1 ? newIndex + 1 : 0;
      }
    }

    tabRefs.current[newIndex]?.focus();
    const targetItem = items[newIndex];
    if (targetItem && !targetItem.disabled) {
      handleTabChange(targetItem.id);
    }
  };

  const activeTabContent =
    items.find(item => item.id === currentActiveTab)?.content || null;

  return (
    <div className={cn(tabsVariants({ variant, size }), className)} {...props}>
      {/* Tab List */}
      <div
        role='tablist'
        aria-label={ariaLabel}
        className={cn(tabsListVariants({ variant, size }))}
      >
        {items.map((item, index) => {
          const isActive = item.id === currentActiveTab;
          const Icon =
            isActive && item.activeStateIcon ? item.activeStateIcon : item.icon;

          return (
            <button
              key={item.id}
              ref={el => (tabRefs.current[index] = el)}
              role='tab'
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
              id={`tab-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={disabled || item.disabled}
              data-state={isActive ? 'active' : 'inactive'}
              className={cn(
                tabTriggerVariants({ variant, size, iconPosition }),
                item.disabled && 'opacity-50 cursor-not-allowed'
              )}
              onClick={() => handleTabChange(item.id)}
              onKeyDown={e => handleKeyDown(e, index)}
            >
              {Icon && (
                <Icon
                  className={cn(
                    'h-4 w-4',
                    size === 'sm' && 'h-3 w-3',
                    size === 'lg' && 'h-5 w-5'
                  )}
                />
              )}
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTabContent && (
        <div
          role='tabpanel'
          id={`tabpanel-${currentActiveTab}`}
          aria-labelledby={`tab-${currentActiveTab}`}
          tabIndex={0}
          className={cn(tabContentVariants({ size }))}
        >
          {activeTabContent}
        </div>
      )}
    </div>
  );
};

Tabs.displayName = 'Tabs';
