import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Edit from './Edit';

const mockStore = configureStore();

test('renders an edit Lead Image block component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <Edit
        data={{}}
        properties={{
          image: {
            download: 'image.png',
          },
        }}
        selected={false}
        block="1234"
        content={{}}
        request={{
          loading: false,
          loaded: false,
        }}
        pathname="/news"
        onChangeBlock={() => {}}
        onChangeField={() => {}}
        index={1}
        openObjectBrowser={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
