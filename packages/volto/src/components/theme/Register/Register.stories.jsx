import { injectIntl } from 'react-intl';
import React from 'react';
import RegisterComponent from './Register';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlRegister = injectIntl(RegisterComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        users: {
          create: {
            loading: false,
            loaded: true,
            ...args,
          },
        },
        intl: {
          locale: 'en',
          messages: {},
        },
        userschema: {
          loaded: true,
          loading: false,
          userschema: {
            fieldsets: [
              {
                id: 'default',
                title: 'default',
                fields: ['fullname', 'email'],
              },
            ],
            properties: {
              fullname: {
                type: 'string',
                title: 'Full name',
                description: 'Enter your full name',
              },
              email: {
                type: 'string',
                title: 'email',
                description: 'Enter your email address',
              },
            },
            required: ['fullname', 'email'],
          },
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlRegister />
    </Wrapper>
  );
}

export const Default = StoryComponent.bind({});
Default.args = {
  error: false,
};

export default {
  title: 'Public components/Register',
  component: RegisterComponent,

  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],

  argTypes: {},
};
