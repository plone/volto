# Volto - the default Plone 6 frontend

<img align="right" width="300" alt="Volto logo png" src="./logos/VoltoLogoEra2.png#gh-light-mode-only" />
<img align="right" width="300" alt="Volto logo png" src="./logos/VoltoLogoEra2-dark-mode.png#gh-dark-mode-only" />

[![NPM](https://img.shields.io/npm/v/@plone/volto.svg)](https://www.npmjs.com/package/@plone/volto)
[![Unit Tests](https://github.com/plone/volto/actions/workflows/unit.yml/badge.svg)](https://github.com/plone/volto/actions/workflows/unit.yml)
[![Acceptance Tests](https://github.com/plone/volto/actions/workflows/acceptance.yml/badge.svg)](https://github.com/plone/volto/actions/workflows/acceptance.yml)
[![Build Status Docs](https://github.com/plone/volto/actions/workflows/docs.yml/badge.svg)](https://github.com/plone/volto/actions)


## Introduction

[Volto](https://github.com/plone/volto) is a ReactJS-based frontend for the [Plone](https://plone.org) Content Management System.
It is the default frontend starting with the Plone 6 release.

[Plone](https://plone.org) is a CMS built on Python with more than 20 years of history and experience.

Plone has features that appeal to developers and users alike, such as an intuitive editing interface, customizable content types, hierarchical organization, and a sophisticated permissions model.
This allows you to build anything from simple websites to enterprise-grade intranets.

Volto exposes all these features and communicates with Plone via its [REST API](https://github.com/plone/plone.restapi).

Volto features the Pastanaga editor, a modern block-based content layout editor.
It is extensible and customizable, so you can adapt the provided default blocks to meet your requirements, or build new ones.

Volto is extensible using add-ons.
You can build your own or choose from the community released ones:

- [Volto Add-ons in NPM](https://www.npmjs.com/search?q=keywords%3Avolto-addon%2Cvolto)
- [Volto Awesome](https://github.com/collective/awesome-volto)


## Demo

You can try a Volto online demo at [https://demo.plone.org/](https://demo.plone.org/).


## Create a Volto project

To start a new project using Volto, follow the [Plone installation documentation](https://6.docs.plone.org/install/install-from-packages.html).


## Contributing to Volto

To contribute to the Volto project by writing code, documentation, translations, and so on, please read [Contributing to Plone](https://6.docs.plone.org/contributing/index.html) and [Contributing to Volto](https://6.docs.plone.org/volto/contributing/index.html).

For newcomers to Volto, Plone, or open source software, you must read and follow [First-time contributors](https://6.docs.plone.org/contributing/first-time.html).

Since December 2023, this repository has a monorepo structure.
Volto itself is treated as a library and you can find it in the `packages/volto` folder.


## Documentation

You can find the latest documentation at [https://6.docs.plone.org/](https://6.docs.plone.org/volto/index.html).

For links to trainings and videos, see [Other learning resources](https://6.docs.plone.org/volto/getting-started/others.html).

## Supported Plone, Python, and Plone REST API versions

See [Plone, Python, and Plone REST API compatibility](https://6.docs.plone.org/volto/contributing/version-policy.html#version-policy-plone-python-and-plone-rest-api-compatibility)

See the [Plone Release Schedule](https://plone.org/download/release-schedule) for details of maintenance and support.


## Supported Node.js versions

See [Node.js version policy](https://6.docs.plone.org/volto/contributing/version-policy.html#version-policy-plone-python-and-plone-rest-api-compatibility).


## Supported browsers

See [Supported browsers](https://6.docs.plone.org/volto/contributing/version-policy.html#version-policy-supported-browsers).


## Volto in Production

Volto is actively developed since 2017.
It has been used in production since 2018 on numerous websites.
See [Awesome Volto](https://github.com/collective/awesome-volto#websites-built-with-volto) to add your website to the growing list.


## Contributors

<a href="https://github.com/plone/volto/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=plone/volto" />
</a>

## License

MIT License. Copyrights held by the [Plone Foundation](https://plone.org/foundation).

See [LICENSE.md](LICENSE.md) for details.
