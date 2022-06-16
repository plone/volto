import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import jwt from 'jsonwebtoken';
import { MemoryRouter } from 'react-router-dom';
import { PluggablesProvider } from '@plone/volto/components/manage/Pluggable';

import Sharing from './Sharing';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

describe('Sharing', () => {
  it('renders a sharing component', () => {
    const store = mockStore({
      userSession: {
        token: jwt.sign({ sub: 'john-doe' }, 'secret'),
      },
      sharing: {
        data: {
          entries: [
            {
              id: 'john-doe',
              disabled: false,
              login: 'john-doe',
              roles: {
                Contributer: true,
              },
              title: 'John Doe',
              type: 'user',
            },
          ],
          inherit: true,
          available_roles: [
            {
              id: 'Contributor',
              title: 'Can add',
            },
          ],
        },
        update: {
          loading: false,
          loaded: true,
        },
      },
      content: {
        data: {
          title: 'Blog',
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <PluggablesProvider>
          <MemoryRouter>
            <Sharing location={{ pathname: '/blog' }} />
          </MemoryRouter>
        </PluggablesProvider>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
