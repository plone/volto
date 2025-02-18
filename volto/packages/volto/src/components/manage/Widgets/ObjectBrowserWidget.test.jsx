import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import ObjectBrowserWidget from './ObjectBrowserWidget';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();
test('renders a objectBrowser widget component', () => {
  const store = mockStore({
    search: {},
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <ObjectBrowserWidget
          id="my-field"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
        />
      </MemoryRouter>
    </Provider>,
  );

  expect(container).toMatchSnapshot();
});
