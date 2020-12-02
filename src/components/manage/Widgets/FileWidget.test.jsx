import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import FileWidget from './FileWidget';
import { Provider } from 'react-intl-redux';

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

  await waitFor(() => screen.getByText(/Choose a file/i));
  expect(container.firstChild).toMatchSnapshot();
});
