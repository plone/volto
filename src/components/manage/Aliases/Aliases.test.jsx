import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Aliases from './Aliases';

const mockStore = configureStore();

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
