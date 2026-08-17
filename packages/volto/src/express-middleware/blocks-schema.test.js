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

async function invokeMiddleware({ headers = {}, query = {} }) {
  const cookies = parseCookies(headers.Cookie || headers.cookie || '');
  const middleware = blocksSchemaMiddleware();

  return await new Promise((resolve, reject) => {
    const req = {
      method: 'GET',
      url: '/@blocks-schema',
      originalUrl: '/@blocks-schema',
      headers,
      query,
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
          docs: {
            description: 'The Alpha block.',
            usage_notes: 'Use it for alpha content.',
            example: { '@type': 'alpha' },
          },
        },
        beta: {
          id: 'beta',
          title: 'Beta',
          blockSchema: null,
        },
        gamma: {
          id: 'gamma',
          title: 'Gamma',
          blockSchema: null,
          variations: [
            { id: 'default', title: 'Default' },
            { id: 'fancy', title: 'Fancy' },
          ],
          docs: () => ({
            description: 'The Gamma block.',
            usage_notes: 'Supports variations.',
            example: { '@type': 'gamma' },
            field_hints: {
              variation:
                "Required. See the 'variations' field for the list of registered variation IDs.",
            },
          }),
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

  it('accepts Authorization bearer tokens and returns summary items', async () => {
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
          description: 'The Alpha block.',
        },
        {
          id: 'beta',
          title: 'Beta',
        },
        {
          id: 'gamma',
          title: 'Gamma',
          description: 'The Gamma block.',
        },
      ],
      items_total: 3,
    });
  });

  it('returns full details including docs and schema when ?full=1', async () => {
    const response = await invokeMiddleware({
      headers: {
        authorization: 'Bearer test-token',
      },
      query: { full: '1' },
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      '@id': '/@blocks-schema',
      items: [
        {
          id: 'alpha',
          title: 'Alpha',
          docs: {
            description: 'The Alpha block.',
            usage_notes: 'Use it for alpha content.',
            example: { '@type': 'alpha' },
          },
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
          docs: {
            description: '',
            usage_notes: '',
            example: { '@type': 'beta' },
          },
          schema: null,
        },
        {
          id: 'gamma',
          title: 'Gamma',
          docs: {
            description: 'The Gamma block.',
            usage_notes: 'Supports variations.',
            example: { '@type': 'gamma' },
            field_hints: {
              variation:
                "Required. See the 'variations' field for the list of registered variation IDs.",
            },
          },
          schema: null,
          variations: [
            { id: 'default', title: 'Default' },
            { id: 'fancy', title: 'Fancy' },
          ],
        },
      ],
      items_total: 3,
    });
  });

  it('resolves function-valued docs at request time', async () => {
    const response = await invokeMiddleware({
      headers: { authorization: 'Bearer test-token' },
      query: { full: '1' },
    });

    const gamma = response.body.items.find((item) => item.id === 'gamma');
    expect(gamma.docs).toEqual({
      description: 'The Gamma block.',
      usage_notes: 'Supports variations.',
      example: { '@type': 'gamma' },
      field_hints: {
        variation:
          "Required. See the 'variations' field for the list of registered variation IDs.",
      },
    });
    expect(gamma.variations).toEqual([
      { id: 'default', title: 'Default' },
      { id: 'fancy', title: 'Fancy' },
    ]);
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
