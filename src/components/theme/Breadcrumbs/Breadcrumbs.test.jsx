import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, waitFor, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';

import Breadcrumbs from './Breadcrumbs';

const mockStore = configureStore();

const queryClient = new QueryClient();

describe('Breadcrumbs', () => {
  const pathName = '/blog';

  beforeAll(() => {
    nock('http://localhost:8080/Plone/++api++')
      .get(`${pathName}/@breadcrumbs`)
      .reply(200, {
        items: [
          { title: 'Blog', url: '/blog' },
          { title: 'My first blog', url: '/blog/my-first-blog' },
        ],
      });
  });

  it('renders a breadcrumbs component', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <Breadcrumbs pathname={pathName} />
          </QueryClientProvider>
        </MemoryRouter>
      </Provider>,
    );
    await waitFor(() =>
      expect(screen.getByText('My first blog')).toBeInTheDocument(),
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
