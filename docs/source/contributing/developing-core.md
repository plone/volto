---
myst:
  html_meta:
    "description": "Learn how to setup an environment ready to develop Volto core and the basics of the Volto monorepo."
    "property=og:description": "Learn how to setup an environment ready to develop Volto core and the basics of the Volto monorepo."
    "property=og:title": "How to develop Volto core"
    "keywords": "pnpm, monorepo, develop, core, Volto, Plone, frontend, typescript"
---

# How to develop Volto core

The Volto core repository has the shape of a monorepo ("mono" meaning 'single' and "repo" being short for 'repository').
This means that several apps and libraries related to each other are stored in the same repository.
They are managed together but released individually.
This allows the code to be shared effectively and keep tracking the changes across all of them in a unified way.
This monorepo uses `pnpm` as a package manager and uses extensively the workspaces feature.
It's organized in two folders, depending if it's a library (package) or an app.
They are located respectively in the `packages` or `apps` folder abd they are declared as `pnpm` workspaces.
This means they can be managed from the root, using the package manager `--filter` feature.

For more information about `pnpm` workspaces: [https://pnpm.io/workspaces](https://pnpm.io/workspaces)

## Folder layout

```txt
(volto-monorepo)/
├─ apps/
│  ├─ plone
│  ├─ nextjs
│  ├─ remix
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
│  ├─ volto-testing
├─ .gitignore
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
├─ tsconfig.json
├─ ...
```

## Setup requirements

For setting up a Volto core development environment, you need `Node.js` installed in your system. Then, setup the package manager `pnpm`.
You can install `Node.js` using `brew` or other package installer, but the recommended way is the following, using `nvm`.

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

1.  Install or update the supported LTS versions of Node.js, then activate the version supported in Volto.

    ```shell
    nvm install "lts/*"
    nvm use 20
    ```

2.  Verify that the supported version of Node.js is activated.

    ```shell
    node -v
    ```

### Install `pnpm`

Using corepack:

```shell
corepack prepare pnpm@latest --activate
```

or using `npm`:

```shell
npm install -g pnpm
```

For more information follow: [https://pnpm.io/installation](https://pnpm.io/installation).

## Setup the environment

Clone the Volto repo and change to the directory of the cloned repository:

```shell
git clone https://github.com/plone/volto.git
cd volto
```

Install dependencies:

```shell
pnpm install
```

## Running commands

`pnpm` has the concept of `workspaces`.
Every package or app located in the `packages` or `apps` folder are declared as a `pnpm` workspace.
They can be managed using the `pnpm` `--filter` feature, as follows:

```shell
pnpm --filter @plone/volto start
```

or

```shell
pnp --filter @plone/registry build
```

## Developing Volto

The Volto core code is located in the `packages/volto` folder.

````{versionchanged} 18.x.x
If you are a seasoned Volto core developer, since December 2023, the Volto repository is now a monorepo.
Volto is located now in the `packages/volto` folder.
You can run all the usual commands from inside that folder, but swapping `yarn` to `pnpm`, since they have similar commands and features.
For example, to start Volto:

```shell
pnpm start
```
````

You can also run commands of specific workspaces using the `--filter` feature as shown in the previous section.

## Developing other libraries

If a package is dependent of another package in the monorepo, and it's declared as a workspace, they can be declared as normal in the `package.json` as follows:

```json
"dependencies": {
  "@plone/types": "workspace:*"
}
```

For more information about `pnpm` workspaces: [https://pnpm.io/workspaces](https://pnpm.io/workspaces)

## TypeScript

By default, the use of TypeScript is required in Plone frontend libraries, being Volto itself an exception. See {ref}`typescript-policy-in-core-reference`.
