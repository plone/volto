import { injectIntl } from 'react-intl';
import React from 'react';
import SidebarComponent from './Sidebar';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlSidebarComponent = injectIntl(SidebarComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        intl: {
          locale: 'en',
          messages: {},
        },
        sidebar: {
          tab: 0,
        },
        toolbar: {
          expanded: false,
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlSidebarComponent {...args} />
    </Wrapper>
  );
}

export const Sidebar = StoryComponent.bind({});

export default {
  title: 'Internal Components/Sidebar/Sidebar',
  component: Sidebar,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
