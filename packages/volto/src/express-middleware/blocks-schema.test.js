import config from '@plone/volto/registry';

import blocksSchemaMiddleware, {
  clearValidatedTokens,
  fillPlaceholders,
  getSummary,
  toJSONSafe,
} from '@plone/volto/express-middleware/blocks-schema';

const { apiGet, docsFiles } = vi.hoisted(() => ({
  apiGet: vi.fn(),
  docsFiles: [],
}));
vi.mock('load-blocks-docs', () => ({ default: docsFiles }));
vi.mock('@plone/volto/helpers/Api/Api', () => ({
  default: class {
    get = apiGet;
  },
}));

// A JWT as Plone issues it; only its payload matters here.
const makeToken = (payload) =>
  `header.${btoa(JSON.stringify(payload))}.signature`;
const inAnHour = () => Math.floor(Date.now() / 1000) + 3600;
const editorToken = makeToken({ sub: 'editor', exp: inAnHour() });
const editor = { id: 'editor', roles: ['Editor'] };
const bearer = (token) => ({ Authorization: `Bearer ${token}` });

// The backend: it knows the editor, and nothing else.
async function backend(path) {
  if (path === '/@users/editor') return editor;
  throw Object.assign(new Error('Not Found'), { status: 404 });
}

// Replaces the *.block.md files the endpoint sees.
function setDocsFiles(files) {
  docsFiles.splice(0, docsFiles.length, ...files);
}

const BASE = 'http://localhost:3000';
const markdown = { accept: 'text/markdown' };

const docsFile = (block, text, variation) => ({
  block,
  ...(variation ? { variation } : {}),
  markdown: `---\nblock: ${block}\n${
    variation ? `variation: ${variation}\n` : ''
  }---\n\n${text}`,
});

