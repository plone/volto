import { injectIntl } from 'react-intl';
import React from 'react';
import ImageSidebarComponent from './ImageSidebar';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

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
        {...args}
        data={{
          url: 'https://6.docs.plone.org/_static/logo.svg',
          alt: 'Plone Logo',
        }}
        block="1234"
        pathname="/news"
        onChangeBlock={() => {}}
        openObjectBrowser={() => {}}
        resetSubmitUrl={() => {}}
      />
    </Wrapper>
  );
}

export const ImageSidebar = StoryComponent.bind({});

export default {
  title: 'Public components/Image/ImageSidebar',
  component: ImageSidebar,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
