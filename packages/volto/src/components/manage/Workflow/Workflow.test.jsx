import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render } from '@testing-library/react';
import config from '@plone/volto/registry';

import Workflow from './Workflow';

const mockStore = configureStore();

jest.mock('@plone/volto/components/manage/Widgets');
jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

beforeEach(() => {
  config.settings.workflowMapping = {
    published: { value: 'published', color: '#007bc1' },
    publish: { value: 'publish', color: '#007bc1' },
    private: { value: 'private', color: '#ed4033' },
    pending: { value: 'pending', color: '#f6a808' },
    send_back: { value: 'private', color: '#ed4033' },
    retract: { value: 'private', color: '#ed4033' },
    submit: { value: 'review', color: '#f4e037' },
  };
});

describe('Workflow', () => {
  it('renders an empty workflow component', async () => {
    const store = mockStore({
      workflow: {
        currentState: { id: 'published', title: 'Published' },
        history: [],
        transition: { loaded: true },
        transitions: [],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      content: { data: { review_state: 'published' } },
    });
    const { container } = render(
      <Provider store={store}>
        <Workflow pathname="/test" />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders a workflow component', async () => {
    const store = mockStore({
      workflow: {
        currentState: { id: 'private', title: 'Private' },
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

    const { container } = render(
      <Provider store={store}>
        <Workflow pathname="/test" />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
