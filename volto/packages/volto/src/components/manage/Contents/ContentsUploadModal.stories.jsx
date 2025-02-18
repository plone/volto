import { injectIntl } from 'react-intl';
import React from 'react';
import ContentsUploadModalComponent from './ContentsUploadModal';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlContentUploadModalComponent = injectIntl(
  ContentsUploadModalComponent,
);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        content: {
          create: {
            loading: false,
            loaded: true,
          },
        },
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlContentUploadModalComponent
        {...args}
        pathname="/blog"
        loading={false}
        loaded={true}
        onOk={() => {}}
        onCancel={() => {}}
      />
    </Wrapper>
  );
}

export const ContentUploadModal = StoryComponent.bind({});

ContentUploadModal.args = {
  open: false,
};

export default {
  title: 'Public components/Contents/Content Upload Modal',
  component: ContentUploadModal,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
