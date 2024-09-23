---
myst:
  html_meta:
    "description": "Learn how to set up an environment to develop Volto core and the basics of the Volto monorepo."
    "property=og:description": "Learn how to set up an environment to develop Volto core and the basics of the Volto monorepo."
    "property=og:title": "Develop Volto core"
    "keywords": "pnpm, monorepo, develop, core, Volto, Plone, frontend, typescript"
---

# Develop Volto core

This chapter describes how to develop the latest version of Volto core and its libraries, packages, and apps as open source software contributions.

```{seealso}
For previous versions of Volto core, you should follow the guide in the relevant version branch to build and run the backend.

-   [Volto 17](https://github.com/plone/volto/blob/17.x.x/api/README.rst)
-   [Volto 16](https://github.com/plone/volto/blob/16.x.x/api/README.rst)

Additionally you can build each version of Volto documentation by running `make docs-html` from the root of the repository, and reading the relevant developer and contributing documentation.
```

```{seealso}
To create a full Plone project with both frontend and backend, see {doc}`plone:install/create-project` instead.
```


(developing-core-monorepo-structure-label)=

## Monorepo structure

The Volto core repository has the shape of a monorepo, where "mono" means "single" and "repo" is short for "repository".
This means that several apps and libraries related to each other are stored in the same repository.
They are managed together but released individually.
This allows the code to be shared effectively, and unifies tracking of changes across all of the apps and libraries.

This monorepo uses pnpm as a package manager, extensively using its {term}`workspace` feature.
It's organized in two folders, depending on whether it's a library (package) or an app.
The workspaces are located in the `packages` or `apps` folder.


### Folder layout

Volto has the following folder structure.

```text
(volto-monorepo)/
├─ apps/
│  ├─ plone
│  ├─ nextjs
│  └─ remix
├─ packages/
│  ├─ volto
│  ├─ client
│  ├─ components
│  ├─ registry
│  ├─ types
│  ├─ coresandbox
│  ├─ generator-volto
│  ├─ scripts
│  ├─ tsconfig
│  ├─ volto-guillotina
│  ├─ volto-slate
│  └─ volto-testing
├─ .gitignore
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
├─ tsconfig.json
├─ ...
```


## Development pre-requisites

To set up a Volto core development environment, your system must satisfy the following pre-requisites.

```{include} ./install-operating-system.md
```

-   {term}`nvm`
-   {term}`Node.js` LTS 20.x
-   {term}`pnpm`
-   {term}`GNU make`
-   {term}`Docker`
-   {term}`Git`

```{note}
When developing Volto core, pnpm is required.
When developing a project using Plone, Yarn or other package managers may be used.
```


### nvm

```{include} ./install-nvm.md
```


### Node.js

We recommend that you install Node.js using nvm.
Alternatively you can install Node.js using Homebrew or other package installer.

```{include} ./install-nodejs.md
```


### pnpm

Using corepack:

```shell
corepack prepare pnpm@latest --activate
```

or using `npm`:

```shell
npm install -g pnpm@latest
```

Verify the latest version.

```shell
pnpm --version
```

