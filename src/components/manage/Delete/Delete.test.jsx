import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import Delete from './Delete';

const mockStore = configureStore([thunk]);

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('../../../actions/content/content', () => ({
  getContent: jest.fn(() => ({ type: 'GET_CONTENT' })),
}));

describe('Delete', () => {
  it('renders an empty delete component', () => {
    const store = mockStore({
      content: {
        data: undefined,
        delete: {
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
        <MemoryRouter>
          <Delete
            location={{ pathname: '/blog', search: {} }}
            deleteContent={() => {}}
          />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a delete component', () => {
    const store = mockStore({
      content: {
        data: {
          title: 'Blog',
        },
        delete: {
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
        <MemoryRouter>
          <Delete
            location={{ pathname: '/blog', search: {} }}
            deleteContent={() => {}}
          />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
