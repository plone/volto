import React from 'react';
import { Provider, connect } from 'react-redux';
import { withRouter, StaticRouter, MemoryRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { createStore, combineReducers } from 'redux';
import { render } from '@testing-library/react';

import { endGlobalLoad, beginGlobalLoad } from '@plone/volto/actions';
import reduxAsyncConnect from '@plone/volto/reducers/asyncConnect/asyncConnect';

import { AsyncConnectWithContext, AsyncConnect } from './AsyncConnect'; // , AsyncConnect
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

  const endGlobalLoadSpy = jest.fn(() => endGlobalLoad());
  const beginGlobalLoadSpy = jest.fn(() => beginGlobalLoad());

  const ReduxAsyncConnect = withRouter(
    connect(null, {
      beginGlobalLoad: beginGlobalLoadSpy,
      endGlobalLoad: endGlobalLoadSpy,
    })(AsyncConnectWithContext),
  );

  /* eslint-disable no-unused-vars */
  /* eslint-enable no-unused-vars */
  const App = ({
    // NOTE: use this as a reference of props passed to your component from router
    // these are the params that are passed from router
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
    // our param
    lunch,
    // react-redux dispatch prop
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

  const MultiAppA = ({
    route,
    // our param
    breakfast,
    // react-redux dispatch prop
    ...rest
  }) => (
    <div data-testid="MultiAppA">
      <div>{breakfast}</div>
      {renderRoutes(route.routes)}
    </div>
  );

  const MultiAppB = ({ dinner, ...rest }) => (
    <div data-testid="MultiAppB">{dinner}</div>
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

  const UnwrappedApp = ({ route }) => (
    <div data-testid="UnwrappedApp">
      {'Hi, I do not use @asyncConnect'}
      {renderRoutes(route.routes)}
    </div>
  );

  const reducers = combineReducers({
    reduxAsyncConnect,
    router: routerReducer,
  });

  /*
  const routes = (
    <Route path="/">
      <IndexRoute component={WrappedApp} remap="on" />
      <Route path="/notconnected" component={UnwrappedApp} />
      <Route path="/multi" component={WrappedAppA}>
        <IndexRoute components={{ compA: UnwrappedApp, compB: WrappedAppB }} />
      </Route>
    </Route>
  );
  */

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

  // inter-test state
  let testState;

  it('properly fetches data on the server', async () => {
    endGlobalLoadSpy.mockClear();
    beginGlobalLoadSpy.mockClear();

    const store = createStore(reducers, initialEmptyState);
    const eat = jest.fn(() => 'yammi');
    const helpers = { eat };
    const location = { pathname: '/' };

    await loadOnServer({
      store,
      location,
      routes,
      helpers,
    });
    const context = {};

    const { getByTestId } = render(
      <Provider store={store} key="provider">
        <StaticRouter location={location} context={context}>
          <ReduxAsyncConnect routes={routes} helpers={helpers} />
        </StaticRouter>
      </Provider>,
    );

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

    // global loader spy
    expect(endGlobalLoadSpy).not.toHaveBeenCalled();
    expect(beginGlobalLoadSpy).not.toHaveBeenCalled();
  });

  it('properly picks data up from the server', function test() {
    endGlobalLoadSpy.mockClear();
    beginGlobalLoadSpy.mockClear();

    const store = createStore(reducers, testState);
    const proto = AsyncConnect.prototype;
    const eat = jest.fn(() => 'yammi');

    const spyLoadAsyncData = jest.spyOn(proto, 'loadAsyncData');
    const spyComponentDidMount = jest.spyOn(proto, 'componentDidMount');

    const { getByTestId } = render(
      <Provider store={store} key="provider">
        <MemoryRouter>
          <ReduxAsyncConnect routes={routes} helpers={{ eat }} />
        </MemoryRouter>
      </Provider>,
    );

    expect(spyLoadAsyncData).not.toHaveBeenCalled();
    expect(spyComponentDidMount).toHaveBeenCalledTimes(1);

    expect(eat).not.toHaveBeenCalled();

    const app = getByTestId('App');
    expect(app).toHaveTextContent('sandwich');

    // global loader spy
    expect(endGlobalLoadSpy).not.toHaveBeenCalled();
    expect(beginGlobalLoadSpy).not.toHaveBeenCalled();

    spyLoadAsyncData.mockClear();
    spyComponentDidMount.mockClear();
  });

  it("loads data on client side when it wasn't provided by server", function test() {
    endGlobalLoadSpy.mockClear();
    beginGlobalLoadSpy.mockClear();
    const store = createStore(reducers);
    const eat = jest.fn(() => 'yammi');
    const proto = AsyncConnect.prototype;

    const spyLoadAsyncData = jest.spyOn(proto, 'loadAsyncData');
    const spyComponentDidMount = jest.spyOn(proto, 'componentDidMount');

    render(
      <Provider store={store} key="provider">
        <MemoryRouter>
          <ReduxAsyncConnect routes={routes} helpers={{ eat }} />
        </MemoryRouter>
      </Provider>,
    );

    expect(spyLoadAsyncData).toHaveBeenCalledTimes(1);
    expect(spyComponentDidMount).toHaveBeenCalledTimes(1);

    // global loader spy
    expect(beginGlobalLoadSpy).toHaveBeenCalled();
    beginGlobalLoadSpy.mockClear();

    return spyLoadAsyncData.mock.results[0].value.then(() => {
      expect(endGlobalLoadSpy).toHaveBeenCalled();
      endGlobalLoadSpy.mockClear();

      spyLoadAsyncData.mockClear();
      spyComponentDidMount.mockClear();
    });
  });

  it('supports extended connect signature', function test() {
    const store = createStore(reducers, initialState);
    const eat = jest.fn(() => 'yammi');
    const proto = AsyncConnect.prototype;

    const spyLoadAsyncData = jest.spyOn(proto, 'loadAsyncData');
    // const spyComponentDidMount = jest.spyOn(proto, 'componentDidMount');

    const { getByTestId } = render(
      <Provider store={store} key="provider">
        <MemoryRouter>
          <ReduxAsyncConnect routes={routes} helpers={{ eat }} />
        </MemoryRouter>
      </Provider>,
    );

    expect(proto.loadAsyncData).toHaveBeenCalledTimes(1);
    expect(proto.componentDidMount).toHaveBeenCalledTimes(1);

    // global loader spy
    expect(beginGlobalLoadSpy).toHaveBeenCalled();
    beginGlobalLoadSpy.mockClear();

    return spyLoadAsyncData.mock.results[0].value.then(() => {
      expect(endGlobalLoadSpy).toHaveBeenCalled();

      const app = getByTestId('App');
      expect(app).toHaveTextContent('sandwich');
      expect(app).toHaveAttribute('external-state', 'supported');
      expect(app).toHaveAttribute('remapped-prop', 'on');
      expect(app).toHaveTextContent('sandwich');

      endGlobalLoadSpy.mockClear();
      spyLoadAsyncData.mockClear();
    });
  });

  it('renders even when no component is connected', function test() {
    const store = createStore(reducers);
    const eat = jest.fn(() => 'yammi');
    const location = { pathname: '/notconnected' };
    const helpers = { eat };

    return loadOnServer({
      store,
      location,
      routes,
      helpers,
    }).then(() => {
      const context = {};

      const { getByTestId } = render(
        <Provider store={store} key="provider">
          <StaticRouter location={location} context={context}>
            <ReduxAsyncConnect routes={routes} helpers={helpers} />
          </StaticRouter>
        </Provider>,
      );

      if (context.url) {
        throw new Error('redirected');
      }

      const app = getByTestId('UnwrappedApp');
      expect(app).toHaveTextContent('Hi, I do not use @asyncConnect');

      testState = store.getState();
      expect(testState.reduxAsyncConnect.loaded).toBe(true);
      expect(testState.reduxAsyncConnect.lunch).toBe(undefined);
      expect(eat).not.toHaveBeenCalled();

      // global loader spy
      expect(endGlobalLoadSpy).not.toHaveBeenCalled();
      expect(beginGlobalLoadSpy).not.toHaveBeenCalled();

      endGlobalLoadSpy.mockClear();
      beginGlobalLoadSpy.mockClear();
    });
  });

  it('properly fetches data in the correct order given a nested routing structure', function test() {
    const store = createStore(reducers);
    const promiseOrder = [];
    const eat = jest.fn((meal) => {
      promiseOrder.push(meal);
      return `yammi ${meal}`;
    });
    const location = { pathname: '/multi' };
    const helpers = { eat };

    return loadOnServer({
      store,
      routes,
      location,
      helpers,
    }).then(() => {
      const context = {};

      const { container } = render(
        <Provider store={store} key="provider">
          <StaticRouter location={location} context={context}>
            <ReduxAsyncConnect routes={routes} helpers={helpers} />
          </StaticRouter>
        </Provider>,
      );

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
      expect(testState.reduxAsyncConnect.loadState.breakfast.loading).toBe(
        false,
      );
      expect(testState.reduxAsyncConnect.loadState.breakfast.loaded).toBe(true);
      expect(testState.reduxAsyncConnect.loadState.breakfast.error).toBe(null);
      expect(eat).toHaveBeenCalledTimes(2);

      expect(promiseOrder).toEqual(['breakfast', 'dinner']);

      // global loader spy
      expect(endGlobalLoadSpy).not.toHaveBeenCalled();
      expect(beginGlobalLoadSpy).not.toHaveBeenCalled();

      endGlobalLoadSpy.mockClear();
      beginGlobalLoadSpy.mockClear();
    });
  });

  it('Doesnt call same extender twice', function test() {
    const store = createStore(reducers);
    const promiseOrder = [];
    const eat = jest.fn((meal) => {
      promiseOrder.push(meal);
      return `yammi ${meal}`;
    });
    const location = { pathname: '/multi' };
    const helpers = { eat };
    serial = 0;

    return loadOnServer({
      store,
      routes,
      location,
      helpers,
    }).then(() => {
      const context = {};

      render(
        <Provider store={store} key="provider">
          <StaticRouter location={location} context={context}>
            <ReduxAsyncConnect routes={routes} helpers={helpers} />
          </StaticRouter>
        </Provider>,
      );
      expect(serial).toBe(1);
    });
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
