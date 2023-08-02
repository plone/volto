import { injectIntl } from 'react-intl';
import React from 'react';
import VideoSidebarComponent from './VideoSidebar';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlVideoSidebarComponent = injectIntl(VideoSidebarComponent);

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
      <IntlVideoSidebarComponent
        {...args}
        data={{}}
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

export const VideoImageSidebar = StoryComponent.bind({});

export default {
  title: 'Public components/VideoImage/VideoImageSidebar',
  component: VideoImageSidebar,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
