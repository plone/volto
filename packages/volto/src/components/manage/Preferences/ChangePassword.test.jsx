import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';
import { MemoryRouter } from 'react-router-dom';

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
        <MemoryRouter>
          <ChangePassword location={{ pathname: '/blog' }} />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
