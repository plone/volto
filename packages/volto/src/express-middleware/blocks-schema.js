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

function resolveSchema(schemaFactory, blockConfig, intl) {
  if (!schemaFactory) {
    return null;
  }

  if (typeof schemaFactory !== 'function') {
    return schemaFactory;
  }

  return schemaFactory({
    data: { '@type': blockConfig.id },
    intl,
    props: {
      data: { '@type': blockConfig.id },
    },
  });
}

async function ensureAuthenticated(req, res) {
  void res;
  const token = getRequestAuthToken(req);
  if (!token) {
    throw createUnauthorizedError();
  }
}

async function blocksSchema(req, res, next) {
  try {
    await ensureAuthenticated(req, res);
    const intl = getIntl(res);
    const blocksConfig = config.blocks.blocksConfig || {};
    const items = Object.values(blocksConfig).map((blockConfig) => ({
      id: blockConfig.id,
      title: blockConfig.title,
      schema: resolveSchema(blockConfig.blockSchema, blockConfig, intl),
    }));

    res.set('Cache-Control', 'private, max-age=0, must-revalidate');
    res.json({
      '@id': req.originalUrl || req.url,
      items,
      items_total: items.length,
    });
  } catch (error) {
    if (error?.status === 401) {
      res.set('WWW-Authenticate', 'Bearer');
      res.status(401).json({
        error: {
          type: error.title,
          message: error.detail,
        },
      });
      return;
    }

    next(error);
  }
}

export default function blocksSchemaMiddleware() {
  const middleware = express.Router();
  middleware.all('/@blocks-schema', blocksSchema);
  middleware.id = 'blocksSchema';
  return middleware;
}
