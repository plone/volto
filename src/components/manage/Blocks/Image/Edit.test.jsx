import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Edit from './Edit';

const mockStore = configureStore();

const blockId = '1234';

test('renders an edit image block component', () => {
  const store = mockStore({
    content: {
      create: {},
      data: {},
      subrequests: {
        [blockId]: {},
      },
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <Edit
        data={{ url: 'image' }}
        selected={false}
        block={blockId}
        content={{}}
        request={{
          loading: false,
          loaded: false,
        }}
        pathname="/news"
        onChangeBlock={() => {}}
        onSelectBlock={() => {}}
        onDeleteBlock={() => {}}
        createContent={() => {}}
        onFocusPreviousBlock={() => {}}
        onFocusNextBlock={() => {}}
        handleKeyDown={() => {}}
        index={1}
        openObjectBrowser={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
