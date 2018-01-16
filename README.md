Plone in React
==============

[![Build Status](https://travis-ci.org/plone/plone-react.svg?branch=master)](https://travis-ci.org/plone/plone-react)
[![Coverage](https://img.shields.io/coveralls/plone/plone-react.svg)](https://coveralls.io/github/plone/plone-react)
[![Dependencies](https://img.shields.io/david/plone/plone-react.svg)](https://github.com/plone/plone-react/blob/master/package.json)
[![Dev Dependencies](https://img.shields.io/david/dev/plone/plone-react.svg)](https://github.com/plone/plone-react/blob/master/package.json)
[![NPM](https://img.shields.io/npm/v/@plone/plone-react.svg)](https://www.npmjs.com/package/@plone/plone-react)

## Installation

### Prerequisites
* [Node.js==6.9.1](https://nodejs.org/)
* [Python==2.7.x](https://python.org/)

### Install dependencies

    $ yarn

### Install backend

    $ virtualenv .
    $ bin/pip install -r requirements.txt
    $ bin/buildout

## Development

### Run backend

    $ cd api
    $ ./bin/instance fg

### Run frontend

    $ yarn dev

### Browsing

Go to [http://localhost:4300](http://localhost:4300) in your browser.

### Testing

    $ yarn test

### License

The BSD 3-Clause License. Copyrights hold the Plone Foundation.
See [LICENSE.md](LICENSE.md) for details.
