import superagent from 'superagent';
import Cookies from 'universal-cookie';
import { addHeadersFactory } from './utils';
import type request from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'delete'];

export type ApiRequestParams = {
  params?: any;
  data?: any;
  type?: any;
  headers?: any;
  checkUrl?: boolean;
};

function getBackendURL(path: string) {
  const apiPath =
    // process.env.API_PATH ||
    // process.env.RAZZLE_API_PATH ||
    // (window && window.env.API_PATH) ||
    // (window && window.env.RAZZLE_API_PATH) ||
    'http://localhost:55001/plone' || 'http://localhost:8080/Plone';

  const APISUFIX = '/++api++';

  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  return `${apiPath}${APISUFIX}${adjustedPath}`;
}

export async function handleRequest(
  method: string,
  path: string,
  options?: ApiRequestParams,
): Promise<any> {
  const fetcher = new API();
  const response = await fetcher[method](path, options);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.body;
}

export default class API {
  [m: string]: (
    path: string,
    options?: ApiRequestParams,
  ) => Promise<request.Response>;

  constructor(req?: Request) {
    const cookies = new Cookies();

    methods.forEach((method) => {
      this[method] = async (
        path,
        {
          params,
          data,
          type,
          headers = {},
          checkUrl = false,
        }: ApiRequestParams = {},
      ) => {
        let request: request.SuperAgentRequest;

        // @ts-ignore
        request = superagent[method](getBackendURL(path));

        if (params) {
          request.query(params);
        }

        let authToken;
        if (req) {
          // @ts-ignore
          // We are in SSR
          authToken = req.universalCookies.get('auth_token');
          request.use(addHeadersFactory(req));
        } else {
          authToken = cookies.get('auth_token');
        }
        if (authToken) {
          request.set('Authorization', `Bearer ${authToken}`);
        }

        request.set('Accept', 'application/json');

        if (type) {
          request.type(type);
        }

        Object.keys(headers).forEach((key) => request.set(key, headers[key]));

        if (data) {
          request.send(data);
        }

        return request;

        // request.end((err, response) => {
        //   if (
        //     checkUrl &&
        //     request.url &&
        //     request.xhr &&
        //     stripQuerystring(request.url) !==
        //       stripQuerystring(request.xhr.responseURL)
        //   ) {
        //     if (request.xhr.responseURL?.length === 0) {
        //       return reject({
        //         code: 408,
        //         status: 408,
        //         url: request.xhr.responseURL,
        //       });
        //     }
        //     return reject({
        //       code: 301,
        //       url: request.xhr.responseURL,
        //     });
        //   }
        //   return err ? reject(err) : resolve(response.body || response.text);
        // });

        // promise.request = request;
        // return promise;
      };
    });
  }
}
