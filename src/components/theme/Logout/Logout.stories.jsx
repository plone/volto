import React from 'react';
import Logout from './Logout';
import Wrapper from '@plone/volto/storybook';

const StoryComponent = (args) => {
  return (
    <Wrapper>
      <Logout location={{ pathname: '' }} />
    </Wrapper>
  );
};

export const Default = StoryComponent.bind({});
Default.args = {
  logout: () => {},
  purgeMessages: () => {},
};

export default {
  title: 'Public Components/Logout',
  component: Default,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
