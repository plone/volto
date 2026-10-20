import config from '@plone/volto/registry';
import blocksSchemaMiddleware, {
  getSummary,
  toJSONSafe,
} from '@plone/volto/express-middleware/blocks-schema';

async function invokeMiddleware({
  headers = {},
  query = {},
  url = '/@blocks-schema',
}) {
  const middleware = blocksSchemaMiddleware();

  return await new Promise((resolve, reject) => {
    const req = {
      method: 'GET',
      url,
      originalUrl: url,
      headers,
      query,
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
          docs: 'The Alpha block,\nfor alpha content.\n\n### Example\n\nUse it.\n',
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
            { id: 'fancy', title: 'Fancy', docs: 'A fancier look.' },
          ],
          docs: ({ blockConfig }) =>
            `The Gamma block, with ${blockConfig.variations.length} variations.`,
        },
      },
    });
  });

  afterEach(() => {
    config.set('blocks', originalBlocks);
  });

  it('is public and returns summary items without credentials', async () => {
    const response = await invokeMiddleware({});

    expect(response.status).toBe(200);
    expect(response.headers['cache-control']).toBe('public, max-age=300');
    expect(response.headers['vary']).toBe('Accept-Language');
    expect(response.body).toEqual({
      '@id': '/@blocks-schema',
      items: [
        {
          id: 'alpha',
          title: 'Alpha',
          description: 'The Alpha block, for alpha content.',
        },
        {
          id: 'beta',
          title: 'Beta',
        },
        {
          id: 'gamma',
          title: 'Gamma',
          description: 'The Gamma block, with 2 variations.',
        },
      ],
      items_total: 3,
    });
  });

  it('returns full details including docs and schema when ?full=1', async () => {
    const response = await invokeMiddleware({ query: { full: '1' } });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      '@id': '/@blocks-schema',
      items: [
        {
          id: 'alpha',
          title: 'Alpha',
          docs: 'The Alpha block,\nfor alpha content.\n\n### Example\n\nUse it.',
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
          docs: '',
          schema: null,
        },
        {
          id: 'gamma',
          title: 'Gamma',
          docs: 'The Gamma block, with 2 variations.',
          schema: null,
          variations: [
            { id: 'default', title: 'Default', isDefault: false, schema: null },
            {
              id: 'fancy',
              title: 'Fancy',
              isDefault: false,
              docs: 'A fancier look.',
              schema: null,
            },
          ],
        },
      ],
      items_total: 3,
    });
  });

  it('ignores docs that are not Markdown strings or that throw', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    config.blocks.blocksConfig.alpha.docs = { description: 'Old shape' };
    config.blocks.blocksConfig.gamma.docs = () => {
      throw new Error('Docs failed');
    };

    const response = await invokeMiddleware({ query: { full: '1' } });
    const [alpha, , gamma] = response.body.items;

    expect(alpha.docs).toBe('');
    expect(gamma.docs).toBe('');
    expect(gamma.schema).toBeNull();
    expect(gamma.error).toBeUndefined();
    expect(consoleError).toHaveBeenCalledTimes(1);
    consoleError.mockRestore();
  });

  it('uses the first paragraph of the docs as the summary', () => {
    expect(getSummary('')).toBe('');
    expect(getSummary('One line.')).toBe('One line.');
    expect(getSummary('Wrapped\n  first   paragraph.\n \nSecond.')).toBe(
      'Wrapped first   paragraph.',
    );
  });

  describe('when a block schema cannot be resolved', () => {
    let consoleError;

    beforeEach(() => {
      consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      config.set('blocks', {
        ...config.blocks,
        blocksConfig: {
          ...config.blocks.blocksConfig,
          broken: {
            id: 'broken',
            title: 'Broken',
            blockSchema: ({ props }) => ({
              title: props.navRoot.title,
              fieldsets: [],
              properties: {},
              required: [],
            }),
          },
          brokenEnhancer: {
            id: 'brokenEnhancer',
            title: 'Broken enhancer',
            blockSchema: {
              title: 'Broken enhancer',
              fieldsets: [],
              properties: {},
              required: [],
            },
            schemaEnhancer: () => {
              throw new Error('Enhancer failed');
            },
          },
        },
      });
    });

    afterEach(() => {
      consoleError.mockRestore();
    });

    it('reports the error on that block and still returns the others', async () => {
      const response = await invokeMiddleware({ query: { full: '1' } });

      expect(response.status).toBe(200);
      expect(response.body.items_total).toBe(5);

      const broken = response.body.items.find((item) => item.id === 'broken');
      expect(broken.schema).toBeNull();
      expect(broken.error).toBe(
        'The schema for this block could not be resolved.',
      );

      const brokenEnhancer = response.body.items.find(
        (item) => item.id === 'brokenEnhancer',
      );
      expect(brokenEnhancer.schema).toBeNull();
      expect(brokenEnhancer.error).toBeDefined();

      const alpha = response.body.items.find((item) => item.id === 'alpha');
      expect(alpha.schema.title).toBe('Alpha schema');
      expect(alpha.error).toBeUndefined();

      expect(consoleError).toHaveBeenCalledTimes(2);
    });

    it('returns the error in the detail route instead of failing', async () => {
      const response = await invokeMiddleware({
        url: '/@blocks-schema/broken',
      });

      expect(response.status).toBe(200);
      expect(response.body.schema).toBeNull();
      expect(response.body.error).toBeDefined();
    });
  });

  describe('with variations and schema enhancers', () => {
    const addField =
      (name) =>
      ({ schema }) => ({
        ...schema,
        properties: { ...schema.properties, [name]: { title: name } },
      });

    beforeEach(() => {
      config.set('blocks', {
        ...config.blocks,
        blocksConfig: {
          listing: {
            id: 'listing',
            title: 'Listing',
            blockSchema: ({ data }) => ({
              title: `Listing (${data.variation ?? 'none'})`,
              fieldsets: [],
              properties: { headline: { title: 'Headline' } },
              required: [],
            }),
            schemaEnhancer: addField('fromBlock'),
            variations: [
              {
                id: 'summary',
                title: 'Summary',
                isDefault: true,
                schemaEnhancer: addField('fromSummary'),
                template: () => null,
              },
              {
                id: 'imageGallery',
                title: 'Image gallery',
                schemaEnhancer: addField('fromGallery'),
                template: () => null,
              },
            ],
          },
        },
      });
    });

    it('applies the default variation and block enhancers to the top-level schema', async () => {
      const response = await invokeMiddleware({
        url: '/@blocks-schema/listing',
      });

      expect(Object.keys(response.body.schema.properties)).toEqual([
        'headline',
        'fromSummary',
        'fromBlock',
      ]);
    });

    it('returns each variation with its own enhanced schema and no config internals', async () => {
      const response = await invokeMiddleware({
        url: '/@blocks-schema/listing',
      });
      const [summary, gallery] = response.body.variations;

      expect(Object.keys(summary).sort()).toEqual([
        'id',
        'isDefault',
        'schema',
        'title',
      ]);
      expect(summary.isDefault).toBe(true);
      expect(summary.schema.title).toBe('Listing (summary)');
      expect(Object.keys(summary.schema.properties)).toEqual([
        'headline',
        'fromSummary',
        'fromBlock',
      ]);

      expect(gallery.isDefault).toBe(false);
      expect(gallery.schema.title).toBe('Listing (imageGallery)');
      expect(Object.keys(gallery.schema.properties)).toEqual([
        'headline',
        'fromGallery',
        'fromBlock',
      ]);
    });

    it('reports an error only on the variation whose enhancer throws', async () => {
      const consoleError = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      config.blocks.blocksConfig.listing.variations[1].schemaEnhancer = () => {
        throw new Error('Variation enhancer failed');
      };

      const response = await invokeMiddleware({
        url: '/@blocks-schema/listing',
      });
      const [summary, gallery] = response.body.variations;

      expect(response.body.schema).not.toBeNull();
      expect(summary.schema).not.toBeNull();
      expect(gallery.schema).toBeNull();
      expect(gallery.error).toBeDefined();
      consoleError.mockRestore();
    });
  });

  describe('schema serialization', () => {
    it('drops components, elements, functions and cycles from the schema', async () => {
      const Widget = () => null;
      const cyclic = { name: 'cyclic' };
      cyclic.self = cyclic;
      const shared = { title: 'Shared' };

      config.set('blocks', {
        ...config.blocks,
        blocksConfig: {
          custom: {
            id: 'custom',
            title: 'Custom',
            blockSchema: {
              title: 'Custom',
              fieldsets: [
                { id: 'default', title: 'Default', fields: ['a', 'b'] },
              ],
              properties: {
                a: {
                  title: 'A',
                  widget: Widget,
                  default: () => 'computed',
                  description: { $$typeof: Symbol.for('react.element') },
                  choices: [['x', 'X'], Widget, ['y', 'Y']],
                },
                b: {
                  title: 'B',
                  widget: 'object_browser',
                  memoized: {
                    $$typeof: Symbol.for('react.memo'),
                    type: Widget,
                  },
                  cyclic,
                },
                c: shared,
                d: shared,
              },
              required: [],
            },
          },
        },
      });

      const response = await invokeMiddleware({
        url: '/@blocks-schema/custom',
      });

      expect(response.body.schema.properties).toEqual({
        a: {
          title: 'A',
          choices: [
            ['x', 'X'],
            ['y', 'Y'],
          ],
        },
        b: {
          title: 'B',
          widget: 'object_browser',
          cyclic: { name: 'cyclic' },
        },
        c: { title: 'Shared' },
        d: { title: 'Shared' },
      });
    });

    it('keeps JSON values as they are', () => {
      const date = new Date('2026-10-20T00:00:00Z');
      expect(
        toJSONSafe({ s: 'x', n: 0, f: false, z: null, d: date, u: undefined }),
      ).toEqual({ s: 'x', n: 0, f: false, z: null, d: date.toJSON() });
    });
  });
});
