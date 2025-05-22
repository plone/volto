import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import NumberWidget from './NumberWidget';

const mockStore = configureStore();

test('renders a number widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <>
        <NumberWidget
          id="my-field"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
        />
      </>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
