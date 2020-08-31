import React from 'react';
import renderer from 'react-test-renderer';
import PasswordWidget from './PasswordWidget';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

const mockStore = configureStore();

test('renders a password widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <PasswordWidget id="my-field" title="My field" onChange={() => {}} />,
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
