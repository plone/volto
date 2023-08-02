import { injectIntl } from 'react-intl';
import React from 'react';
import LeadImageSidebarComponent from './LeadImageSidebar';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

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
        {...args}
        data={{}}
        properties={{
          image: {
            download: 'https://6.docs.plone.org/_static/logo.svg',
            width: 400,
            height: 400,
            scales: {
              preview: {
                download:
                  'https://6.docs.plone.org/_static/logo.svg',
                width: 400,
                height: 400,
              },
            },
          },
          image_caption: 'alternate text',
        }}
        block="1234"
        pathname="/news"
        onChangeBlock={() => {}}
        openObjectBrowser={() => {}}
        onChangeField={() => {}}
      />
    </Wrapper>
  );
}

export const LeadImageSidebar = StoryComponent.bind({});

export default {
  title: 'Public components/LeadImage/LeadImageSidebar',
  component: LeadImageSidebar,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};