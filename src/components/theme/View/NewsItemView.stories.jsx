import { injectIntl } from 'react-intl';
import React from 'react';
import NewsItemViewComponent from './NewsItemView';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlNewsItemViewComponent = injectIntl(NewsItemViewComponent);

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
      <IntlNewsItemViewComponent
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
  text: {
    data: '<p>Hello World!',
  },
};

export default {
  title: 'Public components/View/NewsItemView',
  component: NewsItemViewComponent,
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
    text: {
      description: 'Content',
    },
  },
};
