import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import GroupsControlpanel from './GroupsControlpanel';

const mockStore = configureStore();
jest.mock('../../Toolbar/Toolbar', () => jest.fn(() => <div id="Portal" />));

describe('UsersControlpanel', () => {
  it('renders a user control component', () => {
    const store = mockStore({
      roles: { roles: [] },
      groups: {
        groups: [],
        create: { loading: false },
      },
      authRole: {
        authenticatedRole: [],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <GroupsControlpanel location={{ pathname: '/blog' }} />
        <div id="toolbar"></div>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
