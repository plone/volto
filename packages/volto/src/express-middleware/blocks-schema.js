import express from 'express';
import { createIntl, createIntlCache } from 'react-intl';

import config from '@plone/volto/registry';

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

function resolveSchema(blockConfig, intl) {
  const { blockSchema, schemaEnhancer, id } = blockConfig;
  if (!blockSchema) return null;

  let schema =
    typeof blockSchema === 'function'
      ? blockSchema({
          data: { '@type': id },
          intl,
          props: { data: { '@type': id } },
        })
      : blockSchema;

  if (schema && typeof schemaEnhancer === 'function') {
    try {
      schema =
        schemaEnhancer({
          schema: JSON.parse(JSON.stringify(schema)),
          formData: { '@type': id },
          intl,
        }) || schema;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`[blocks-schema] schemaEnhancer for '${id}' threw:`, e);
    }
  }

  return schema;
}

function resolveDocs(blockConfig, intl) {
  const { docs, id } = blockConfig;
  try {
    const resolved =
      typeof docs === 'function' ? docs({ blockConfig, intl }) : docs;
    return (
      resolved ?? { description: '', usage_notes: '', example: { '@type': id } }
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`[blocks-schema] docs() for '${id}' threw:`, e);
    return { description: '', usage_notes: '', example: { '@type': id } };
  }
}

function buildSummaryItem(blockConfig, intl) {
  const item = {
    id: blockConfig.id,
    title: blockConfig.title,
  };
  const docs = resolveDocs(blockConfig, intl);
  if (docs.description) {
    item.description = docs.description;
  }
  return item;
}

function buildFullDetail(blockConfig, intl) {
  const schema = resolveSchema(blockConfig, intl);
  const variations =
    blockConfig.variations?.length > 0 ? blockConfig.variations : null;
  const docs = resolveDocs(blockConfig, intl);

  const result = {
    id: blockConfig.id,
    title: blockConfig.title,
    docs,
    schema,
  };

  if (variations) {
    result.variations = variations;
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
