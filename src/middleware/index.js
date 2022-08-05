/**
 * Point of contact for middleware modules.
 * @module middleware
 * @example import { api } from 'middleware';
 */

export api from '@plone/volto/middleware/api';
export crashReporter from '@plone/volto/middleware/crashReporter';
export blacklistRoutes from './blacklistRoutes';
export {
  protectLoadStart,
  protectLoadEnd,
  loadProtector,
} from '@plone/volto/middleware/storeProtectLoadUtils';