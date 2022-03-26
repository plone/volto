import config from '@plone/volto/registry';
import prefixPathRoot from './prefixPathRoot';

describe('prefixPathRoot', () => {
  it('does not do anything if no configured prefixPath', () => {
    const next = jest.fn();
    const history = jest.fn();
    const middleware = prefixPathRoot(history)({})(next);
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        location: {
          pathname: '/somewhere/else',
        },
      },
    };
    middleware(action);
    expect(next.mock.calls[0][0]).toBe(action);
    expect(history.mock.calls.length).toBe(0);
  });

  it('inserts prefix path', () => {
    config.settings.prefixPath = '/my-prefix/second-level';

    const next = jest.fn();
    const history = {
      push: jest.fn(),
    };
    const middleware = prefixPathRoot(history)({})(next);
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        location: {
          pathname: '/somewhere/else',
        },
      },
    };
    middleware(action);

    expect(next.mock.calls[0][0]).toBe(action);
    expect(history.push.mock.calls.length).toBe(1);
    expect(history.push.mock.calls[0][0]).toBe(
      '/my-prefix/second-level/somewhere/else',
    );
    expect(action.payload.location.pathname).toBe(
      '/my-prefix/second-level/somewhere/else',
    );

    delete config.settings.prefixPath;
  });
});
