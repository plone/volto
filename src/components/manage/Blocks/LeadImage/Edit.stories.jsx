import { injectIntl } from 'react-intl';
import React from 'react';
import LeadImageComponent from './Edit';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlLeadImageComponent = injectIntl(LeadImageComponent);

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
      <IntlLeadImageComponent
        {...args}
        data={{}}
        properties={{
          image: {
            download:
              'https://plone.org/news-and-events/news/2023/plone-6-0-1-released/@@images/image/preview',
            width: 400,
            height: 400,
            scales: {
              preview: {
                download:
                  'https://plone.org/news-and-events/news/2023/plone-6-0-1-released/@@images/image/preview',
                width: 400,
                height: 400,
              },
            },
          },
        }}
        selected={false}
        block="1234"
        content={{}}
        request={{
          loading: false,
          loaded: true,
        }}
        pathname="/news"
        onChangeBlock={() => {}}
        onChangeField={() => {}}
        index={1}
        openObjectBrowser={() => {}}
      />
    </Wrapper>
  );
}

export const LeadImage = StoryComponent.bind({});
LeadImage.args = {
  image: {
    download:
      'https://plone.org/news-and-events/news/2023/plone-6-0-1-released/@@images/image/preview',
  },
};
export default {
  title: 'Public components/LeadImage/LeadImage',
  component: LeadImage,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
