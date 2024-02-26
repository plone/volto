---
myst:
  html_meta:
    "description": "Learn how to set up an environment to develop Volto core and the basics of the Volto monorepo."
    "property=og:description": "Learn how to set up an environment to develop Volto core and the basics of the Volto monorepo."
    "property=og:title": "Develop Volto core"
    "keywords": "pnpm, monorepo, develop, core, Volto, Plone, frontend, typescript"
---

# Develop Volto core

This chapter describes how to develop Volto core and its libraries, packages, and apps as open source software contributions.

```{seealso}
To create a full Plone project with both frontend and backend, see {doc}`plone:install/create-project` instead.
```


## Monorepo structure

The Volto core repository has the shape of a monorepo, where "mono" means "single" and "repo" is short for "repository".
This means that several apps and libraries related to each other are stored in the same repository.
They are managed together but released individually.
This allows the code to be shared effectively, and unifies tracking of changes across all of the apps and libraries.

This monorepo uses pnpm as a package manager, extensively using the workspaces feature.
It's organized in two folders, depending on whether it's a library (package) or an app.
They are located in the `packages` or `apps` folder.
They are declared as pnpm workspaces.
This means they can be managed from the root, using the package manager `--filter` feature.

```{seealso}
For more information about pnpm workspaces, read the [documentation of pnpm workspaces](https://pnpm.io/workspaces).
```


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

The following terminal session commands use `bash` for the shell.
Adapt them for your flavor of shell.

```{seealso}
See the [`nvm` install and update script documentation](https://github.com/nvm-sh/nvm#install--update-script).
For the `fish` shell, see [`nvm.fish`](https://github.com/jorgebucaran/nvm.fish).
```

1.  Create your shell profile, if it does not exist.

    ```shell
    touch ~/.bash_profile
    ```

2.  Download and run the `nvm` install and update script, and pipe it into `bash`.

    ```shell
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v{NVM_VERSION}/install.sh | bash
    ```

3.  Source your profile.
    Alternatively close the session and open a new one.

    ```shell
    source ~/.bash_profile
    ```

4.  Verify that the `nvm` version is that which you just installed or updated:

    ```shell
    nvm --version
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


## Start the backend and Volto

Every time you want to run Volto for core development, you will need to create two terminal sessions, one for the backend and one for the frontend.
For both sessions, change your working directory to the root of your Volto clone.

In the first session, start the backend.

```shell
make start-backend-docker
```

When you run this command for the first time, it will download Docker images, configure the backend, and start the backend.
Browse to the backend running at http://localhost:8080.

In the second session, start the frontend.

```shell
pnpm start
```

Browse to the frontend running at http://localhost:3000.

To stop either the backend or frontend, use {kbd}`ctrl-c`.


## Running commands

pnpm has the concept of `workspaces`.
Every package or app located in the `packages` or `apps` folders are declared as a pnpm workspace.
They can be managed using the pnpm `--filter` feature, with either of the following commands:

```shell
pnpm --filter @plone/volto start
```

```shell
pnpm --filter @plone/registry build
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

You can also run commands of specific workspaces using the `--filter` feature as shown in the previous section.


## Developing other libraries

If a package is a dependency of another package in the monorepo, and it's declared as a workspace, they can be declared as usual in the {file}`package.json` as follows:

```json
"dependencies": {
  "@plone/types": "workspace:*"
}
```

```{seealso}
[pnpm workspaces](https://pnpm.io/workspaces)
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

## Supported frameworks

Plone supports several frontend implementations, the main one being Volto as the default frontend and reference React-based implementation.
There are plans to support implementations in other frontends, including NextJS and Remix.

### Plone

The default frontend and reference React-based implementation in Plone is Volto.
In the `apps` folder you'll find a Volto project scaffolding that uses Volto as a library.
This is the same as the one that you'll have when running the Volto generator or `cookiecutter-plone-starter`.

### NextJS

Coming soon.

### Remix

Coming soon.

## Support libraries

Volto uses serveral libraries to support development.

### `volto-coresandbox`

`@plone/volto-coresandbox` is a support library used mainly for testing purposes.
It provides fixtures to bootstrap projects with configurations different than the default one.
It is used by the acceptance tests to set up different test fixtures, such as `multilingual` or `workingcopy`.

### Volto testing package

The `@plone/testing` stub library helps set up the testing libraries used by Volto without having to install the whole Volto package.
It is mainly used in CI to reduce installation times.

### Volto Guillotina

`@plone/volto-guillotina` is the support library used to interact with Guillotina as the Plone backend.
