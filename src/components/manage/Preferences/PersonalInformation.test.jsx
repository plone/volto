import React from 'react';
import { waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';
import { MemoryRouter } from 'react-router-dom';

import PersonalInformation from './PersonalInformation';

const mockStore = configureStore();
const userSchema = {
  userschema: {
    fieldsets: [{}],
    properties: {},
  },
  loaded: true,
  loading: false,
};

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
      userschema: userSchema,
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <PersonalInformation
            location={{ pathname: '/blog' }}
            closeMenu={() => {}}
          />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {});
    expect(component.toJSON()).toMatchSnapshot();
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
      userschema: userSchema,
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
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
    await waitFor(() => {});
    expect(component.toJSON()).toMatchSnapshot();
  });
});
