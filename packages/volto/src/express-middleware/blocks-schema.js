import express from 'express';
import { createIntl, createIntlCache } from 'react-intl';

import config from '@plone/volto/registry';
import { getRequestAuthToken } from '@plone/volto/helpers/AuthToken/AuthToken';

const intlCache = createIntlCache();

function createUnauthorizedError() {
  return {
    status: 401,
    title: 'Unauthorized',
    detail: 'Authentication credentials were not provided or are invalid.',
  };
}

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

function buildSummaryItem(blockConfig) {
  const item = {
    id: blockConfig.id,
    title: blockConfig.title,
  };
  if (blockConfig.llm?.description) {
    item.description = blockConfig.llm.description;
  }
  return item;
}

function buildFullDetail(blockConfig, intl) {
  const schema = resolveSchema(blockConfig, intl);
  const variations =
    blockConfig.variations?.length > 0 ? blockConfig.variations : null;
  const llm = blockConfig.llm ?? {
    description: '',
    usage_notes: '',
    example: { '@type': blockConfig.id },
  };

  const result = {
    id: blockConfig.id,
    title: blockConfig.title,
    llm,
    schema,
  };

  if (variations) {
    result.variations = variations;
  }

  return result;
}

async function ensureAuthenticated(req, res) {
  void res;
  const token = getRequestAuthToken(req);
  if (!token) {
    throw createUnauthorizedError();
  }
}

function handleAuthError(res, error) {
  res.set('WWW-Authenticate', 'Bearer');
  res.status(401).json({
    error: { type: error.title, message: error.detail },
  });
}

async function blocksSchemaList(req, res, next) {
  try {
    await ensureAuthenticated(req, res);
    const intl = getIntl(res);
    const blocksConfig = config.blocks.blocksConfig || {};
    const full = req.query?.full === '1';

    const items = Object.values(blocksConfig).map((blockConfig) =>
      full ? buildFullDetail(blockConfig, intl) : buildSummaryItem(blockConfig),
    );

    res.set('Cache-Control', 'private, max-age=0, must-revalidate');
    res.json({
      '@id': req.originalUrl || req.url,
      items,
      items_total: items.length,
    });
  } catch (error) {
    if (error?.status === 401) {
      handleAuthError(res, error);
      return;
    }
    next(error);
  }
}

async function blocksSchemaDetail(req, res, next) {
  try {
    await ensureAuthenticated(req, res);
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

    res.set('Cache-Control', 'private, max-age=0, must-revalidate');
    res.json({
      '@id': req.originalUrl || req.url,
      ...buildFullDetail(blockConfig, intl),
    });
  } catch (error) {
    if (error?.status === 401) {
      handleAuthError(res, error);
      return;
    }
    next(error);
  }
}

export default function blocksSchemaMiddleware() {
  const middleware = express.Router();
  middleware.all('/@blocks-schema/:blockId', blocksSchemaDetail);
  middleware.all('/@blocks-schema', blocksSchemaList);
  middleware.id = 'blocksSchema';
  return middleware;
}
