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

You can also run `pipx run cookieplone` without a specific template.
It will show a prompt in the terminal for you to choose one between 4 templates:

1. A Plone Project - Create a new Plone project with backend and frontend components
2. Backend Add-on for Plone - Create a new Python package to be used with Plone
3. Frontend Add-on for Plone - Create a new Node package to be used with Volto
4. Documentation scaffold for Plone projects - Create a new documentation scaffold for Plone projects

For Volto-only (frontend-only development) the option `3` is all you need.

Then the output is:

```console
╭───────────────────────────────────── cookieplone ─────────────────────────────────────╮
│                                                                                       │
│                                   .xxxxxxxxxxxxxx.                                    │
│                               ;xxxxxxxxxxxxxxxxxxxxxx;                                │
│                            ;xxxxxxxxxxxxxxxxxxxxxxxxxxxx;                             │
│                          xxxxxxxxxx              xxxxxxxxxx                           │
│                        xxxxxxxx.                    .xxxxxxxx                         │
│                       xxxxxxx      xxxxxxx:            xxxxxxx                        │
│                     :xxxxxx       xxxxxxxxxx             xxxxxx:                      │
│                    :xxxxx+       xxxxxxxxxxx              +xxxxx:                     │
│                   .xxxxx.        :xxxxxxxxxx               .xxxxx.                    │
│                   xxxxx+          ;xxxxxxxx                 +xxxxx                    │
│                   xxxxx              +xx.                    xxxxx.                   │
│                  xxxxx:                      .xxxxxxxx       :xxxxx                   │
│                  xxxxx                      .xxxxxxxxxx       xxxxx                   │
│                  xxxxx                      xxxxxxxxxxx       xxxxx                   │
│                  xxxxx                      .xxxxxxxxxx       xxxxx                   │
│                  xxxxx:                      .xxxxxxxx       :xxxxx                   │
│                  .xxxxx              ;xx.       ...          xxxxx.                   │
│                   xxxxx+          :xxxxxxxx                 +xxxxx                    │
│                   .xxxxx.        :xxxxxxxxxx               .xxxxx.                    │
│                    :xxxxx+       xxxxxxxxxxx              ;xxxxx:                     │
│                     :xxxxxx       xxxxxxxxxx             xxxxxx:                      │
│                       xxxxxxx      xxxxxxx;            xxxxxxx                        │
│                        xxxxxxxx.                    .xxxxxxxx                         │
│                          xxxxxxxxxx              xxxxxxxxxx                           │
│                            ;xxxxxxxxxxxxxxxxxxxxxxxxxxxx+                             │
│                               ;xxxxxxxxxxxxxxxxxxxxxx;                                │
│                                   .xxxxxxxxxxxxxx.                                    │
│                                                                                       │
╰───────────────────────────────────────────────────────────────────────────────────────╯
You've downloaded /home/silviub/.cookiecutters/cookieplone-templates before. Is it okay
to delete and re-download it? [y/n] (y):
╭──────────────────────────────── Volto Addon Generator ────────────────────────────────╮
│                                                                                       │
│ Creating a new Volto Addon                                                            │
│                                                                                       │
│ Sanity check results:                                                                 │
│                                                                                       │
│                                                                                       │
│   - Node: ✓                                                                           │
│   - git: ✓                                                                            │
│                                                                                       │
╰───────────────────────────────────────────────────────────────────────────────────────╯
  [1/10] Add-on Title (Volto Add-on):
  [2/10] Add-on (Short name of the addon) (volto-add-on):
  [3/10] A short description of your addon (A new add-on for Volto):
  [4/10] Author (Plone Community):
  [5/10] Author E-mail (collective@plone.org):
  [6/10] GitHub Username or Organization (collective):
  [7/10] Package name on NPM (volto-add-on):
  [8/10] Should we use prerelease versions? (No):
  [9/10] Volto version (18.22.0):
  [10/10] Would you like to add a documentation scaffold to your project?
    1 - Yes
    2 - No
    Choose from [1/2] (1):
╭─────────────────────────────── Volto Add-on generation ───────────────────────────────╮
│                                                                                       │
│ Summary:                                                                              │
│                                                                                       │
│   - Volto version: 18.22.0                                                            │
│   - Output folder: /home/silviub/Desktop/Pro/volto-add-on                             │
│                                                                                       │
│                                                                                       │
╰───────────────────────────────────────────────────────────────────────────────────────╯
 -> Setup Documentation Scaffold
╭──────────────────────────── 🎉 New addon was generated 🎉 ────────────────────────────╮
│                                                                                       │
│ volto-add-on                                                                          │
│                                                                                       │
│ Now, enter the generated directory and finish the install:                            │
│                                                                                       │
│ cd volto-add-on                                                                       │
│ make install                                                                          │
│                                                                                       │
│ start coding, and push to your organization.                                          │
│                                                                                       │
│ Sorry for the convenience,                                                            │
│ The Plone Community.                                                                  │
│                                                                                       │
│ https://plone.org/                                                                    │
╰───────────────────────────────────────────────────────────────────────────────────────╯
```

You can also use uvx:

```shell
uvx cookieplone
```

After the exit of the Cookieplone process, we have a new folder with the name of the add-on, in this example, `volto-addon`.

Change your current working directory to {file}`volto-addon`.

```shell
cd volto-addon
```

To install the add-on setup, use the following command.

```shell
make install
```


## Start Plone backend Docker container

For offering the full information about what Cookieplone produces in different useful templates, we included both the `make` commands from full-stack template and from frontend add-on template below.

In the currently open shell session, issue the following command.

`````{tab-set}
````{tab-item} Cookieplone full-stack template
```shell
make backend-start
```
````
````{tab-item} Cookieplone frontend add-on template
```shell
make backend-docker-start
```
````
`````

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

`````{tab-set}
````{tab-item} Cookieplone full-stack template
```shell
make frontend-start
```
````
````{tab-item} Cookieplone frontend add-on template
```shell
make start
```
````
`````

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
