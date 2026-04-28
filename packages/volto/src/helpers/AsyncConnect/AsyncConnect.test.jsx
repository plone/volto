import { Provider, connect } from 'react-redux';
import { withRouter, StaticRouter, MemoryRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { createStore, combineReducers } from 'redux';
import { render, act } from '@testing-library/react';

import {
  endGlobalLoad,
  beginGlobalLoad,
} from '@plone/volto/actions/asyncConnect/asyncConnect';
import reduxAsyncConnect from '@plone/volto/reducers/asyncConnect/asyncConnect';

import { AsyncConnectWithContext, AsyncConnect } from './AsyncConnect';
import { asyncConnect, loadOnServer } from './';
import { matchAllRoutes } from './utils';

describe('<ReduxAsyncConnect />', () => {
  const initialEmptyState = {
    router: {
      location: {
        pathname: '/',
      },
    },
  };

  const initialState = {
    router: {
      location: {
        pathname: '/',
      },
    },
    reduxAsyncConnect: {
      loaded: false,
      loadState: {},
      $$external: 'supported',
    },
  };

  const routerReducer = (state, action) => {
    return {
      location: {
        pathname: '/',
      },
    };
  };

  const endGlobalLoadSpy = vi.fn(() => endGlobalLoad());
  const beginGlobalLoadSpy = vi.fn(() => beginGlobalLoad());

  const ReduxAsyncConnect = withRouter(
    connect(null, {
      beginGlobalLoad: beginGlobalLoadSpy,
      endGlobalLoad: endGlobalLoadSpy,
    })(AsyncConnectWithContext),
  );

  const App = ({
    history,
    location,
    params,
    route,
    router,
    routeParams,
    routes,
    externalState,
    remappedProp,
    staticContext,
    lunch,
    dispatch,
    ...rest
  }) => (
    <div
      data-testid="App"
      {...rest}
      external-state={externalState}
      remapped-prop={remappedProp}
    >
      {lunch}
    </div>
  );

  const MultiAppA = ({ route, breakfast, ...rest }) => (
    <div data-testid="MultiAppA">
      <div>{breakfast}</div>
      {renderRoutes(route.routes)}
    </div>
  );

  const MultiAppB = ({ dinner, ...rest }) => (
    <div data-testid="MultiAppB">{dinner}</div>
  );

  const UnwrappedApp = ({ route }) => (
    <div data-testid="UnwrappedApp">
      {'Hi, I do not use @asyncConnect'}
      {renderRoutes(route.routes)}
    </div>
  );

  const WrappedApp = asyncConnect(
    [
      {
        key: 'lunch',
        promise: () => Promise.resolve('sandwich'),
      },
      {
        key: 'action',
        promise: ({ helpers }) => Promise.resolve(helpers.eat()),
      },
    ],
    (state, ownProps) => ({
      externalState: state.reduxAsyncConnect.$$external,
      remappedProp: ownProps.route.remap,
    }),
  )(App);

  let serial = 0;
  const WrappedAppA = asyncConnect(
    [
      {
        key: 'breakfast',
        promise: () => Promise.resolve('omelette'),
      },
      {
        key: 'action',
        promise: ({ helpers }) => Promise.resolve(helpers.eat('breakfast')),
      },
      {
        key: 'multitest',
        promise: () => serial++,
      },
      {
        key: 'multitest',
        promise: () => serial++,
      },
      {
        key: 'multitest',
        promise: () => serial++,
      },
    ],
    (state) => ({
      externalState: state.reduxAsyncConnect.$$external,
    }),
  )(MultiAppA);

  const WrappedAppB = asyncConnect(
    [
      {
        key: 'dinner',
        promise: () => Promise.resolve('chicken'),
      },
      {
        key: 'action',
        promise: ({ helpers }) => Promise.resolve(helpers.eat('dinner')),
      },
    ],
    (state) => ({
      externalState: state.reduxAsyncConnect.$$external,
    }),
  )(MultiAppB);

  const routes = [
    {
      path: '/',
      exact: true,
      component: WrappedApp,
      remap: 'on',
    },
    {
      path: '/notconnected',
      component: UnwrappedApp,
    },
    {
      path: '/multi',
      component: WrappedAppA,
      routes: [
        {
          path: '/multi',
          exact: true,
          component: UnwrappedApp,
          routes: [{ component: WrappedAppB }],
        },
      ],
    },
  ];

  const reducers = combineReducers({
    reduxAsyncConnect,
    router: routerReducer,
  });

  let testState;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('properly fetches data on the server', async () => {
    const store = createStore(reducers, initialEmptyState);
    const eat = vi.fn(() => 'yammi');
    const helpers = { eat };
    const location = { pathname: '/' };

    await loadOnServer({
      store,
      location,
      routes,
      helpers,
    });
    const context = {};

    const { getByTestId } = await act(async () => {
      return render(
        <Provider store={store} key="provider">
          <MemoryRouter>
            <ReduxAsyncConnect routes={routes} helpers={{ eat }} />
          </MemoryRouter>
        </Provider>,
      );
    });

    if (context.url) {
      throw new Error('redirected');
    }

    const app = getByTestId('App');
    expect(app).toHaveAttribute('action', 'yammi');
    expect(app).toHaveTextContent('sandwich');

    testState = store.getState();
    expect(testState.reduxAsyncConnect.loaded).toBe(true);
    expect(testState.reduxAsyncConnect.lunch).toBe('sandwich');
    expect(testState.reduxAsyncConnect.action).toBe('yammi');
    expect(testState.reduxAsyncConnect.loadState.lunch.loading).toBe(false);
    expect(testState.reduxAsyncConnect.loadState.lunch.loaded).toBe(true);
    expect(testState.reduxAsyncConnect.loadState.lunch.error).toBe(null);

    expect(eat).toHaveBeenCalledTimes(1);
    expect(endGlobalLoadSpy).not.toHaveBeenCalled();
    expect(beginGlobalLoadSpy).not.toHaveBeenCalled();
  });

  it('properly picks data up from the server', async () => {
    const store = createStore(reducers, testState);
    const proto = AsyncConnect.prototype;
    const eat = vi.fn(() => 'yammi');

    const spyLoadAsyncData = vi.spyOn(proto, 'loadAsyncData');
    const spyComponentDidMount = vi.spyOn(proto, 'componentDidMount');

    const { getByTestId } = await act(async () => {
      return render(
        <Provider store={store} key="provider">
          <MemoryRouter>
            <ReduxAsyncConnect routes={routes} helpers={{ eat }} />
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(spyLoadAsyncData).not.toHaveBeenCalled();
    expect(spyComponentDidMount).toHaveBeenCalledTimes(1);
    expect(eat).not.toHaveBeenCalled();

    const app = getByTestId('App');
    expect(app).toHaveTextContent('sandwich');

    expect(endGlobalLoadSpy).not.toHaveBeenCalled();
    expect(beginGlobalLoadSpy).not.toHaveBeenCalled();
  });

  it("loads data on client side when it wasn't provided by server", async () => {
    const store = createStore(reducers);
    const eat = vi.fn(() => 'yammi');
    const proto = AsyncConnect.prototype;

    const spyLoadAsyncData = vi.spyOn(proto, 'loadAsyncData');
    const spyComponentDidMount = vi.spyOn(proto, 'componentDidMount');
    await act(async () => {
      render(
        <Provider store={store} key="provider">
          <MemoryRouter>
            <ReduxAsyncConnect routes={routes} helpers={{ eat }} />
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(spyLoadAsyncData).toHaveBeenCalledTimes(1);
    expect(spyComponentDidMount).toHaveBeenCalledTimes(1);
    expect(beginGlobalLoadSpy).toHaveBeenCalled();

    await spyLoadAsyncData.mock.results[0].value;
    expect(endGlobalLoadSpy).toHaveBeenCalled();
  });

  it('supports extended connect signature', async () => {
    const store = createStore(reducers, initialState);
    const eat = vi.fn(() => 'yammi');
    const proto = AsyncConnect.prototype;

    // Add spies for both methods
    const spyLoadAsyncData = vi.spyOn(proto, 'loadAsyncData');
    const spyComponentDidMount = vi.spyOn(proto, 'componentDidMount');

    const { getByTestId } = await act(async () => {
      return render(
        <Provider store={store} key="provider">
          <MemoryRouter>
            <ReduxAsyncConnect routes={routes} helpers={{ eat }} />
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(spyLoadAsyncData).toHaveBeenCalledTimes(1);
    expect(spyComponentDidMount).toHaveBeenCalledTimes(1);
    expect(beginGlobalLoadSpy).toHaveBeenCalled();

    await spyLoadAsyncData.mock.results[0].value;
    expect(endGlobalLoadSpy).toHaveBeenCalled();

    const app = getByTestId('App');
    expect(app).toHaveTextContent('sandwich');
    expect(app).toHaveAttribute('external-state', 'supported');
    expect(app).toHaveAttribute('remapped-prop', 'on');
    expect(app).toHaveTextContent('sandwich');
  });

  it('renders even when no component is connected', async () => {
    const store = createStore(reducers);
    const eat = vi.fn(() => 'yammi');
    const location = { pathname: '/notconnected' };
    const helpers = { eat };

    await loadOnServer({
      store,
      location,
      routes,
      helpers,
    });

    const context = {};

    const { getByTestId } = await act(async () => {
      return render(
        <Provider store={store} key="provider">
          <StaticRouter location={location} context={context}>
            <ReduxAsyncConnect routes={routes} helpers={helpers} />
          </StaticRouter>
        </Provider>,
      );
    });

    if (context.url) {
      throw new Error('redirected');
    }

    const app = getByTestId('UnwrappedApp');
    expect(app).toHaveTextContent('Hi, I do not use @asyncConnect');

    testState = store.getState();
    expect(testState.reduxAsyncConnect.loaded).toBe(true);
    expect(testState.reduxAsyncConnect.lunch).toBe(undefined);
    expect(eat).not.toHaveBeenCalled();

    expect(endGlobalLoadSpy).not.toHaveBeenCalled();
    expect(beginGlobalLoadSpy).not.toHaveBeenCalled();
  });

  it('properly fetches data in the correct order given a nested routing structure', async () => {
    const store = createStore(reducers);
    const promiseOrder = [];
    const eat = vi.fn((meal) => {
      promiseOrder.push(meal);
      return `yammi ${meal}`;
    });
    const location = { pathname: '/multi' };
    const helpers = { eat };

    await loadOnServer({
      store,
      routes,
      location,
      helpers,
    });

    const context = {};

    const { container } = await act(async () => {
      return render(
        <Provider store={store} key="provider">
          <StaticRouter location={location} context={context}>
            <ReduxAsyncConnect routes={routes} helpers={helpers} />
          </StaticRouter>
        </Provider>,
      );
    });

    if (context.url) {
      throw new Error('redirected');
    }

    expect(container).toHaveTextContent('omelette');
    expect(container).toHaveTextContent('chicken');

    testState = store.getState();
    expect(testState.reduxAsyncConnect.loaded).toBe(true);
    expect(testState.reduxAsyncConnect.breakfast).toBe('omelette');
    expect(testState.reduxAsyncConnect.dinner).toBe('chicken');
    expect(testState.reduxAsyncConnect.action).toBe('yammi dinner');
    expect(testState.reduxAsyncConnect.loadState.dinner.loading).toBe(false);
    expect(testState.reduxAsyncConnect.loadState.dinner.loaded).toBe(true);
    expect(testState.reduxAsyncConnect.loadState.dinner.error).toBe(null);
    expect(testState.reduxAsyncConnect.loadState.breakfast.loading).toBe(false);
    expect(testState.reduxAsyncConnect.loadState.breakfast.loaded).toBe(true);
    expect(testState.reduxAsyncConnect.loadState.breakfast.error).toBe(null);
    expect(eat).toHaveBeenCalledTimes(2);

    expect(promiseOrder).toEqual(['breakfast', 'dinner']);

    expect(endGlobalLoadSpy).not.toHaveBeenCalled();
    expect(beginGlobalLoadSpy).not.toHaveBeenCalled();
  });

  it('Doesnt call same extender twice', async () => {
    const store = createStore(reducers);
    const promiseOrder = [];
    const eat = vi.fn((meal) => {
      promiseOrder.push(meal);
      return `yammi ${meal}`;
    });
    const location = { pathname: '/multi' };
    const helpers = { eat };
    serial = 0;

    await loadOnServer({
      store,
      routes,
      location,
      helpers,
    });

    const context = {};
    await act(async () => {
      render(
        <Provider store={store} key="provider">
          <StaticRouter location={location} context={context}>
            <ReduxAsyncConnect routes={routes} helpers={helpers} />
          </StaticRouter>
        </Provider>,
      );
    });

    expect(serial).toBe(1);
  });
  it('Matches multiple asyncPropExtenders', function () {
    const routes = [
      {
        key: 'nav',
        path: '/',
      },
      {
        key: 'footer',
        path: '/',
      },
      {
        key: 'breads',
        path: '/something',
      },
    ];
    const match = matchAllRoutes(routes, '/en');
    expect(match.length).toBe(2);
    expect(match.map(({ route }) => route.key)).toStrictEqual([
      'nav',
      'footer',
    ]);
  });
});
