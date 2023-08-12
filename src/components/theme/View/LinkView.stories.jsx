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
        {...args}
        token="1234"
        content={{
          ...args,
        }}
      />
    </Wrapper>
  );
}

export const LinkView = StoryComponent.bind({});
LinkView.args = {
  title: 'Plone 6!',
  remoteUrl: '/news',
  description: 'Plone docs',
};
export default {
  title: 'Public components/LinkView',
  component: LinkView,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};
