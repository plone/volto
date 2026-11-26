import actions from './actions';
import {
  GET_CONTENT,
  LIST_ACTIONS,
  LOGOUT,
} from '@plone/volto/constants/ActionTypes';
import config from '@plone/volto/registry';

describe('Actions reducer', () => {
  it('should return the initial state', () => {
    expect(actions()).toEqual({
      error: null,
      actions: {
        object: [],
        object_buttons: [],
        site_actions: [],
        user: [],
        document_actions: [],
        portal_tabs: [],
      },
      loaded: false,
      loading: false,
    });
  });

  it('should handle LIST_ACTIONS_PENDING', () => {
    expect(
      actions(undefined, {
        type: `${LIST_ACTIONS}_PENDING`,
      }),
    ).toEqual({
      error: null,
      actions: {
        object: [],
        object_buttons: [],
        site_actions: [],
        user: [],
        document_actions: [],
        portal_tabs: [],
      },
      loaded: false,
      loading: true,
    });
  });

  it('should handle LIST_ACTIONS_SUCCESS', () => {
    expect(
      actions(undefined, {
        type: `${LIST_ACTIONS}_SUCCESS`,
        result: {
          object: [],
          object_buttons: [],
          site_actions: [],
          user: [
            {
              icon: '',
              id: 'preferences',
              title: 'Preferences',
            },
            {
              icon: '',
              id: 'dashboard',
              title: 'Dashboard',
            },
            {
              icon: '',
              id: 'plone_setup',
              title: 'Site Setup',
            },
            {
              icon: '',
              id: 'logout',
              title: 'Log out',
            },
          ],
          document_actions: [],
          portal_tabs: [],
        },
      }),
    ).toEqual({
      error: null,
      actions: {
        object: [],
        object_buttons: [],
        site_actions: [],
        user: [
          {
            icon: '',
            id: 'preferences',
            title: 'Preferences',
          },
          {
            icon: '',
            id: 'dashboard',
            title: 'Dashboard',
          },
          {
            icon: '',
            id: 'plone_setup',
            title: 'Site Setup',
          },
          {
            icon: '',
            id: 'logout',
            title: 'Log out',
          },
        ],
        document_actions: [],
        portal_tabs: [],
      },
      loaded: true,
      loading: false,
    });
  });

  it('should handle LIST_ACTIONS_FAIL', () => {
    expect(
      actions(undefined, {
        type: `${LIST_ACTIONS}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      actions: {},
      loaded: false,
      loading: false,
    });
  });
});

describe('Actions reducer - (ACTIONS)GET_CONTENT', () => {
  beforeEach(() => {
    config.settings.apiExpanders = [
      {
        match: '',
        GET_CONTENT: ['actions'],
      },
    ];
  });

  it('should handle (ACTIONS)GET_CONTENT', () => {
    expect(
      actions(undefined, {
        type: `${GET_CONTENT}_SUCCESS`,
        result: {
          '@components': {
            actions: {
              object: [],
              object_buttons: [],
              site_actions: [],
              user: [
                {
                  icon: '',
                  id: 'preferences',
                  title: 'Preferences',
                },
                {
                  icon: '',
                  id: 'dashboard',
                  title: 'Dashboard',
                },
                {
                  icon: '',
                  id: 'plone_setup',
                  title: 'Site Setup',
                },
                {
                  icon: '',
                  id: 'logout',
                  title: 'Log out',
                },
              ],
              document_actions: [],
              portal_tabs: [],
            },
          },
        },
      }),
    ).toEqual({
      error: null,
      actions: {
        object: [],
        object_buttons: [],
        site_actions: [],
        user: [
          {
            icon: '',
            id: 'preferences',
            title: 'Preferences',
          },
          {
            icon: '',
            id: 'dashboard',
            title: 'Dashboard',
          },
          {
            icon: '',
            id: 'plone_setup',
            title: 'Site Setup',
          },
          {
            icon: '',
            id: 'logout',
            title: 'Log out',
          },
        ],
        document_actions: [],
        portal_tabs: [],
      },
      loaded: true,
      loading: false,
    });
  });

  it('should handle (ACTIONS)LIST_ACTIONS (standalone with apiExpander enabled)', () => {
    expect(
      actions(undefined, {
        type: `${LIST_ACTIONS}_SUCCESS`,
        result: {
          object: [],
          object_buttons: [],
          site_actions: [],
          user: [
            {
              icon: '',
              id: 'preferences',
              title: 'Preferences',
            },
            {
              icon: '',
              id: 'dashboard',
              title: 'Dashboard',
            },
            {
              icon: '',
              id: 'plone_setup',
              title: 'Site Setup',
            },
            {
              icon: '',
              id: 'logout',
              title: 'Log out',
            },
          ],
          document_actions: [],
          portal_tabs: [],
        },
      }),
    ).toEqual({
      error: null,
      actions: {
        object: [],
        object_buttons: [],
        site_actions: [],
        user: [
          {
            icon: '',
            id: 'preferences',
            title: 'Preferences',
          },
          {
            icon: '',
            id: 'dashboard',
            title: 'Dashboard',
          },
          {
            icon: '',
            id: 'plone_setup',
            title: 'Site Setup',
          },
          {
            icon: '',
            id: 'logout',
            title: 'Log out',
          },
        ],
        document_actions: [],
        portal_tabs: [],
      },
      loaded: true,
      loading: false,
    });
  });
});

describe('Actions reducer on logout', () => {
  let apiExpanders;

  beforeEach(() => {
    apiExpanders = config.settings.apiExpanders;
    config.settings.apiExpanders = [{ match: '', GET_CONTENT: ['actions'] }];
  });

  afterEach(() => {
    config.settings.apiExpanders = apiExpanders;
  });

  const getAuthenticatedState = () =>
    actions(undefined, {
      type: `${GET_CONTENT}_SUCCESS`,
      result: {
        '@id': '/private',
        '@components': {
          actions: { object: [], user: [{ id: 'logout', title: 'Log out' }] },
        },
      },
    });

  it.each(['SUCCESS', 'FAIL'])(
    'should clear authenticated data on LOGOUT_%s even when the landing page returns 401',
    (status) => {
      const authenticatedState = getAuthenticatedState();
      expect(authenticatedState.loaded).toBe(true);

      const loggedOutState = actions(authenticatedState, {
        type: `${LOGOUT}_${status}`,
      });
      expect(loggedOutState).toEqual(actions());
      expect(
        actions(loggedOutState, {
          type: `${GET_CONTENT}_FAIL`,
          error: { status: 401 },
        }),
      ).toEqual(actions());
    },
  );

  it.each(['SUCCESS', 'FAIL'])(
    'should load anonymous data from content expanders after LOGOUT_%s',
    (status) => {
      const loggedOutState = actions(getAuthenticatedState(), {
        type: `${LOGOUT}_${status}`,
      });
      const publicData = {
        ...actions().actions,
        user: [{ id: 'login', title: 'Log in' }],
      };
      const result = actions(loggedOutState, {
        type: `${GET_CONTENT}_SUCCESS`,
        result: {
          '@id': '/public',
          '@components': { actions: publicData },
        },
      });

      expect(result).toEqual({
        ...actions(),
        actions: publicData,
        loaded: true,
      });
    },
  );
});
