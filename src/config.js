/**
 * Config.
 * @module config
 */
import { defaults } from 'lodash';

export default defaults(
  {},
  {
    host: process.env.HOST,
    port: process.env.PORT,
    apiPath: process.env.API_PATH,
    websockets: process.env.WEBSOCKETS,
  },
  {
    host: 'localhost',
    port: '4300',
    apiPath: 'http://localhost:8081/db/web',
    websockets: true,
  },
);
