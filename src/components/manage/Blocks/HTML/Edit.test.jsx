import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
// import { wait } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';

import Edit from './Edit';

const mockStore = configureStore();

test('renders an edit html block component', async () => {
  const store = mockStore({
    content: {
      create: {},
      data: {},
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <Edit
        data={{ html: '<h1></h1>' }}
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
  const { act } = renderer;

  let json;
  await act(async () => {
    json = component.toJSON();
  });
  await act(async () => {
    json = component.toJSON();
  });
  await act(async () => {
    json = component.toJSON();
  });
  await act(async () => {
    json = component.toJSON();
  });
  await act(async () => {
    json = component.toJSON();
  });
  expect(json).toMatchSnapshot();
  // await wait(() => {});
});
