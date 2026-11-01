import express from 'express';
import { createIntl, createIntlCache } from 'react-intl';
import jwtDecode from 'jwt-decode';
// The *.block.md files of core and the add-ons, collected at build time.
// eslint-disable-next-line import/no-unresolved
import blocksDocs from 'load-blocks-docs';

import config from '@plone/volto/registry';
import Api from '@plone/volto/helpers/Api/Api';
import { isBlockRestricted } from '@plone/volto/helpers/Blocks/Blocks';
import { applySchemaEnhancer } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import { DEFAULT_DOCUMENT_MODEL } from '@plone/volto/config/documentModels';

const intlCache = createIntlCache();

function getIntl(res) {
  const intl = res.locals?.store?.getState?.().intl || {};

  return createIntl(
    {
      locale: intl.locale || 'en',
      messages: intl.messages || {},
    },
    intlCache,
  );
}

// Schemas may hold values that are not JSON: widget components, React
// elements, function defaults or validators. Drop them, and cut cycles, so the
// response only carries the serializable part of the schema.
export function toJSONSafe(value, ancestors = new WeakSet()) {
  if (value === null) return null;
  if (typeof value === 'function' || typeof value === 'symbol')
    return undefined;
  if (typeof value !== 'object') return value;
  if (value.$$typeof) return undefined;
  if (typeof value.toJSON === 'function') return value.toJSON();
  if (ancestors.has(value)) return undefined;

  ancestors.add(value);
  let result;
  if (Array.isArray(value)) {
    result = value
      .map((item) => toJSONSafe(item, ancestors))
      .filter((item) => item !== undefined);
  } else {
    result = {};
    for (const [key, item] of Object.entries(value)) {
      const safe = toJSONSafe(item, ancestors);
      if (safe !== undefined) result[key] = safe;
    }
  }
  ancestors.delete(value);
  return result;
}

function resolveSchema(blockConfig, intl, variation) {
  const { blockSchema, id } = blockConfig;
  if (!blockSchema) return null;

  const formData = variation ? { '@type': id, variation } : { '@type': id };
  const schema =
    typeof blockSchema === 'function'
      ? blockSchema({ data: formData, intl, props: { data: formData } })
      : blockSchema;
  if (!schema) return null;

  // Same enhancer chain as the block settings form: the selected (or default)
  // variation's schemaEnhancer, then the block's own schemaEnhancer.
  return applySchemaEnhancer({
    schema,
    formData,
    intl,
    blocksConfig: { [id]: blockConfig },
  });
}

// A schema that fails to resolve (for example an add-on schema that expects
// props only available in the editor) must not break the whole response.
function withSchema(target, blockConfig, intl, variation) {
  try {
    target.schema = toJSONSafe(resolveSchema(blockConfig, intl, variation));
  } catch (e) {
    const name = variation ? `${blockConfig.id}/${variation}` : blockConfig.id;
    // eslint-disable-next-line no-console
    console.error(
      `[blocks-schema] Could not resolve the schema for '${name}':`,
      e,
    );
    target.schema = null;
    target.error = 'The schema for this block could not be resolved.';
  }
  return target;
}

const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/;
const PLACEHOLDER = /(\\?)\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}/g;

// `{{key}}` in a block's docs is replaced with that key of its configuration,
// so the docs can say what the configuration allows. `\{{key}}` is literal.
export function fillPlaceholders(markdown, blockConfig, name = blockConfig.id) {
  return markdown.replace(PLACEHOLDER, (match, escaped, key) => {
    if (escaped) return match.slice(1);
    const value = blockConfig[key];
    if (Array.isArray(value)) {
      return value.map((item) => `\`${item}\``).join(', ');
    }
    if (['string', 'number', 'boolean'].includes(typeof value)) {
      return String(value);
    }
    // eslint-disable-next-line no-console
    console.warn(
      `[blocks-schema] The docs of '${name}' use {{${key}}}, which the block configuration doesn't have as a value.`,
    );
    return '';
  });
}

function getDocsFile(block, variation) {
  const file = blocksDocs.find(
    (item) => item.block === block && item.variation === variation,
  );
  return file ? file.markdown.replace(FRONTMATTER, '') : '';
}

// The docs of a block, or of one of its variations, come from its
// *.block.md file. A block's `docs` function can tailor them.
function resolveDocs(blockConfig, intl, variation) {
  const name = variation ? `${blockConfig.id}/${variation}` : blockConfig.id;
  const markdown = fillPlaceholders(
    getDocsFile(blockConfig.id, variation),
    blockConfig,
    name,
  ).trim();

  if (variation || typeof blockConfig.docs !== 'function') return markdown;
  try {
    const tailored = blockConfig.docs({ blockConfig, intl, markdown });
    return typeof tailored === 'string' ? tailored.trim() : markdown;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`[blocks-schema] docs() for '${name}' threw:`, e);
    return markdown;
  }
}

