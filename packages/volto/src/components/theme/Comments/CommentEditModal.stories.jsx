import { injectIntl } from 'react-intl';
import React from 'react';
import CommentEditModalComponent from './CommentEditModal';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlCommentEditModalComponent = injectIntl(CommentEditModalComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        comments: {
          update: {
            loading: false,
            loaded: true,
          },
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlCommentEditModalComponent
        {...args}
        onOk={() => {}}
        onCancel={() => {}}
      />
    </Wrapper>
  );
}

export const CommentEditModal = StoryComponent.bind({});

CommentEditModal.args = {
  open: true,
  text: 'Comment Body',
};

export default {
  title: 'Public components/Comments/CommentEdit Modal',
  component: CommentEditModalComponent,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    open: {
      description: 'open/close modal',
    },
    id: {
      description: 'id of the comment',
    },
    text: {
      description: 'body of comment',
    },
    onCancel: {
      description: 'cancel changing the comment',
    },
    onOk: {
      description: 'save the change in the comment',
    },
  },
};
