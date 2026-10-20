---
myst:
  html_meta:
    "description": "Simple deployment of a Volto application"
    "property=og:description": "Simple deployment of a Volto application"
    "property=og:title": "Simple deployment"
    "keywords": "Volto, Plone, frontend, React, deployment"
---

# Simple deployment

Volto is a Node.js application that runs on your machine/server and listens to a port. Once you are ready to deploy it, you should build it running:

```bash
$ pnpm build
```

The Volto configuration determines the external URL Volto will be served, so if you just issue this command, the build will get that values and build an static bundle with that values (PORT=3000, API_PATH=http://localhost:8080/Plone).

In order to make Volto work on a server under an specific DNS name, you must parametrize the build like:

```bash
$ PORT=volto_node_process_port RAZZLE_API_PATH=https://mywebsite.com/api pnpm build
```

After the build, the bundle is created in `/build` folder, then in order to launch your application you can run:

```bash
$ pnpm start:prod
```
or
```bash
$ NODE_ENV=production node build/server.js
```

This will start Volto in the PORT specified in the build command, and will issue internal API queries to the RAZZLE_API_PATH specified as well.

The simplest deployment is to start this Node.js process in your server by any mean of your choice (systemd, process manager, etc) and manage its lifecycle.

## Reverse proxies

You need to make available to your users both Volto and the API in public URLs. It's heavily recommended you serve both from the same DNS name, eg. Volto-> `https://mywebsite.com` and API-> `https://mywebsite.com/api` in order to avoid any CORS problem.

```{warning}
Avoid dealing with CORS in production at all costs. Period.
```

For SSL support is recommended to use a reverse proxy of your choice that points to Volto port and an API rewrite eg. `/api` in your server. This is the nginx configuration:

```nginx
upstream volto {
    server localhost:3000;
}
upstream ploneapi {
    server localhost:8080;
}

location ~ /api($|/.*) {
    rewrite ^/api($|/.*) /VirtualHostBase/https/mywebsite.com:443/Plone/VirtualHostRoot/_vh_api$1 break;
    proxy_pass http://ploneapi;
}

location ~ / {
    # Default set to 1m - this is mainly to make PSI happy, adjust to your needs
    location ~* \.(ico|jpg|jpeg|png|gif|svg|js|jsx|css|less|swf|eot|ttf|otf|woff|woff2)$ {
        add_header Cache-Control "public";
        expires +1m;
        proxy_pass http://volto;
    }
}
```

### Understanding CORS errors

If you're getting [CORS errors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors#identifying_a_cors_issue), you need to understand the nature of these errors.
The backend server (usually Plone) needs to be configured to "know" the final domain where the content is fetched.
This is done for security purposes, to protect the information in the backend server from being loaded by client browsers on unknown domains.
So make sure that the backend server is properly configured for your purposes.
When using Plone with Docker, check the [CORS](https://github.com/plone/plone.docker#for-basic-usage) documentation section, otherwise the [CORS section of `plone.rest`](https://github.com/plone/plone.rest#cors).
