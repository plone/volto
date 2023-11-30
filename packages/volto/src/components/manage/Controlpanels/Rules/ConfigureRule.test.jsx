import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ConfigureRule from './ConfigureRule';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

describe('ConfigureRule', () => {
  it('renders rules configure interface', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <ConfigureRule
          location={{ pathname: '/controlpanel/rules/:id/configure' }}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
