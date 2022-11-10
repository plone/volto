import React from 'react';
import ColorPickerWidget from './ColorPickerWidget';
//import Wrapper from '@plone/volto/storybook';
//import testImage from '../../../static/testImage.png';
import WidgetStory from './story';

// export const ColorPicker = WidgetStory.bind({
//   props: {
//     id: 'localhost:3000/something',
//     title: 'Item title',
//     colors: [
//       { name: 'red', label: 'red' },
//       { name: 'blue', label: 'blue' },
//       { name: 'green', label: 'green' },
//     ],
//   },
//   widget: ColorPickerWidget,
// });

// export default {
//   title: 'Edit Widgets/ColorPicker',
//   component: ColorPickerWidget,
//   decorators: [
//     (Story) => (
//       <div className="ui segment form attached" style={{ width: '400px' }}>
//         <Story />
//       </div>
//     ),
//   ],
//   argTypes: {},
// };

// TODO: uncomment to change mode
// const StoryComponent = (props) => {
//   const { id, title, colors } = props;

//   return (
//     <Wrapper>
//       <ColorPickerWidget id={id} title={title} color={colors} />
//     </Wrapper>
//   );
// };

// Canvas no controls
export const ColorPicker = WidgetStory.bind({
  props: {
    id: 'localhost:3000/something',
    title: 'Item title',
    colors: [
      { name: 'red', label: 'red' },
      { name: 'blue', label: 'blue' },
      { name: 'green', label: 'green' },
    ],
  },
  widget: ColorPickerWidget,
});

//Controls no canvas
// export const ColorPicker = StoryComponent.bind({});
// ColorPicker.args = {
//   id: 'localhost:3000/something',
//   title: 'Item title',
//   colors: [
//     { name: 'red', label: 'red' },
//     { name: 'blue', label: 'blue' },
//     { name: 'green', label: 'green' },
//   ],
// };

export default {
  title: 'Edit Widgets/ColorPicker',
  component: ColorPickerWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
