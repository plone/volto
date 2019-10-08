# Deployment using a node process manager (pm2)

Create a file example.com.pm2.config.js in your repo or on your server.

`````
module.exports = {
  apps: [
     {
       script: "/srv/example.com/build/server.js",
       name: "example.com-volto",
       cwd: "/srv/example.com"
     },
     {
       script: "/srv/example.com/api/bin/zeo",
       args: "fg",
       name: "example.com-api-zeo",
       cwd: "/srv/example.com",
       interpreter: "/srv/example.com/api/bin/python"
     },
     {
       script: "/srv/example.com/api/bin/instance1",
       args: "console",
       name: "example.com-api-instance1",
       cwd: "/srv/example.com",
       interpreter: "/srv/example.com/api/bin/python"
     },
     {
       script: "/srv/example.com/api/bin/instance2",
       args: "console",
       name: "example.com-api-instance2",
       cwd: "/srv/example.com",
       interpreter: "/srv/example.com/api/bin/python"
     }
    ]
};
`````

- "example.com-volto" starts the Node process that is responsible for the server-side-rendering.
- "example.com-api-zeo" starts the ZEO server
- "example.com-api-instance1" starts the first Zope instance
- "example.com-api-instance2" starts the second Zope instance

Add more Zope instances if necessary.