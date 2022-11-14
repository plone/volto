import React from 'react';
import Logout from './Logout';
import Wrapper from '@plone/volto/storybook';

const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
const store = configureStore()({
  userSession: {
    login: {},
  },
  intl: {
    locale: 'en',
    messages: {},
  },
});

const StoryComponent = (args) => {
  return (
    <Provider store={store}>
      <Wrapper>
        <Logout location={{ pathname: '' }} />
      </Wrapper>
    </Provider>
  );
};

export const Default = StoryComponent.bind({});
Default.args = {
  logout: () => {},
  purgeMessages: () => {},
  location: { query: { return_url: '/' } },
};

export default {
  title: 'Public Components/Logout',
  component: Default,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