// The first paragraph of the docs is the block's summary.
export function getSummary(markdown) {
  const [first = ''] = markdown.split(/\n\s*\n/);
  return first.replace(/\s*\n\s*/g, ' ').trim();
}

// A document model can have native elements, such as the nodes of a Plate
// document, which aren't blocks. Their docs are `*.block.md` files whose
// frontmatter names an `element`, its `document_model`, and optionally its
// `title`.
function buildElementItem(file, url, full) {
  const docs = file.markdown.replace(FRONTMATTER, '').trim();
  const item = {
    '@id': url,
    id: file.element,
    title: file.title || file.element,
    kind: 'element',
  };
  if (full) {
    item.docs = docs;
    return item;
  }
  const description = getSummary(docs);
  if (description) {
    item.description = description;
  }
  return item;
}

// How content of a document model stores its blocks, from the `*.block.md`
// file whose frontmatter names that `document_model`.
function getDocumentDocs(documentModel) {
  const file = blocksDocs.find(
    (item) => item.document_model === documentModel.id,
  );
  return file ? file.markdown.replace(FRONTMATTER, '').trim() : '';
}

function buildSummaryItem(blockConfig, intl, url) {
  const item = {
    '@id': url,
    id: blockConfig.id,
    title: blockConfig.title,
    kind: 'block',
  };
  const description = getSummary(resolveDocs(blockConfig, intl));
  if (description) {
    item.description = description;
  }
  return item;
}

function buildFullDetail(blockConfig, intl, url) {
  const result = withSchema(
    {
      '@id': url,
      id: blockConfig.id,
      title: blockConfig.title,
      kind: 'block',
      docs: resolveDocs(blockConfig, intl),
    },
    blockConfig,
    intl,
  );

  if (blockConfig.variations?.length > 0) {
    result.variations = blockConfig.variations.map((variation) => {
      const item = {
        id: variation.id,
        title: variation.title,
        isDefault: Boolean(variation.isDefault),
      };
      const docs = resolveDocs(blockConfig, intl, variation.id);
      if (docs) {
        item.docs = docs;
      }
      return withSchema(item, blockConfig, intl, variation.id);
    });
  }

  return result;
}

// Responses need authentication, so they are private. Schema titles are
// translated, and the format depends on the Accept header. A context response
// also depends on the content, so it is not reused.
function setCacheHeaders(res, context) {
  res.set(
    'Cache-Control',
    context ? 'private, max-age=0, must-revalidate' : 'private, max-age=300',
  );
  res.set('Vary', 'Accept, Accept-Language, Authorization, Cookie');
}

// Markdown is returned when the client asks for `text/markdown` and not for
// JSON. JSON stays the default.
function wantsMarkdown(req) {
  const accept = req.headers?.accept || '';
  return (
    accept.includes('text/markdown') && !accept.includes('application/json')
  );
}

function sendMarkdown(res, markdown) {
  res.set('Content-Type', 'text/markdown; charset=utf-8');
  res.send(markdown);
}

const jsonBlock = (value) =>
  ['```json', JSON.stringify(value, null, 2), '```'].join('\n');

const SCHEMA_ERROR = '_The schema for this block could not be resolved._';

// One `##` section per block: its docs (which use `###` headings), its
// variations, and its schema. A variation's schema is only listed when it
// differs from the block's schema.
export function blockToMarkdown(detail) {
  const parts = [`## ${detail.title} (\`${detail.id}\`)`];

  if (detail.restricted === true) {
    parts.push('_Not offered in the block chooser._');
  } else if (detail.restricted === 'context') {
    parts.push(
      '_Whether it is offered in the block chooser depends on the content. Ask `/<path>/@blocks-schema` for a given content item._',
    );
  }

  if (detail.docs) parts.push(detail.docs);

  if (detail.variations?.length) {
    const items = detail.variations.map((variation) => {
      const item = `- \`${variation.id}\`: ${variation.title}${
        variation.isDefault ? ' (default)' : ''
      }`;
      return variation.docs
        ? `${item}\n\n${variation.docs.replace(/^(?=.)/gm, '  ')}`
        : item;
    });
    parts.push('### Variations', items.join('\n'));
  }

  if (detail.schema || detail.error) {
    parts.push(
      '### Schema',
      detail.error ? SCHEMA_ERROR : jsonBlock(detail.schema),
    );
  }

  const blockSchema = JSON.stringify(detail.schema);
  for (const variation of detail.variations || []) {
    if (variation.error) {
      parts.push(`### Schema for \`${variation.id}\``, SCHEMA_ERROR);
    } else if (
      variation.schema &&
      JSON.stringify(variation.schema) !== blockSchema
    ) {
      parts.push(
        `### Schema for \`${variation.id}\``,
        jsonBlock(variation.schema),
      );
    }
  }

  return parts.join('\n\n');
}

