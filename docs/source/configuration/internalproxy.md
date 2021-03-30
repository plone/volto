# Internal proxy to API

While in development, Volto has an internal proxy to the backend API enabled by default.
It provides a better developer experience out of the box, so the developer doesn't has to
deal with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) and can focus on
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

You can redefine the local proxy target by using the `RAZZLE_DEV_PROXY_API_PATH` or `devProxyToApiPath` in the configuration object (`src/config.js`).

For example, if the path to your Plone site is `http://localhost:8081/mysite`, add the following to the bottom of the `src/config.js` file:

```js
export const settings = {
  ...defaultSettings,
  devProxyToApiPath: 'http://localhost:8081/mysite',
};
```

or use the environment variable:
```bash
RAZZLE_DEV_PROXY_API_PATH=http://localhost:8081/mysite yarn start
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

!!! tip
    To view the existing configuration, add console.log(config) to the `applyConfig` function. This dumps the existing config to your terminal console.
    
### Advanced usage

It's possible to define the proxy target more accuratelly using the `RAZZLE_PROXY_REWRITE_TARGET` environment variable, or the `proxyRewriteTarget` setting in the configuration object.

This allows you to run Volto against an external (not local) site, e.g. for debugging purposes. In theory then, this is possible:

```bash
RAZZLE_PROXY_REWRITE_TARGET=https://plone.org RAZZLE_DEV_PROXY_API_PATH=https://plone.org yarn start
```
