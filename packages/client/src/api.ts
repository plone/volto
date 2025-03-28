import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
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
};

export function getBackendURL(
  apiPath: string,
  apiSuffix: string | undefined,
  path: string,
) {
  const APISUFIX = '/++api++';

  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  return `${apiPath}${apiSuffix ?? APISUFIX}${adjustedPath}`;
}

const _handleResponse = (response: AxiosResponse) => response;

const _handleError = (error: any) => {
  debug(error);
  return Promise.reject({ status: error.status, data: error.response.data });
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
    type,
    headers = {},
    checkUrl = false,
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
    instance.interceptors.response.use(undefined, _handleError);
  } else {
    instance.interceptors.response.use(_handleResponse, _handleError);
  }

  return instance.request(axiosConfigAdapter(method, path, options));
}
