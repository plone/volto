import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor, render, screen } from '@testing-library/react';
import SelectFacet from './SelectFacet';

const mockStore = configureStore();

vi.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  const { __setLoadables } = await import(
    '@plone/volto/helpers/Loadable/Loadable'
  );
  await __setLoadables();
});

describe('SelectFacet', () => {
  it('renders a facet component with select dropdown', async () => {
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
        <SelectFacet
          choices={[
            { label: 'First', value: 'first' },
            { label: 'Second', value: 'second' },
          ]}
          facet={{ title: 'Test Facet', field: {} }}
        />
      </Provider>,
    );
    await waitFor(() => screen.getByText('Test Facet'));
    expect(container).toMatchSnapshot();
  });
});
