import apiMiddlewareFactory from './api';
import config from '@plone/volto/registry';
import { ADD_STATUS_MESSAGES } from '@plone/volto/constants/ActionTypes';

const getState = () => ({
  userSession: { token: null },
  content: { uploadedFiles: 0, get: {} },
  site: { data: {} },
  apierror: {},
});

const run = async (api) => {
  const dispatch = vi.fn();
  const next = vi.fn();
  await apiMiddlewareFactory(api)({ dispatch, getState })(next)({
    type: 'GET_CONTENT',
    request: { op: 'get', path: '/document' },
  }).catch(() => {});
  // The status messages are taken in a handler of the request promise.
  await new Promise((resolve) => setTimeout(resolve, 0));
  return dispatch;
};

describe('api middleware and status messages', () => {
  beforeEach(() => {
    config.settings.actions_raising_api_errors = [];
    config.settings.apiExpanders = [];
    document.cookie = 'statusmessages=; Max-Age=0; path=/';
  });

  it('takes the status messages that a request added', async () => {
    const api = {
      get: vi.fn(() => {
        document.cookie = 'statusmessages=AIVGb3V0ZXJyb3I%3D; path=/';
        return Promise.resolve({});
      }),
    };
    const dispatch = await run(api);
    expect(dispatch).toHaveBeenCalledWith({
      type: ADD_STATUS_MESSAGES,
      messages: [{ message: 'Fout', type: 'error' }],
    });
    expect(document.cookie).not.toContain('statusmessages');
  });

  it('also when the request failed', async () => {
    const api = {
      get: vi.fn(() => {
        document.cookie = 'statusmessages=AIVGb3V0ZXJyb3I%3D; path=/';
        return Promise.reject({ status: 400, response: { body: {} } });
      }),
    };
    const dispatch = await run(api);
    expect(dispatch).toHaveBeenCalledWith({
      type: ADD_STATUS_MESSAGES,
      messages: [{ message: 'Fout', type: 'error' }],
    });
  });

  it('dispatches nothing without status messages', async () => {
    const api = { get: vi.fn(() => Promise.resolve({})) };
    const dispatch = await run(api);
    expect(dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: ADD_STATUS_MESSAGES }),
    );
  });
});
