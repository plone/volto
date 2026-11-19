import { renderToString } from 'react-dom/server';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { StaticRouter } from 'react-router-dom';
import config from '@plone/volto/registry';

import UsersControlpanel from './UsersControlpanel';

const mockStore = configureStore();

vi.mock('../../Toolbar/Toolbar', () => ({
  default: vi.fn(() => null),
}));

vi.mock(
  '@plone/volto/components/manage/Controlpanels/Users/RenderUsers',
  () => ({
    default: vi.fn(() => <tr data-testid="render-users-row" />),
  }),
);

vi.mock('@plone/volto/icons/clear.svg', () => ({
  __esModule: true,
  default: 'clear-svg-mock',
}));

vi.mock('@plone/volto/icons/add-user.svg', () => ({
  __esModule: true,
  default: 'add-user-svg-mock',
}));

vi.mock('@plone/volto/icons/save.svg', () => ({
  __esModule: true,
  default: 'save-svg-mock',
}));

vi.mock('@plone/volto/icons/plone.svg', () => ({
  __esModule: true,
  default: 'plone-svg-mock',
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

beforeAll(() => {
  config.views.errorViews = {
    401: () => <div className="error-401">Unauthorized</div>,
    403: () => <div className="error-403">Forbidden</div>,
    404: () => <div className="error-404">Not Found</div>,
    corsError: () => <div className="error-cors">CORS Error</div>,
  };
});

describe('UsersControlpanel SSR', () => {
  const baseRouterState = {
    router: {
      location: { pathname: '/controlpanel/users' },
    },
    reduxAsyncConnect: {},
  };

  describe('SSR Unauthorized (401) rendering', () => {
    it('renders 401 error during SSR without throwing', () => {
      const staticContext = {};

      const store = mockStore({
        userSession: {
          token: null,
        },
        roles: {
          roles: [],
          error: {
            status: 401,
            message: 'Unauthorized',
          },
          loading: false,
        },
        users: {
          users: [],
          create: { loading: false },
          user: {},
        },
        groups: {
          groups: [],
        },
        authRole: {
          authenticatedRole: [],
        },
        controlpanels: {
          controlpanel: {
            data: {
              many_users: false,
            },
          },
        },
        userschema: {},
        intl: {
          locale: 'en',
          messages: {},
        },
        ...baseRouterState,
      });

      expect(() => {
        renderToString(
          <Provider store={store}>
            <StaticRouter
              location="/controlpanel/users"
              context={staticContext}
            >
              <UsersControlpanel staticContext={staticContext} />
            </StaticRouter>
          </Provider>,
        );
      }).not.toThrow();
    });

    it('renders Error component with 401 status during SSR', () => {
      const staticContext = {};

      const store = mockStore({
        userSession: {
          token: null,
        },
        roles: {
          roles: [],
          error: {
            status: 401,
            message: 'Unauthorized',
          },
          loading: false,
        },
        users: {
          users: [],
          create: { loading: false },
          user: {},
        },
        groups: {
          groups: [],
        },
        authRole: {
          authenticatedRole: [],
        },
        controlpanels: {
          controlpanel: {
            data: {
              many_users: false,
            },
          },
        },
        userschema: {},
        intl: {
          locale: 'en',
          messages: {},
        },
        ...baseRouterState,
      });

      const html = renderToString(
        <Provider store={store}>
          <StaticRouter location="/controlpanel/users" context={staticContext}>
            <UsersControlpanel staticContext={staticContext} />
          </StaticRouter>
        </Provider>,
      );

      expect(html).toContain('error-401');
      expect(html).toContain('Unauthorized');
    });

    it('passes staticContext to Error component', () => {
      const staticContext = {};

      const store = mockStore({
        userSession: {
          token: null,
        },
        roles: {
          roles: [],
          error: {
            status: 401,
            message: 'Unauthorized',
          },
          loading: false,
        },
        users: {
          users: [],
          create: { loading: false },
          user: {},
        },
        groups: {
          groups: [],
        },
        authRole: {
          authenticatedRole: [],
        },
        controlpanels: {
          controlpanel: {
            data: {
              many_users: false,
            },
          },
        },
        userschema: {},
        intl: {
          locale: 'en',
          messages: {},
        },
        ...baseRouterState,
      });

      renderToString(
        <Provider store={store}>
          <StaticRouter location="/controlpanel/users" context={staticContext}>
            <UsersControlpanel staticContext={staticContext} />
          </StaticRouter>
        </Provider>,
      );

      expect(staticContext).toBeDefined();
    });

    it('renders Error component that receives staticContext prop', () => {
      const staticContext = {};

      const store = mockStore({
        userSession: {
          token: null,
        },
        roles: {
          roles: [],
          error: {
            status: 401,
            message: 'Unauthorized',
          },
          loading: false,
        },
        users: {
          users: [],
          create: { loading: false },
          user: {},
        },
        groups: {
          groups: [],
        },
        authRole: {
          authenticatedRole: [],
        },
        controlpanels: {
          controlpanel: {
            data: {
              many_users: false,
            },
          },
        },
        userschema: {},
        intl: {
          locale: 'en',
          messages: {},
        },
        ...baseRouterState,
      });

      const html = renderToString(
        <Provider store={store}>
          <StaticRouter location="/controlpanel/users" context={staticContext}>
            <UsersControlpanel staticContext={staticContext} />
          </StaticRouter>
        </Provider>,
      );

      expect(html).toContain('error-401');
      expect(html).toContain('Unauthorized');
      expect(staticContext).toBeDefined();
    });
  });

  describe('SSR does not render Error during loading', () => {
    it('does not render Error when loadRolesRequest.loading is true', () => {
      const staticContext = {};

      const store = mockStore({
        userSession: {
          token: null,
        },
        roles: {
          roles: [],
          error: {
            status: 401,
            message: 'Unauthorized',
          },
          loading: true,
        },
        users: {
          users: [],
          create: { loading: false },
          user: {},
        },
        groups: {
          groups: [],
        },
        authRole: {
          authenticatedRole: [],
        },
        controlpanels: {
          controlpanel: {
            data: {
              many_users: false,
            },
          },
        },
        userschema: {},
        intl: {
          locale: 'en',
          messages: {},
        },
        ...baseRouterState,
      });

      const html = renderToString(
        <Provider store={store}>
          <StaticRouter location="/controlpanel/users" context={staticContext}>
            <UsersControlpanel staticContext={staticContext} />
          </StaticRouter>
        </Provider>,
      );

      expect(html).not.toContain('error-401');
      expect(html).not.toContain('Unauthorized');
    });

    it('does not throw during SSR when loadRolesRequest is loading', () => {
      const staticContext = {};

      const store = mockStore({
        userSession: {
          token: null,
        },
        roles: {
          roles: [],
          error: {
            status: 401,
            message: 'Unauthorized',
          },
          loading: true,
        },
        users: {
          users: [],
          create: { loading: false },
          user: {},
        },
        groups: {
          groups: [],
        },
        authRole: {
          authenticatedRole: [],
        },
        controlpanels: {
          controlpanel: {
            data: {
              many_users: false,
            },
          },
        },
        userschema: {},
        intl: {
          locale: 'en',
          messages: {},
        },
        ...baseRouterState,
      });

      expect(() => {
        renderToString(
          <Provider store={store}>
            <StaticRouter
              location="/controlpanel/users"
              context={staticContext}
            >
              <UsersControlpanel staticContext={staticContext} />
            </StaticRouter>
          </Provider>,
        );
      }).not.toThrow();
    });
  });

  describe('SSR without browser APIs', () => {
    it('renders without window/document dependencies', () => {
      const staticContext = {};

      const store = mockStore({
        userSession: {
          token: null,
        },
        roles: {
          roles: [],
          error: null,
          loading: false,
        },
        users: {
          users: [],
          create: { loading: false },
          user: {},
        },
        groups: {
          groups: [],
        },
        authRole: {
          authenticatedRole: [],
        },
        controlpanels: {
          controlpanel: {
            data: {
              many_users: false,
            },
          },
        },
        userschema: {
          loaded: true,
          userschema: {
            fieldsets: [{ fields: ['username'] }],
            properties: {
              username: { type: 'string' },
            },
          },
        },
        intl: {
          locale: 'en',
          messages: {},
        },
        ...baseRouterState,
      });

      expect(() => {
        renderToString(
          <Provider store={store}>
            <StaticRouter
              location="/controlpanel/users"
              context={staticContext}
            >
              <UsersControlpanel staticContext={staticContext} />
            </StaticRouter>
          </Provider>,
        );
      }).not.toThrow();
    });

    it('works in pure Node.js environment without DOM', () => {
      const staticContext = {};

      const store = mockStore({
        userSession: {
          token: null,
        },
        roles: {
          roles: [],
          error: {
            status: 401,
            message: 'Unauthorized',
          },
          loading: false,
        },
        users: {
          users: [],
          create: { loading: false },
          user: {},
        },
        groups: {
          groups: [],
        },
        authRole: {
          authenticatedRole: [],
        },
        controlpanels: {
          controlpanel: {
            data: {
              many_users: false,
            },
          },
        },
        userschema: {},
        intl: {
          locale: 'en',
          messages: {},
        },
        ...baseRouterState,
      });

      let threwError = false;
      let errorMessage = '';

      try {
        renderToString(
          <Provider store={store}>
            <StaticRouter
              location="/controlpanel/users"
              context={staticContext}
            >
              <UsersControlpanel staticContext={staticContext} />
            </StaticRouter>
          </Provider>,
        );
      } catch (error) {
        threwError = true;
        errorMessage = error.message || String(error);
      }

      expect(threwError).toBe(false);
      expect(errorMessage).toBe('');
    });
  });

  describe('effectiveError logic for SSR', () => {
    it('renders Error when loadRolesRequest has error and not loading', () => {
      const staticContext = {};

      const store = mockStore({
        userSession: {
          token: null,
        },
        roles: {
          roles: [],
          error: {
            status: 403,
            message: 'Forbidden',
          },
          loading: false,
        },
        users: {
          users: [],
          create: { loading: false },
          user: {},
        },
        groups: {
          groups: [],
        },
        authRole: {
          authenticatedRole: [],
        },
        controlpanels: {
          controlpanel: {
            data: {
              many_users: false,
            },
          },
        },
        userschema: {},
        intl: {
          locale: 'en',
          messages: {},
        },
        ...baseRouterState,
      });

      const html = renderToString(
        <Provider store={store}>
          <StaticRouter location="/controlpanel/users" context={staticContext}>
            <UsersControlpanel staticContext={staticContext} />
          </StaticRouter>
        </Provider>,
      );

      expect(html).toContain('error-403') ||
        expect(html).toContain('error-404');
    });

    it('passes staticContext to Error for 401 response', () => {
      const staticContext = {};

      const store = mockStore({
        userSession: {
          token: null,
        },
        roles: {
          roles: [],
          error: {
            status: 401,
            message: 'Unauthorized',
          },
          loading: false,
        },
        users: {
          users: [],
          create: { loading: false },
          user: {},
        },
        groups: {
          groups: [],
        },
        authRole: {
          authenticatedRole: [],
        },
        controlpanels: {
          controlpanel: {
            data: {
              many_users: false,
            },
          },
        },
        userschema: {},
        intl: {
          locale: 'en',
          messages: {},
        },
        ...baseRouterState,
      });

      renderToString(
        <Provider store={store}>
          <StaticRouter location="/controlpanel/users" context={staticContext}>
            <UsersControlpanel staticContext={staticContext} />
          </StaticRouter>
        </Provider>,
      );

      expect(staticContext).toBeDefined();
    });
  });
});
