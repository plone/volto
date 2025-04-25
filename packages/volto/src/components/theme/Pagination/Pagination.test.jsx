import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Pagination from './Pagination';

const mockStore = configureStore();

describe('Pagination', () => {
  it('renders no pagination when only 1 page', () => {
    const store = mockStore({
      navigation: {
        items: [
          { title: 'Blog', url: '/blog' },
          { title: 'Users', url: '/users' },
        ],
      },
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Pagination current={1} total={1} onChangePage={(x) => x} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders page size options when specified', () => {
    const store = mockStore({
      navigation: {
        items: [
          { title: 'Blog', url: '/blog' },
          { title: 'Users', url: '/users' },
        ],
      },
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Pagination
          pageSize={15}
          pageSizes={[15, 30, 50]}
          onChangePageSize={(x) => x}
          current={1}
          total={1}
          onChangePage={(x) => x}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders pagination when multiple pages are specified', () => {
    const store = mockStore({
      navigation: {
        items: [
          { title: 'Blog', url: '/blog' },
          { title: 'Users', url: '/users' },
        ],
      },
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Pagination current={6} total={12} onChangePage={(x) => x} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
