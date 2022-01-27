# Internal proxy to content backend API

The server side Volto SSR process (based on Razzle) has an internal proxy to the backend API
enabled by default.

It provides a better developer experience out of the box, so the developer doesn't has to
deal with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) and can focus on
develop/test drive/demo Volto.

To understand the need for the internal proxy, there are three processes running in a Volto website:

1. A frontend web application running in your browser (Javascript)
2. A Node.js server process that delivers the javascript to the client and does
   Server Side Generation (SSR) of your pages on first request (Javascript, the
   Razzle package is used for SSR)
3. A Plone server process that stores and delivers all content through a REST API (Python)

## Configuration

The default values from Volto configuration expect a Plone content backend located at `http://localhost:8080/Plone`. Below are the settings that allows you to change the its location

- `apiPath` [API_PATH] - URL of the backend, used by Volto running in the frontend browser. By default, the proxy URL. (http://localhost:3000/++api++/)
- `devProxyToApiPath` - The real backend URL, picked up by the Volto Node.js server process. By default, `http://localhost:8080/Plone`


What happens in the default development configuration/setup:

* The client side Volto process its javascript and precooked HTML (SSR) is served from http://localhost:3000/ by the NodeJS server process
* Content resources are requested on the same url at http://localhost:3000/++api++/
* The NodeJS service its internal proxy requests the data from the Plone content backend api and delivers
back json to the frontend.
* The web browser application is happy, because all connections go through the same URL and no CORS related security issues will be triggered.

!!! tip
    You don't want to deal with CORS in your production deployments, so using the proxy is only meant to be enabled in development mode (e.g `yarn start`). However, for convenience and for testing/demoing using the stock build, it's also enabled in production mode since Volto 14.

!!! note
    You can disable the proxy by redefining a new `apiPath` and redefining an empty
    `devProxyToApiPath` setting.

Here are some examples.

### Redefining the proxy target

You can redefine the local proxy target by using the `RAZZLE_DEV_PROXY_API_PATH` or setting `devProxyToApiPath` in the configuration object (`src/config.js`).

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

This redefines the request path from the server side Node proces to the Plone content backend API, but
leaves the frontend Volto process making all content requests to http://locahost:3000/
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
RAZZLE_DEV_PROXY_API_PATH= RAZZLE_API_PATH=http://localhost:8081/mysite yarn start
```

If you disable the proxy, the frontend Volto javascript process in the browser will directly query 
the Plone content backend API. If that URL is on a different domain as from which Volto is
initially served, you will run into CORS issues if the content backend API doesn't contain the correct
CORS headers. 

!!! tip
    To view the existing configuration, add console.log(config) to the `applyConfig` function. This dumps the existing config to your terminal console.

### Advanced usage

It's possible to define the proxy target more accuratelly using the `RAZZLE_PROXY_REWRITE_TARGET` environment variable, or the `proxyRewriteTarget` setting in the configuration object.

This allows you to run Volto against an external (not local) site, e.g. for debugging purposes. In theory then, this is possible:

```bash
RAZZLE_PROXY_REWRITE_TARGET=https://plone.org RAZZLE_DEV_PROXY_API_PATH=https://plone.org yarn start
```
