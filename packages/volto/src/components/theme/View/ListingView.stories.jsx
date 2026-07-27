import { injectIntl } from 'react-intl';
import React from 'react';
import ListingViewComponent from './ListingView';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlListingViewComponent = injectIntl(ListingViewComponent);

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
      <IntlListingViewComponent
        content={{
          title: 'Hello World!',
          description: 'Hi',
          ...args,
        }}
      />
    </Wrapper>
  );
}

export const Default = StoryComponent.bind({});
Default.args = {
  items: [
    {
      title: 'My item',
      description: 'My item description',
      url: '/item',
      '@type': 'Document',
    },
    {
      title: 'Second item',
      description: 'My second item description',
      url: '/item2',
      '@type': 'Document',
    },
  ],
};

export default {
  title: 'Public components/View/ListingView',
  component: ListingViewComponent,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '900px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    items: {
      control: 'object',
      description: 'Listed pages',
    },
    title: {
      description: 'Title of the page listed',
    },
    description: {
      description: 'Description of the page',
    },
  },
};
