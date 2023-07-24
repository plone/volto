import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ImageView from './ImageView';

const mockStore = configureStore();

test('renders an image view component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <ImageView
        content={{
          title: 'Hello World!',
          description: 'Hi',
          image: {
            size: 123123,
            download: 'file:///preview.jpg',
            width: 400,
            height: 400,
            scales: {
              preview: {
                download: 'file:///preview.jpg',
                width: 400,
                height: 400,
              },
            },
          },
        }}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
