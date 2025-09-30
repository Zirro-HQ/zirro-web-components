import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from './Chart';

// Sample data for different chart types
const salesData = [
  { month: 'Jan', sales: 4000, profit: 2400, expenses: 1600 },
  { month: 'Feb', sales: 3000, profit: 1398, expenses: 1602 },
  { month: 'Mar', sales: 2000, profit: 9800, expenses: 800 },
  { month: 'Apr', sales: 2780, profit: 3908, expenses: 1200 },
  { month: 'May', sales: 1890, profit: 4800, expenses: 1400 },
  { month: 'Jun', sales: 2390, profit: 3800, expenses: 1000 },
  { month: 'Jul', sales: 3490, profit: 4300, expenses: 1100 },
];

const appointmentData = [
  { day: 'Mon', appointments: 12, revenue: 2940 },
  { day: 'Tue', appointments: 8, revenue: 1960 },
  { day: 'Wed', appointments: 15, revenue: 3675 },
  { day: 'Thu', appointments: 10, revenue: 2450 },
  { day: 'Fri', appointments: 18, revenue: 4410 },
  { day: 'Sat', appointments: 22, revenue: 5390 },
  { day: 'Sun', appointments: 5, revenue: 1225 },
];

const categoryData = [
  { category: 'Haircuts', value: 45, revenue: 11025 },
  { category: 'Coloring', value: 25, revenue: 7350 },
  { category: 'Styling', value: 15, revenue: 2940 },
  { category: 'Treatments', value: 10, revenue: 2450 },
  { category: 'Other', value: 5, revenue: 980 },
];

const trafficData = [
  { source: 'Direct', visitors: 4000, conversions: 240 },
  { source: 'Social Media', visitors: 3000, conversions: 180 },
  { source: 'Google Ads', visitors: 2000, conversions: 320 },
  { source: 'Email', visitors: 1500, conversions: 150 },
  { source: 'Referral', visitors: 1000, conversions: 80 },
];

