---
myst:
  html_meta:
    "description": "How to create an add-on for Volto 18"
    "property=og:description": "How to create an add-on for Volto 18"
    "property=og:title": "Create an add-on for Volto 18"
    "keywords": "add-on, Volto, create, development"
---

# Create an add-on for Volto 18

This chapter describes how you can create an add-on for the frontend only using Volto 18 or later, while having full control over its development and deployment.

To develop add-ons for both the frontend and backend that work together, then instead use the Cookieplone template `project` in the command.
See {doc}`plone:install/create-project-cookieplone` for details of the latter scenario.

```{versionadded} Volto 18.0.0-alpha.43
{term}`Cookieplone` is now the method to create a Plone add-on with Volto version 18.0.0-alpha.43 and above.
```

## System requirements

Follow the section {ref}`plone:create-project-cookieplone-system-requirements` to set up your system.


## Generate the add-on project

To develop an add-on for only the frontend, run the following command to generate your add-on project using the `frontend_addon` Cookieplone template.

```shell
uvx run cookieplone frontend_addon
```

```console
╭──────────────────────────────── cookieplone ────────────────────────────────╮
│                                                                             │
│                              .xxxxxxxxxxxxxx.                               │
│                          ;xxxxxxxxxxxxxxxxxxxxxx;                           │
│                       ;xxxxxxxxxxxxxxxxxxxxxxxxxxxx;                        │
│                     xxxxxxxxxx              xxxxxxxxxx                      │
│                   xxxxxxxx.                    .xxxxxxxx                    │
│                  xxxxxxx      xxxxxxx:            xxxxxxx                   │
│                :xxxxxx       xxxxxxxxxx             xxxxxx:                 │
│               :xxxxx+       xxxxxxxxxxx              +xxxxx:                │
│              .xxxxx.        :xxxxxxxxxx               .xxxxx.               │
│              xxxxx+          ;xxxxxxxx                 +xxxxx               │
│              xxxxx              +xx.                    xxxxx.              │
│             xxxxx:                      .xxxxxxxx       :xxxxx              │
│             xxxxx                      .xxxxxxxxxx       xxxxx              │
│             xxxxx                      xxxxxxxxxxx       xxxxx              │
│             xxxxx                      .xxxxxxxxxx       xxxxx              │
│             xxxxx:                      .xxxxxxxx       :xxxxx              │
│             .xxxxx              ;xx.       ...          xxxxx.              │
│              xxxxx+          :xxxxxxxx                 +xxxxx               │
│              .xxxxx.        :xxxxxxxxxx               .xxxxx.               │
│               :xxxxx+       xxxxxxxxxxx              ;xxxxx:                │
│                :xxxxxx       xxxxxxxxxx             xxxxxx:                 │
│                  xxxxxxx      xxxxxxx;            xxxxxxx                   │
│                   xxxxxxxx.                    .xxxxxxxx                    │
│                     xxxxxxxxxx              xxxxxxxxxx                      │
│                       ;xxxxxxxxxxxxxxxxxxxxxxxxxxxx+                        │
│                          ;xxxxxxxxxxxxxxxxxxxxxx;                           │
│                              .xxxxxxxxxxxxxx.                               │
│                                                                             │
╰─────────────────────────────────────────────────────────────────────────────╯
You've downloaded /<PATH_TO>/.cookiecutters/cookieplone-templates before.
Is it okay to delete and re-download it? [y/n] (y): 
╭─────────────────────────── Volto Addon Generator ───────────────────────────╮
│                                                                             │
│ Creating a new Volto Addon                                                  │
│                                                                             │
│ Sanity check results:                                                       │
│                                                                             │
│                                                                             │
│   - Node: ✓                                                                 │
│   - git: ✓                                                                  │
│                                                                             │
╰─────────────────────────────────────────────────────────────────────────────╯
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
╭────────────────────────── Volto Add-on generation ──────────────────────────╮
│                                                                             │
│ Summary:                                                                    │
│                                                                             │
│   - Volto version: 18.22.0                                                  │
│   - Output folder: /<PATH_TO>/volto-add-on                                  │
│                                                                             │
│                                                                             │
╰─────────────────────────────────────────────────────────────────────────────╯
 -> Setup Documentation Scaffold
╭─────────────────────── 🎉 New addon was generated 🎉 ───────────────────────╮
│                                                                             │
│ volto-add-on                                                                │
│                                                                             │
│ Now, enter the generated directory and finish the install:                  │
│                                                                             │
│ cd volto-add-on                                                             │
│ make install                                                                │
│                                                                             │
│ start coding, and push to your organization.                                │
│                                                                             │
│ Sorry for the convenience,                                                  │
│ The Plone Community.                                                        │
│                                                                             │
│ https://plone.org/                                                          │
╰─────────────────────────────────────────────────────────────────────────────╯
```

