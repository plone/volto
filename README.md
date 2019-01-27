# Volto
<img align="right" width="300" alt="Volto png" src="./docs/logos/volto-colorful.png" />

[![Build Status](https://travis-ci.org/plone/volto.svg?branch=master)](https://travis-ci.org/plone/volto)
[![Coverage](https://img.shields.io/coveralls/plone/volto.svg)](https://coveralls.io/github/plone/volto)
[![Dependencies](https://img.shields.io/david/plone/volto.svg)](https://github.com/plone/volto/blob/master/package.json)
[![Dev Dependencies](https://img.shields.io/david/dev/plone/volto.svg)](https://github.com/plone/volto/blob/master/package.json)
[![NPM](https://img.shields.io/npm/v/@plone/volto.svg)](https://www.npmjs.com/package/@plone/volto)

## Introduction

[Volto](https://github.com/plone/volto) is a React-based frontend for content
management systems, currently supporting three backend implementations: Plone,
Guillotina and a NodeJS reference implementation.

[Plone](https://plone.org) is a CMS built on Python with more than 17 years of
experience. Plone has very interesting features that are still appealing to
developers and users alike as customizable content types, hierarchical URL
object traversing and a complex content workflow powered by a granular
permissions model that allows you to build from simple websites to complex huge
intranets. Volto exposes all that features and communicates with Plone via its
mature [REST API](https://github.com/plone/plone.restapi). Volto has the
ability of being highly themable and customizable.

Volto also supports other APIs like [Guillotina](https://guillotina.io/), a
Python resource management system, which is inspired on Plone using the same
basic concepts like traversal, content types and permissions model.

Last but not least, it also supports a [Volto Nodejs-based backend reference](https://github.com/plone/volto-reference-backend) API implementation that
demos how other systems could also use Volto to display and create content
through it.

## Documentation

A training on how to create your own website using Volto is available as part of the Plone training at [https://training.plone.org/5/volto/index.html](https://training.plone.org/5/volto/index.html).

## Talks

### Plone Conference Tokyo 2018

[Rob Gietema - Volto](https://2018.ploneconf.org/talks/plone-react)

[Rob Gietema / Víctor Fernández de Alba - Volto Extensibility Story](https://2018.ploneconf.org/talks/plone-react-extensibility-story)

[Víctor Fernández de Alba - Theming Volto](https://2018.ploneconf.org/talks/theming-plone-react)

[Timo Stollenwerk / Víctor Fernández de Alba / Ramon Navarro - Volto Case Studies](https://2018.ploneconf.org/talks/plone-react-case-studies-when-stability-and-security-meet-speed-and-a-modern-user-interface)

[Timo Stollenwerk - Reinventing Plone, Roadmap to the Modern Web](https://2018.ploneconf.org/talks/reinventing-plone-roadmap-to-the-modern-web)

## Installation

### Prerequisites

- [Node.js LTS (10.x)](https://nodejs.org/)
- [Python 2.7.x](https://python.org/) or
- [Docker](https://www.docker.com/get-started) (if using the Plone/Guillotina docker images)

### Install dependencies

    $ yarn

### Install backend

    $ cd api
    $ ./bootstrap.sh

## Development

### Run backend (Plone)

    $ cd api
    $ ./bin/instance fg

    or

    $ docker-compose -f api/docker-compose.yml up -d

### Run backend (Guillotina)

    $ docker-compose -f g-api/docker-compose.yml up -d

### Run frontend

    $ yarn start

### Stop backends

    $ docker-compose down

### Browsing

Go to [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

    $ yarn test

### Acceptance testing

    $ make test-acceptance

    Alternatively individual acceptances test case files can be run with a pure Robot Framework virtual environment, assuming that backend and frontend is running

    $ docker-compose -f api/docker-compose.yml up
    $ yarn && yarn build && RAZZLE_API_PATH=http://localhost:55001/plone yarn start:prod

    $ virtualenv robotenv --no-site-packages
    $ robotenv/bin/pip install robotframework robotframework-seleniumlibrary robotframework-webpack
    $ robotenv/bin/pybot tests/test_login.robot

    Another alternative for developing Robot Framework acceptane tests is to use Jupyter notebook

    $ make -C api/jupyter

### Static Code Analysis

#### Prettier

Please refer this [link](https://prettier.io/docs/en/cli.html) for all usages.

##### CLI

Run Prettier through the CLI with this script. Run it without any arguments to see the [options](https://prettier.io/docs/en/options.html).

To format a file in-place, use `--write`. You may want to consider committing your code before doing that, just in case.
`prettier [opts] [filename ...]`
In practice, this may look something like:<br />
`prettier --single-quote --trailing-comma es5 --write "{app,__{tests,mocks}__}/**/*.js"`

##### Using Plugins

Plugins are automatically loaded if you have them installed in your package.json. Prettier plugin package names must start with `@prettier/plugin- or prettier-plugin-` to be registered.
If the plugin is unable to be found automatically, you can load them with:

1.  The CLI, via the --plugin flag:

`prettier --write main.foo --plugin=./foo-plugin`

1.  Or the API, via the plugins field:

```prettier.format("code", {
  parser: "foo",
  plugins: ["./foo-plugin"]
});
```

##### Pre commit hook

You can use Prettier with a pre-commit tool. This can re-format your files that are marked as "staged" via `git add` before you commit.

1.  <b>Lint staged</b> Use Case: Useful for when you need to use other tools on top of Prettier (e.g. ESLint)

Install it along with husky:

`yarn add lint-staged husky --dev`

and add this config to your `package.json`:

```
{
  "scripts": {
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,json,css,md}": ["prettier --write", "git add"]
  }
}
```

1.  <b>Pretty-quick</b> Use Case: Great for when you want an entire file formatting on your changed/staged files.

`yarn add pretty-quick husky --dev`

and add this config to your package.json:

```
{
  "scripts": {
    "precommit": "pretty-quick --staged"
  }
}
```

More Precommit hooks can be found [here](https://prettier.io/docs/en/precommit.html)

### Running Guillotina Tests

First, start up Guillotina:

```
docker-compose -f g-api/docker-compose.yml up -d
```

Then, run the tests:

```
PYTHONPATH=$(pwd)/tests_guillotina env/bin/pybot -v BROWSER:headlesschrome tests_guillotina;
```

## License

MIT License. Copyrights hold the Plone Foundation.
See [LICENSE.md](LICENSE.md) for details.
