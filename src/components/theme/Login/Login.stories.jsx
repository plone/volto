import React from 'react';
import Login from './Login';
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
        <Login />
      </Wrapper>
    </Provider>
  );
};

export const Default = StoryComponent.bind({});
Default.args = {
  login: () => null,
};

export default {
  title: 'Public Components/Login',
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