const meta = {
  title: 'Components/Chart',
  component: Chart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A versatile chart component built with Recharts that supports multiple chart types with full accessibility features.

## Features
- **Multiple Chart Types**: Line, Area, Bar, and Pie charts
- **Accessibility**: Full ARIA support, screen reader friendly
- **Responsive**: Automatically adjusts to container size
- **Customizable**: Multiple color palettes, themes, and styling options
- **Loading & Error States**: Built-in loading and error handling
- **Interactive**: Tooltips, legends, and hover effects

## Chart Types
- **Line Chart**: Perfect for showing trends over time
- **Area Chart**: Great for showing cumulative data
- **Bar Chart**: Ideal for comparing categories
- **Pie Chart**: Best for showing proportions and percentages
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['line', 'area', 'bar', 'pie'],
      description: 'Type of chart to render',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Chart size',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'transparent'],
      description: 'Chart theme',
    },
    colorPalette: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'gradient', 'warm', 'cool'],
      description: 'Color palette to use',
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid lines',
    },
    showLegend: {
      control: 'boolean',
      description: 'Show legend',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltip on hover',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Line Chart Stories
export const LineChart: Story = {
  args: {
    type: 'line',
    data: salesData,
    xAxisKey: 'month',
    lines: [
      { dataKey: 'sales', name: 'Sales', stroke: '#3B82F6' },
      { dataKey: 'profit', name: 'Profit', stroke: '#10B981' },
    ],
    title: 'Monthly Sales Performance',
    description: 'Line chart showing sales and profit trends over 7 months',
    size: 'md',
    showGrid: true,
    showLegend: true,
    showTooltip: true,
  },
};

export const AreaChart: Story = {
  args: {
    type: 'area',
    data: appointmentData,
    xAxisKey: 'day',
    areas: [
      {
        dataKey: 'appointments',
        name: 'Appointments',
        fill: '#3B82F6',
        stroke: '#2563EB',
      },
    ],
    title: 'Weekly Appointments',
    description:
      'Area chart showing appointment volume throughout the week with beautiful gradient fill',
    size: 'md',
    showGrid: false,
    showLegend: false,
    colorPalette: 'primary',
  },
};

export const StackedAreaChart: Story = {
  args: {
    type: 'area',
    data: salesData,
    xAxisKey: 'month',
    areas: [
      { dataKey: 'profit', name: 'Profit', stackId: '1' },
      { dataKey: 'expenses', name: 'Expenses', stackId: '1' },
    ],
    title: 'Profit vs Expenses',
    description: 'Stacked area chart comparing profit and expenses over time',
    size: 'lg',
    colorPalette: 'warm',
  },
};

export const BarChart: Story = {
  args: {
    type: 'bar',
    data: trafficData,
    xAxisKey: 'source',
    bars: [
      { dataKey: 'visitors', name: 'Visitors' },
      { dataKey: 'conversions', name: 'Conversions' },
    ],
    title: 'Traffic Sources',
    description:
      'Bar chart showing visitor and conversion data by traffic source',
    size: 'md',
    colorPalette: 'cool',
  },
};

export const HorizontalBarChart: Story = {
  args: {
    type: 'bar',
    data: categoryData,
    xAxisKey: 'category',
    bars: [{ dataKey: 'value', name: 'Appointments' }],
    layout: 'horizontal',
    title: 'Service Categories',
    description:
      'Horizontal bar chart showing appointment distribution by service category',
    size: 'md',
    colorPalette: 'gradient',
  },
};

export const PieChart: Story = {
  args: {
    type: 'pie',
    data: categoryData,
    dataKey: 'value',
    nameKey: 'category',
    title: 'Service Distribution',
    description: 'Pie chart showing the distribution of services booked',
    size: 'md',
    showLabels: true,
    colorPalette: 'primary',
  },
};

export const DonutChart: Story = {
  args: {
    type: 'pie',
    data: categoryData,
    dataKey: 'revenue',
    nameKey: 'category',
    innerRadius: 60,
    outerRadius: 100,
    title: 'Revenue by Service',
    description: 'Donut chart showing revenue distribution by service type',
    size: 'lg',
    showLabels: true,
    labelPosition: 'outside',
    colorPalette: 'warm',
  },
};

// Different Sizes
export const SmallChart: Story = {
  args: {
    ...LineChart.args,
    size: 'sm',
    title: 'Small Chart Example',
  },
};

export const LargeChart: Story = {
  args: {
    ...LineChart.args,
    size: 'xl',
    title: 'Extra Large Chart Example',
  },
};

// Color Palettes
export const WarmPalette: Story = {
  args: {
    ...LineChart.args,
    colorPalette: 'warm',
    title: 'Warm Color Palette',
  },
};

export const CoolPalette: Story = {
  args: {
    ...BarChart.args,
    colorPalette: 'cool',
    title: 'Cool Color Palette',
  },
};

export const CustomColors: Story = {
  args: {
    type: 'line',
    data: salesData,
    xAxisKey: 'month',
    lines: [
      { dataKey: 'sales', name: 'Sales', stroke: '#FF6B6B' },
      { dataKey: 'profit', name: 'Profit', stroke: '#4ECDC4' },
      { dataKey: 'expenses', name: 'Expenses', stroke: '#45B7D1' },
    ],
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
    title: 'Custom Color Example',
    description: 'Chart with custom color scheme',
  },
};

// States
export const LoadingState: Story = {
  args: {
    ...LineChart.args,
    isLoading: true,
    loadingText: 'Loading chart data...',
  },
};

export const ErrorState: Story = {
  args: {
    ...LineChart.args,
    error: 'Failed to load chart data. Please try again.',
  },
};

export const EmptyState: Story = {
  args: {
    ...LineChart.args,
    data: [],
  },
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  args: {
    ...LineChart.args,
    title: 'Accessible Chart Example',
    description:
      'This chart shows monthly sales and profit data. Sales peaked in July at 3,490 units while profit was highest in March at 9,800 units. The chart includes proper ARIA labels and screen reader support.',
  },
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the accessibility features of the Chart component:

- **ARIA Labels**: Proper \`role="img"\` and \`aria-labelledby\`/\`aria-describedby\` attributes
- **Screen Reader Support**: Hidden title and description elements for screen readers
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **High Contrast**: Color palettes designed for accessibility
- **Semantic HTML**: Proper heading structure and semantic elements
- **Loading States**: Accessible loading and error announcements

The chart provides a comprehensive description for screen readers while maintaining visual appeal for sighted users.
        `,
      },
    },
  },
};

