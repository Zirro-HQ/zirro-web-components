import React, { forwardRef, useId } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { BaseProps } from '@/types';

const chartVariants = cva('w-full', {
  variants: {
    size: {
      sm: 'h-48',
      md: 'h-64',
      lg: 'h-80',
      xl: 'h-96',
    },
    theme: {
      light: 'bg-white',
      dark: 'bg-gray-900',
      transparent: 'bg-transparent',
    },
  },
  defaultVariants: {
    size: 'md',
    theme: 'transparent',
  },
});

// Chart data point interface
export interface ChartDataPoint {
  [key: string]: string | number;
}

// Color palettes for different themes
const colorPalettes = {
  primary: ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'],
  secondary: ['#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB', '#F3F4F6', '#F9FAFB'],
  gradient: ['#3B82F6', '#1D4ED8', '#1E40AF', '#1E3A8A', '#312E81', '#3730A3'],
  warm: ['#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#6366F1', '#3B82F6'],
  cool: ['#06B6D4', '#0891B2', '#0E7490', '#155E75', '#164E63', '#1E3A8A'],
};

export interface BaseChartProps
  extends BaseProps,
    VariantProps<typeof chartVariants> {
  /** Chart data array */
  data: ChartDataPoint[];
  /** Chart title for accessibility */
  title?: string;
  /** Chart description for screen readers */
  description?: string;
  /** Color palette to use */
  colorPalette?: keyof typeof colorPalettes;
  /** Custom colors array */
  colors?: string[];
  /** Whether to show grid lines */
  showGrid?: boolean;
  /** Whether to show legend */
  showLegend?: boolean;
  /** Whether to show tooltip */
  showTooltip?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Whether chart is loading */
  isLoading?: boolean;
  /** Loading text */
  loadingText?: string;
  /** Error state */
  error?: string;
  /** Custom tooltip formatter */
  tooltipFormatter?: (
    value: any,
    name: string,
    props: any
  ) => [React.ReactNode, string];
  /** Custom label formatter */
  labelFormatter?: (label: string) => React.ReactNode;
}

export interface LineChartProps extends BaseChartProps {
  type: 'line';
  /** X-axis data key */
  xAxisKey: string;
  /** Y-axis data keys */
  lines: Array<{
    dataKey: string;
    name?: string;
    stroke?: string;
    strokeWidth?: number;
    dot?: boolean;
    activeDot?: boolean;
  }>;
  /** Whether to show area under line */
  showArea?: boolean;
}

export interface AreaChartProps extends BaseChartProps {
  type: 'area';
  /** X-axis data key */
  xAxisKey: string;
  /** Area configurations */
  areas: Array<{
    dataKey: string;
    name?: string;
    fill?: string;
    stroke?: string;
    stackId?: string;
  }>;
}

export interface BarChartProps extends BaseChartProps {
  type: 'bar';
  /** X-axis data key */
  xAxisKey: string;
  /** Bar configurations */
  bars: Array<{
    dataKey: string;
    name?: string;
    fill?: string;
    stackId?: string;
  }>;
  /** Bar layout direction */
  layout?: 'horizontal' | 'vertical';
}

export interface PieChartProps extends BaseChartProps {
  type: 'pie';
  /** Data key for pie values */
  dataKey: string;
  /** Name key for pie labels */
  nameKey: string;
  /** Inner radius (for donut chart) */
  innerRadius?: number;
  /** Outer radius */
  outerRadius?: number;
  /** Whether to show labels */
  showLabels?: boolean;
  /** Label position */
  labelPosition?: 'inside' | 'outside';
}

export type ChartProps =
  | LineChartProps
  | AreaChartProps
  | BarChartProps
  | PieChartProps;

/**
 * Versatile chart component supporting line, area, bar, and pie charts
 *
 * Built with Recharts for accessibility and performance.
 * Supports multiple data series, custom styling, and responsive design.
 *
 * @example
 * ```tsx
 * // Line chart
 * <Chart
 *   type="line"
 *   data={salesData}
 *   xAxisKey="month"
 *   lines={[
 *     { dataKey: 'sales', name: 'Sales', stroke: '#3B82F6' },
 *     { dataKey: 'profit', name: 'Profit', stroke: '#10B981' }
 *   ]}
 *   title="Sales Performance"
 *   description="Monthly sales and profit data for the current year"
 * />
 *
 * // Pie chart
 * <Chart
 *   type="pie"
 *   data={categoryData}
 *   dataKey="value"
 *   nameKey="category"
 *   title="Revenue by Category"
 *   showLabels
 * />
 * ```
 */
