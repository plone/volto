import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import type { PloneClientConfig } from './validation/config';
import qs from 'query-string';
import debugFactory from 'debug';

const debug = debugFactory('axios');

export type ApiRequestParams = {
  config: PloneClientConfig;
  params?: any;
  data?: any;
  type?: any;
  headers?: any;
  checkUrl?: boolean;
  raw?: boolean;
  maxRedirects?: number;
};

const APISUFFIX = '/++api++';

export function getBackendURL(
  apiPath: string,
  apiSuffix: string | undefined,
  path: string,
) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  return `${apiPath}${apiSuffix ?? APISUFFIX}${adjustedPath}`;
}

const _handleResponse = (response: AxiosResponse) => response;

const _handleError =
  (config: ApiRequestParams['config']) => (error: AxiosError) => {
    debug(error);
    const status = error.status ?? 0;
    return Promise.reject({
      status: error.status ?? error.code,
      data: error.response?.data,
      location:
        status >= 300 && status < 400
          ? error.response?.headers.location
              .replaceAll(
                `${config.apiPath}${config.apiSuffix ?? APISUFFIX}`,
                '',
              )
              .replace(/\?.*$/, '')
          : undefined,
    });
  };

export function axiosConfigAdapter(
  method: string,
  path: string,
  options: ApiRequestParams,
): AxiosRequestConfig {
  const {
    config,
    params,
    data,
    maxRedirects,
    headers = {},
  }: ApiRequestParams = options;
  const axiosConfig: AxiosRequestConfig = {
    method,
    url: getBackendURL(config.apiPath, config.apiSuffix, path),
    params,
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    data,
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'colon-list-separator' });
    },
    maxRedirects,
  };

  if (config.token && axiosConfig.headers) {
    axiosConfig.headers['Authorization'] = `Bearer ${config.token}`;
  }

  debug(axiosConfig);

  return axiosConfig;
}

export async function apiRequest(
  method: string,
  path: string,
  options: ApiRequestParams,
) {
  const instance = axios.create();

  if (options.raw) {
    instance.interceptors.response.use(undefined, _handleError(options.config));
  } else {
    instance.interceptors.response.use(
      _handleResponse,
      _handleError(options.config),
    );
  }

  return instance.request(axiosConfigAdapter(method, path, options));
}
