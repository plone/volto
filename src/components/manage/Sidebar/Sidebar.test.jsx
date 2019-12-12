import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Sidebar from './Sidebar';

const mockStore = configureStore();

test('renders a sidebar component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    sidebar: {
      tab: 0,
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <Sidebar />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
