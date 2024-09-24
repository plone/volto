import { injectIntl } from 'react-intl';
import React from 'react';
import ContentsTagsModalComponent from './ContentsTagsModal';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';
import { bool } from 'prop-types';

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
        onOk={() => {}}
        onCancel={() => {}}
        items={[
          {
            ...args,
            url: '/blog',
          },
        ]}
      />
    </Wrapper>
  );
}

export const ContentTagsModal = StoryComponent.bind({});

ContentTagsModal.args = {
  subjects: ['plone 6 ', 'plone 5', 'plone'],
  open: true,
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
  argTypes: {
    subjects: {
      context: 'json',
      description: 'Added tags',
    },
    open: {
      context: bool,
      description: 'open/close modal',
    },
  },
};
