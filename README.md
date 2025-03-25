# Seven

[![Unit Tests](https://github.com/plone/volto/actions/workflows/unit.yml/badge.svg?branch=seven)](https://github.com/plone/volto/actions/workflows/unit.yml)
[![Acceptance Tests](https://github.com/plone/volto/actions/workflows/acceptance.yml/badge.svg?branch=seven)](https://github.com/plone/volto/actions/workflows/acceptance.yml)
[![Build Status Docs](https://github.com/plone/volto/actions/workflows/docs.yml/badge.svg?branch=seven)](https://github.com/plone/volto/actions)


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


## Monorepo structure

This repository has had the shape of a monorepo, where "mono" means "single" and "repo" is short for "repository".
This means that several apps and libraries related to each other are stored in the same repository.
They are managed together but released individually.
This allows the code to be shared effectively, and unifies tracking of changes across all of the apps and libraries.

| Package | Location |
|---|---|
| [`@plone/client`](https://www.npmjs.com/package/@plone/client) | [`packages/client`](https://github.com/plone/volto/tree/main/packages/client#readme) |
| [`@plone/components`](https://www.npmjs.com/package/@plone/components) | [`packages/components`](https://github.com/plone/volto/tree/main/packages/components#readme) |
| [`@plone/helpers`](https://www.npmjs.com/package/@plone/helpers) | [`packages/helpers`](https://github.com/plone/volto/tree/main/packages/helpers#readme) |
| [`@plone/providers`](https://www.npmjs.com/package/@plone/providers) | [`packages/providers`](https://github.com/plone/volto/tree/main/packages/providers#readme) |
| [`@plone/registry`](https://www.npmjs.com/package/@plone/registry) | [`packages/registry`](https://github.com/plone/volto/tree/main/packages/registry#readme) |
| [`@plone/scripts`](https://www.npmjs.com/package/@plone/scripts) | [`packages/scripts`](https://github.com/plone/volto/tree/main/packages/scripts#readme) |
| [`@plone/types`](https://www.npmjs.com/package/@plone/types) | [`packages/types`](https://github.com/plone/volto/tree/main/packages/types#readme) |

See also [Monorepo structure](https://6.docs.plone.org/volto/contributing/developing-core.html#monorepo-structure).


## Create a Volto project

To start a new project using Volto, follow the [Plone installation documentation](https://6.docs.plone.org/install/create-project.html).


## Documentation

You can find the documentation at [https://volto.readthedocs.io/seven](https://volto.readthedocs.io/seven/).


## Supported Plone, Python, and Plone REST API versions

See [Plone, Python, and Plone REST API compatibility](https://volto.readthedocs.io/seven/contributing/version-policy.html#version-policy-plone-python-and-plone-rest-api-compatibility)

See the [Plone Release Schedule](https://plone.org/download/release-schedule) for details of maintenance and support.


## Supported Node.js versions

See [Node.js version policy](https://volto.readthedocs.io/seven/contributing/version-policy.html#version-policy-plone-python-and-plone-rest-api-compatibility).


## Supported browsers

See [Supported browsers](https://volto.readthedocs.io/seven/contributing/version-policy.html#version-policy-supported-browsers).


## Contributing

To contribute to the Volto project by writing code, documentation, translations, and so on, please read [Contributing to Plone](https://6.docs.plone.org/contributing/index.html) and [Contributing to Volto](https://volto.readthedocs.io/seven/contributing/index.html).

For newcomers to Volto, Plone, or open source software, you must read and follow [First-time contributors](https://6.docs.plone.org/contributing/first-time.html).

Since December 2023, this repository has a monorepo structure.

## Contributors

<a href="https://github.com/plone/volto/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=plone/volto" />
</a>


## License

MIT License. Copyrights held by the [Plone Foundation](https://plone.org/foundation).

See [LICENSE.md](LICENSE.md) for details.
