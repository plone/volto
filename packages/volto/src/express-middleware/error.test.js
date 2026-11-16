import configureStore from 'redux-mock-store';
import errorMiddleware, { shouldLogError } from './error';

const mockStore = configureStore();
const intlStore = () => mockStore({ intl: { locale: 'en', messages: {} } });

const response = (locals = {}) => ({
  locals,
  headers: {},
  set(headers) {
    Object.assign(this.headers, headers);
  },
  status(code) {
    this.statusCode = code;
    return this;
  },
  send(body) {
    this.body = body;
  },
});

describe('error middleware', () => {
  let consoleError;

  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it('renders the error page with the store setupServer created', () => {
    const createStore = vi.fn();
    const res = response({ store: intlStore() });
    const err = Object.assign(new Error('Boom'), { status: 500 });
    errorMiddleware(createStore)(err, { url: '/page' }, res, () => {});
    expect(createStore).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(500);
    expect(res.body).toContain('<!doctype html>');
    expect(res.body).toContain('Boom');
  });

  it('creates a store when the error came before setupServer', () => {
    // A path Express cannot decode fails while the router matches it, so
    // setupServer never ran and res.locals has no store.
    const req = { url: '/%c0' };
    const createStore = vi.fn(() => intlStore());
    const res = response();
    const err = Object.assign(new URIError("Failed to decode param '%c0'"), {
      status: 400,
    });
    errorMiddleware(createStore)(err, req, res, () => {});
    expect(createStore).toHaveBeenCalledWith(req);
    expect(res.statusCode).toBe(400);
    expect(res.body).toContain('<!doctype html>');
  });

  it('does not log a client error, and logs a server error', () => {
    const res = response({ store: intlStore() });
    const badRequest = Object.assign(new URIError('bad'), { status: 400 });
    errorMiddleware(vi.fn())(badRequest, { url: '/%c0' }, res, () => {});
    // jsdom makes React warn about useLayoutEffect in a server render; what
    // matters is that the error itself is not logged.
    expect(consoleError).not.toHaveBeenCalledWith(badRequest);

    const serverError = new Error('Volto code failed');
    errorMiddleware(vi.fn())(serverError, { url: '/' }, res, () => {});
    expect(consoleError).toHaveBeenCalledWith(serverError);
    expect(res.statusCode).toBe(500);
  });
});

describe('shouldLogError', () => {
  it('logs errors without a status and server errors', () => {
    expect(shouldLogError(undefined)).toBe(true);
    expect(shouldLogError(500)).toBe(true);
    expect(shouldLogError(502)).toBe(true);
  });

  it('does not log redirects and client errors', () => {
    for (const status of [301, 302, 400, 401, 403, 404]) {
      expect(shouldLogError(status)).toBe(false);
    }
  });
});