export const Chart = forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      className,
      size,
      theme,
      data,
      title,
      description,
      colorPalette = 'primary',
      colors,
      showGrid = true,
      showLegend = true,
      showTooltip = true,
      animationDuration = 750,
      isLoading = false,
      loadingText = 'Loading chart...',
      error,
      tooltipFormatter,
      labelFormatter,
      ...props
    },
    ref
  ) => {
    const chartId = useId();
    const titleId = `${chartId}-title`;
    const descId = `${chartId}-desc`;

    // Get colors from palette or use custom colors
    const chartColors = colors || colorPalettes[colorPalette];

    // Loading state
    if (isLoading) {
      return (
        <div
          ref={ref}
          className={cn(
            chartVariants({ size, theme }),
            'flex items-center justify-center',
            className
          )}
          role='img'
          aria-label={loadingText}
        >
          <div className='flex flex-col items-center space-y-2'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
            <span className='text-sm text-gray-600'>{loadingText}</span>
          </div>
        </div>
      );
    }

    // Error state
    if (error) {
      return (
        <div
          ref={ref}
          className={cn(
            chartVariants({ size, theme }),
            'flex items-center justify-center',
            className
          )}
          role='alert'
          aria-live='polite'
        >
          <div className='text-center'>
            <div className='text-red-500 mb-2'>
              <svg
                className='w-12 h-12 mx-auto'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z'
                />
              </svg>
            </div>
            <p className='text-sm text-gray-600'>{error}</p>
          </div>
        </div>
      );
    }

    // Empty data state
    if (!data || data.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            chartVariants({ size, theme }),
            'flex items-center justify-center',
            className
          )}
          role='img'
          aria-label='No data available'
        >
          <div className='text-center'>
            <div className='text-gray-400 mb-2'>
              <svg
                className='w-12 h-12 mx-auto'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
            </div>
            <p className='text-sm text-gray-600'>No data to display</p>
          </div>
        </div>
      );
    }

    const renderChart = () => {
      switch (props.type) {
        case 'line': {
          const { xAxisKey, lines, showArea } = props;
          const ChartComponent = showArea ? AreaChart : LineChart;

          return (
            <ChartComponent
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              {showGrid && (
                <CartesianGrid strokeDasharray='3 3' opacity={0.3} />
              )}
              <XAxis
                dataKey={xAxisKey}
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: '#6B7280' }}
                axisLine={{ stroke: '#6B7280' }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: '#6B7280' }}
                axisLine={{ stroke: '#6B7280' }}
              />
              {showTooltip && (
                <Tooltip
                  {...(tooltipFormatter && { formatter: tooltipFormatter })}
                  {...(labelFormatter && { labelFormatter: labelFormatter })}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
              )}
              {showLegend && <Legend />}
              {lines.map((line, index) => {
                const color =
                  line.stroke || chartColors[index % chartColors.length];

                if (showArea) {
                  return (
                    <Area
                      key={line.dataKey}
                      type='monotone'
                      dataKey={line.dataKey}
                      {...(line.name && { name: line.name })}
                      stroke={color}
                      fill={color}
                      fillOpacity={0.3}
                      animationDuration={animationDuration}
                    />
                  );
                }

                return (
                  <Line
                    key={line.dataKey}
                    type='monotone'
                    dataKey={line.dataKey}
                    {...(line.name && { name: line.name })}
                    stroke={color}
                    strokeWidth={line.strokeWidth || 2}
                    dot={line.dot !== false}
                    activeDot={line.activeDot !== false ? { r: 6 } : false}
                    animationDuration={animationDuration}
                  />
                );
              })}
            </ChartComponent>
          );
        }

        case 'area': {
          const { xAxisKey, areas } = props;

          return (
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              {showGrid && (
                <CartesianGrid strokeDasharray='3 3' opacity={0.1} />
              )}
              {/* Dashed bottom baseline */}
              <ReferenceLine
                y={0}
                stroke='#6B7280'
                strokeDasharray='5 5'
                strokeWidth={1}
                opacity={0.6}
              />
              <XAxis
                dataKey={xAxisKey}
                tick={false}
                tickLine={false}
                axisLine={false}
                hide={true}
              />
              <YAxis
                tick={false}
                tickLine={false}
                axisLine={false}
                hide={true}
              />
              {showTooltip && (
                <Tooltip
                  {...(tooltipFormatter && { formatter: tooltipFormatter })}
                  {...(labelFormatter && { labelFormatter: labelFormatter })}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
              )}
              {showLegend && <Legend />}
              {areas.map((area, index) => {
                const baseColor =
                  area.fill || chartColors[index % chartColors.length];
                const strokeColor = area.stroke || baseColor;

                return (
                  <Area
                    key={area.dataKey}
                    type='linear'
                    dataKey={area.dataKey}
                    {...(area.name && { name: area.name })}
                    {...(area.stackId && { stackId: area.stackId })}
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill={`url(#gradient-${index})`}
                    animationDuration={animationDuration}
                  />
                );
              })}
              {/* Define gradients for each area */}
              <defs>
                {areas.map((area, index) => {
                  const baseColor =
                    area.fill || chartColors[index % chartColors.length];
                  return (
                    <linearGradient
                      key={`gradient-${index}`}
                      id={`gradient-${index}`}
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop
                        offset='0%'
                        stopColor={baseColor}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset='100%'
                        stopColor={baseColor}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  );
                })}
              </defs>
            </AreaChart>
          );
        }

        case 'bar': {
          const { xAxisKey, bars, layout = 'vertical' } = props;

          return (
            <BarChart
              data={data}
              layout={layout}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              {showGrid && (
                <CartesianGrid strokeDasharray='3 3' opacity={0.3} />
              )}
              <XAxis
                type={layout === 'vertical' ? 'category' : 'number'}
                {...(layout === 'vertical' && { dataKey: xAxisKey })}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                type={layout === 'vertical' ? 'number' : 'category'}
                {...(layout === 'horizontal' && { dataKey: xAxisKey })}
                tick={{ fontSize: 12 }}
              />
              {showTooltip && (
                <Tooltip
                  {...(tooltipFormatter && { formatter: tooltipFormatter })}
                  {...(labelFormatter && { labelFormatter: labelFormatter })}
                />
              )}
              {showLegend && <Legend />}
              {bars.map((bar, index) => (
                <Bar
                  key={bar.dataKey}
                  dataKey={bar.dataKey}
                  {...(bar.name && { name: bar.name })}
                  {...(bar.stackId && { stackId: bar.stackId })}
                  fill={bar.fill || chartColors[index % chartColors.length]}
                  animationDuration={animationDuration}
                />
              ))}
            </BarChart>
          );
        }

        case 'pie': {
          const {
            dataKey,
            nameKey,
            innerRadius = 0,
            outerRadius = 80,
            showLabels,
            labelPosition = 'outside',
          } = props;

          return (
            <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                labelLine={false}
                {...(showLabels &&
                  labelPosition !== 'outside' && {
                    label: (props: any) =>
                      `${props.name} ${(props.percent * 100).toFixed(0)}%`,
                  })}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                fill='#8884d8'
                dataKey={dataKey}
                nameKey={nameKey}
                animationDuration={animationDuration}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
              {showTooltip && (
                <Tooltip
                  {...(tooltipFormatter && { formatter: tooltipFormatter })}
                />
              )}
              {showLegend && <Legend />}
            </PieChart>
          );
        }

        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(chartVariants({ size, theme }), className)}
        role='img'
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
      >
        {/* Accessible title and description */}
        {title && (
          <h3 id={titleId} className='sr-only'>
            {title}
          </h3>
        )}
        {description && (
          <p id={descId} className='sr-only'>
            {description}
          </p>
        )}

        {/* Chart container */}
        <ResponsiveContainer width='100%' height='100%'>
          {renderChart() || <div />}
        </ResponsiveContainer>
      </div>
    );
  }
);

Chart.displayName = 'Chart';
