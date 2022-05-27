import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Aliases from './Aliases';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('../Toolbar/More', () => jest.fn(() => <div className="More" />));

describe('Aliases', () => {
  it('renders aliases object control', () => {
    const store = mockStore({
      aliases: {
        add: {
          loaded: false,
          loading: false,
          error: null,
        },
        remove: {
          loaded: false,
          loading: false,
          error: null,
        },
        get: {
          loading: false,
          loaded: true,
          error: null,
        },
        items: [],
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
        <Aliases location={{ pathname: '/blog/aliases' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
