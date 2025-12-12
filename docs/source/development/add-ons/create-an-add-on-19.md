---
myst:
  html_meta:
    "description": "How to create an add-on for Volto 19"
    "property=og:description": "How to create an add-on for Volto 19"
    "property=og:title": "Create an add-on for Volto 19"
    "keywords": "add-on, Volto, create, development"
---

# Create an add-on for Volto 19

This chapter describes how you can create an add-on using Volto 19 or later for the Plone user interface, while having full control over its development and deployment.

```{note}
As of December 2024, Cookieplone defaults to the latest stable Volto version (currently 18.30.1). To create an add-on specifically for Volto 19, you can either:
1. Accept the default and upgrade later, or  
2. Specify Volto 19 when prompted during the generation process
```

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
╭────────────────────── cookieplone ──────────────────────╮
│                                                         │
│                         *******                         │
│                     ***************                     │
│                   ***             ***                   │
│                 ***    ***          ***                 │
│                ***    *****          ***                │
│               ***      ***            ***               │
│               ***               ***   ***               │
│               ***              *****  ***               │
│               ***      ***      ***   ***               │
│                ***    *****          ***                │
│                 ***    ***          ***                 │
│                   ***             ***                   │
│                     ***************                     │
│                         *******                         │
│                                                         │
╰─────────────────────────────────────────────────────────╯
You've downloaded /home/shyam/.cookiecutters/cookieplone-templates before.
Is it okay to delete and re-download it? [y/n] (y): y
╭───────────────── Volto Addon Generator ─────────────────╮
│                                                         │
│ Creating a new Volto Addon                              │
│                                                         │
│ Sanity check results:                                   │
│                                                         │
│                                                         │
│   - Node: ✓                                             │
│   - git: ✓                                              │
│                                                         │
╰─────────────────────────────────────────────────────────╯
  [1/10] Add-on Title (Volto Add-on): 
  [2/10] Add-on (Short name of the addon) (volto-addon): 
  [3/10] A short description of your addon (A new add-on for Volto): 
  [4/10] Author (Plone Community): 
  [5/10] Author E-mail (collective@plone.org): 
  [6/10] GitHub Username or Organization (collective): 
  [7/10] Package name on NPM (volto-addon): 
  [8/10] Should we use prerelease versions? (No): 
  [9/10] Volto version (18.30.1): 
  [10/10] Would you like to add a documentation scaffold to your project?
    1 - Yes
    2 - No
    Choose from [1/2] (1): 
╭──────────────────────── Volto Add-on generation ───────────────────────╮
│                                                                        │
│ Summary:                                                               │
│                                                                        │
│   - Volto version: 18.30.1                                            │
│   - Output folder: /Users/<username>/Development/plone/volto-addon     │
│                                                                        │
│                                                                        │
╰────────────────────────────────────────────────────────────────────────╯
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

Change your current working directory to `volto-addon`.

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
make[1]: Entering directory '/home/shyam/Desktop/code/volto/packages/volto'
=======================================================================================
Creating Plone volto SITE: Plone
Aditional profiles: 
THIS IS NOT MEANT TO BE USED IN PRODUCTION
Read about it: https://6.docs.plone.org/install/containers/images/backend.html
=======================================================================================
/app/lib/python3.12/site-packages/plone/app/theming/__init__.py:3: UserWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html. The pkg_resources package is slated for removal as early as 2025-11-30. Refrain from using this package or pin to Setuptools<81.
  __import__("pkg_resources").declare_namespace(__name__)
INFO:Plone Site Creation:Creating a new Plone site  @ Plone
INFO:Plone Site Creation: - Using the volto distribution and answers from /app/scripts/default.json
INFO:Plone Site Creation: - Site created!
Using default configuration
2025-12-12 10:00:59 INFO [chameleon.config:39][MainThread] directory cache: /app/var/cache.
2025-12-12 10:01:00 WARNING [ZODB.FileStorage:409][MainThread] Ignoring index for /app/var/filestorage/Data.fs
/app/lib/python3.12/site-packages/plone/app/theming/__init__.py:3: UserWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html. The pkg_resources package is slated for removal as early as 2025-11-30. Refrain from using this package or pin to Setuptools<81.
  __import__("pkg_resources").declare_namespace(__name__)
2025-12-12 10:01:01 INFO [plone.restapi.patches:16][MainThread] PATCH: Disabled ZPublisher.HTTPRequest.ZopeFieldStorage.VALUE_LIMIT. This enables file uploads larger than 1MB.
2025-12-12 10:01:01 INFO [plone.app.event:18][MainThread] icalendar has been set up to use pytz instead of zoneinfo.
2025-12-12 10:01:03 INFO [plone.volto:22][MainThread] Aliasing collective.folderish classes to plone.volto classes.
2025-12-12 10:01:04 INFO [Zope:42][MainThread] Ready to handle requests
Starting server in PID 1.
2025-12-12 10:01:04 INFO [waitress:449][MainThread] Serving on http://0.0.0.0:8080
```

This will start a clean Plone server for development purposes so you can start developing your add-on.


## Start Plone development frontend

Create a second shell session in a new window.
Change your current working directory to `volto-addon`.
Start the Plone development frontend with the following command.

```shell
make start
```

```console
✔ Something is already running on port 3001. Probably:
  node /home/shyam/Desktop/code/volto/packages/volto-razzle/scripts/start.js (pid 16780)
  in /home/shyam/Desktop/code/volto/packages/volto

Would you like to run the app on another port instead? … yes
 WAIT  Compiling...

● Client █████████████████████████ building (37%) 
2/4 entries 156/219 dependencies 38/76 modules 38 active 

● Client █████████████████████████ building (51%) 
3/4 entries 10050/10083 dependencies 1173/1999 modules 587 active 

● Client █████████████████████████ sealing (89%) after hashing

✔ Client
  Compiled successfully in 18.19s

✅  Server-side HMR Enabled!
The Volto server will make API requests to: http://localhost:3000/++api++
The Volto client will make API requests to: http://localhost:3000/++api++
Proxying API requests from http://localhost:3000/++api++ to http://localhost:8080/Plone
🎭 Volto started at 0.0.0.0:3000 🚀
```

Note that the Plone frontend uses an internal proxy server to connect with the Plone backend.
Open a browser at the following URL to visit your Plone site.

[http://localhost:3000](http://localhost:3000)

You will see a page similar to the following.

```{image} /_static/plone-home-page.png
:alt: Plone home page
:class: figure
```

Your newly created add-on will be installed with vanilla core Volto.
You can start developing it in the add-on package located in {file}`packages/volto-addon`.

You can stop the site with {kbd}`ctrl-c`.