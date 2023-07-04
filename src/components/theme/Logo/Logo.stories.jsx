import React from 'react';
import Logo from './Logo';
import Wrapper from '@plone/volto/storybook';

const StoryComponent = (args) => {
  return (
    <Wrapper>
      <Logo />
    </Wrapper>
  );
};

export const Default = StoryComponent.bind({});
Default.args = {};

export default {
  title: 'Public Components/Logo',
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
