import type { Meta, StoryObj } from '@storybook/react';

const ColorPalette: React.FC = () => {
  const colors = [
    '--air',
    '--space',
    '--denim',

    '--snow',
    '--smoke',
    '--silver',
    '--dolphin',
    '--pigeon',
    '--iron',

    '--arctic',
    '--sky',
    '--azure',
    '--cobalt',
    '--sapphire',
    '--royal',

    '--ballet',
    '--flamingo',
    '--poppy',
    '--rose',
    '--candy',
    '--wine',

    '--banana',
    '--lemmon',
    '--gold',
    '--mint',
    '--neon',
    '--turtle',
    '--spa',
    '--tiffany',
    '--turquoise',
    '--puya',
  ];
  return (
    <div>
      {colors.map((color) => (
        <div
          key={color}
          style={{
            backgroundColor: `var(${color})`,
            height: '100px',
            width: '100px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '10px',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              backgroundColor: 'white',
              padding: '3px',
            }}
          >
            {color}
          </span>
        </div>
      ))}
    </div>
  );
};

const meta = {
  title: 'StyleGuide/Color Palette',
  component: ColorPalette,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
