import { PlateEditor, PlateRenderer, type Value } from '../components/editor';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import plateBlockConfig from '../config/presets/block';

const meta = {
  title: 'Basic Rendering',
  component: PlateEditor,
  parameters: {
    layout: 'centered',
  },
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
          editorConfig={plateBlockConfig.rendererConfig}
          variant="none"
        />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args: any) => <PlateStory {...args} />,
  args: {
    editorConfig: plateBlockConfig.editorConfig,
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
