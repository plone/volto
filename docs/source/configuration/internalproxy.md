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


<<<<<<< HEAD
What happens in the default development configuration/setup:

* The client side Volto javascript files precooked HTML (SSR) is served from http://localhost:3000/ by the NodeJS server process
* The client javascript does API requests for content and other data on the same url at http://localhost:3000/++api++/
* The NodeJS service its internal proxy requests the data from the Plone content backend api and delivers
back json to the frontend.
* The web browser application is happy, because all connections go through the same URL and no CORS related security issues will be triggered.
=======
Here are some examples.
>>>>>>> master

!!! tip
    You could also use the internal proxy for production setups. For convenience and for
    testing/demoing using the stock build, it is also enabled in production mode since 
    Volto 14. But it is bad for performance because the server side running Node process
    is also responsable for generating the SSR HTML. With Nginx, Apache or another
    'reverse proxy' you can also create an internal API mount which is more suited for
    that. For more deployment information see ['Seemless mode'](/deploying/seamless-mode)

### Examples redefining the proxy target

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

This redefines the request path from the internal proxy of the server side Node proces to the Plone content backend API, but leaves the frontend Volto process making all content requests to http://locahost:3000/++api++/

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

If you disable the proxy, the frontend Volto javascript process in the browser will
directly query the Plone content backend API. If that URL is on a different domain as
from which Volto is initially served, you will run into CORS issues if the content
backend API doesn't contain the correct CORS headers. 

!!! tip
    To view the existing configuration, add console.log(config) to the `applyConfig` function. This dumps the existing config to your terminal console.

### Advanced usage

See [](../recipes/environment-variables.md) for recipes on internal proxy usage.