async function invokeMiddleware({
  headers = {},
  query = {},
  url = '/@blocks-schema',
  cookies = { auth_token: editorToken },
}) {
  const middleware = blocksSchemaMiddleware();

  return await new Promise((resolve, reject) => {
    const req = {
      method: 'GET',
      protocol: 'http',
      url,
      originalUrl: url,
      headers: { host: 'localhost:3000', ...headers },
      query,
      universalCookies: { get: (name) => cookies[name] },
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
      send(text) {
        resolve({
          status: this.statusCode,
          headers: this.headers,
          text,
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
    clearValidatedTokens();
    apiGet.mockReset();
    apiGet.mockImplementation(backend);
    setDocsFiles([
      docsFile(
        'alpha',
        'The Alpha block,\nfor alpha content.\n\n### Example\n\nUse it.\n',
      ),
      docsFile('gamma', 'The Gamma block.'),
      docsFile('gamma', 'A fancier look.', 'fancy'),
    ]);
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
        gamma: {
          id: 'gamma',
          title: 'Gamma',
          blockSchema: null,
          variations: [
            { id: 'default', title: 'Default' },
            { id: 'fancy', title: 'Fancy' },
          ],
          docs: ({ blockConfig, markdown }) =>
            `${markdown} It has ${blockConfig.variations.length} variations.`,
        },
      },
    });
  });

  afterEach(() => {
    config.set('blocks', originalBlocks);
  });

  it('returns summary items that link to each block', async () => {
    const response = await invokeMiddleware({});

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      '@id': `${BASE}/@blocks-schema`,
      items: [
        {
          '@id': `${BASE}/@blocks-schema/alpha`,
          id: 'alpha',
          title: 'Alpha',
          description: 'The Alpha block, for alpha content.',
        },
        {
          '@id': `${BASE}/@blocks-schema/beta`,
          id: 'beta',
          title: 'Beta',
        },
        {
          '@id': `${BASE}/@blocks-schema/gamma`,
          id: 'gamma',
          title: 'Gamma',
          description: 'The Gamma block. It has 2 variations.',
        },
      ],
      items_total: 3,
    });
  });

  it('returns the docs and schema of a block at its link', async () => {
    const { body } = await invokeMiddleware({});
    const details = [];
    for (const item of body.items) {
      const response = await invokeMiddleware({
        url: item['@id'].slice(BASE.length),
      });
      expect(response.status).toBe(200);
      details.push(response.body);
    }

    expect(details).toEqual([
      {
        '@id': `${BASE}/@blocks-schema/alpha`,
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
        '@id': `${BASE}/@blocks-schema/beta`,
        id: 'beta',
        title: 'Beta',
        docs: '',
        schema: null,
      },
      {
        '@id': `${BASE}/@blocks-schema/gamma`,
        id: 'gamma',
        title: 'Gamma',
        docs: 'The Gamma block. It has 2 variations.',
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
    ]);
  });

  it('builds the links from the URL the client called', async () => {
    const response = await invokeMiddleware({
      url: '/@blocks-schema/alpha?lang=en',
      headers: {
        host: 'www.example.com',
        'x-forwarded-proto': 'https, http',
      },
    });

    expect(response.body['@id']).toBe(
      'https://www.example.com/@blocks-schema/alpha',
    );
  });

  it('links each block by its key in the blocks configuration', async () => {
    config.blocks.blocksConfig.renamed = {
      ...config.blocks.blocksConfig.beta,
      id: 'other',
    };

    const { body } = await invokeMiddleware({});

    expect(body.items[3]['@id']).toBe(`${BASE}/@blocks-schema/renamed`);
  });

  it('reads the docs from the *.block.md files, without frontmatter', async () => {
    const response = await invokeMiddleware({
      url: '/@blocks-schema/alpha',
    });

    expect(response.body.docs).toBe(
      'The Alpha block,\nfor alpha content.\n\n### Example\n\nUse it.',
    );
  });

  it('falls back to the file when docs() throws or returns no string', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    config.blocks.blocksConfig.alpha.docs = () => ({ description: 'Object' });
    config.blocks.blocksConfig.gamma.docs = () => {
      throw new Error('Docs failed');
    };

    const { body: alpha } = await invokeMiddleware({
      url: '/@blocks-schema/alpha',
    });
    const { body: gamma } = await invokeMiddleware({
      url: '/@blocks-schema/gamma',
    });

    expect(alpha.docs).toMatch(/^The Alpha block,/);
    expect(gamma.docs).toBe('The Gamma block.');
    expect(gamma.error).toBeUndefined();
    expect(consoleError).toHaveBeenCalledTimes(1);
    consoleError.mockRestore();
  });

  it('fills placeholders from the block configuration', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const blockConfig = {
      id: 'grid',
      allowedBlocks: ['image', 'teaser'],
      maxLength: 4,
      title: 'Grid',
      schema: {},
    };

    expect(
      fillPlaceholders(
        'Up to {{maxLength}} of {{ allowedBlocks }} in {{title}}.',
        blockConfig,
      ),
    ).toBe('Up to 4 of `image`, `teaser` in Grid.');
    expect(fillPlaceholders('Literal \\{{maxLength}}.', blockConfig)).toBe(
      'Literal {{maxLength}}.',
    );
    expect(fillPlaceholders('[{{missing}}] [{{schema}}]', blockConfig)).toBe(
      '[] []',
    );
    expect(warn).toHaveBeenCalledTimes(2);
    warn.mockRestore();
  });

  it('fills placeholders in the docs it returns', async () => {
    config.blocks.blocksConfig.beta.maxLength = 3;
    setDocsFiles([docsFile('beta', 'Holds up to {{maxLength}} blocks.')]);

    const response = await invokeMiddleware({ url: '/@blocks-schema/beta' });

    expect(response.body.docs).toBe('Holds up to 3 blocks.');
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

    it('reports the error on that block and still lists the others', async () => {
      const response = await invokeMiddleware({});

      expect(response.status).toBe(200);
      expect(response.body.items_total).toBe(5);

      const get = async (id) =>
        (await invokeMiddleware({ url: `/@blocks-schema/${id}` })).body;

      const broken = await get('broken');
      expect(broken.schema).toBeNull();
      expect(broken.error).toBe(
        'The schema for this block could not be resolved.',
      );

      const brokenEnhancer = await get('brokenEnhancer');
      expect(brokenEnhancer.schema).toBeNull();
      expect(brokenEnhancer.error).toBeDefined();

      const alpha = await get('alpha');
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

  describe('Markdown output', () => {
    const schema = (title, fields = []) => ({
      title,
      fieldsets: [],
      properties: Object.fromEntries(fields.map((f) => [f, { title: f }])),
      required: [],
    });

    beforeEach(() => {
      config.set('blocks', {
        ...config.blocks,
        blocksConfig: {
          listing: {
            id: 'listing',
            title: 'Listing',
            blockSchema: schema('Listing', ['headline']),
            variations: [
              { id: 'summary', title: 'Summary', isDefault: true },
              {
                id: 'gallery',
                title: 'Gallery',
                schemaEnhancer: ({ schema }) => ({
                  ...schema,
                  properties: { ...schema.properties, columns: {} },
                }),
              },
            ],
          },
          broken: {
            id: 'broken',
            title: 'Broken',
            blockSchema: () => {
              throw new Error('Broken');
            },
          },
          plain: { id: 'plain', title: 'Plain', blockSchema: null },
        },
      });
      setDocsFiles([
        docsFile(
          'listing',
          'Lists content.\n\n### Fields\n\n- `headline`: a heading.',
        ),
        docsFile('listing', 'Shows images.\nIn a grid.', 'gallery'),
      ]);
      vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('returns the list as Markdown, with a link to each block', async () => {
      const response = await invokeMiddleware({ headers: markdown });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe(
        'text/markdown; charset=utf-8',
      );
      expect(response.text).toMatch(/^# Blocks\n\n/);
      expect(response.text).toContain(
        `- [Listing](${BASE}/@blocks-schema/listing) (\`listing\`): Lists content.\n- [Broken](${BASE}/@blocks-schema/broken) (\`broken\`)\n- [Plain](${BASE}/@blocks-schema/plain) (\`plain\`)\n`,
      );
    });

    it('returns a block as Markdown', async () => {
      const response = await invokeMiddleware({
        url: '/@blocks-schema/listing',
        headers: markdown,
      });

      expect(response.text).toMatch(
        /^## Listing \(`listing`\)\n\nLists content.\n\n### Fields/,
      );
      expect(response.text).toContain(
        '### Variations\n\n- `summary`: Summary (default)\n- `gallery`: Gallery\n\n  Shows images.\n  In a grid.',
      );

      const broken = await invokeMiddleware({
        url: '/@blocks-schema/broken',
        headers: markdown,
      });
      expect(broken.text).toContain(
        '_The schema for this block could not be resolved._',
      );
    });

    it('has no format parameter', async () => {
      const response = await invokeMiddleware({ query: { format: 'md' } });
      expect(response.body.items_total).toBe(3);
    });

    it('lists a variation schema only when it differs from the block schema', async () => {
      const response = await invokeMiddleware({
        url: '/@blocks-schema/listing',
        headers: markdown,
      });

      expect(response.text).toContain('### Schema\n\n```json\n');
      expect(response.text).not.toContain('### Schema for `summary`');
      expect(response.text).toContain('### Schema for `gallery`');

      const schemas = [
        ...response.text.matchAll(/```json\n([\s\S]*?)\n```/g),
      ].map(([, json]) => JSON.parse(json));
      expect(Object.keys(schemas[0].properties)).toEqual(['headline']);
      expect(Object.keys(schemas[1].properties)).toEqual([
        'headline',
        'columns',
      ]);
    });

    it('negotiates on the Accept header, preferring JSON', async () => {
      const markdown = await invokeMiddleware({
        headers: { accept: 'text/markdown' },
      });
      expect(markdown.text).toMatch(/^# Blocks/);

      const json = await invokeMiddleware({
        headers: { accept: 'application/json, text/markdown' },
      });
      expect(json.body.items_total).toBe(3);

      const any = await invokeMiddleware({ headers: { accept: '*/*' } });
      expect(any.body.items_total).toBe(3);
    });

    it('returns a Markdown 404 for an unknown block', async () => {
      const response = await invokeMiddleware({
        url: '/@blocks-schema/missing',
        headers: markdown,
      });

      expect(response.status).toBe(404);
      expect(response.text).toBe("Block 'missing' is not registered.\n");
    });
  });

  describe('restricted blocks and the context path', () => {
    const page = {
      '@id': '/news',
      '@type': 'Document',
      title: 'News',
      '@components': { navroot: { navroot: { '@id': '/', title: 'Site' } } },
    };
    let onlyInFolders;

    beforeEach(() => {
      apiGet.mockImplementation(async (path) =>
        path === '/news' ? page : backend(path),
      );
      onlyInFolders = vi.fn(({ contentType }) => contentType !== 'Folder');
      config.set('blocks', {
        ...config.blocks,
        blocksConfig: {
          text: { id: 'text', title: 'Text', blockSchema: null },
          title: {
            id: 'title',
            title: 'Title',
            blockSchema: null,
            restricted: true,
          },
          folderish: {
            id: 'folderish',
            title: 'Folderish',
            blockSchema: null,
            restricted: onlyInFolders,
          },
        },
      });
    });

    it('flags restricted blocks in the root list', async () => {
      const response = await invokeMiddleware({});

      expect(apiGet).not.toHaveBeenCalledWith('/news', expect.anything());
      expect(response.body.items).toEqual([
        { '@id': `${BASE}/@blocks-schema/text`, id: 'text', title: 'Text' },
        {
          '@id': `${BASE}/@blocks-schema/title`,
          id: 'title',
          title: 'Title',
          restricted: true,
        },
        {
          '@id': `${BASE}/@blocks-schema/folderish`,
          id: 'folderish',
          title: 'Folderish',
          restricted: 'context',
        },
      ]);
    });

    it('notes restricted blocks in the root Markdown', async () => {
      const response = await invokeMiddleware({ headers: markdown });

      expect(response.text).toContain(
        `- [Title](${BASE}/@blocks-schema/title) (\`title\`) _Not offered in the block chooser._`,
      );
      expect(response.text).toContain(
        `- [Folderish](${BASE}/@blocks-schema/folderish) (\`folderish\`) _Offered depending on the content._`,
      );

      const title = await invokeMiddleware({
        url: '/@blocks-schema/title',
        headers: markdown,
      });
      expect(title.text).toContain(
        '## Title (`title`)\n\n_Not offered in the block chooser._',
      );
    });

    it('only lists the blocks offered for the content at the path', async () => {
      const response = await invokeMiddleware({
        url: '/news/@blocks-schema',
      });

      expect(apiGet).toHaveBeenCalledWith('/news', {
        params: { expand: 'navroot' },
        headers: bearer(editorToken),
      });
      expect(response.status).toBe(200);
      expect(response.headers['cache-control']).toBe(
        'private, max-age=0, must-revalidate',
      );
      expect(response.body['@id']).toBe(`${BASE}/news/@blocks-schema`);
      expect(response.body.items).toEqual([
        {
          '@id': `${BASE}/news/@blocks-schema/text`,
          id: 'text',
          title: 'Text',
        },
      ]);
    });

    it('gives restricted the same context as the block chooser', async () => {
      await invokeMiddleware({ url: '/news/@blocks-schema' });

      expect(apiGet).toHaveBeenCalledWith('/@users/editor', {
        headers: bearer(editorToken),
      });
      expect(onlyInFolders).toHaveBeenCalledWith({
        properties: page,
        block: config.blocks.blocksConfig.folderish,
        navRoot: { '@id': '/', title: 'Site' },
        contentType: 'Document',
        user: editor,
      });
    });

    it('says whether one block is restricted for the content', async () => {
      const response = await invokeMiddleware({
        url: '/news/@blocks-schema/folderish',
      });

      expect(response.body.id).toBe('folderish');
      expect(response.body.restricted).toBe(true);
    });

    it('treats a restricted function that throws as restricted', async () => {
      const consoleError = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      config.blocks.blocksConfig.folderish.restricted = () => {
        throw new Error('Needs the store');
      };

      const response = await invokeMiddleware({ url: '/news/@blocks-schema' });

      expect(response.body.items.map((item) => item.id)).toEqual(['text']);
      expect(consoleError).toHaveBeenCalled();
      consoleError.mockRestore();
    });

    it.each([
      [401, 'Unauthorized'],
      [403, 'Forbidden'],
      [404, 'Not Found'],
    ])('passes a backend %s through', async (status, type) => {
      apiGet.mockImplementation(async (path) => {
        if (path === '/private') {
          throw Object.assign(new Error(type), { status });
        }
        return backend(path);
      });

      const response = await invokeMiddleware({
        url: '/private/@blocks-schema',
      });

      expect(response.status).toBe(status);
      expect(response.body).toEqual({
        error: { type, message: "Could not get the content at '/private'." },
      });
    });
  });

  describe('authentication', () => {
    it('answers 401 without a token', async () => {
      const response = await invokeMiddleware({ cookies: {} });

      expect(response.status).toBe(401);
      expect(response.headers['www-authenticate']).toBe('Bearer');
      expect(response.headers['cache-control']).toBe('no-store');
      expect(response.body).toEqual({
        error: { type: 'Unauthorized', message: 'Authentication is required.' },
      });
      expect(apiGet).not.toHaveBeenCalled();
    });

    it('answers 401 in Markdown when Markdown is asked for', async () => {
      const response = await invokeMiddleware({
        cookies: {},
        headers: markdown,
      });

      expect(response.status).toBe(401);
      expect(response.text).toBe('Authentication is required.\n');
    });

    it('also answers 401 for a block before saying it does not exist', async () => {
      const response = await invokeMiddleware({
        cookies: {},
        url: '/@blocks-schema/missing',
      });

      expect(response.status).toBe(401);
    });

    it('accepts a Bearer header, which wins over the cookie', async () => {
      const agentToken = makeToken({ sub: 'editor', exp: inAnHour() });
      const response = await invokeMiddleware({
        headers: { authorization: `Bearer ${agentToken}` },
      });

      expect(response.status).toBe(200);
      expect(apiGet).toHaveBeenCalledWith('/@users/editor', {
        headers: bearer(agentToken),
      });
    });

    it.each([
      ['malformed', 'not-a-jwt'],
      ['expired', makeToken({ sub: 'editor', exp: 1 })],
      ['without a user', makeToken({ exp: inAnHour() })],
    ])('rejects a %s token without asking the backend', async (kind, token) => {
      const response = await invokeMiddleware({
        cookies: { auth_token: token },
      });

      expect(response.status).toBe(401);
      expect(apiGet).not.toHaveBeenCalled();
    });

    it.each([401, 403, 404])(
      'rejects a token when the backend answers %s for its user',
      async (status) => {
        apiGet.mockRejectedValue(Object.assign(new Error('No'), { status }));

        const response = await invokeMiddleware({});

        expect(response.status).toBe(401);
        expect(response.body.error.message).toBe(
          'The token is not valid or has expired.',
        );
      },
    );

    it('passes other backend errors on', async () => {
      apiGet.mockRejectedValue(
        Object.assign(new Error('Down'), { status: 502 }),
      );

      await expect(invokeMiddleware({})).rejects.toThrow('Down');
    });

    it('makes the responses private', async () => {
      const response = await invokeMiddleware({});

      expect(response.headers['cache-control']).toBe('private, max-age=300');
      expect(response.headers['vary']).toBe(
        'Accept, Accept-Language, Authorization, Cookie',
      );
    });

    describe('validated tokens', () => {
      afterEach(() => {
        vi.useRealTimers();
      });

      it('are remembered, so the backend is asked once', async () => {
        await invokeMiddleware({});
        await invokeMiddleware({ url: '/@blocks-schema/alpha' });

        expect(apiGet).toHaveBeenCalledTimes(1);
      });

      it('are asked again after a minute', async () => {
        vi.useFakeTimers();
        await invokeMiddleware({});
        vi.advanceTimersByTime(61 * 1000);
        await invokeMiddleware({});

        expect(apiGet).toHaveBeenCalledTimes(2);
      });

      it('are not remembered past the token expiry', async () => {
        vi.useFakeTimers();
        const soon = makeToken({
          sub: 'editor',
          exp: Math.floor(Date.now() / 1000) + 10,
        });
        await invokeMiddleware({ cookies: { auth_token: soon } });
        vi.advanceTimersByTime(11 * 1000);
        const response = await invokeMiddleware({
          cookies: { auth_token: soon },
        });

        expect(response.status).toBe(401);
        expect(apiGet).toHaveBeenCalledTimes(1);
      });

      it('are not remembered when invalid', async () => {
        apiGet.mockRejectedValueOnce(
          Object.assign(new Error('No'), { status: 401 }),
        );
        await invokeMiddleware({});
        const response = await invokeMiddleware({});

        expect(response.status).toBe(200);
        expect(apiGet).toHaveBeenCalledTimes(2);
      });
    });
  });
});
