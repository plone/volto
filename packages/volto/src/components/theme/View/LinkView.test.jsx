import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import LinkView from './LinkView';

const mockStore = configureStore();

global.__SERVER__ = false; // eslint-disable-line no-underscore-dangle

const store = mockStore({
  userSession: {
    token: null,
  },
  intl: {
    locale: 'en',
    messages: {},
  },
  actions: {
    actions: {
      object: [
        {
          id: 'edit',
        },
      ],
    },
  },
});

test('renders a link view component', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <LinkView
          content={{
            title: 'Hello World!',
            description: 'Hi',
            remoteUrl: '/news',
          }}
        />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
