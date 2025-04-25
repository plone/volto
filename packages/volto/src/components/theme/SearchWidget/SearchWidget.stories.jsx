import { injectIntl } from 'react-intl';
import React from 'react';
import SearchWidgetComponent from './SearchWidget';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlSearchWidgetComponent = injectIntl(SearchWidgetComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlSearchWidgetComponent {...args} pathname="/blog" />
    </Wrapper>
  );
}

export const SearchWidget = StoryComponent.bind({});

export default {
  title: 'Public components/SearchWidget',
  component: SearchWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};
