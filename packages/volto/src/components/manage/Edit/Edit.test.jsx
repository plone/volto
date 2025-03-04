import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import jwt from 'jsonwebtoken';

import { __test__ as Edit } from './Edit';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('../Form/Form', () => jest.fn(() => <div className="Form" />));

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
    const component = renderer.create(
      <Provider store={store}>
        <Edit location={{ pathname: '/blog', search: {} }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
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
    const component = renderer.create(
      <Provider store={store}>
        <Edit location={{ pathname: '/blog', search: {} }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
