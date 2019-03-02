import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import jwt from 'jsonwebtoken';

import Toolbar from './Toolbar';

const mockStore = configureStore();

describe('Toolbar', () => {
  it('renders an actions component', () => {
    const store = mockStore({
      userSession: {
        token: jwt.sign({ fullname: 'John Doe' }, 'secret'),
      },
      content: {
        data: {
          '@type': 'Folder',
          is_folderish: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Toolbar pathname="/test" inner={<span />} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
