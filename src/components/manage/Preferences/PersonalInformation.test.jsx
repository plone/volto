import React from 'react';
import { waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
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
      userschema: {
        userschema: {
          fieldsets: [
            {
              id: 'default',
              title: 'User profile',
              fields: [
                'fullname',
                'email',
                'portrait',
                'home_page',
                'location',
              ],
            },
          ],
          properties: {
            fullname: {
              description: 'Enter full name, e.g. John Smith.',
              title: 'Full Name',
              type: 'string',
            },
            email: {
              description:
                'We will use this address if you need to recover your password',
              title: 'E-mail',
              type: 'string',
            },
            portrait: {
              description: 'The user portrait/avatar',
              title: 'Portrait',
              type: 'object',
            },
            home_page: {
              description:
                'The URL for your external home page, if you have one.',
              title: 'Home page',
              type: 'string',
            },
            location: {
              description:
                'Your location - either city and country - or in a company setting, where your office is located.',
              title: 'Location',
              type: 'string',
            },
          },
          required: ['email'],
        },
        loaded: true,
        loading: false,
      },
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
      userschema: {
        userschema: {
          fieldsets: [
            {
              id: 'default',
              title: 'User profile',
              fields: [
                'fullname',
                'email',
                'portrait',
                'home_page',
                'location',
              ],
            },
          ],
          properties: {
            fullname: {
              description: 'Enter full name, e.g. John Smith.',
              title: 'Full Name',
              type: 'string',
            },
            email: {
              description:
                'We will use this address if you need to recover your password',
              title: 'E-mail',
              type: 'string',
            },
            portrait: {
              description: 'The user portrait/avatar',
              title: 'Portrait',
              type: 'object',
            },
            home_page: {
              description:
                'The URL for your external home page, if you have one.',
              title: 'Home page',
              type: 'string',
            },
            location: {
              description:
                'Your location - either city and country - or in a company setting, where your office is located.',
              title: 'Location',
              type: 'string',
            },
          },
          required: ['email'],
        },
        loaded: true,
        loading: false,
      },

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
