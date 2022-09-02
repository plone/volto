import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import VariableModal from './VariableModal';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

describe('VariableModal', () => {
  it('renders rules add interface', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <VariableModal location={{ pathname: '/controlpanel/rules' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
