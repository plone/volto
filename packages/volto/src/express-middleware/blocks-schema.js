import express from 'express';
import { createIntl, createIntlCache } from 'react-intl';

import config from '@plone/volto/registry';
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

// `docs` is Markdown, either a string or a function of the block config.
// Anything else, or a function that throws, counts as no docs.
function resolveDocs(docs, blockConfig, intl, name = blockConfig.id) {
  try {
    const resolved =
      typeof docs === 'function' ? docs({ blockConfig, intl }) : docs;
    return typeof resolved === 'string' ? resolved.trim() : '';
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(
      `[blocks-schema] Could not resolve the docs for '${name}':`,
      e,
    );
    return '';
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
  const description = getSummary(
    resolveDocs(blockConfig.docs, blockConfig, intl),
  );
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
      docs: resolveDocs(blockConfig.docs, blockConfig, intl),
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
      const docs = resolveDocs(
        variation.docs,
        blockConfig,
        intl,
        `${blockConfig.id}/${variation.id}`,
      );
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
// translated, so the response varies by language.
function setCacheHeaders(res) {
  res.set('Cache-Control', 'public, max-age=300');
  res.set('Vary', 'Accept-Language');
}

function blocksSchemaList(req, res, next) {
  try {
    const intl = getIntl(res);
    const blocksConfig = config.blocks.blocksConfig || {};
    const full = req.query?.full === '1';

    const items = Object.values(blocksConfig).map((blockConfig) =>
      full
        ? buildFullDetail(blockConfig, intl)
        : buildSummaryItem(blockConfig, intl),
    );

    setCacheHeaders(res);
    res.json({
      '@id': req.originalUrl || req.url,
      items,
      items_total: items.length,
    });
  } catch (error) {
    next(error);
  }
}

function blocksSchemaDetail(req, res, next) {
  try {
    const intl = getIntl(res);
    const blocksConfig = config.blocks.blocksConfig || {};
    const blockId = req.params.blockId;
    const blockConfig = blocksConfig[blockId];

    if (!blockConfig) {
      res.status(404).json({
        error: {
          type: 'Not Found',
          message: `Block '${blockId}' is not registered.`,
        },
      });
      return;
    }

    setCacheHeaders(res);
    res.json({
      '@id': req.originalUrl || req.url,
      ...buildFullDetail(blockConfig, intl),
    });
  } catch (error) {
    next(error);
  }
}

export default function blocksSchemaMiddleware() {
  const middleware = express.Router();
  middleware.get('/@blocks-schema/:blockId', blocksSchemaDetail);
  middleware.get('/@blocks-schema', blocksSchemaList);
  middleware.id = 'blocksSchema';
  return middleware;
}
