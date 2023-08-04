import { injectIntl } from 'react-intl';
import React from 'react';
import UndoControlpanelComponent from './UndoControlpanel';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlUndoControlpanelComponent = injectIntl(UndoControlpanelComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        transactions: {
            transactions_recieved: [
              {
                description: 'Added default view for root object',
                id: 'QStrR0RRc0M5TjA9',
                size: 2216,
                time: '2022-06-19T22:15:02',
                username: 'admin',
              },
              {
                description: 'Added virtual_hosting',
                id: 'QStrR0RRcTVrbFU9',
                size: 1369,
                time: '2022-06-19T22:15:02',
                username: '',
              },
              {
                description: 'Added site error_log at /error_log',
                id: 'QStrR0RRcVh4cGs9',
                size: 1130,
                time: '2022-06-19T22:15:02',
                username: '',
              },
              {
                description: 'Added session_data_manager',
                id: 'QStrR0RRcDlFaUk9',
                size: 1405,
                time: '2022-06-19T22:15:02',
                username: '',
              },
              {
                description: 'Added browser_id_manager',
                id: 'QStrR0RRcFU2KzQ9',
                size: 840,
                time: '2022-06-19T22:15:02',
                username: '',
              },
              {
                description: 'Created initial user',
                id: 'QStrR0RRbUkzKzQ9',
                size: 403,
                time: '2022-06-19T22:15:02',
                username: '',
              },
              {
                description: '',
                id: 'QStrR0RRbEVVa1E9',
                size: 717,
                time: '2022-06-19T22:15:02',
                username: '',
              },
              {
                description: 'initial database creation',
                id: 'QStrR0ROWlo5YW89',
                size: 154,
                time: '2022-06-19T22:14:50',
                username: '',
              },
            ],
            revert: {
              loading: false,
              loaded: false,
            },
          },
          intl: {
            locale: 'en',
            messages: {},
          },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlUndoControlpanelComponent {...args} location={{ pathname: '/blog' }} />
    </Wrapper>
  );
}

export const UndoControlpanel = StoryComponent.bind({});

export default {
  title: 'Public components/UndoControlpanel',
  component : UndoControlpanel,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};