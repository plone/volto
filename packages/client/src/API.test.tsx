import { describe, vi, Mock } from 'vitest';
import axios, { AxiosRequestConfig } from 'axios';
import { apiRequest, axiosConfigAdapter, getBackendURL } from './API';

vi.mock('axios');

describe('apiRequest', () => {
  let mockAxios: any;

  const config = {
    apiPath: '/',
  };

  beforeEach(() => {
    mockAxios = {
      interceptors: {
        response: {
          use: vi.fn(),
        },
      },
      request: vi.fn(),
    };

    (axios.create as Mock).mockImplementation(() => mockAxios);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call axios.create', async () => {
    await apiRequest('GET', '/path', { config });
    expect(axios.create).toHaveBeenCalledTimes(1);
  });

  it('should set response interceptors based on options.raw', async () => {
    await apiRequest('GET', '/path', { raw: true, config });
    expect(mockAxios.interceptors.response.use.mock.calls[0][0]).toBe(
      undefined,
    );

    vi.clearAllMocks();

    await apiRequest('GET', '/path', { raw: false, config });
    expect(typeof mockAxios.interceptors.response.use.mock.calls[0][0]).toBe(
      'function',
    );
  });

  it('should call AxiosInstance once when apiRequest is called', async () => {
    await apiRequest('GET', '/path', { config });
    expect(mockAxios.request).toHaveBeenCalledTimes(1);
  });
});

describe('axiosConfigAdapter', () => {
  it('should create an axios configuration object', () => {
    const method = 'GET';
    const path = '/path';
    const options = {
      config: {
        apiPath: 'apiPath',
        token: 'token123',
      },
      params: { param1: 'value1' },
      data: { data1: 'value2' },
      headers: { header1: 'value3' },
      checkUrl: false,
    };

    const result = axiosConfigAdapter(method, path, options);

    const expected: AxiosRequestConfig = {
      method,
      url: getBackendURL(options.config.apiPath, path),
      params: options.params,
      headers: {
        Accept: 'application/json',
        ...options.headers,
        Authorization: `Bearer ${options.config.token}`,
      },
      data: options.data,
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
    };

    // need to strigify to make sure that `validateStatus` function equality also passes
    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
  });

  it('should not include Authorization header when no token provided', () => {
    const method = 'GET';
    const path = '/path';
    const options = {
      config: {
        apiPath: 'apiPath',
      },
      params: { param1: 'value1' },
      data: { data1: 'value2' },
      headers: { header1: 'value3' },
      checkUrl: false,
    };

    const result = axiosConfigAdapter(method, path, options);

    expect(result.headers?.Authorization).toBeUndefined();
  });
});
