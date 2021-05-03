# Zero configuration builds

!!! note
    This feature is available since Volto 13.

In the past (before Volto 13), Volto was configured in build time using several
environment vars, commonly supplied via the command line, like:

`PORT=11001 RAZZLE_API_PATH=https://plone.org/api yarn build`

and since RAZZLE is a isomorphic app, some of these values passed on build time, were
hardcoded in the code because the code in client and server need to know them upfront to
in order to work.

Volto 13 has several new features that allows zero configuration on build time, using
some sensible defaults and using the current request to know in which domain Volto is
being hosted and configuring itself in runtime. You can still pass the environment
variables in build time, and it will work as it used to be, but we encourage you to have
"builds that rules them all" and use only runtime variables to configure Volto.

## Configuring RAZZLE_API_PATH from the request

Volto is able to look into the request and infer the API path to be used. This only
happens in seamless mode, since it assumes that the backend will be hosted in the same
path (the root) of the request that is getting. This feature relies in the Host header.
You can set this header in the webserver that you are using in front of Volto. This
configuration is for Nginx:


```conf hl_lines="15"
[...more config here]
server {
  listen 80;
  server_name plone.org;

  client_max_body_size 1G;

  access_log /dev/stdout;
  error_log /dev/stdout;

  location ~(.*)$ {

[...more config here]

    proxy_set_header        Host $host;
    proxy_set_header        X-Real-IP $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header        X-Forwarded-Proto $scheme;
    proxy_pass              http://frontend;
  }
}
```

## Configuring PORT on runtime

PORT environment variable is also configurable at runtime, whish is specially useful in production since you can inject it in the run command line or in your favorite process manager, per config, without having to rebuild Volto in the process. In PM2 it would be like:

```js hl_lines="9"
module.exports = {
  apps: [
     {
        script: "/srv/mywebsite.com/build/server.js",
        name: "mywebsite.com-volto",
        cwd: "/srv/mywebsite.com",
        env: {
          NODE_ENV: "production",
          PORT: "11001"
        }
     }
    ]
};
```
