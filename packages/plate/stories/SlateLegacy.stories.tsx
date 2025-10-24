import { PlateEditor, PlateRenderer, type Value } from '../components/editor';

import type { Meta, StoryObj } from '@storybook/react-vite';
import config from '@plone/registry';
import { useState } from 'react';

const meta = {
  title: 'Navigation',
  component: PlateEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlateEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const PlateStory = (props: React.ComponentProps<typeof PlateEditor>) => {
  const [value, setValue] = useState(props.value);
  // console.log(value);
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="w-[600px] rounded-2xl border border-quanta-azure p-4">
        <PlateEditor
          {...props}
          value={value}
          onChange={(options) => setValue(options.value)}
        />
      </div>
      <div className="w-[600px] rounded-2xl border border-quanta-azure p-4">
        <PlateRenderer
          value={(value as Value) || (props.value as Value)}
          editorConfig={config.settings.plate.presets.block.rendererConfig}
          variant="none"
        />
      </div>
    </div>
  );
};

const MultiPlateStory = (props: React.ComponentProps<typeof PlateEditor>) => {
  const [value, setValue] = useState(props.value);
  // console.log(value);
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="w-[600px] rounded-2xl border border-quanta-azure p-4">
        <PlateEditor
          {...props}
          value={value}
          onChange={(options) => setValue(options.value)}
        />
      </div>
      <div className="w-[600px] rounded-2xl border border-quanta-azure p-4">
        <PlateEditor
          {...props}
          value={value}
          onChange={(options) => setValue(options.value)}
        />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args: any) => <PlateStory {...args} />,
  args: {
    editorConfig: config.settings.plate.presets.block.editorConfig,
    onChange: () => {},
    value: [
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ],
  },
};

export const Link: Story = {
  ...Default,
  args: {
    ...Default.args,
    value: [
      {
        children: [
          {
            text: '',
          },
          {
            children: [
              {
                text: 'Plone community website',
              },
            ],
            type: 'a',
            url: 'https://plone.org',
          },
          {
            text: ' ',
          },
        ],
        type: 'p',
      },
    ],
  },
};

export const LegacyLink: Story = {
  ...Default,
  args: {
    ...Default.args,
    value: [
      {
        children: [
          {
            text: '',
          },
          {
            children: [
              {
                text: 'Plone community website',
              },
            ],
            type: 'link',
            data: { url: 'https://plone.org' },
          },
          {
            text: ' ',
          },
        ],
        type: 'p',
      },
    ],
  },
};

export const MultiPlate: Story = {
  render: (args: any) => <MultiPlateStory {...args} />,
  args: {
    ...Default.args,
    value: [
      {
        children: [
          {
            text: '',
          },
          {
            children: [
              {
                text: 'Plone community website',
              },
            ],
            type: 'link',
            data: { url: 'https://plone.org' },
          },
          {
            text: ' ',
          },
        ],
        type: 'p',
      },
    ],
  },
};
