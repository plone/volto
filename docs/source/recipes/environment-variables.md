# How to use environment variables

## Configure your development environment

By default, seamless mode works in development mode, but it assumes some sensible defaults
in order to ease configuration. These are the defaults:

### Internal Proxy is enabled (to avoid dealing with CORS)

That means that your backend will be available under `http://localhost:3000/++api++`

```shell
RAZZLE_DEV_PROXY_API_PATH = 'http://localhost:8080/Plone'
```

The internal proxy simulates a web server doing reverse proxy with standard Plone VHM config.
You can configure this if required too:

```shell
RAZZLE_PROXY_REWRITE_TARGET = '/VirtualHostBase/http/localhost:3000/Plone/++api++/VirtualHostRoot'
```

(this variable by default is parameterized like this: `/VirtualHostBase/http/${apiPathURL.hostname}:${apiPathURL.port}${instancePath}/++api++/VirtualHostRoot`)

#### Your site is not in http://localhost:8080/Plone

Let's assume you have your site in http://localhost:55001/Plone

In order to simulate it, you could launch the backend like:

```shell
docker run -it --rm -p 55001:8080 -e SITE=Plone -e ADDONS='plone.restapi==8.20.0 plone.app.iterate==4.0.2 plone.rest==2.0.0a1 plone.app.vocabularies==4.3.0 plone.volto==3.1.0a8' plone/plone-backend:6.0.0a2
```

```shell
RAZZLE_DEV_PROXY_API_PATH='http://localhost:55001/Plone' yarn start
```

Let's say that you do have it in a customized site id: http://localhost:55001/myplonesite

```shell
docker run -it --rm -p 55001:8080 -e SITE=myplonesite -e ADDONS='plone.restapi==8.20.0 plone.app.iterate==4.0.2 plone.rest==2.0.0a1 plone.app.vocabularies==4.3.0 plone.volto==3.1.0a8' plone/plone-backend:6.0.0a2
```

```shell
RAZZLE_DEV_PROXY_API_PATH='http://localhost:55001/myplonesite' yarn start
```

### Debug an external site (provided you have access to it)

```{warning}
This is an advanced feature, and needs understanding of what you are doing and which server are you accessing. Also, it depends on your server configuration.
```

Let's say you want to debug a deployed site in production, but the build does not allow you to look deeper into the tracebacks. You could bootstrap a frontend in your machine, and point it to the production server, combining environment variables like:

```
RAZZLE_DEV_PROXY_API_PATH=https://2021.ploneconf.org RAZZLE_PROXY_REWRITE_TARGET=https://2021.ploneconf.org/++api++ yarn start
```

This has the drawback that could be that the proxy does not work well with the proxied SSL connection.

If you have access (via tunnel) to the port of the deployed backend is even more easier:

```
RAZZLE_DEV_PROXY_API_PATH=http://2021.ploneconf.org:8080/Plone yarn start
```

This will use the internal proxy to access the backend, bypassing CORS.

````{important}
Anything that would mean not using the internal proxy (eg. using RAZZLE_API_PATH) will have to deal with CORS. You could enable `plone.volto.cors` ZCML or add your config to the build to support bypassing CORS at a server level. Like this:

```
zcml-additional =
  <configure xmlns="http://namespaces.zope.org/zope"
            xmlns:plone="http://namespaces.plone.org/plone">
  <plone:CORSPolicy
    allow_origin="http://localhost:3000,http://127.0.0.1:3000"
    allow_methods="DELETE,GET,OPTIONS,PATCH,POST,PUT"
    allow_credentials="true"
    expose_headers="Content-Length,X-My-Header"
    allow_headers="Accept,Authorization,Content-Type,X-Custom-Header,Origin,Lock-Token"
    max_age="3600"
    />
  </configure>
```
````

## Disabling the internal proxy

The internal proxy is always available, even in production since Volto 14.

When `RAZZLE_API_PATH` is present, Volto does not use it, and use the URL in there instead.

```{important}
Again, when `RAZZLE_API_PATH` is present your deployment is the one who has to deal with CORS.
```
