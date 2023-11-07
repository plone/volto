import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render, waitFor } from '@testing-library/react';
import config from '@plone/volto/registry';

import Display from './Display';

const mockStore = configureStore();

jest.mock('@plone/volto/components/manage/Widgets');
jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

beforeEach(() => {
  config.views.layoutViewsNamesMapping = {
    summary_view: 'Summary view',
    listing_view: 'Listing view',
  };
  config.views.layoutViews = {
    summary_view: () => <div>Summary View</div>,
    listing_view: () => <div>Listing View</div>,
  };
});

describe('Display', () => {
  it('renders a Display component with more than one option', async () => {
    const store = mockStore({
      content: {
        update: { loaded: true },
        data: { layout: 'summary_view', '@type': 'Folder' },
      },
      schema: {
        schema: {
          layouts: ['summary_view', 'listing_view'],
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { container } = render(
      <Provider store={store}>
        <Display pathname="/test" />
      </Provider>,
    );

    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });

  it('renders a Display component empty in case that there is only one option', async () => {
    const store = mockStore({
      content: {
        update: { loaded: true },
        data: { layout: 'summary_view', '@type': 'Folder' },
      },
      schema: {
        schema: {
          layouts: ['summary_view'],
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { container } = render(
      <Provider store={store}>
        <Display pathname="/test" />
      </Provider>,
    );

    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });
});
