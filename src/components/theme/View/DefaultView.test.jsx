import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import DefaultView from './DefaultView';

const mockStore = configureStore();

test('renders a document view component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    content: {
      get: {
        loaded: true,
      },
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <DefaultView
        content={{
          title: 'Hello World!',
          description: 'Hi',
          text: {
            data: '<p>Hello World!</p>',
          },
        }}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
