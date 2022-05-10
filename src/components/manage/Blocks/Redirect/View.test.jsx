import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import View from './View';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();

test('renders a redirect block component for an authenticated user', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    userSession: {
      token: '1234',
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <View
          data={{
            remoteUrl: 'https://www.google.com',
          }}
        />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders a redirect block component for an anonymous user', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <View
          data={{
            remoteUrl: 'https://www.google.com',
          }}
        />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