function itemToMarkdown(item) {
  let line = `- [${item.title}](${item['@id']}) (\`${item.id}\`)`;
  if (item.description) line += `: ${item.description}`;
  if (item.restricted === true) {
    line += ' _Not offered in the block chooser._';
  } else if (item.restricted === 'context') {
    line += ' _Offered depending on the content._';
  }
  return line;
}

// The list starts with the document format: how content stores its blocks,
// with the docs of its document model. It then links each item to its own
// URL, which has its docs and schema, with the elements of the document model,
// if it has any, before the blocks.
export function blocksToMarkdown(
  items,
  { documentModel, document, documentModels = [] } = {},
) {
  const parts = [
    '# Blocks',
    "The blocks available on this site, and how content stores them. Follow an item's link for its documentation and the schema of its settings.",
  ];

  if (documentModel) {
    parts.push(
      '## Document format',
      `_Document model \`${documentModel.id}\`, version ${documentModel.version}._`,
    );
    if (document) parts.push(document);
    const others = documentModels.filter(
      (model) => model.id !== documentModel.id,
    );
    if (others.length) {
      const list = others.map((model) => {
        const types = model.types?.length
          ? `, used by ${model.types.map((type) => `\`${type}\``).join(', ')}`
          : '';
        return `- \`${model.id}\`, version ${model.version}${types}`;
      });
      parts.push(
        'Some content types store their blocks with another document model. Ask `/<path>/@blocks-schema` for a content item, or `/@blocks-schema?type=<type>` for a content type, to get its document format and blocks.',
        list.join('\n'),
      );
    }
  }

  const elements = items.filter((item) => item.kind === 'element');
  const blocks = items.filter((item) => item.kind !== 'element');
  if (elements.length) {
    parts.push('## Elements', elements.map(itemToMarkdown).join('\n'));
  }
  if (blocks.length) {
    parts.push('## Blocks', blocks.map(itemToMarkdown).join('\n'));
  }

  return parts.join('\n\n') + '\n';
}

// The endpoint returns the blocks' docs, which only exist on the server, so
// it needs an authenticated user. The token comes from the `auth_token`
// cookie, as for server-side rendering, or from an `Authorization: Bearer`
// header, which is read only here, for agents.
function getRequestToken(req) {
  const [, bearer] =
    req.headers?.authorization?.match(/^Bearer\s+(\S+)\s*$/i) || [];
  return bearer || req.universalCookies?.get('auth_token');
}

// Validated tokens, with their user, for a minute at most, so that a client
// that calls the list and then several blocks doesn't validate each time.
const TOKEN_CACHE_TTL = 60 * 1000;
const TOKEN_CACHE_SIZE = 500;
const validatedTokens = new Map();

export function clearValidatedTokens() {
  validatedTokens.clear();
}

class UnauthorizedError extends Error {}

