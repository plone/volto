import React from 'react';
import Logo from './Logo';
import Wrapper from '@plone/volto/storybook';

const StoryComponent = (args) => {
  return (
    <Wrapper
      customStore={{
        intl: {
          locale: 'en',
          messages: {},
        },
        navroot: {
          data: {
            id: 'http://localhost:3000/@navroot',
            navroot: {
              '@id': 'http://localhost:3000',
              title: 'Plone Site',
            },
          },
        },
        router: {
          location: {
            pathname: '/',
          },
        },
        site: {
          data: {},
        },
      }}
    >
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
