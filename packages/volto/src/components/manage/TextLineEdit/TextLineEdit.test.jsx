import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { JSDOM } from 'jsdom';

import TextLineEdit from './TextLineEdit';

const mockStore = configureStore();

describe('renders TextLineEdit', () => {
  beforeEach(() => {
    const jsdom = new JSDOM();
    global.window = jsdom.window;
    global.document = jsdom.window.document;
    global.Document = document.constructor;
  });

  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  test('renders an TextLineEdit as h1', () => {
    const component = renderer.create(
      <Provider store={store}>
        <TextLineEdit
          properties={{ title: 'My Title' }}
          selected={false}
          block="1234"
          onAddBlock={() => {}}
          onChangeField={() => {}}
          onSelectBlock={() => {}}
          onDeleteBlock={() => {}}
          onFocusPreviousBlock={() => {}}
          onFocusNextBlock={() => {}}
          handleKeyDown={() => {}}
          index={1}
          blockNode={{ current: null }}
          data={{ disableNewBlocks: false }}
        />
      </Provider>,
      {
        createNodeMock: () => ({
          ownerDocument: global.document,
          getRootNode: () => global.document,
        }),
      },
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('renders an TextLineEdit as h2', () => {
    const component = renderer.create(
      <Provider store={store}>
        <TextLineEdit
          renderTag="h2"
          properties={{ title: 'My Title' }}
          selected={false}
          block="1234"
          onAddBlock={() => {}}
          onChangeField={() => {}}
          onSelectBlock={() => {}}
          onDeleteBlock={() => {}}
          onFocusPreviousBlock={() => {}}
          onFocusNextBlock={() => {}}
          handleKeyDown={() => {}}
          index={1}
          blockNode={{ current: null }}
          data={{ disableNewBlocks: false }}
        />
      </Provider>,
      {
        createNodeMock: () => ({
          ownerDocument: global.document,
          getRootNode: () => global.document,
        }),
      },
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('renders an TextLineEdit as h2 with a classname', () => {
    const component = renderer.create(
      <Provider store={store}>
        <TextLineEdit
          renderTag="h2"
          renderClassName="my-custom-h2-classname"
          properties={{ title: 'My Title' }}
          selected={false}
          block="1234"
          onAddBlock={() => {}}
          onChangeField={() => {}}
          onSelectBlock={() => {}}
          onDeleteBlock={() => {}}
          onFocusPreviousBlock={() => {}}
          onFocusNextBlock={() => {}}
          handleKeyDown={() => {}}
          index={1}
          blockNode={{ current: null }}
          data={{ disableNewBlocks: false }}
        />
      </Provider>,
      {
        createNodeMock: () => ({
          ownerDocument: global.document,
          getRootNode: () => global.document,
        }),
      },
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
