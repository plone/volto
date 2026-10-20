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

function buildSummaryItem(blockConfig, intl) {
  const item = {
    id: blockConfig.id,
    title: blockConfig.title,
  };
  const description = getSummary(resolveDocs(blockConfig, intl));
  if (description) {
    item.description = description;
  }
  return item;
}

function buildFullDetail(blockConfig, intl) {
  const result = withSchema(
    {
      id: blockConfig.id,
      title: blockConfig.title,
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

// The block configuration is already public (it ships in the client bundle),
// so the endpoint is public too and can be cached. Schema titles are
// translated, and the format depends on the Accept header.
// A context response depends on the user and the content, so it is private.
function setCacheHeaders(res, context) {
  res.set(
    'Cache-Control',
    context ? 'private, max-age=0, must-revalidate' : 'public, max-age=300',
  );
  res.set('Vary', 'Accept, Accept-Language');
}

// Markdown is returned for `?format=md`, or when the client asks for
// `text/markdown` and not for JSON. JSON stays the default.
function wantsMarkdown(req) {
  if (req.query?.format === 'md') return true;
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

export function blocksToMarkdown(details) {
  return (
    [
      '# Blocks',
      'The blocks available on this site, with their documentation and the schema of their settings. Block data is stored in the `blocks` field of a content item, keyed by block ID, with the block type in `@type`, and their order is in `blocks_layout.items`.',
      ...details.map(blockToMarkdown),
    ].join('\n\n') + '\n'
  );
}

// The same context the block chooser has when editing the content at `path`,
// with the backend responses as the editor stores them. The backend calls
// carry the caller's auth_token cookie.
async function getContext(req, path) {
  const api = new Api(req);
  const content = await api.get(path, { params: { expand: 'navroot' } });

  let user = {};
  const token = req.universalCookies?.get('auth_token');
  if (token) {
    try {
      user = await api.get(`/@users/${jwtDecode(token).sub}`);
    } catch (e) {
      user = {};
    }
  }

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

const BACKEND_ERRORS = {
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
};

async function blocksSchema(req, res, next) {
  try {
    const intl = getIntl(res);
    const blocksConfig = config.blocks.blocksConfig || {};
    const markdown = wantsMarkdown(req);
    const path = req.params[0] || '';
    const blockId = req.params.blockId;

    let context;
    if (path) {
      try {
        context = await getContext(req, path);
      } catch (error) {
        const type = BACKEND_ERRORS[error?.status];
        if (!type) throw error;
        sendError(
          res,
          error.status,
          type,
          `Could not get the content at '${path}'.`,
          markdown,
        );
        return;
      }
    }

    const describe = (blockConfig, full) => {
      const item = full
        ? buildFullDetail(blockConfig, intl)
        : buildSummaryItem(blockConfig, intl);
      const restricted = context
        ? isRestrictedIn(blockConfig, context)
        : restrictedFlag(blockConfig);
      // In a context, the list only has the blocks offered there.
      if (restricted !== undefined && !(context && !blockId)) {
        item.restricted = restricted;
      }
      return item;
    };

    setCacheHeaders(res, Boolean(context));

    if (blockId) {
      const blockConfig = blocksConfig[blockId];
      if (!blockConfig) {
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
      const detail = describe(blockConfig, true);
      if (markdown) {
        sendMarkdown(res, `${blockToMarkdown(detail)}\n`);
        return;
      }
      res.json({ '@id': req.originalUrl || req.url, ...detail });
      return;
    }

    const full = markdown || req.query?.full === '1';
    const items = Object.values(blocksConfig)
      .filter(
        (blockConfig) => !context || !isRestrictedIn(blockConfig, context),
      )
      .map((blockConfig) => describe(blockConfig, full));

    if (markdown) {
      sendMarkdown(res, blocksToMarkdown(items));
      return;
    }
    res.json({
      '@id': req.originalUrl || req.url,
      items,
      items_total: items.length,
    });
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
