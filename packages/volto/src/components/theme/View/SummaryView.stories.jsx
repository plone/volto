import { injectIntl } from 'react-intl';
import React from 'react';
import SummaryViewComponent from './SummaryView';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlSummaryViewComponent = injectIntl(SummaryViewComponent);

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
      <IntlSummaryViewComponent
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
      title: 'My item',
      description: 'My item description',
      url: '/item',
      image: {
        scales: {
          thumb: {
            download: 'file:///preview.jpg',
          },
        },
      },
      image_caption: 'My image caption',
      '@type': 'News Item',
    },
  ],
};
export default {
  title: 'Public components/View/SummaryView',
  component: SummaryViewComponent,
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
      description: 'Content in the page ',
    },
  },
};
