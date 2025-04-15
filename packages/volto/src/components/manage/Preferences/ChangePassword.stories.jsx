import { injectIntl } from 'react-intl';
import React from 'react';
import ChangePasswordComponent from './ChangePassword';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';
const IntlChangePasswordComponent = injectIntl(ChangePasswordComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        intl: {
          locale: 'en',
          messages: {},
        },
        users: {
          update_password: {
            loading: false,
          },
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlChangePasswordComponent {...args} location={{ pathname: '/blog' }} />
    </Wrapper>
  );
}

export const ChangePassword = StoryComponent.bind({});

export default {
  title: 'Public components/ChangePassword',
  component: ChangePassword,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
