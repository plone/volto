import { injectIntl } from 'react-intl';
import React from 'react';
import HistoryComponent from './History';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlHistoryComponent = injectIntl(HistoryComponent);
function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        reduxAsyncConnect: {},
        userSession: {},
        actions: {
          actions: {
            document_actions: [],
            object: [
              {
                icon: '',
                id: 'history',
                title: 'History',
              },
            ],
          },
        },
        router: { location: 'foo' },
        history: {
          entries: [
            {
              transition_title: 'Publish',
              type: 'workflow',
              action: 'publish',
              state_title: 'Published',
              time: '2017-04-19T14:09:36+02:00',
              comments: '',
              actor: { fullname: 'Web Admin' },
            },
            {
              transition_title: 'Edited',
              type: 'versioning',
              action: 'Edited',
              time: '2017-04-19T14:09:35+02:00',
              comments: 'Changed text',
              actor: { fullname: 'Web Admin' },
            },
            {
              transition_title: 'Create',
              type: 'workflow',
              action: null,
              state_title: 'Private',
              time: '2017-04-19T14:09:34+02:00',
              comments: '',
              actor: { fullname: 'Web Admin' },
            },
          ],
          revert: {
            loading: false,
            loaded: false,
          },
        },
        content: {
          data: {
            title: 'Blog',
          },
        },
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlHistoryComponent {...args} location={{ pathname: '/blog' }} />
    </Wrapper>
  );
}

export const History = StoryComponent.bind({});

export default {
  title: 'Public components/History',
  component: History,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
