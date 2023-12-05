import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import UserGroupMembershipControlPanel from './UserGroupMembershipControlPanel';

const mockStore = configureStore();
jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
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
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <UserGroupMembershipControlPanel />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
