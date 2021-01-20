const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '3000';

const apiPath =
  process.env.RAZZLE_API_PATH ||
  (__DEVELOPMENT__
    ? `http://${host}:${port}/api`
    : 'http://localhost:8080/Plone');

const websockets = process.env.RAZZLE_WEBSOCKETS || false;
const actions_raising_api_errors = ['GET_CONTENT', 'UPDATE_CONTENT'];
const internalApiPath = process.env.RAZZLE_INTERNAL_API_PATH || undefined;
const maxResponseSize = 2000000000; // This is superagent default (200 mb)
const isMultilingual = false;
const bbb_getContentFetchesFullobjects = null;
const defaultPageSize = 25;

export {
  apiPath,
  internalApiPath,
  host,
  port,
  websockets,
  actions_raising_api_errors,
  maxResponseSize,
  isMultilingual,
  bbb_getContentFetchesFullobjects,
  defaultPageSize,
};
