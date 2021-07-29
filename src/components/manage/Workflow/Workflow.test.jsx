import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor, render, screen } from '@testing-library/react';

import Workflow from './Workflow';

const mockStore = configureStore();

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

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
    const { container } = render(
      <Provider store={store}>
        <Workflow pathname="/test" />
      </Provider>,
    );
    await waitFor(() => screen.getByText(/Public/));
    expect(container).toMatchSnapshot();
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

    const { container } = render(
      <Provider store={store}>
        <Workflow pathname="/test" />
      </Provider>,
    );
    await waitFor(() => screen.getByText('Private'));
    expect(container).toMatchSnapshot();
  });
});
