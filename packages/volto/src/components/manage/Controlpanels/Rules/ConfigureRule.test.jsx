import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import { CookiesProvider } from 'react-cookie';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ConfigureRule from './ConfigureRule';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

vi.mock('../../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

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
        <CookiesProvider>
          <>
            <ConfigureRule
              location={{ pathname: '/controlpanel/rules/:id/configure' }}
            />
            <div id="toolbar"></div>
          </>
        </CookiesProvider>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
