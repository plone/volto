# volto-volto-project

You can develop an add-on in isolation using the boilerplate provided by the add-on generator.
The project is configured with the current add-on installed and ready to work with.
This is useful to bootstrap an isolated environment that can be used to quickly develop the add-on or for demo purposes.
It's also useful when testing an add-on in a CI environment.

This process is similar to when you develop a Plone backend add-on in Python, then embed a ready to use Plone build (using buildout or pip) to develop and test the package.

The Dockerized approach performs all these actions in a custom built Docker environment:

1.  generates a vanilla project using the official Volto Yo Generator (`@plone/generator-volto`)
2.  configures it to use the add-on with the name stated in the `package.json`
3.  links the root of the add-on inside the created project

After that you can use the inner Dockerized project, and run any standard Volto command for linting, acceptance test, or unit tests using Makefile commands provided for your convenience.


## Set up the environment

Run once:

```shell
make dev
```

This will build and launch the backend and frontend containers.
There's no need to build them again after the first time, unless something has changed from the container setup.

To make your IDE play well with this setup, you must run `yarn` once to install the required packages:

```shell
yarn
```


## Development

This section describes various Makefile commands to ease development.


### Build the containers manually

```shell
make build-backend
make build-addon
```


### Run the containers

```shell
make start-dev
```

This will start both the frontend and backend containers.


### Stop backend (Docker)

After developing, you should stop the running backend.

```shell
make stop-backend
```


### Linting

```shell
make lint
```


### Formatting

```shell
make format
```


### i18n

```shell
make i18n
```


### Unit tests

```shell
make test
```


### Acceptance tests

First install requirements to run acceptance tests with the following command.
Run it only once.

```shell
make install-acceptance
```

The frontend runs in development mode to allow development while writing.
To start the servers:

```shell
make start-test-acceptance-server
```

To run Cypress tests after you finish development:

```shell
make test-acceptance
```

Shut down the backend server after you complete development with tests.

```shell
make stop-test-acceptance-server
```


## Release

```shell
make release
```

To release a release candidate (rc) version:

```shell
make release-rc
```
