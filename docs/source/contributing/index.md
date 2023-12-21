---
myst:
  html_meta:
    "description": "How to contribute to Volto, the frontend for Plone.Learn how to set up an environment to develop Volto core and the basics of the Volto monorepo."
    "property=og:description": "How to contribute to Volto, the frontend for Plone.Learn how to set up an environment to develop Volto core and the basics of the Volto monorepo."
    "property=og:title": "Contributing to Volto Core"
    "keywords": "Plone, Volto, contributing, developer, guidelines,pnpm, monorepo, core, frontend, typescript"
---

(contributing-to-volto-core-label)=

# Contributing to Volto Core

First read {doc}`plone:contributing/index`.
Volto follows those guidelines with a few specific variations, as described in this chapter.Lets take a deep dive into Volto Core.

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

(contributing-volto-sign-and-return-the-plone-contributor-agreement-label)=


## Sign and return the Plone Contributor Agreement

The Volto Team reviews pull requests only from people with a GitHub account who have signed and returned the {ref}`Plone Contributor Agreement <plone:contributing-sign-and-return-the-plone-contributor-agreement-label>`, and subsequently been assigned to a Plone Team in GitHub.


(contributing-branch-policy-label)=

## Branch policy

```{include} ./branch-policy.md
```

(contributing-install-volto-for-development-label)=

## Folder layout

```text
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

## Development requirements

To set up a Volto core development environment, you need Node.js installed in your system.
Then, set up the package manager pnpm.

We recommend that you install Node.js using nvm.
Alternatively you can install Node.js using Homebrew or other package installer.


### nvm

The following terminal session commands use bash for the shell.
Adapt them for your flavor of shell.

```{seealso}
See the [nvm install and update script documentation](https://github.com/nvm-sh/nvm#install--update-script).
For the fish shell, see [nvm.fish](https://github.com/jorgebucaran/nvm.fish).
```

1.  Create your shell profile, if it does not exist.

    ```shell
    touch ~/.bash_profile
    ```

2.  Download and run the nvm install and update script, and pipe it into bash.

    ```shell
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v{NVM_VERSION}/install.sh | bash
    ```

3.  Source your profile.
    Alternatively close the session and open a new one.

    ```shell
    source ~/.bash_profile
    ```

4.  Verify that the nvm version is that which you just installed or updated:

    ```shell
    nvm --version
    ```


### Node.js

1.  Install or update the supported LTS versions of Node.js, then activate the version supported in Volto.

(for latest versions)
    ```shell
    nvm install "lts/*"
    ```

2.  Verify that the supported version of Node.js is activated.

    ```shell
    node -v
    ```
    expected 21.2.0


### Install pnpm

Using corepack:

```shell
corepack prepare pnpm@latest --activate
```

or using `npm`:

```shell
npm install -g pnpm@latest
```

version check:

```shell
$ pnpm --version
```

```{seealso}
[pnpm installation](https://pnpm.io/installation).
```


## Set up the environment

Clone the Volto repo, and change your working directory to the cloned repository:

```shell
git clone https://github.com/plone/volto.git
cd volto
```

Start the dockerized backend:

```shell
make start-backend-docker
```
### For seeing the backend running 

Browse to [http://localhost:8080](http://localhost:8080).


Install dependencies:

```shell
pnpm install
```


## Running commands

pnpm has the concept of `workspaces`.
Every package or app located in the `packages` or `apps` folders are declared as a pnpm workspace.
They can be managed using the pnpm `--filter` feature, with either of the following commands:

```shell
pnpm --filter @plone/registry build
```

```shell
pnpm --filter @plone/volto start
```

### Open Volto in your browser

Browse to [http://localhost:3000](http://localhost:3000).


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



(contributing-translations-label)=

## Translations

All text that can be shown in a browser must be translatable.
Please mark all such strings as translatable as defined in the [i18n guide](../recipes/i18n.md).


(contributing-branch-policy-for-translations-label)=

### Branch policy for translations

Due to the nature of `main` and numbered released branches, some developments that may land in `main` may not be backported to these branches.
This means that many translations that may come with those developments will be useless in the released branches, thus backporting them makes no sense.

When contributing translations, please create a branch from the numbered released branch, and point your pull request to that branch, instead of `main`.


(contributing-reporting-an-issue-or-making-a-feature-request-label)=

## Report an issue or make a feature request

If you know the issue or feature request is for Volto, first search for an existing item in the [Volto issue tracker](https://github.com/plone/volto/issues).

If an issue does not already exist for your item, then you can [create a new issue or feature request in Volto](https://github.com/plone/volto/issues/new/choose).
When in doubt, create one in the [CMFPlone issue tracker](https://github.com/plone/Products.CMFPlone/issues).

In your report, please specify a few things:

-   What are the steps to reproduce the problem?
-   What do you expect when you follow those steps?
-   What do you observe?
-   Which Plone version are you using?
-   Include relevant screenshots, error messages, and stack traces.


(contributing-change-log-entry-label)=

## Change log entry

Volto requires that you include a change log entry or news item with your contribution.
Your attribution must be in the format of `@github_username`.

```{seealso}
For details see {ref}`contributing-change-log-label`.
```


(contributing-documenting-your-changes-label)=

## Document breaking changes

If the feature includes a breaking change, you must include instructions for how to upgrade in the [upgrade guide](../upgrade-guide/index.md).


(contributing-code-quality-label)=

## Code quality

All pull requests must pass tests, documentation builds, and other code quality checks.
These checks are enforced automatically on every pull request, so you might as well save time and frustration by doing these checks locally first.

Specifically:

-   {doc}`./linting`
-   {doc}`./testing`
-   {doc}`./acceptance-tests`
-   {doc}`./documentation`

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


(contributing-developer-guidelines-label)=

## Developer guidelines

```{toctree}
:maxdepth: 1

developing-core
design-principles
style-guide
language-features
linting
testing
acceptance-tests
documentation
react
redux
routing
icons
accessibility-guidelines
typescript
volto-core-addons
version-policy
```


(contributing-final-advice-label)=

## Final advice

If you become hesitant after reading the foregoing, don't worry.
You can always create a pull request, mark it as "Draft", and improve these points later while requesting help from the community.
