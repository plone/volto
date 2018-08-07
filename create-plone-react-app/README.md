# Plone in React

[![Build Status](https://travis-ci.org/plone/plone-react.svg?branch=master)](https://travis-ci.org/plone/plone-react)
[![Coverage](https://img.shields.io/coveralls/plone/plone-react.svg)](https://coveralls.io/github/plone/plone-react)
[![Dependencies](https://img.shields.io/david/plone/plone-react.svg)](https://github.com/plone/plone-react/blob/master/package.json)
[![Dev Dependencies](https://img.shields.io/david/dev/plone/plone-react.svg)](https://github.com/plone/plone-react/blob/master/package.json)
[![NPM](https://img.shields.io/npm/v/@plone/plone-react.svg)](https://www.npmjs.com/package/@plone/plone-react)

## Installation
### Install using Create-plone-react-app
<b>Note:</b> Please use node >=`v8.11.2` <br/>
<b>Install Yarn:</b> `npm install -g yarn`
```
yarn add --global create-plone-react-app
create-plone-react-app <appName>
cd <appName>
yarn dev //start the development server
```
![peek 2018-07-07 08-24](https://user-images.githubusercontent.com/22280901/42406154-b3304600-81bf-11e8-8617-9890db5b8378.gif)

#### Project Structure:

```
my-app
├── README.md
├── node_modules
├── scripts
├── locales
├── theme
├── webpack
├── customization.json
├── jest-preprocessor.js
├── jsconfig.json
├── test-setup.js
├── package.json
├── .gitignore
└── src
    └── config
    └── reducers
    └── static
    └── client.jsx
    └── server.jsx
    └── error.jsx
    └── routes.jsx
    └── start-server-prod.js
    └── store.js
    └── start-server.js

```
#### Features
- No configuration needed.
- Fixed development stack.
- Incredible fast website developing tool.

### Prerequisites

* [Node.js==8.11.2](https://nodejs.org/)
* [Python==2.7.x](https://python.org/)