// Beautiful Gradient Area Chart (matching the image)
export const GradientAreaChart: Story = {
  args: {
    type: 'area',
    data: [
      { time: '9 AM', value: 20 },
      { time: '10 AM', value: 35 },
      { time: '11 AM', value: 25 },
      { time: '12 PM', value: 45 },
      { time: '1 PM', value: 30 },
      { time: '2 PM', value: 55 },
      { time: '3 PM', value: 40 },
      { time: '4 PM', value: 65 },
      { time: '5 PM', value: 50 },
    ],
    xAxisKey: 'time',
    areas: [
      {
        dataKey: 'value',
        name: 'Activity',
        fill: '#3B82F6',
        stroke: '#2563EB',
      },
    ],
    title: 'Beautiful Gradient Area Chart',
    description:
      'Smooth area chart with gradient fill matching the design mockup',
    size: 'md',
    showGrid: false,
    showLegend: false,
    showTooltip: true,
    theme: 'transparent',
  },
  parameters: {
    docs: {
      description: {
        story:
          'This area chart matches the beautiful gradient design shown in the image with smooth curves and gradient fill from solid blue to transparent.',
      },
    },
  },
};

export const SharpAreaChart: Story = {
  args: {
    type: 'area',
    data: [
      { time: '9 AM', value: 20 },
      { time: '10 AM', value: 35 },
      { time: '11 AM', value: 25 },
      { time: '12 PM', value: 45 },
      { time: '1 PM', value: 30 },
      { time: '2 PM', value: 55 },
      { time: '3 PM', value: 40 },
      { time: '4 PM', value: 65 },
      { time: '5 PM', value: 50 },
    ],
    xAxisKey: 'time',
    areas: [
      {
        dataKey: 'value',
        name: 'Activity',
        fill: '#3B82F6',
        stroke: '#2563EB',
      },
    ],
    title: 'Sharp-Edged Area Chart with Dashed Baseline',
    description:
      'Area chart with sharp/angular edges and dashed bottom border matching the design mockup',
    size: 'md',
    showGrid: false,
    showLegend: false,
    showTooltip: true,
    theme: 'transparent',
  },
  parameters: {
    docs: {
      description: {
        story:
          'This area chart uses linear interpolation for sharp angular edges and includes a dashed baseline border, matching the exact design from the image.',
      },
    },
  },
};

// Dashboard Example (matching the UI design)
export const DashboardExample: Story = {
  args: {
    type: 'line',
    data: [
      { time: '9 AM', appointments: 2, revenue: 490 },
      { time: '10 AM', appointments: 3, revenue: 735 },
      { time: '11 AM', appointments: 1, revenue: 245 },
      { time: '12 PM', appointments: 4, revenue: 980 },
      { time: '1 PM', appointments: 2, revenue: 490 },
      { time: '2 PM', appointments: 5, revenue: 1225 },
      { time: '3 PM', appointments: 3, revenue: 735 },
      { time: '4 PM', appointments: 4, revenue: 980 },
      { time: '5 PM', appointments: 2, revenue: 490 },
    ],
    xAxisKey: 'time',
    lines: [
      {
        dataKey: 'appointments',
        name: 'Appointments',
        stroke: '#3B82F6',
        strokeWidth: 3,
        dot: false,
        activeDot: true,
      },
    ],
    title: "Today's Appointment Activity",
    description:
      'Hourly appointment bookings for today showing peak times and activity patterns',
    size: 'md',
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    colorPalette: 'primary',
    theme: 'transparent',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Chart configuration that matches the dashboard design shown in the UI mockup.',
      },
    },
  },
};
