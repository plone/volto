/**
 * Point of contact for middleware modules.
 * @module middleware
 * @example import { api } from 'middleware';
 */

export { default as api } from '@plone/volto/middleware/api';
export { default as blacklistRoutes } from './blacklistRoutes';
export {
  protectLoadStart,
  protectLoadEnd,
  loadProtector,
} from '@plone/volto/middleware/storeProtectLoadUtils';
