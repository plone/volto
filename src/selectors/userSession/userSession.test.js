import { loggedIn } from './userSession';
import { arrayWIdsToObject } from '@plone/volto/helpers/Utils/Utils';

describe('loggedIn selector', () => {
  it('if the initial state (no key), user is not logged in', () => {
    const actionsFromApi = {
      object: [],
      object_buttons: [],
      site_actions: [],
      user: [],
      document_actions: [],
      portal_tabs: [],
    };
    const actionsById = arrayWIdsToObject(actionsFromApi);

    const state = {
      actions: {
        actionsById,
      },
    };
    expect(loggedIn(state)).toEqual(false);
  });

  it('login actions are returned, user is not logged in', () => {
    const actionsFromApi = {
      object: [],
      object_buttons: [],
      site_actions: [],
      user: [
        {
          icon: '',
          id: 'login',
          title: 'Login',
        },
      ],
      document_actions: [],
      portal_tabs: [],
    };
    const actionsById = arrayWIdsToObject(actionsFromApi);

    const state = {
      actions: {
        actionsById,
      },
    };

    expect(loggedIn(state)).toEqual(false);
  });

  it('login actions are not returned, user is logged in', () => {
    const actionsFromApi = {
      object: [],
      object_buttons: [],
      site_actions: [],
      user: [
        {
          icon: '',
          id: 'logout',
          title: 'Logout',
        },
      ],
      document_actions: [],
      portal_tabs: [],
    };
    const actionsById = arrayWIdsToObject(actionsFromApi);

    const state = {
      actions: {
        actionsById,
      },
    };

    expect(loggedIn(state)).toEqual(true);
  });
});
