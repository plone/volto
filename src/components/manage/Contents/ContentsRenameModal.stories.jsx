import { injectIntl } from 'react-intl';
import React from 'react';
import ContentsRenameModalComponent from './ContentsRenameModal';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlContentRenameModalComponent = injectIntl(
  ContentsRenameModalComponent,
);

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
      <IntlContentRenameModalComponent
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

export const ContentRenameModal = StoryComponent.bind({});

ContentRenameModal.args = {
  open: true,
  id: 'blogs',
  title: 'Plone Blog',
};

export default {
  title: 'Public components/Contents/Content Rename Modal',
  component: ContentRenameModal,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
