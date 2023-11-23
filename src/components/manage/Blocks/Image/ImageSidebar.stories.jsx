import { injectIntl } from 'react-intl';
import React from 'react';
import ImageSidebarComponent from './ImageSidebar';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';
import { action } from '@storybook/addon-actions';

const IntlImageSidebarComponent = injectIntl(ImageSidebarComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        content: {
          create: {},
          data: {},
        },
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlImageSidebarComponent
        data={{ ...args }}
        block="1234"
        pathname="/news"
        onChangeBlock={action('Click Handler')}
        openObjectBrowser={() => {}}
        resetSubmitUrl={() => {}}
      />
    </Wrapper>
  );
}

export const ImageSidebar = StoryComponent.bind({});

ImageSidebar.args = {
  url:
    'https://plone.org/news-and-events/news/2023/plone-6-0-1-released/@@images/image/preview',
  alt: 'Plone 6',
};

export default {
  title: 'Public components/Image/ImageSidebar',
  component: ImageSidebar,

  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],

  argTypes: {},
};
