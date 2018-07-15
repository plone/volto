import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ArrayWidget from './ArrayWidget';

const mockStore = configureStore();

test('renders an array widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <ArrayWidget id="my-field" title="My field" onChange={() => {}} />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
