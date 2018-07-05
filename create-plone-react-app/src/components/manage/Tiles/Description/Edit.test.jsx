import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Edit from './Edit';

const mockStore = configureStore();

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

test('renders an edit description tile component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <Edit
        properties={{ description: 'My Description' }}
        selected={false}
        tile="1234"
        onChangeField={() => {}}
        onSelectTile={() => {}}
        onDeleteTile={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
