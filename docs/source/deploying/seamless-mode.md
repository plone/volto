# Seamless mode

## Feature history

This feature was added in Volto 13 as experimental. During the experimental phase we realised of several issues hard to solve, which made us to rethink the feature into its second incarnation, available since Volto 14.

The first implementation wanted to unify both backend and frontend under the same sun, using the `Accept` header to route the requests to the API and to Volto SSR server. As reference and for the record, these were the major issues we encounter (https://github.com/plone/volto/issues/2706):

- Browsers are unable to differentiate cached responses using the `Accept` header, so the last one (usually the JSON one) was cached, then shown in some situations (like browser restart and open tabs). The back button also showed the JSON responses under some circumstances.
- The use of cache servers and services is hard, since they do not accept the `Vary` header (CloudFlare) and in Varnish the handling is also difficult to differentiate both requests and cache (and then invalidate) them propely
- Private images/files are hard to handle

For all these reasons, we have reconsidered and adjusted the feature a bit to overcome all the issues found in the past.

## Challenges and goals

Seamless' mode main challenge was to achieve Zero configuration avoiding hardcoded API_PATH or other environment vars involved, and stablishing good sensible defaults when setting up deployments (and also in development). So the developer/devops don't have to overthink their setups.

These are the problems we wanted to solve:

- Avoid having to expose and publish the classic UI if you don't really need it
- If possible, having to rewrite all API responses, since it returns paths that does not correspond to the original object handled and "seen" from Volto, so you have to adjust them (via a code helper) in a lot of call responses.
- Simplify Docker builds, making all the configuration via the runtime environment variables
- Content negotiation was an amazing idea, but the reality is that it was a promise never fulfilled and it was sparsely supported in browsers or the web ecosysytem.

## Solutions

Seamless mode is a set of features in itself.

### Runtime environment variables

All the environment variables configurables work now in runtime, not in build time. This works since Volto 13.

!!! info
    Before Volto 13, you'd do:

    ```bash
    RAZZLE_API_PATH=https://plone.org yarn build && yarn start
    ```

    From Volto 13 on, you can:

    ```bash
    yarn build && RAZZLE_API_PATH=https://plone.org yarn start
    ```

## Advantages of the seamless mode

The zero configuration and the lack of having to rely on hardcoded variable names in the builds is already achieved from Volto 13. All important environment variables work in runtime.

Configuration using `Host` headers.

The zero config and the lack of having to rely on hardcoded variable names in the build
is the main advantage of seamless mode.

Theoretically, you could deploy several sites using the same Volto SSR server without
recompiling (just using the Host header in the reverse proxy)

Opens the door for http://servername/sitename deployments as well, so several sites
hosted the same Volto SSR server, we could use headers (same as Pyramid) to accomplish
that as well.

All internal links are app ones, so a link to a page /my-page will be returned by the
API as is. So flattenToAppURL will still be required (for old deployments) but if
seamless is adopted, it won't be required anymore in mid-term.

The Plone classic UI is not public (which in some points clients might find it ugly and
problematic from the SEO point of view), with the bonus that the indexers cannot reach
them.

Repeateable docker builds (since the config will be based on runtime)

## Development environment

* Seamless mode by default
* Calls to API is always routed through internal proxy, `http://localhost:3000` is both
  Volto and Plone by default.
* `RAZZLE_API_PATH` sensible default is `http://localhost:8080/Plone` (no change of
  behaviour)

![How Plone 6 works](HowPlone6Works001.png)

## Production environment

* Nothing changes for old deployments, all work the same way if `RAZZLE_API_PATH` is set
* If you want seamless in production as well you need to setup your reverse proxy (see
  attached Nginx reference config) properly, so the reverse proxy detects the accept
  header and route the requests properly, and remove API_PATH env var from your build In
  seamless mode no API_PATH is required (and should not be present at build time), but
  the Host header must be set in the reverse proxy (see attached Nginx reference config)
* `yarn start:prod` does not work without setting a build time (or runtime)
  `RAZZLE_API_PATH` enviroment variable. This is unavoidable if we want all the sensible
  defaults in place in production mode, so it no longer defaults to
  `http://localhost:8080/Plone`

![How Plone 6 works](./HowPlone6Works002.png)

## Nginx example config for seamless mode deployments

```conf
upstream backend {
    server host.docker.internal:8080;
}
upstream frontend {
    server host.docker.internal:3000;
}

server {
  listen 80;
  server_name myservername.org;

  client_max_body_size 1G;

  access_log /dev/stdout;
  error_log /dev/stdout;

  location ~(.*)$ {
    location ~* \.(js|jsx|css|less|swf|eot|ttf|otf|woff|woff2)$ {
        add_header Cache-Control "public";
        expires +1y;
        proxy_pass http://frontend;
    }
    location ~* static.*\.(ico|jpg|jpeg|png|gif|svg)$ {
        add_header Cache-Control "public";
        expires +1y;
        proxy_pass http://frontend;
    }

    if ($http_accept = 'application/json') {
        rewrite ^(.*) /VirtualHostBase/http/local.kitconcept.io/Plone/VirtualHostRoot$1 break;
        proxy_pass http://backend;
        break;
    }

    location ~ /@@images/ {
        rewrite ^(.*) /VirtualHostBase/http/local.kitconcept.io/Plone/VirtualHostRoot$1 break;
        proxy_pass http://backend;
        break;
    }

    location ~ /@@download/ {
        rewrite ^(.*) /VirtualHostBase/http/local.kitconcept.io/Plone/VirtualHostRoot$1 break;
        proxy_pass http://backend;
        break;
    }

    proxy_set_header        Host $host;
    proxy_set_header        X-Real-IP $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header        X-Forwarded-Proto $scheme;
    proxy_pass              http://frontend;
  }
}
```
