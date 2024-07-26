import { injectIntl } from 'react-intl';
import React from 'react';
import CommentsComponent from './Comments';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlCommentsComponent = injectIntl(CommentsComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        comments: {
          items: [
            {
              '@id': 'someurl',
              comment_id: '1614094601171408',
              ...args,
              is_deletable: true,
              is_editable: true,
              can_reply: true,
            },
          ],
          permissions: {
            view_comments: true,
            can_reply: true,
          },
          add: {
            loading: false,
            loaded: true,
          },
          delete: {
            loading: false,
            loaded: true,
          },
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
      <IntlCommentsComponent {...args} />
    </Wrapper>
  );
}

export const CommentsModal = StoryComponent.bind({});
CommentsModal.args = {
  author_name: 'admin',
  creation_date: '2017-11-06T19:36:01',
  text: { data: 'Plone 6' },
};
export default {
  title: 'Public components/Comments/Comments Modal',
  component: CommentsComponent,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    creation_date: {
      control: 'date',
      description: 'Date comment was created',
    },
    author_name: {
      control: 'text',
      description: 'Comment author name',
    },
    text: {
      data: {
        control: 'date',
      },
      description: 'Comment text',
    },
  },
};
