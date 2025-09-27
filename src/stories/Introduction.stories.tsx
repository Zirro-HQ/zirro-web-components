import type { Meta, StoryObj } from '@storybook/react';
import { ReactComponent as Logo } from './assets/logo.svg';
import { Button, Text, Card, Input, Toggle } from '@/components';

const meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Welcome to Zirro Web Components - a modern React component library.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  render: () => (
    <div className='max-w-4xl mx-auto p-8'>
      <div className='text-center mb-12'>
        <div className='mb-6 flex items-center justify-center gap-1'>
          <Logo className='w-16 h-16' /> <span className='text-1xl'>WC</span>
        </div>
      </div>

      <div className='rounded-lg p-6 mb-8'>
        <h2 className='text-2xl mb-4'>Quick Start</h2>
        <div className='bg-gray-900 text-green-400 p-4 rounded font-mono text-sm mb-4'>
          <div>npm install @zirro/web-components</div>
        </div>
        <div className='bg-gray-900 text-white p-4 rounded text-sm'>
          <pre className='text-sm text-green-400'>{`import { Button, Input, Card } from '@zirro/web-components';
import '@zirro/web-components/styles';

function App() {
  return (
    <Card variant="elevated">
      <Input label="Email" type="email" />
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}`}</pre>
        </div>
      </div>

      {/* Components Documentation */}
      <div className='space-y-8'>
        {/* Button Component */}
        <div className='overflow-hidden'>
          <div className='px-6 py-4 border-b'>
            <h3 className='text-xl font-semibold'>Button</h3>
            <p className='text-gray-600 mt-1'>
              Versatile button component with multiple variants, sizes, and
              states
            </p>
          </div>
          <div className='p-6'>
            <div className='mb-6'>
              <h4 className='font-medium mb-3'>Installation</h4>
              <div className='bg-gray-900 text-green-400 p-3 rounded font-mono text-sm'>
                npm install @zirro/web-components
              </div>
            </div>
            <div className='mb-6'>
              <h4 className='font-medium mb-3'>Usage</h4>
              <div className='bg-gray-900 text-white p-4 rounded text-sm mb-4'>
                <pre className='text-sm text-green-400'>{`import { Button } from '@zirro/web-components';

<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>`}</pre>
              </div>
            </div>
            <div>
              <h4 className='font-medium mb-3'>Examples</h4>
              <div className='flex flex-wrap gap-3'>
                <Button variant='primary'>Primary</Button>
                <Button variant='secondary'>Secondary</Button>
                <Button variant='outline'>Outline</Button>
                <Button variant='ghost'>Ghost</Button>
                <Button variant='dark'>Dark</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Component */}
        <div className='overflow-hidden'>
          <div className='px-6 py-4 border-b'>
            <h3 className='text-xl font-semibold'>Toggle</h3>
            <p className='text-gray-600 mt-1'>
              Accessible toggle component with text variants for Yes/No,
              Active/Inactive states
            </p>
          </div>
          <div className='p-6'>
            <div className='mb-6'>
              <h4 className='font-medium mb-3'>Installation</h4>
              <div className='bg-gray-900 text-green-400 p-3 rounded font-mono text-sm'>
                npm install @zirro/web-components
              </div>
            </div>
            <div className='mb-6'>
              <h4 className='font-medium mb-3'>Usage</h4>
              <div className='bg-gray-900 text-white p-4 rounded text-sm mb-4'>
                <pre className='text-sm text-green-400'>{`import { Toggle } from '@zirro/web-components';

<Toggle 
  variant="text"
  checked={isActive}
  onCheckedChange={setIsActive}
  label="Feature Status"
  uncheckedText="Inactive"
  checkedText="Active"
/>`}</pre>
              </div>
            </div>
            <div>
              <h4 className='font-medium mb-3'>Examples</h4>
              <div className='space-y-4'>
                <Toggle
                  defaultChecked={true}
                  label='Default Toggle'
                  description='Standard toggle with green/gray colors'
                />
                <Toggle
                  variant='text'
                  defaultChecked={false}
                  label='Yes/No Toggle'
                  uncheckedText='No'
                  checkedText='Yes'
                />
                <Toggle
                  variant='text'
                  defaultChecked={true}
                  label='Status Toggle'
                  uncheckedText='Inactive'
                  checkedText='Active'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Input Component */}
        <div className='overflow-hidden'>
          <div className='px-6 py-4 border-b'>
            <h3 className='text-xl font-semibold'>Input</h3>
            <p className='text-gray-600 mt-1'>
              Comprehensive input component supporting text, textarea, and file
              uploads
            </p>
          </div>
          <div className='p-6'>
            <div className='mb-6'>
              <h4 className='font-medium mb-3'>Installation</h4>
              <div className='bg-gray-900 text-green-400 p-3 rounded font-mono text-sm'>
                npm install @zirro/web-components
              </div>
            </div>
            <div className='mb-6'>
              <h4 className='font-medium mb-3'>Usage</h4>
              <div className='bg-gray-900 text-white p-4 rounded text-sm mb-4'>
                <pre className='text-sm text-green-400'>{`import { Input } from '@zirro/web-components';

<Input 
  label="Email Address"
  type="email"
  placeholder="Enter your email"
/>
<Input 
  label="Message"
  multiline
  rows={4}
/>`}</pre>
              </div>
            </div>
            <div>
              <h4 className='font-medium mb-3'>Examples</h4>
              <div className='space-y-4 max-w-md'>
                <Input
                  label='Email Address'
                  placeholder='Enter your email'
                  type='email'
                />
                <Input
                  label='Message'
                  placeholder='Your message...'
                  multiline
                  rows={3}
                />
                <Input
                  label='File Upload'
                  upload
                  uploadText='Upload file'
                  uploadSubtext='PNG, JPG up to 2MB'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card Component */}
        <div className='overflow-hidden'>
          <div className='px-6 py-4 border-b'>
            <h3 className='text-xl font-semibold'>Card</h3>
            <p className='text-gray-600 mt-1'>
              Flexible card component with multiple variants and padding options
            </p>
          </div>
          <div className='p-6'>
            <div className='mb-6'>
              <h4 className='font-medium mb-3'>Installation</h4>
              <div className='bg-gray-900 text-green-400 p-3 rounded font-mono text-sm'>
                npm install @zirro/web-components
              </div>
            </div>
            <div className='mb-6'>
              <h4 className='font-medium mb-3'>Usage</h4>
              <div className='bg-gray-900 text-white p-4 rounded text-sm mb-4'>
                <pre className='text-sm text-green-400'>{`import { Card } from '@zirro/web-components';

<Card variant="elevated" padding="md">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>`}</pre>
              </div>
            </div>
            <div>
              <h4 className='font-medium mb-3'>Examples</h4>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Card variant='elevated' padding='md'>
                  <Text size='medium' weight='heavy'>
                    Elevated Card
                  </Text>
                  <Text size='small'>With shadow and elevation</Text>
                </Card>
                <Card variant='outlined' padding='md'>
                  <Text size='medium' weight='heavy'>
                    Outlined Card
                  </Text>
                  <Text size='small'>With border styling</Text>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Text Component */}
        <div className='overflow-hidden'>
          <div className='px-6 py-4 border-b'>
            <h3 className='text-xl font-semibold'>Text</h3>
            <p className='text-gray-600 mt-1'>
              Polymorphic text component with predefined sizes and weights
            </p>
          </div>
          <div className='p-6'>
            <div className='mb-6'>
              <h4 className='font-medium mb-3'>Installation</h4>
              <div className='bg-gray-900 text-green-400 p-3 rounded font-mono text-sm'>
                npm install @zirro/web-components
              </div>
            </div>
            <div className='mb-6'>
              <h4 className='font-medium mb-3'>Usage</h4>
              <div className='bg-gray-900 text-white p-4 rounded text-sm mb-4'>
                <pre className='text-sm text-green-400'>{`import { Text } from '@zirro/web-components';

<Text size="large" weight="heavy" as="h1">
  Large Heavy Heading
</Text>
<Text size="medium" as="p">
  Medium paragraph text
</Text>`}</pre>
              </div>
            </div>
            <div>
              <h4 className='font-medium mb-3'>Examples</h4>
              <div className='space-y-2'>
                <Text size='large' weight='heavy'>
                  Large Heavy Text
                </Text>
                <Text size='medium' weight='normal'>
                  Medium Normal Text
                </Text>
                <Text size='small' weight='normal'>
                  Small Text
                </Text>
                <Text size='extrasmall' weight='normal'>
                  Extra Small Text
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Welcome to the Zirro Web Components library! This is your starting point for exploring all the available components.',
      },
    },
  },
};
