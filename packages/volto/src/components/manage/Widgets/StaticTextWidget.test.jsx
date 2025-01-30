import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import StaticTextWidget from './StaticTextWidget';

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
      <StaticTextWidget id="my-field" />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
