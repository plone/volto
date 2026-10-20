import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import { CookiesProvider } from 'react-cookie';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AddRule from './AddRule';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

vi.mock('@plone/volto/components/manage/Form');

vi.mock('../../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Toolbar" />),
}));

describe('AddRule', () => {
  it('renders rules add interface', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <CookiesProvider>
          <>
            <AddRule location={{ pathname: '/controlpanel/rules/add' }} />
            <div id="toolbar"></div>
          </>
        </CookiesProvider>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
