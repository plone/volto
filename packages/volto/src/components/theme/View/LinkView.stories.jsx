import { injectIntl } from 'react-intl';
import React from 'react';
import LinkViewComponent from './LinkView';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlLinkViewComponent = injectIntl(LinkViewComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        userSession: {
          token: null,
        },
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlLinkViewComponent
        token="1234"
        content={{
          ...args,
        }}
      />
    </Wrapper>
  );
}

export const Default = StoryComponent.bind({});
Default.args = {
  title: 'Hello World!',
  description: 'Hi',
  remoteUrl: '/news',
};

export default {
  title: 'Public components/View/LinkView',
  component: LinkViewComponent,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '900px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      description: 'Title of the component',
    },
    remoteUrl: {
      description: 'remoteUrl mentioned in the page',
    },
  },
};
