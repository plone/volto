---
myst:
  html_meta:
    "description": "How to install a Seven frontend add-on with Cookieplone"
    "property=og:description": "How to install a Seven frontend add-on with Cookieplone"
    "property=og:title": "Install Seven with Cookieplone"
    "keywords": "Plone, Plone 6, Volto, create, project, install, Cookieplone"
---

(create-a-plone-site-label)=

# Create a package: frontend add-on only

This chapter describes how you can create a package with only a frontend add-on using {term}`Cookieplone`.
Cookieplone is the recommended way to create a package as an add-on for Plone that uses the Seven frontend.
It also includes tools for development and deployment.


(seven-create-project-cookieplone-generate-the-package-label)=

## Generate the add-on package

After satisfying the {doc}`system-requirements` and having {ref}`activated an LTS version of Node.js <seven-prerequisites-nodejs-label>`, generate the add-on package.

```shell
COOKIEPLONE_REPOSITORY_TAG=seventemplate uvx cookieplone seven_addon --no-input
```


## Install the add-on package

Cookieplone creates a folder with the name of the add-on, in this example, {file}`seven-add-on`.

Change your current working directory to {file}`seven-add-on`.

```shell
cd seven-add-on
```

To install the add-on, use the following command.

```shell
make install
```

This will take a few minutes.
☕️
When the process completes successfully, it will exit with no message.


## Start Plone

Plone has two servers: one for the frontend, and one for the backend.
As such, we need to maintain two active shell sessions, one for each server, to start your Plone site.


### Start Plone backend

In the currently open session, issue the following command.

```shell
make backend-docker-start
```

The Plone backend server starts up and emits messages to the console.

```console
2024-09-25 16:47:15,699 INFO    [chameleon.config:39][MainThread] directory cache: /<path-to-project>/backend/instance/var/cache.
2024-09-25 16:47:16,387 WARNING [ZODB.FileStorage:412][MainThread] Ignoring index for /<path-to-project>/backend/instance/var/filestorage/Data.fs
2024-09-25 16:47:16,508 INFO    [plone.restapi.patches:16][MainThread] PATCH: Disabled ZPublisher.HTTPRequest.ZopeFieldStorage.VALUE_LIMIT. This enables file uploads larger than 1MB.
2024-09-25 16:47:17,018 INFO    [plone.volto:23][MainThread] Aliasing collective.folderish classes to plone.volto classes.
2024-09-25 16:47:17,760 INFO    [Zope:42][MainThread] Ready to handle requests
Starting server in PID 20912.
2024-09-25 16:47:17,772 INFO    [waitress:486][MainThread] Serving on http://[::1]:8080
2024-09-25 16:47:17,772 INFO    [waitress:486][MainThread] Serving on http://127.0.0.1:8080
```

This will start a clean Plone server for development purposes so you can start developing your add-on.


### Start Plone frontend

Create a second shell session in a new window.
Change your current working directory to {file}`seven-add-on`.
Start the Plone frontend with the following command.

```shell
make start
```

The Plone frontend server starts up and emits messages to the console, and should end with the following.
```console
  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open a browser at the following URL to visit your Plone site.

http://localhost:3000

Your newly created add-on will be installed with vanilla Seven.
You can start developing it in the add-on package located in {file}`packages/seven-add-on`.

You can stop the site with {kbd}`ctrl-c`.
