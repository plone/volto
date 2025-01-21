import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import Logout from './Logout';

const mockStore = configureStore();

vi.mock('../Login/Login', () => ({ default: vi.fn(() => <div />) }));

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
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <MemoryRouter>
            <Logout location={{ pathname: '' }} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
