import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import Logout from './Logout';

const mockStore = configureStore();

jest.mock('../Login/Login', () => jest.fn(() => <div />));

describe('Logout', () => {
  it('renders a logout component', () => {
    const store = mockStore({
      userSession: {
        login: {},
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Logout location={{ pathname: '' }} />
        </IntlProvider>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
