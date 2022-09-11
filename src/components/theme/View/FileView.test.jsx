import React from 'react';
import renderer from 'react-test-renderer';
import FileView from './FileView';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

test('renders a file view component', () => {
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
      <FileView
        content={{
          title: 'Hello World!',
          description: 'Hi',
          file: {
            download: 'file:///preview.pdf',
            filename: 'preview.pdf',
          },
        }}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
