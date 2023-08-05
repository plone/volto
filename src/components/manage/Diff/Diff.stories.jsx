import { injectIntl } from 'react-intl';
import React from 'react';
import DiffComponent from './Diff';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlDiffComponent = injectIntl(DiffComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        history: {
          entries: [
            {
              time: '2017-04-19T14:09:36+02:00',
              version: 1,
              actor: { fullname: 'Web Admin' },
            },
            {
              time: '2017-04-19T14:09:35+02:00',
              version: 0,
              actor: { fullname: 'Web Admin' },
            },
          ],
        },
        content: {
          data: {
            title: 'Blog',
            '@type': 'Folder',
          },
        },
        schema: {
          schema: {
            fieldsets: [
              {
                fields: ['title'],
              },
            ],
            properties: {
              title: {
                title: 'Title',
                type: 'string',
              },
            },
          },
        },
        diff: {
          data: [
            {
              title: 'My old title',
            },
            {
              title: 'My new title,',
            },
          ],
        },
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlDiffComponent {...args} />
    </Wrapper>
  );
}

export const Diff = StoryComponent.bind({});

export default {
  title: 'Public components/Diff',
  component: Diff,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
