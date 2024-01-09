import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import ImageWidget from './ImageWidget';

const mockStore = configureStore();

test('renders an image sizes widget component', () => {
  const store = mockStore({
    content: {
      create: {},
      data: {},
      subrequests: {
        asdasdasd: {},
      },
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <ImageWidget
          id="image"
          title="Image"
          fieldSet="default"
          onChange={() => {}}
        />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
