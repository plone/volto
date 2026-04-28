import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import jwt from 'jsonwebtoken';

import { __test__ as Edit } from './Edit';

const mockStore = configureStore();

vi.mock('@plone/volto/components/manage/Form');
vi.mock('../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));
vi.mock('../Sidebar/Sidebar', () => ({
  default: vi.fn(() => <div id="Sidebar" />),
}));

describe('Edit', () => {
  it('renders an empty edit component', () => {
    const store = mockStore({
      userSession: {
        token: jwt.sign({ fullname: 'John Doe' }, 'secret'),
      },
      actions: {
        actions: {
          document_actions: [],
          object: [
            {
              icon: '',
              id: 'edit',
              title: 'Edit',
            },
          ],
        },
      },
      schema: {
        schema: null,
      },
      content: {
        data: null,
        get: {
          loading: false,
          loaded: true,
        },
        update: {
          loading: false,
          loaded: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <div id="toolbar"></div>
        <Edit location={{ pathname: '/blog', search: {} }} />
        <div id="sidebar"></div>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders an edit component', () => {
    const store = mockStore({
      userSession: {
        token: jwt.sign({ fullname: 'John Doe' }, 'secret'),
      },
      actions: {
        actions: {
          document_actions: [],
          object: [
            {
              icon: '',
              id: 'edit',
              title: 'Edit',
            },
          ],
        },
      },
      schema: {
        schema: {
          some: 'field',
        },
      },
      content: {
        data: {},
        get: {
          loading: false,
          loaded: true,
        },
        update: {
          loading: false,
          loaded: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <div id="toolbar"></div>
        <Edit location={{ pathname: '/blog', search: {} }} />
        <div id="sidebar"></div>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
