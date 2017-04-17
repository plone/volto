Plone in React
==============

[![Build Status](https://travis-ci.org/plone/plone-react.svg?branch=master)](https://travis-ci.org/plone/plone-react)
[![Coverage](https://img.shields.io/coveralls/plone/plone-react.svg)](https://coveralls.io/github/plone/plone-react)
[![Dependencies](https://img.shields.io/david/plone/plone-react.svg)](https://github.com/plone/plone-react/blob/master/package.json)
[![Dev Dependencies](https://img.shields.io/david/dev/plone/plone-react.svg)](https://github.com/plone/plone-react/blob/master/package.json)
[![License](https://img.shields.io/github/license/plone/plone-react.svg)](https://github.com/plone/plone-react/blob/master/LICENCE.md)

## Installation

### Prerequisites
* [Node.js==6.9.1](https://nodejs.org/)
* [Python==2.7.x](https://python.org/)

### Install dependencies

    $ yarn

### Install backend

    $ cd api
    $ python bootstrap-buildout.py
    $ ./bin/buildout

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
    $ yarn test:unit
    $ yarn test:e2e

If chromedriver could not be found, make sure to update with:

    ./node_modules/protractor/bin/webdriver-manager update

### License

The BSD 3-Clause License. Copyrights hold the Plone Foundation.
See [LICENSE.md](LICENSE.md) for details.

### Todo
* Form validation
* e2e tests
* Documentation
* Fill slots with react-slot-fill
* Sharing
* Portlets / viewlets?
* Integrate semantic-ui-less
* Customize theme (create-react-app/jbot)
* Collaborative editing
* Live updates
* Make pages folderish / folders pagish / root also
* Upgrade to React Router 4
* Redirect after SSR edit and add content
