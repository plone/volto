import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import SidebarTextWidget from './SidebarTextWidget';

const mockStore = configureStore();

test('renders a text widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <SidebarTextWidget id="my-field" title="My field" onChange={() => {}} />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
