import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { wait } from '@testing-library/react';

import Workflow from './Workflow';

const mockStore = configureStore();

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
    await wait(() => {
      expect(component.toJSON()).toMatchSnapshot();
    });
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
    await wait(() => {
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
