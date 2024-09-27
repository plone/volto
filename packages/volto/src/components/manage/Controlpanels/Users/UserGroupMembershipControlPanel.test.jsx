import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import UserGroupMembershipControlPanel from './UserGroupMembershipControlPanel';

const mockStore = configureStore();
jest.mock('@plone/volto/components/manage/Toolbar');
jest.mock('@plone/volto/components');

describe('UserGroupMembershipControlPanel', () => {
  it('renders a user group membership control component', () => {
    const store = mockStore({
      controlpanels: {
        controlpanel: {
          data: {
            many_users: false,
            many_groups: false,
          },
        },
      },
      groups: {
        groups: [
          {
            id: 'bern',
            title: 'Group Bern',
          },
        ],
        filter_groups: [
          {
            id: 'bern',
            title: 'Group Bern',
          },
        ],
      },
      users: {
        users: [
          {
            id: 'bob-dabolina',
            fullname: 'Bob Dabolina',
            '@id': 'http://localhost:8080/Plone/people/bob-dabolina',
          },
        ],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <UserGroupMembershipControlPanel />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
