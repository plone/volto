import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
// import { waitFor } from '@testing-library/react';

import Workflow from './Workflow';

import { loadables } from '@plone/volto/config/Loadables';

const mockStore = configureStore();

let mockAllLoadables = {};

beforeAll(async () => {
  const resolved = await Promise.all(
    Object.keys(loadables).map(async (n) => {
      const lib = await Promise.all([loadables[n].load()]);
      return [n, { current: lib ? lib[0] : lib }];
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

describe('Workflow', () => {
  it('renders an empty workflow component', async () => {
    const store = mockStore({
      workflow: { history: [], transition: { loaded: true }, transitions: [] },
      intl: {
        locale: 'en',
        messages: {},
      },
      content: { data: { review_state: 'published' } },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Workflow pathname="/test" />
      </Provider>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders a workflow component', async () => {
    const store = mockStore({
      workflow: {
        history: [{ review_state: 'private' }],
        transition: { loaded: true },
        transitions: [{ '@id': 'http://publish', title: 'Publish' }],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      content: { data: { review_state: 'private' } },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Workflow pathname="/test" />
      </Provider>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
