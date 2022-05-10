import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Edit from './Edit';

const mockStore = configureStore();

test('renders an edit redirect block component', () => {
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
      <Edit
        data={{
          remoteUrl: 'https://www.google.com/',
        }}
        selected={false}
        block="1234"
        onChangeBlock={() => {}}
        onSelectBlock={() => {}}
        onDeleteBlock={() => {}}
        onFocusPreviousBlock={() => {}}
        onFocusNextBlock={() => {}}
        handleKeyDown={() => {}}
        index={1}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
