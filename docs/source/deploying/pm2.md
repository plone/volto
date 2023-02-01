---
myst:
  html_meta:
    "description": "Using PM2 as a process manager for deployment of Volto."
    "property=og:description": "Using PM2 as a process manager for deployment of Volto."
    "property=og:title": "Deployment using a node process manager (PM2)"
    "keywords": "Volto, Plone, frontend, React, deployment, PM2"
---

# Deployment using a node process manager (PM2)

PM2 is a popular and maintained process manager based in node (https://pm2.keymetrics.io/).

```{note}
You can use the good old known supervisord as well. However, the supervisord project is stalled and in low maintenance mode for many years. PM2 is a good alternative, and as you'll see you can manage all kind of processes, not only node ones, including the Plone processes.
```

Create a file `mywebsite.com.pm2.config.js` in your repo or on your server.

```{important}
Make sure your PM2 config file sufix ends in `config.js`, otherwise PM2 will ignore it.
```

```js
module.exports = {
  apps: [
     {
       script: "/srv/mywebsite.com/build/server.js",
       name: "mywebsite.com-volto",
       cwd: "/srv/mywebsite.com"
     },
     {
       script: "/srv/mywebsite.com/api/bin/zeo",
       args: "fg",
       name: "mywebsite.com-api-zeo",
       cwd: "/srv/mywebsite.com",
       interpreter: "/srv/mywebsite.com/api/bin/python"
     },
     {
       script: "/srv/mywebsite.com/api/bin/instance1",
       args: "console",
       name: "mywebsite.com-api-instance1",
       cwd: "/srv/mywebsite.com",
       interpreter: "/srv/mywebsite.com/api/bin/python"
     },
     {
       script: "/srv/mywebsite.com/api/bin/instance2",
       args: "console",
       name: "mywebsite.com-api-instance2",
       cwd: "/srv/mywebsite.com",
       interpreter: "/srv/mywebsite.com/api/bin/python"
     }
    ]
};
```

- `mywebsite.com-volto` starts the Node process that is responsible for Volto {term}`server-side rendering`.
- `mywebsite.com-api-zeo` starts the ZEO server.
- `mywebsite.com-api-instance1` starts the first Zope instance.
- `mywebsite.com-api-instance2` starts the second Zope instance.

Add more Zope instances if necessary.
