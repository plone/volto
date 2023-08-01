import { injectIntl } from 'react-intl';
import React from 'react';
import ContentsTagsModalComponent from './ContentsTagsModal';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlContentTagsModalComponent = injectIntl(ContentsTagsModalComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        content: {
          update: {
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
      <IntlContentTagsModalComponent
        {...args}
        open
        onOk={() => {}}
        onCancel={() => {}}
        items={[
          {
            subjects: [],
            url: '/blog',
          },
        ]}
      />
    </Wrapper>
  );
}

export const ContentTagsModal = StoryComponent.bind({});

ContentTagsModal.args = {
  loading: false,
  loaded: true,
};

export default {
  title: 'Public components/Contents/Content Tags Modal',
  component: ContentTagsModal,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
