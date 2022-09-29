import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Edit from './TableBlockEdit';

const mockStore = configureStore();

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

test('renders an edit table block component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <Edit
        data={{ table: { rows: [] } }}
        selected={false}
        block="1234"
        onAddBlock={() => {}}
        onChangeBlock={() => {}}
        onSelectBlock={() => {}}
        onDeleteBlock={() => {}}
        onInsertBlock={() => {}}
        onFocusPreviousBlock={() => {}}
        onFocusNextBlock={() => {}}
        handleKeyDown={() => {}}
        onMutateBlock={() => {}}
        index={1}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
