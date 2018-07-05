import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import WysiwygWidget from './WysiwygWidget';

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const mockStore = configureStore();

test('renders a wysiwyg widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <WysiwygWidget id="my-field" title="My field" onChange={() => {}} />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
