import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import ChangePassword from './ChangePassword';

const mockStore = configureStore();

vi.mock('@plone/volto/components/manage/Form');

vi.mock('../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

describe('ChangePassword', () => {
  it('renders a change password component', () => {
    const store = mockStore({
      userSession: {
        token: jwt.sign({ sub: 'john' }, 'secret'),
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      users: {
        update_password: {
          loading: false,
        },
      },
      content: {
        data: {},
        create: {
          loading: false,
          loaded: true,
        },
      },
    });
    const { container } = render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter>
            <ChangePassword location={{ pathname: '/blog' }} />
            <div id="toolbar"></div>
          </MemoryRouter>
        </CookiesProvider>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('does not render the form to an anonymous visitor', () => {
    const store = mockStore({
      userSession: { token: null },
      apierror: {},
      intl: { locale: 'en', messages: {} },
      users: { update_password: { loading: false } },
      content: { data: {}, create: { loading: false, loaded: true } },
    });
    // Rendered through a Route so the Unauthorized redirect navigates away
    // instead of re-mounting this component at the new path.
    const { container } = render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter initialEntries={['/change-password']}>
            <Switch>
              <Route exact path="/change-password" component={ChangePassword} />
              <Route render={() => <div id="redirected" />} />
            </Switch>
          </MemoryRouter>
        </CookiesProvider>
      </Provider>,
    );

    expect(container.querySelector('#page-change-password')).toBeNull();
    expect(container.querySelector('input[type="password"]')).toBeNull();
    expect(container.querySelector('#redirected')).not.toBeNull();
  });
});
