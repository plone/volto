# Internal proxy to API

While in development, Volto has an internal proxy to the backend API enabled by default.
It provides a better developer experience out of the box, so the developer doesn't has to
deal with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) and can focus in
develop/test drive/demo Volto.

## Configuration

By default, Volto expects a Plone backend located at `http://localhost:8080/Plone`.
These are the settings that allows you to configure the API and how the proxy works:

- `apiPath` [API_PATH] - URL of the backend, used through Volto. By default, the proxy URL.
- `devProxyToApiPath` - The real backend URL, used by the proxy. By default, `http://localhost:8080/Plone`

!!! tip
    You don't want to deal with CORS in your production deployments, so the proxy is only
    enabled in development mode (e.g `yarn start`)

!!! note
    You can disable the proxy by redefining a new `apiPath` and redefining an empty
    `devProxyToApiPath` setting.

Here are some examples.

### Redefining the proxy target

```js
export const settings = {
  ...defaultSettings,
  devProxyToApiPath: 'http://localhost:8081/mysite',
};
```

### Disabling the proxy

```js
export const settings = {
  ...defaultSettings,
  apiPath: process.env.RAZZLE_API_PATH || `http://localhost:8081/mysite`, // for Plone
  devProxyToApiPath: '', // Set it to '' for disabling the proxy
};
```

or use the environment variable:
```bash
RAZZLE_API_PATH=http://localhost:8081/mysite yarn start
```
