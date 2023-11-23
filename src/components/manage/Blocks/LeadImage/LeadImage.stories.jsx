import { injectIntl } from 'react-intl';
import React from 'react';
import LeadImageSidebarComponent from './LeadImageSidebar';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';
import { action } from '@storybook/addon-actions';

const IntlLeadImageSidebarComponent = injectIntl(LeadImageSidebarComponent);

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
      <IntlLeadImageSidebarComponent
        data={{ ...args }}
        properties={{
          image: {
            download: 'https://6.docs.plone.org/_static/logo.svg',
            width: 400,
            height: 400,
            scales: {
              preview: {
                download: 'https://6.docs.plone.org/_static/logo.svg',
                width: 400,
                height: 400,
              },
            },
            ...args,
          },
          image_caption: 'Plone 6',
          ...args,
        }}
        block="1234"
        pathname="/news"
        onChangeBlock={action('Click Handler')}
        openObjectBrowser={() => {}}
        onChangeField={() => {}}
      />
    </Wrapper>
  );
}

export const LeadImageSidebar = StoryComponent.bind({});

LeadImageSidebar.args = {
  image_caption: 'Plone 6',
  image: {
    download:
      'https://plone.org/news-and-events/news/2023/plone-6-0-1-released/@@images/image/preview',
  },
};

export default {
  title: 'Public components/LeadImage/LeadImageSidebar',
  component: LeadImageSidebar,

  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],

  argTypes: {},
};
