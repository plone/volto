import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, waitFor, render } from '@testing-library/react';

import Breadcrumbs from './Breadcrumbs';

const mockStore = configureStore();

const queryClient = new QueryClient();

describe('Breadcrumbs', () => {
  it('renders a breadcrumbs component', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <Breadcrumbs pathname="/blog" />
          </QueryClientProvider>
        </MemoryRouter>
      </Provider>,
    );
    await waitFor(() =>
      expect(screen.getByText('My first blog')).toBeInTheDocument(),
    );
    // const json = component.toJSON();
    // expect(json).toMatchSnapshot();
  });
});
