import React from 'react';
import { Provider } from 'react-intl-redux';
import { render, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import FileWidget from './FileWidget';

const mockStore = configureStore();

test('renders a file widget component', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const { container } = render(
    <Provider store={store}>
      <FileWidget id="my-field" title="My field" onChange={() => {}} />,
    </Provider>,
  );

  await waitFor(() => {});
  expect(container).toMatchSnapshot();
});
