import { useState } from 'react';
import { PlateEditor } from '../components/editor';

import type { Meta, StoryObj } from '@storybook/react-vite';
import plateBlockConfig from '../config/presets/block';
import { DetachedTextBlockEditor } from '@plone/volto-slate/blocks/Text/DetachedTextBlockEditor';
import Wrapper from '@plone/volto/storybook';
import config from '@plone/volto/registry';
// import installVoltoSlate from '@plone/volto-slate/editor';
// import installVoltoSlateConfigLite from '@plone/volto-slate/editor';

// installVoltoSlateConfigLite(installVoltoSlate(config));

const meta = {
  title: 'Slate & Plate',
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

const SlateAndPlateStory = (
  props: React.ComponentProps<typeof PlateEditor>,
) => {
  const [value, setValue] = useState(props.value);
  const [slateValue, setSlateValue] = useState();

  return (
    <Wrapper
      customStore={{
        slate_plugins: {
          'slate-detached-text-block': {
            show_sidebar_editor: true,
          },
        },
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="w-[600px] rounded-2xl border border-quanta-azure p-4">
          <PlateEditor
            {...props}
            value={value}
            onChange={(options) => setValue(options.value)}
          />
        </div>
        <div className="w-[600px] rounded-2xl border border-quanta-azure p-4">
          <DetachedTextBlockEditor
            {...props}
            block="slate-detached-text-block"
            value={slateValue}
            data={{}}
            onChangeBlock={(id, data) => setSlateValue(data)}
            slateSettings={config.settings.slate}
            selected={true}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export const MultiEditorPlate: Story = {
  render: (args: any) => <SlateAndPlateStory {...args} />,
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
