import { injectIntl } from 'react-intl';
import React from 'react';
import HeaderComponent from './Header';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlHeaderComponent = injectIntl(HeaderComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        userSession: { ...args },
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlHeaderComponent pathname="/blog" />
    </Wrapper>
  );
}

export const Default = StoryComponent.bind({});
Default.args = {
  token: '',
};
export const Auth = StoryComponent.bind({});
Auth.args = {
  token: '1234567890',
};

export default {
  title: 'Public components/Header',
  component: HeaderComponent,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '900px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    token: 'Token for userSession',
  },
};
