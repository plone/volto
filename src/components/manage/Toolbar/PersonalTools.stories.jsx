import { injectIntl } from 'react-intl';
import React from 'react';
import UndoControlpanelComponent from './PersonalTools';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';
import jwt from 'jsonwebtoken';
const IntlUndoControlpanelComponent = injectIntl(UndoControlpanelComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        users: {
          user: {
            fullname: 'admin',
            email: 'admin@plone.org',
            roles: ['Manager'],
          },
        },
        userSession: {
          token: jwt.sign({ sub: 'admin' }, 'admin'),
        },
        content: {
          data: {
            '@type': 'Folder',
            is_folderish: true,
          },
        },
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlUndoControlpanelComponent
        {...args}
        loadComponent={() => {}}
        theToolbar={{
          current: { getBoundingClientRect: () => ({ width: '320' }) },
        }}
      />
    </Wrapper>
  );
}

export const UndoControlpanel = StoryComponent.bind({});

export default {
  title: 'Public components/UndoControlpanel',
  component: UndoControlpanel,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
