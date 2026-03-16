import { PlateEditor } from '../components/editor';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import plateBlockConfig from '../config/presets/block';

const meta = {
  title: 'Multi Plate Editor',
  component: PlateEditor,
  parameters: {
    layout: 'centered',
  },
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
} satisfies Meta<typeof PlateEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const MultiPlateEditorStory = (
  props: React.ComponentProps<typeof PlateEditor>,
) => {
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

export const MultiEditorPlate: Story = {
  render: (args: any) => <MultiPlateEditorStory {...args} />,
  args: {
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
