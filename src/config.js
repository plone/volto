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
  },
  {
    host: 'localhost',
    port: '4300',
    apiPath: 'http://localhost:8081/db/web',
  },
);
