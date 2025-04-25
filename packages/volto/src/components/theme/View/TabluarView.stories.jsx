import { injectIntl } from 'react-intl';
import React from 'react';
import TabularViewComponent from './TabularView';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlTabularViewComponent = injectIntl(TabularViewComponent);

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
      <IntlTabularViewComponent
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
  items: [
    {
      title: 'My item 1',
      description: 'My item description 1',
      url: '/item1',
    },
    {
      title: 'My item 2',
      description: 'My item description 2',
      url: '/item2',
    },
  ],
};
export default {
  title: 'Public components/View/TabularView',
  component: TabularViewComponent,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '900px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      description: 'Title of the page listed',
    },
    description: {
      description: 'Description of the page',
    },
    items: {
      description: 'Row items of the page',
    },
  },
};
