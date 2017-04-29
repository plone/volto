import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import jwt from 'jsonwebtoken';

import Toolbar from './Toolbar';

const mockStore = configureStore();

jest.mock('../Actions/Actions', () => jest.fn(() => <div id="actions" />));
jest.mock('../Display/Display', () => jest.fn(() => <div id="display" />));
jest.mock('../Types/Types', () => jest.fn(() => <div id="types" />));
jest.mock('../Workflow/Workflow', () => jest.fn(() => <div id="workflow" />));

describe('Toolbar', () => {
  it('renders an actions component', () => {
    const store = mockStore({
      userSession: {
        token: jwt.sign({ fullname: 'John Doe' }, 'secret'),
      },
      content: {
        data: {
          '@type': 'Folder',
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Toolbar pathname="/test" selected="view" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
