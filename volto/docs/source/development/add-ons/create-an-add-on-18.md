---
myst:
  html_meta:
    "description": "How to create an add-on for Volto 18"
    "property=og:description": "How to create an add-on for Volto 18"
    "property=og:title": "Create an add-on for Volto 18"
    "keywords": "add-on, Volto, create, development"
---

# Create an add-on for Volto 18

This chapter describes how you can create an add-on using Volto 18 or later for the Plone user interface, while having full control over its development and deployment.

```{versionadded} Volto 18.0.0-alpha.43
{term}`Cookieplone` is now the method to create a Plone add-on with Volto version 18.0.0-alpha.43 and above.
```

## System requirements

Follow the section {ref}`plone:create-project-cookieplone-system-requirements` to set up your system.


## Generate the add-on project

To develop an add-on for only the frontend, then run the following command to generate your add-on project using the `frontend_addon` Cookieplone template.
To develop add-ons for each the frontend and backend that work together, then instead use the Cookieplone template `project` in the command.
See {doc}`plone:install/create-project-cookieplone` for details of the latter scenario.
The following output assumes the former scenario.

```shell
pipx run cookieplone frontend_addon
```

```console
❯ pipx run cookieplone frontend_addon
⚠️  cookieplone is already on your PATH and installed at
    /Users/<username>/.local/bin/cookieplone. Downloading and running anyway.
╭──────────────────────────────── cookieplone ─────────────────────────────────╮
│                                                                              │
│                               .xxxxxxxxxxxxxx.                               │
│                           ;xxxxxxxxxxxxxxxxxxxxxx;                           │
│                        ;xxxxxxxxxxxxxxxxxxxxxxxxxxxx;                        │
│                      xxxxxxxxxx              xxxxxxxxxx                      │
│                    xxxxxxxx.                    .xxxxxxxx                    │
│                   xxxxxxx      xxxxxxx:            xxxxxxx                   │
│                 :xxxxxx       xxxxxxxxxx             xxxxxx:                 │
│                :xxxxx+       xxxxxxxxxxx              +xxxxx:                │
│               .xxxxx.        :xxxxxxxxxx               .xxxxx.               │
│               xxxxx+          ;xxxxxxxx                 +xxxxx               │
│               xxxxx              +xx.                    xxxxx.              │
│              xxxxx:                      .xxxxxxxx       :xxxxx              │
│              xxxxx                      .xxxxxxxxxx       xxxxx              │
│              xxxxx                      xxxxxxxxxxx       xxxxx              │
│              xxxxx                      .xxxxxxxxxx       xxxxx              │
│              xxxxx:                      .xxxxxxxx       :xxxxx              │
│              .xxxxx              ;xx.       ...          xxxxx.              │
│               xxxxx+          :xxxxxxxx                 +xxxxx               │
│               .xxxxx.        :xxxxxxxxxx               .xxxxx.               │
│                :xxxxx+       xxxxxxxxxxx              ;xxxxx:                │
│                 :xxxxxx       xxxxxxxxxx             xxxxxx:                 │
│                   xxxxxxx      xxxxxxx;            xxxxxxx                   │
│                    xxxxxxxx.                    .xxxxxxxx                    │
│                      xxxxxxxxxx              xxxxxxxxxx                      │
│                        ;xxxxxxxxxxxxxxxxxxxxxxxxxxxx+                        │
│                           ;xxxxxxxxxxxxxxxxxxxxxx;                           │
│                               .xxxxxxxxxxxxxx.                               │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯
You've downloaded /Users/<username>/.cookiecutters/cookieplone-templates before.
Is it okay to delete and re-download it? [y/n] (y):
╭─────────────────────────── Volto Addon Generator ────────────────────────────╮
│                                                                              │
│ Creating a new Volto Addon                                                   │
│                                                                              │
│ Sanity check results:                                                        │
│                                                                              │
│                                                                              │
│   - Node: ✓                                                                  │
│   - git: ✓                                                                   │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯
  [1/8] Add-on Title (Volto Add-on):
  [2/8] Add-on (Short name of the addon) (volto-addon):
  [3/8] A short description of your addon (A new add-on for Volto):
  [4/8] Author (Plone Community):
  [5/8] Author E-mail (collective@plone.org):
  [6/8] GitHub Username or Organization (collective):
  [7/8] Package name on NPM (volto-addon):
  [8/8] Volto version (18.0.0-alpha.46):
╭────────────────────────── Volto Add-on generation ───────────────────────────╮
│                                                                              │
│ Summary:                                                                     │
│                                                                              │
│   - Volto version: 18.0.0-alpha.46                                           │
│   - Output folder: /Users/<username>/Development/plone/volto-addon           │
│                                                                              │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─────────────────────── 🎉 New addon was generated 🎉 ────────────────────────╮
│                                                                              │
│ volto-addon                                                                  │
│                                                                              │
│ Now, enter the generated directory and finish the install:                   │
│                                                                              │
│ cd volto-addon                                                               │
│ make install                                                                 │
│                                                                              │
│ start coding, and push to your organization.                                 │
│                                                                              │
│ Sorry for the convenience,                                                   │
│ The Plone Community.                                                         │
│                                                                              │
│ https://plone.org/                                                           │
╰──────────────────────────────────────────────────────────────────────────────╯
```

