import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { JSDOM } from 'jsdom';

import TextLineEdit, { getFieldValue } from './TextLineEdit';

const mockStore = configureStore();

describe('getFieldValue', () => {
  it('Uses data and fieldDataName', () => {
    const props = {
      data: {
        marker: 'hello',
      },
      fieldDataName: 'marker',
    };

    expect(getFieldValue(props)).toBe('hello');
  });

  it('Favours data and fieldDataName when properties exists', () => {
    const props = {
      data: {
        marker: 'hello',
      },
      properties: {
        title: 'world',
        description: 'something else',
      },
      metadata: {
        title: 'alternate title',
        description: 'alternate description',
      },
      fieldDataName: 'marker',
    };

    expect(getFieldValue(props)).toBe('hello');
  });

  it('Uses fieldname and properties', () => {
    const props = {
      data: {
        marker: 'hello',
      },
      properties: {
        title: 'world',
        description: 'something else',
      },
      fieldName: 'description',
    };

    expect(getFieldValue(props)).toBe('something else');
  });

  it('Defaults to title and properties', () => {
    const props = {
      data: {
        marker: 'hello',
      },
      properties: {
        title: 'world',
        description: 'something else',
      },
    };

    expect(getFieldValue(props)).toBe('world');
  });

  it('Prefers metadata to properties', () => {
    const props = {
      data: {
        marker: 'hello',
      },
      properties: {
        title: 'world',
        description: 'something else',
      },
      metadata: {
        title: 'alternate title',
        description: 'alternate description',
      },
    };

    expect(getFieldValue(props)).toBe('alternate title');
  });
});

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

  it('renders an TextLineEdit as h1', () => {
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

  it('renders an TextLineEdit as h2', () => {
    const component = renderer.create(
      <Provider store={store}>
        <TextLineEdit
          as="h2"
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

  it('renders an TextLineEdit as h2 with a classname', () => {
    const component = renderer.create(
      <Provider store={store}>
        <TextLineEdit
          as="h2"
          className="my-custom-h2-classname"
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

  it('can read its data either from data, metadata or properties', () => {
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
          data={{ title: 'Custom title' }}
          fieldDataName="title"
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
