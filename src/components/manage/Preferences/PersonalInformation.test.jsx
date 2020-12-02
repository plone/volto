import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';
import { MemoryRouter } from 'react-router-dom';

import PersonalInformation from './PersonalInformation';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

describe('PersonalInformation', () => {
  it('renders a personal information component', async () => {
    const store = mockStore({
      userSession: {
        token: jwt.sign({ sub: 'john' }, 'secret'),
      },
      users: {
        user: {},
        get: {
          loaded: true,
        },
        update: {
          loading: false,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PersonalInformation
            location={{ pathname: '/blog' }}
            closeMenu={() => {}}
          />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => screen.getByText(/Choose a file/i));
    expect(container.firstChild).toMatchSnapshot();
  });
  it('renders a personal information component embedded in the Toolbar', async () => {
    const store = mockStore({
      userSession: {
        token: jwt.sign({ sub: 'john' }, 'secret'),
      },
      users: {
        user: {},
        get: {
          loaded: true,
        },
        update: {
          loading: false,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PersonalInformation
            location={{ pathname: '/blog' }}
            closeMenu={() => {}}
            isToolbarEmbedded
          />
        </MemoryRouter>
      </Provider>,
    );
    await waitFor(() => screen.getByText(/Choose a file/i));
    expect(container.firstChild).toMatchSnapshot();
  });
});
