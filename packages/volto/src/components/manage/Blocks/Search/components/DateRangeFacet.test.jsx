import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor, render, screen } from '@testing-library/react';
import DateRangeFacet from './DateRangeFacet';

const mockStore = configureStore();

vi.mock('@plone/volto/helpers/Loadable/Loadable', async () => {
  return await import(
    '@plone/volto/helpers/Loadable/__mocks__/Loadable.vitest.jsx'
  );
});

beforeAll(async () => {
  const { __setLoadables } = await import(
    '@plone/volto/helpers/Loadable/Loadable'
  );
  await __setLoadables();
});

describe('DateRangeFacet', () => {
  it('renders a facet component with a date range widget', async () => {
    const store = mockStore({
      userSession: { token: null },
      content: { data: { '@id': 'myid' } },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <DateRangeFacet facet={{ title: 'Test Facet', field: {} }} />
      </Provider>,
    );
    await waitFor(() => screen.getByText('Test Facet'));
    expect(container).toMatchSnapshot();
  });
});
