/**
 * Config.
 * @module config
 */
import { defaults } from 'lodash';
import { defaultWidget, widgetMapping } from './Widgets';
import { layoutViews, contentTypesViews, defaultView } from './Views';
import { nonContentRoutes } from './NonContentRoutes';

export { layoutViews, contentTypesViews, defaultView };
export { widgetMapping, defaultWidget };
export { nonContentRoutes };

export default defaults(
  {},
  {
    host: process.env.HOST,
    port: process.env.PORT,
    apiPath: process.env.API_PATH,
  },
  {
    host: 'localhost',
    port: '4300',
    apiPath: 'http://localhost:8080/Plone',
  },
);
