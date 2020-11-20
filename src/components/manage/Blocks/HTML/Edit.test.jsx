import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Edit from './Edit';

import { loadables } from '@plone/volto/config/Loadables';

const mockStore = configureStore();

let mockAllLoadables = {};

beforeAll(async () => {
  const resolved = await Promise.all(
    Object.keys(loadables).map(async (n) => {
      const lib = await Promise.all([loadables[n].load()]);
      return [n, { current: lib }];
    }),
  );
  resolved.forEach(([name, lib]) => {
    mockAllLoadables[name] = lib;
  });
});

jest.mock('@plone/volto/helpers', function () {
  const originalModule = jest.requireActual('@plone/volto/helpers');

  return {
    __esModule: true,
    ...originalModule,
    withLoadables: jest.fn().mockImplementation(function (libStr) {
      return jest.fn((WrappedComponent) =>
        jest.fn((props) => {
          return <WrappedComponent {...props} {...mockAllLoadables} />;
        }),
      );
    }),
  };
});

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

  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