// Volto can't verify the token's signature, only Plone can. So a token is
// valid when Plone returns its user for it, which also works for users
// defined in the Zope root, such as `admin`.
async function authenticate(req) {
  const token = getRequestToken(req);
  if (!token) throw new UnauthorizedError('Authentication is required.');

  const now = Date.now();
  const cached = validatedTokens.get(token);
  if (cached && cached.expires > now) return { token, user: cached.user };
  validatedTokens.delete(token);

  let payload;
  try {
    payload = jwtDecode(token);
  } catch (e) {
    throw new UnauthorizedError('The token is not valid.');
  }
  const expires = payload.exp ? payload.exp * 1000 : Infinity;
  if (!payload.sub || expires <= now) {
    throw new UnauthorizedError('The token is not valid or has expired.');
  }

  let user;
  try {
    user = await new Api(req).get(`/@users/${payload.sub}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if ([401, 403, 404].includes(error?.status)) {
      throw new UnauthorizedError('The token is not valid or has expired.');
    }
    throw error;
  }

  if (validatedTokens.size >= TOKEN_CACHE_SIZE) {
    validatedTokens.delete(validatedTokens.keys().next().value);
  }
  validatedTokens.set(token, {
    user,
    expires: Math.min(expires, now + TOKEN_CACHE_TTL),
  });
  return { token, user };
}

// The same context the block chooser has when editing the content at `path`,
// with the backend responses as the editor stores them. The content is
// fetched with the caller's token.
async function getContext(req, path, { token, user }) {
  const content = await new Api(req).get(path, {
    params: { expand: 'navroot' },
    headers: { Authorization: `Bearer ${token}` },
  });

  return {
    properties: content,
    navRoot: content['@components']?.navroot?.navroot,
    contentType: content['@type'],
    user,
  };
}

// In the root list a block is flagged as restricted when it's never offered,
// or as 'context' when that depends on the content (see the context path).
function restrictedFlag(blockConfig) {
  if (typeof blockConfig.restricted === 'function') return 'context';
  return blockConfig.restricted ? true : undefined;
}

function isRestrictedIn(blockConfig, context) {
  try {
    return isBlockRestricted(blockConfig, context);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(
      `[blocks-schema] restricted() for '${blockConfig.id}' threw:`,
      e,
    );
    return true;
  }
}

function sendError(res, status, type, message, markdown) {
  res.status(status);
  if (markdown) {
    sendMarkdown(res, `${message}\n`);
    return;
  }
  res.json({ error: { type, message } });
}

// The URL of the endpoint as the client called it, without the block ID or
// the query string, so that each block can link to its own URL. It keeps
// the content path, so a block's link keeps its context.
function getEndpointURL(req) {
  const proto =
    req.headers?.['x-forwarded-proto']?.split(',')[0].trim() || req.protocol;
  const [pathname] = (req.originalUrl || req.url).split('?');
  const end =
    pathname.lastIndexOf('/@blocks-schema') + '/@blocks-schema'.length;
  return `${proto}://${req.headers?.host}${pathname.slice(0, end)}`;
}

const BACKEND_ERRORS = {
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
};

// The document models are `documentModel` utilities, named by their ID. Core
// registers `plone.blocks`, and add-ons register theirs.
function getDocumentModels() {
  return config
    .getUtilities({ type: 'documentModel' })
    .map(({ method }) => method());
}

function documentModelRef(documentModel) {
  return { id: documentModel.id, version: documentModel.version };
}

// A list of IDs from one of a document model's functions: its `types`, or
// the `elements` or `blocks` it is limited to. `undefined` when the model has
// no such function, and an empty list when it fails.
function callDocumentModel(documentModel, name) {
  if (typeof documentModel?.[name] !== 'function') return undefined;
  try {
    const list = documentModel[name]();
    return Array.isArray(list) ? list : [];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(
      `[blocks-schema] ${name}() of the document model '${documentModel.id}' threw:`,
      e,
    );
    return [];
  }
}

function getDocumentModelTypes(documentModel) {
  return callDocumentModel(documentModel, 'types') || [];
}

// The docs files of the elements of a document model, limited to its
// `elements` when it has them.
function getElementFiles(documentModel) {
  if (!documentModel) return [];
  const files = blocksDocs.filter(
    (file) => file.element && file.document_model === documentModel.id,
  );
  const names = callDocumentModel(documentModel, 'elements');
  return names ? files.filter((file) => names.includes(file.element)) : files;
}

// The blocks a document model can hold, as keys of the blocks configuration:
// its `blocks` when it has them, whether they are offered or not, or else the
// blocks offered for the content, if any.
function getBlockKeys(documentModel, blocksConfig, context) {
  const keys = callDocumentModel(documentModel, 'blocks');
  if (keys) return keys.filter((key) => blocksConfig[key]);
  return Object.keys(blocksConfig).filter(
    (key) => !context || !isRestrictedIn(blocksConfig[key], context),
  );
}

function listDocumentModels(documentModels) {
  return documentModels.map((documentModel) => {
    const item = documentModelRef(documentModel);
    const types = getDocumentModelTypes(documentModel);
    if (types.length) item.types = types;
    return item;
  });
}

// The document model of a content type: the one whose `types` has it, or else
// `plone.blocks`. For now only the frontend knows which content types use a
// document model.
function resolveDocumentModel(documentModels, type) {
  const fallback =
    documentModels.find((model) => model.id === DEFAULT_DOCUMENT_MODEL) ||
    documentModels[0];
  if (!type) return fallback;
  return (
    documentModels.find((model) =>
      getDocumentModelTypes(model).includes(type),
    ) || fallback
  );
}

async function blocksSchema(req, res, next) {
  try {
    const intl = getIntl(res);
    const blocksConfig = config.blocks.blocksConfig || {};
    const markdown = wantsMarkdown(req);
    const path = req.params[0] || '';
    const blockId = req.params.blockId;
    const type =
      typeof req.query?.type === 'string' && req.query.type
        ? req.query.type
        : undefined;

    let auth;
    try {
      auth = await authenticate(req);
    } catch (error) {
      if (!(error instanceof UnauthorizedError)) throw error;
      res.set('WWW-Authenticate', 'Bearer');
      res.set('Cache-Control', 'no-store');
      sendError(res, 401, 'Unauthorized', error.message, markdown);
      return;
    }

    let context;
    if (path) {
      try {
        context = await getContext(req, path, auth);
      } catch (error) {
        const errorType = BACKEND_ERRORS[error?.status];
        if (!errorType) throw error;
        sendError(
          res,
          error.status,
          errorType,
          `Could not get the content at '${path}'.`,
          markdown,
        );
        return;
      }
      // For content of a type that doesn't exist yet, in this container.
      if (type) context.contentType = type;
    }

    const documentModels = getDocumentModels();
    const documentModel = resolveDocumentModel(
      documentModels,
      context?.contentType || type,
    );

    // The links keep the content type, so they keep its document model.
    const query = type ? `?type=${encodeURIComponent(type)}` : '';
    const endpointURL = getEndpointURL(req);
    const itemURL = (id) => `${endpointURL}/${encodeURIComponent(id)}${query}`;
    // Links use the registry key, which is what the detail route looks up.
    const describe = (key, blockConfig, full) => {
      const url = itemURL(key);
      const item = full
        ? buildFullDetail(blockConfig, intl, url)
        : buildSummaryItem(blockConfig, intl, url);
      const restricted = context
        ? isRestrictedIn(blockConfig, context)
        : restrictedFlag(blockConfig);
      // In a context, the list only has the blocks offered there.
      if (restricted !== undefined && !(context && !blockId)) {
        item.restricted = restricted;
      }
      return item;
    };

    const elementFiles = getElementFiles(documentModel);
    const describeElement = (file, full) =>
      buildElementItem(file, itemURL(file.element), full);

    setCacheHeaders(res, Boolean(context));

    if (blockId) {
      // An element of the document model, or a block. Without its own list
      // of blocks, a document model has every registered block, so that the
      // detail says whether it's restricted.
      const elementFile = elementFiles.find((file) => file.element === blockId);
      const hasBlock = callDocumentModel(documentModel, 'blocks')
        ? getBlockKeys(documentModel, blocksConfig, context).includes(blockId)
        : Boolean(blocksConfig[blockId]);
      let detail;
      if (elementFile) {
        detail = describeElement(elementFile, true);
      } else if (hasBlock) {
        detail = describe(blockId, blocksConfig[blockId], true);
      }
      if (!detail) {
        res.set('Cache-Control', 'no-store');
        sendError(
          res,
          404,
          'Not Found',
          `Block '${blockId}' is not registered.`,
          markdown,
        );
        return;
      }
      if (markdown) {
        sendMarkdown(res, `${blockToMarkdown(detail)}\n`);
        return;
      }
      res.json(detail);
      return;
    }

    // The elements of the document model, then its blocks.
    const items = [
      ...elementFiles.map((file) => describeElement(file, false)),
      ...getBlockKeys(documentModel, blocksConfig, context).map((key) =>
        describe(key, blocksConfig[key], false),
      ),
    ];
    const document = documentModel ? getDocumentDocs(documentModel) : '';
    // Without a content item or type, the client also learns about the
    // other document models of the site.
    const others = !context && !type && documentModels.length > 1;

    if (markdown) {
      sendMarkdown(
        res,
        blocksToMarkdown(items, {
          documentModel,
          document,
          documentModels: others ? listDocumentModels(documentModels) : [],
        }),
      );
      return;
    }
    const body = { '@id': `${endpointURL}${query}` };
    if (documentModel) {
      body.document_model = documentModelRef(documentModel);
      if (document) body.document = document;
    }
    if (others) body.document_models = listDocumentModels(documentModels);
    body.items = items;
    body.items_total = items.length;
    res.json(body);
  } catch (error) {
    next(error);
  }
}

// `/@blocks-schema` describes every registered block. With a content path in
// front, `/<path>/@blocks-schema` only lists the blocks the block chooser
// offers when editing that content.
export default function blocksSchemaMiddleware() {
  const middleware = express.Router();
  middleware.get('*/@blocks-schema/:blockId', blocksSchema);
  middleware.get('*/@blocks-schema', blocksSchema);
  middleware.id = 'blocksSchema';
  return middleware;
}