Compare the output to the [latest pnpm release number](https://www.npmjs.com/package/pnpm).

```{seealso}
[pnpm installation](https://pnpm.io/installation).
```


### Make

```{include} ./install-make.md
```


### Docker

```{include} ./install-docker.md
```


### Git

```{include} ../contributing/install-git.md
```


## Set up the environment

You need to perform the steps in this section only once to set up your environment.

Clone the Volto repo, and change your working directory to the cloned repository:

```shell
git clone https://github.com/plone/volto.git
cd volto
```

Install the frontend dependencies.

```shell
pnpm install
```


(develop-volto-start-plone-label)=

## Start Plone

Every time you want to run Volto for core development, you will need to create two terminal sessions, one for the {ref}`backend <develop-volto-start-the-backend-label>` and one for the {ref}`frontend <develop-volto-start-the-frontend-label>`.
For both sessions, change your working directory to the root of your Volto clone.

To stop either the backend or frontend, use {kbd}`ctrl-c`.


(develop-volto-start-the-backend-label)=

### Start the backend

`````{versionadded} 18.0.0-alpha.42
Persist backend data across Docker sessions.

````{warning}
Do not use this method of persistence in a production environment.
It is intended only for development.

```{seealso}
{doc}`../deploying/index`
```
````
`````

In the first session, start the backend.
You can browse to the backend running at http://localhost:8080.

```shell
make backend-docker-start
```

When you run this command for the first time, it will download Docker images, configure the backend, create a Docker volume to persist the data named `volto-backend-data`, and start the backend.

Subsequently, when you run `make backend-docker-start`, it will only start the backend using the existing configuration and Docker image and volume.

````{note}
If you would like to start the backend with a clean data volume, you can run the following command.

```shell
docker volume rm volto-backend-data
```

Then run `make backend-docker-start` again to start the backend with a clean data volume.
````


(develop-volto-configure-backend-language-label)=

#### Configure backend language

If you use the Docker image [`plone-backend`](https://github.com/plone/plone-backend), you can set its `LANGUAGE` environment variable, overriding the default of `en`, when you start it.

This variable is applied only when the Plone site is created.
If you persist data through restarts, you only need to do this once.
Conversely, if you create a Plone site in the wrong language, you can delete the data volume, and recreate it with the correct language.

You can either pass an environment variable into the make command to start the backend, or export an environment variable in your shell session and start the backend.

```shell
# pass method
LANGUAGE=pt-br make backend-docker-start

# export method
export LANGUAGE=pt-br
make backend-docker-start
```


(develop-volto-start-the-frontend-label)=

## Start the frontend

In the second session, start the frontend, Volto.

```shell
pnpm start
```

Browse to the frontend running at http://localhost:3000.


(developing-core-run-commands-for-pnpm-workspaces-label)=

## Run commands for pnpm workspaces

As mentioned in {ref}`developing-core-monorepo-structure-label`, pnpm has the concept of {term}`workspace`.
Every package or app located in the `packages` or `apps` folders is declared as a pnpm workspace.

When developing Volto, you can run pnpm commands from either the repository root or inside the package's or app's workspace in `packages/<package_name>` or `apps/<app_name>`.

pnpm commands will apply in the context from which they are run.
That means when you run a pnpm command from the repository root, it will apply to all workspaces.
It also means when you run a pnpm command from inside a workspace, it will apply only to that workspace.

You can also use the pnpm `--filter` feature from the repository root to apply to only the specified workspaces, as shown in the following examples.

```shell
pnpm --filter @plone/volto start
```

The above command when run from the repository root will start Volto.

```shell
pnpm --filter @plone/registry build
```

The above command when run from the repository root will build the Volto registry.

```{seealso}
For more information about pnpm workspaces, read the [documentation of pnpm workspaces](https://pnpm.io/workspaces).
```


## Developing Volto

The Volto core code is located in the `packages/volto` folder.

````{versionchanged} 18.x.x
Since December 2023, the Volto repository is now a monorepo.
Volto is located now in the `packages/volto` folder.
You can run all the usual commands from inside that folder, but replacing `yarn` with `pnpm`, since they have similar commands and features.
For example, to start Volto:

```shell
pnpm start
```
````

You can also run commands for a specific workspace using the `--filter` feature as shown in the previous section, {ref}`developing-core-run-commands-for-pnpm-workspaces-label`.


## Develop other libraries in a workspace

If a package is a dependency of another package in the monorepo, and it's declared as a workspace, they can be declared as usual in the {file}`package.json` as follows:

```json
"dependencies": {
  "@plone/types": "workspace:*"
}
```

```{seealso}
[Documentation of pnpm workspaces](https://pnpm.io/workspaces).
```


## TypeScript

By default, the use of TypeScript is required in Plone frontend libraries, Volto itself being an exception.

```{seealso}
{ref}`typescript-policy-in-core-label`.
```

## Core libraries

The monorepository consists of several core libraries.

### Volto project generator

`@plone/generator-volto` is a Yeoman generator that helps you set up Volto via command line.
It generates all the boilerplate needed to start developing a Plone Volto project.
It is used by [CookieCutter Plone Starter](https://github.com/collective/cookiecutter-plone-starter), the recommended way to set up Plone projects.
The generator features an `addon` template for scaffolding Volto add-ons in your projects.

### Registry

`@plone/registry` provides support for building an add-on registry and infrastructure for JavaScript and TypeScript-based apps.
Used by Volto, you can also use it in other JavaScript frameworks and environments to help create an add-on driven extensiblility story.

### Scripts

`@plone/scripts` is the placeholder of tools used by Volto and its add-ons, such as the `i18n` internationalization scripts.

### Types

`@plone/types` is the package that contains the TypeScript types in used in Plone.

### Slate support for Volto

`@plone/volto-slate` is the glue package that provides support for the Slate library in Volto.


## Supported frontends

Plone 6 comes with two frontend {term}`reference implementation`s.
Volto is the default frontend, and is React-based.
Classic UI is the Python-based, server-side rendered frontend.

In Volto's `apps` folder, you'll find a Volto project scaffolding that uses Volto as a library.
This is the same as that which you'll have when you run the Volto generator or `cookiecutter-plone-starter`.


## Experimental frontends

Other frontends are currently under heavy development.
They are marked as experimental and, for now, they are a proof of concept demonstrating that other frontends are possible.
Although they do work now in an acceptable way, the implementation might change in the future.
These implementations only show how to access the public Plone content in the current site, dealing with data fetching and routing.
All implementations are located in the `apps` directory in a subdirectory according to their implementation name.
They use the Plone frontend strategic packages, including `@plone/registry`, `@plone/client`, and `@plone/components`.


### Next.js

This frontend is a proof of concept using Next.js with Plone.

You can try it out using the following command.

```shell
pnpm --filter plone-nextjs dev
```

### Remix

This frontend is a proof of concept using Remix with Plone.

You can try it out using the following command.

```shell
pnpm --filter plone-remix dev
```

### Vite build (client only)

This frontend is a proof of concept using a custom client build based in Vite with Plone.
It uses `@tanstack/router` in combination with `@plone/client`, which in turns uses `@tanstack/query`.
This build is suitable for applications that do not need server side generation, and it's client only.

You can try it out using the following command.

```shell
pnpm --filter plone-vite dev
```

### Vite SSR build

This frontend is a proof of concept using a custom build, based in Vite with SSR with Plone.
It uses `@tanstack/router` in combination with `@plone/client` (which in turns uses `@tanstack/query`).

You can try it out using the following command.

```shell
pnpm --filter plone-vite-ssr dev
```

## Support libraries

Volto uses several libraries to support development.

### `volto-coresandbox`

`@plone/volto-coresandbox` is a support library used mainly for testing purposes.
It provides fixtures to bootstrap projects with configurations different than the default one.
It is used by the acceptance tests to set up different test fixtures, such as `multilingual` or `workingcopy`.

### Volto testing package

The `@plone/testing` stub library helps set up the testing libraries used by Volto without having to install the whole Volto package.
It is mainly used in CI to reduce installation times.

### Volto Guillotina

`@plone/volto-guillotina` is the support library used to interact with Guillotina as the Plone backend.
