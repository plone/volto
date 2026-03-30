import config from '@plone/volto/registry';
import blocksSchemaMiddleware from '@plone/volto/express-middleware/blocks-schema';

function parseCookies(cookieHeader = '') {
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [key, ...rest] = item.split('=');
        return [key, rest.join('=')];
      }),
  );
}

async function invokeMiddleware({ headers = {} }) {
  const cookies = parseCookies(headers.Cookie || headers.cookie || '');
  const middleware = blocksSchemaMiddleware();

  return await new Promise((resolve, reject) => {
    const req = {
      method: 'GET',
      url: '/@blocks-schema',
      originalUrl: '/@blocks-schema',
      headers,
      universalCookies: {
        get: (name) => cookies[name],
      },
    };
    const res = {
      locals: {
        store: {
          getState: () => ({
            intl: {
              locale: 'en',
              messages: {},
            },
          }),
        },
      },
      headers: {},
      statusCode: 200,
      set(name, value) {
        this.headers[name.toLowerCase()] = value;
        return this;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(body) {
        resolve({
          status: this.statusCode,
          headers: this.headers,
          body,
        });
        return this;
      },
    };

    middleware(req, res, (error) => {
      if (error) {
        reject(error);
        return;
      }

      reject(new Error('Middleware completed without a response.'));
    });
  });
}

describe('/@blocks-schema middleware', () => {
  const originalBlocks = config.blocks;

  beforeEach(() => {
    config.set('blocks', {
      ...originalBlocks,
      blocksConfig: {
        alpha: {
          id: 'alpha',
          title: 'Alpha',
          blockSchema: ({ intl }) => ({
            title: intl.formatMessage({
              id: 'alpha-schema',
              defaultMessage: 'Alpha schema',
            }),
            fieldsets: [],
            properties: {},
            required: [],
          }),
        },
        beta: {
          id: 'beta',
          title: 'Beta',
          blockSchema: null,
        },
      },
    });
  });

  afterEach(() => {
    config.set('blocks', originalBlocks);
  });

  it('returns 401 when no auth token is provided', async () => {
    const response = await invokeMiddleware({});

    expect(response.status).toBe(401);
    expect(response.headers['www-authenticate']).toBe('Bearer');
    expect(response.body).toEqual({
      error: {
        type: 'Unauthorized',
        message: 'Authentication credentials were not provided or are invalid.',
      },
    });
  });

  it('accepts Authorization bearer tokens', async () => {
    const response = await invokeMiddleware({
      headers: {
        authorization: 'Bearer test-token',
      },
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      '@id': '/@blocks-schema',
      items: [
        {
          id: 'alpha',
          title: 'Alpha',
          schema: {
            title: 'Alpha schema',
            fieldsets: [],
            properties: {},
            required: [],
          },
        },
        {
          id: 'beta',
          title: 'Beta',
          schema: null,
        },
      ],
      items_total: 2,
    });
  });

  it('accepts auth_token cookies', async () => {
    const response = await invokeMiddleware({
      headers: {
        cookie: 'auth_token=cookie-token',
      },
    });

    expect(response.status).toBe(200);
  });
});
