## Documentation

[Volto Hands-On](https://training.plone.org/voltohandson/index.html) is a training on how to create your own website.

## Quick Start

Below is a list of commands you will probably find useful.

### `make install`

Installs and checkouts the `mrs-developer` directives (`make develop`), creates a shortcut to the Volto source code (`omelette` folder), then triggers the install of the frontend environment.

### `yarn start`

Runs the project in development mode.
You can view your application at `http://localhost:3000`

The page will reload if you make edits.

### `yarn build`

Builds the app for production to the build folder.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `yarn start:prod`

Runs the compiled app in production.

You can again view your application at `http://localhost:3000`

### `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

### `yarn i18n`

Runs the test i18n runner which extracts all the translation strings and
generates the needed files.

### mrs-developer

[mrs-developer](https://github.com/collective/mrs-developer) is a great tool
for developing multiple packages at the same time.

mrs-developer should work with this project by running the configured shortcut script:

```bash
make develop
```

Volto's latest razzle config will pay attention to your tsconfig.json (or jsconfig.json) file for any customizations.

In case you don't want (or can't) install mrs-developer globally, you can install it in this project by running:

```bash
yarn add -W mrs-developer
```

## Acceptance tests

In order to run localy (while developing) the project acceptance tests (Cypress), there are some `Makefile` commands in place (in the repo root). Run them in order:

`start-test-acceptance-server`: Start server fixture in docker (previous build required)

`start-test-acceptance-frontend`: Start the Core Acceptance Frontend Fixture in dev mode

`test-acceptance`: Start Core Cypress Acceptance Tests in dev mode

`full-test-acceptance`: Start the whole suite (backend + frontend + headless tests) Cypress Acceptance Tests in headless (CI) mode
