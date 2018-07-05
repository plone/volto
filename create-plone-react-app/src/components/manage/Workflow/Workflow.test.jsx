import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Workflow from './Workflow';

const mockStore = configureStore();

describe('Workflow', () => {
  it('renders an empty workflow component', () => {
    const store = mockStore({
      workflow: { history: [], transition: { loaded: true } },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Workflow pathname="/test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a workflow component', () => {
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
    });
    const component = renderer.create(
      <Provider store={store}>
        <Workflow pathname="/test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
