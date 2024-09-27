import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ConfigureRule from './ConfigureRule';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('@plone/volto/components/manage/Toolbar');

describe('ConfigureRule', () => {
  it('renders rules configure interface', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <ConfigureRule
          location={{ pathname: '/controlpanel/rules/:id/configure' }}
        />
        <div id="toolbar"></div>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
