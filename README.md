# Plone in React

[![Build Status](https://travis-ci.org/plone/plone-react.svg?branch=master)](https://travis-ci.org/plone/plone-react)
[![Coverage](https://img.shields.io/coveralls/plone/plone-react.svg)](https://coveralls.io/github/plone/plone-react)
[![Dependencies](https://img.shields.io/david/plone/plone-react.svg)](https://github.com/plone/plone-react/blob/master/package.json)
[![Dev Dependencies](https://img.shields.io/david/dev/plone/plone-react.svg)](https://github.com/plone/plone-react/blob/master/package.json)
[![NPM](https://img.shields.io/npm/v/@plone/plone-react.svg)](https://www.npmjs.com/package/@plone/plone-react)

## Installation
### Install using Create-plone-react-app

```
yarn add --global create-plone-react-app
create-plone-react-app <appName>
cd <appName>
yarn start //start the development server
```
#### Features
- Free from configurations.
- Fixed development stack.
- Incredible fast website developing tool.

### Prerequisites

* [Node.js==8.9.4](https://nodejs.org/)
* [Python==2.7.x](https://python.org/)

### Install dependencies

    $ yarn

### Install backend

    $ cd api
    $ ./bootstrap.sh

## Development

### Run backend

    $ cd api
    $ ./bin/instance fg

    or

    $ docker-compose -f api/docker-compose.yml up

### Run frontend

    $ yarn dev

### Browsing

Go to [http://localhost:4300](http://localhost:4300) in your browser.

### Testing

    $ yarn test

### Acceptance testing

    $ make test-acceptance

    Alternatively individual acceptances test case files can be run with a pure Robot Framework virtual environment, assuming that backend and frontend is running

    $ docker-compose -f api/docker-compose.yml up
    $ yarn && yarn build && API_PATH=http://localhost:55001/plone yarn start

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

1. The CLI, via the --plugin flag:

`prettier --write main.foo --plugin=./foo-plugin`

1. Or the API, via the plugins field:

```prettier.format("code", {
  parser: "foo",
  plugins: ["./foo-plugin"]
});
```

##### Pre commit hook

You can use Prettier with a pre-commit tool. This can re-format your files that are marked as "staged" via `git add` before you commit.

1. <b>Lint staged</b> Use Case: Useful for when you need to use other tools on top of Prettier (e.g. ESLint)

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

1. <b>Pretty-quick</b> Use Case: Great for when you want an entire file formatting on your changed/staged files.

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

### License

MIT License. Copyrights hold the Plone Foundation.
See [LICENSE.md](LICENSE.md) for details.