Cookieplone creates a folder with the name of the add-on, in this example, `volto-addon`.

Change your current working directory to {file}`volto-addon`.

```shell
cd volto-addon
```

To install the add-on setup, use the following command.

```shell
make install
```


## Start Plone backend Docker container

In the currently open shell session, issue the following command.

```shell
make backend-docker-start
```

```console
❯ make backend-docker-start
==> Start Docker-based Plone Backend
=======================================================================================
Creating Plone volto SITE: Plone
Aditional profiles:
THIS IS NOT MEANT TO BE USED IN PRODUCTION
Read about it: https://6.docs.plone.org/install/containers/images/backend.html
=======================================================================================
Ignoring index for /app/var/filestorage/Data.fs
INFO:Plone Site Creation:Creating a new Plone site  @ Plone
INFO:Plone Site Creation: - Using the voltolighttheme distribution and answers from /app/scripts/default.json
INFO:Plone Site Creation: - Stopping site creation, as there is already a site with id Plone at the instance. Set DELETE_EXISTING=1 to delete the existing site before creating a new one.
Using default configuration
2024-10-11 16:12:47 INFO [chameleon.config:39][MainThread] directory cache: /app/var/cache.
2024-10-11 16:12:48 INFO [plone.restapi.patches:16][MainThread] PATCH: Disabled ZPublisher.HTTPRequest.ZopeFieldStorage.VALUE_LIMIT. This enables file uploads larger than 1MB.
2024-10-11 16:12:49 INFO [plone.volto:23][MainThread] Aliasing collective.folderish classes to plone.volto classes.
2024-10-11 16:12:50 INFO [Zope:42][MainThread] Ready to handle requests
Starting server in PID 1.
2024-10-11 16:12:50 INFO [waitress:486][MainThread] Serving on http://0.0.0.0:8080
```

This will start a clean Plone server for development purposes so you can start developing your add-on.


## Start Plone development frontend

Create a second shell session in a new window.
Change your current working directory to {file}`volto-addon`.
Start the Plone development frontend with the following command.

```shell
make start
```

```console
webpack 5.90.1 compiled successfully in 11004 ms
sswp> Handling Hot Module Reloading
Using volto.config.js in: /<path-to-project>/frontend/volto.config.js
✅  Server-side HMR Enabled!
Volto is running in SEAMLESS mode
Proxying API requests from http://localhost:3000/++api++ to http://localhost:8080/Plone
🎭 Volto started at 0.0.0.0:3000 🚀
```

Note that the Plone frontend uses an internal proxy server to connect with the Plone backend.
Open a browser at the following URL to visit your Plone site.

http://localhost:3000

You will see a page similar to the following.

```{image} /_static/plone-home-page.png
:alt: Plone home page
:class: figure
```

Your newly created add-on will be installed with vanilla core Volto.
You can start developing it in the add-on package located in {file}`packages/volto-addon`.

You can stop the site with {kbd}`ctrl-c`.
