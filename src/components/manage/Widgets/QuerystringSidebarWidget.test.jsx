import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor } from '@testing-library/react';

import QuerystringWidget from './QuerystringWidget';

const mockStore = configureStore();

test('renders a listing block querystring widget component', async () => {
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
  await waitFor(() => {});
  expect(component.toJSON()).toMatchSnapshot();
});
