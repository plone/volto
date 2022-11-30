/**
 * Point of contact for middleware modules.
 * @module middleware
 * @example import { api } from 'middleware';
 */

export api from '@plone/volto/middleware/api';
export blacklistRoutes from './blacklistRoutes';
export prefixPathRoot from './prefixPathRoot';
export {
  protectLoadStart,
  protectLoadEnd,
  loadProtector,
} from '@plone/volto/middleware/storeProtectLoadUtils';
