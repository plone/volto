import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';

import PersonalInformation from './PersonalInformation';

const mockStore = configureStore();

describe('PersonalInformation', () => {
  it('renders a personal information component', () => {
    const store = mockStore({
      userSession: {
        token: jwt.sign({ sub: 'john' }, 'secret'),
      },
      users: {
        user: {},
        get: {
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
        <PersonalInformation />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
