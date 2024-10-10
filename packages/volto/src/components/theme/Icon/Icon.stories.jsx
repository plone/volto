import React from 'react';
import IconComponent from './Icon';
import addIcon from '../../../icons/add.svg';

import icons from '../../../icons/load-icons';

export const Default = IconComponent.bind({});
Default.args = {
  name: addIcon,
  color: 'black',
  size: '32px',
};

export default {
  title: 'Icons',
  component: IconComponent,
  // decorators: [
  //   (Story) => (
  //     <div style={{ width: '400px' }}>
  //       <Story />
  //     </div>
  //   ),
  // ],
  argTypes: {
    color: { control: 'color' },
  },
  // excludeStories: ['searchResults'],
  // subcomponents: { ArgsTable },
};

// ## Icon component

// You can load icons from Volto using the `Icon` component:

// ```jsx static
// import { Icon } from '@plone/volto/components';
// import addIcon from '@plone/volto/icons/add.svg';

// const IconTest = () => <Icon name={addIcon} size="18px" />;
// ```

const iconElements = Object.keys(icons).map((iconName) => {
  const icon = icons[iconName];
  return (
    <center
      key={icons[iconName]}
      style={{
        float: 'left',
        width: '150px',
        display: 'inline-block',
        height: '100px',
      }}
    >
      <IconComponent key={iconName} name={icon} /> <br />
      {`${iconName}.svg`}
    </center>
  );
});

const PastanagaIconsComponent = (args) => (
  <div style={{ overflow: 'hidden' }}>{iconElements}</div>
);

export const PastanagaIcons = PastanagaIconsComponent.bind({});