Cookieplone creates a folder with the name of the add-on, in this example, `volto-add-on`.

Change your current working directory to {file}`volto-add-on`.

```shell
cd volto-add-on
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
==> Start Docker-based Plone Backend
=======================================================================================
Creating Plone volto SITE: Plone
Aditional profiles: 
THIS IS NOT MEANT TO BE USED IN PRODUCTION
Read about it: https://6.docs.plone.org/install/containers/images/backend.html
=======================================================================================
WARNING:GenericSetup.componentregistry:The object None was not found, while trying to register an utility. The provided object definition was portal_metadata. The site used was: <PloneSite at /Plone>
WARNING:GenericSetup.componentregistry:The object None was not found, while trying to register an utility. The provided object definition was portal_syndication. The site used was: <PloneSite at /Plone>
WARNING:GenericSetup.componentregistry:The object None was not found, while trying to register an utility. The provided object definition was portal_undo. The site used was: <PloneSite at /Plone>
WARNING:Products.MimetypesRegistry.MimeTypesRegistry:Redefining mime type text/plain (<class 'Products.MimetypesRegistry.mime_types.mtr_mimetypes.text_plain'>)
WARNING:Products.MimetypesRegistry.MimeTypesRegistry:Redefining mime type application/msword (<class 'Products.MimetypesRegistry.mime_types.mtr_mimetypes.application_msword'>)
WARNING:Products.MimetypesRegistry.MimeTypesRegistry:Redefining mime type text/xml (<class 'Products.MimetypesRegistry.mime_types.mtr_mimetypes.text_xml'>)
WARNING:Products.MimetypesRegistry.MimeTypesRegistry:Redefining mime type text/x-python (<class 'Products.MimetypesRegistry.mime_types.mtr_mimetypes.text_python'>)
WARNING:Products.MimetypesRegistry.MimeTypesRegistry:Redefining mime type application/octet-stream (<class 'Products.MimetypesRegistry.mime_types.mtr_mimetypes.application_octet_stream'>)
WARNING:Products.MimetypesRegistry.MimeTypesRegistry:Redefining mime type application/rtf (<class 'Products.MimetypesRegistry.mime_types.mtr_mimetypes.application_rtf'>)
WARNING:Products.MimetypesRegistry.MimeTypesRegistry:Redefining mime type text/html (<class 'Products.MimetypesRegistry.mime_types.mtr_mimetypes.text_html'>)
Using default configuration
2025-06-01 08:33:00 INFO [chameleon.config:39][MainThread] directory cache: /app/var/cache.
2025-06-01 08:33:01 WARNING [ZODB.FileStorage:409][MainThread] Ignoring index for /app/var/filestorage/Data.fs
2025-06-01 08:33:01 INFO [plone.restapi.patches:16][MainThread] PATCH: Disabled ZPublisher.HTTPRequest.ZopeFieldStorage.VALUE_LIMIT. This enables file uploads larger than 1MB.
2025-06-01 08:33:02 INFO [plone.volto:23][MainThread] Aliasing collective.folderish classes to plone.volto classes.
2025-06-01 08:33:03 INFO [Zope:42][MainThread] Ready to handle requests
Starting server in PID 1.
2025-06-01 08:33:03 INFO [waitress:449][MainThread] Serving on http://0.0.0.0:8080
```

This will start a clean Plone server for development purposes so you can start developing your add-on.


## Start Plone development frontend

Create a second shell session in a new window.
Change your current working directory to {file}`volto-add-on`.
Start the Plone development frontend with the following command.

```shell
make start
```

The console will return something similar to the following output.

```console
webpack 5.90.1 compiled successfully in 14692 ms
sswp> Handling Hot Module Reloading
✅  Server-side HMR Enabled!
API server (API_PATH) is set to: http://localhost:3000
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
