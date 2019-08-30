import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import QuerystringWidget from './QuerystringWidget';

const mockStore = configureStore();

test('renders an querystring widget component', () => {
  const store = mockStore({
    querystring: { indexes: {} },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <QuerystringWidget id="my-field" title="My field" onChange={() => {}} />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
