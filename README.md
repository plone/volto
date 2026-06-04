# @plone/aurora

[![Unit Tests](https://github.com/plone/volto/actions/workflows/unit.yml/badge.svg?branch=seven)](https://github.com/plone/volto/actions/workflows/unit.yml)
[![Acceptance Tests](https://github.com/plone/volto/actions/workflows/acceptance.yml/badge.svg?branch=seven)](https://github.com/plone/volto/actions/workflows/acceptance.yml)
[![Build Status Docs](https://github.com/plone/volto/actions/workflows/docs.yml/badge.svg?branch=seven)](https://github.com/plone/volto/actions)


## Introduction

[Plone Aurora](https://github.com/plone/volto) is a ReactJS-based frontend for the [Plone](https://plone.org) Content Management System compatible with the `plone.restapi` specification.

[Plone](https://plone.org) is a CMS built on Python with more than 25 years of history and experience.

Plone has features that appeal to developers and users alike, such as an intuitive editing interface, customizable content types, hierarchical organization, and a sophisticated permissions model.
This allows you to build anything from simple websites to enterprise-grade intranets.

Plone Aurora exposes all these features and communicates with Plone via its [REST API](https://github.com/plone/plone.restapi).

Plone Aurora features the Somersault editor, a modern block-based content layout editor based on Plate.js.
It is extensible and customizable, so you can adapt the provided default blocks to meet your requirements, or build new ones.

Plone Aurora is extensible using add-ons.

Plone Aurora is the successor and natural evolution to the Plone Volto frontend.

## Demo

You can try a Plone Aurora online demo at [https://aurora.demo.plone.org/](https://aurora.demo.plone.org/).


## Monorepo structure

This repository has had the shape of a monorepo, where "mono" means "single" and "repo" is short for "repository".
This means that several apps and libraries related to each other are stored in the same repository.
They are managed together but released individually.
This allows the code to be shared effectively, and unifies tracking of changes across all of the apps and libraries.

| Package | Location |
|---|---|
| [`@plone/client`](https://www.npmjs.com/package/@plone/client) | [`packages/client`](https://github.com/plone/aurora/tree/main/packages/client#readme) |
| [`@plone/components`](https://www.npmjs.com/package/@plone/components) | [`packages/components`](https://github.com/plone/aurora/tree/main/packages/components#readme) |
| [`@plone/registry`](https://www.npmjs.com/package/@plone/registry) | [`packages/registry`](https://github.com/plone/aurora/tree/main/packages/registry#readme) |
| [`@plone/types`](https://www.npmjs.com/package/@plone/types) | [`packages/types`](https://github.com/plone/aurora/tree/main/packages/types#readme) |
| [`@plone/helpers`](https://www.npmjs.com/package/@plone/helpers) | [`packages/helpers`](https://github.com/plone/aurora/tree/main/packages/helpers#readme) |
| [`@plone/react-router`](https://www.npmjs.com/package/@plone/react-router) | [`packages/react-router`](https://github.com/plone/aurora/tree/main/packages/react-router#readme) |
| [`@plone/blocks`](https://www.npmjs.com/package/@plone/blocks) | [`packages/blocks`](https://github.com/plone/aurora/tree/main/packages/blocks#readme) |
| [`@plone/layout`](https://www.npmjs.com/package/@plone/layout) | [`packages/layout`](https://github.com/plone/aurora/tree/main/packages/layout#readme) |
| [`@plone/publicui`](https://www.npmjs.com/package/@plone/publicui) | [`packages/publicui`](https://github.com/plone/aurora/tree/main/packages/publicui#readme) |
| [`@plone/cmsui`](https://www.npmjs.com/package/@plone/cmsui) | [`packages/cmsui`](https://github.com/plone/aurora/tree/main/packages/cmsui#readme) |
| [`@plone/contents`](https://www.npmjs.com/package/@plone/contents) | [`packages/contents`](https://github.com/plone/aurora/tree/main/packages/contents#readme) |
| [`@plone/plate`](https://www.npmjs.com/package/@plone/plate) | [`packages/plate`](https://github.com/plone/aurora/tree/main/packages/plate#readme) |
| [`@plone/agave`](https://www.npmjs.com/package/@plone/agave) | [`packages/agave`](https://github.com/plone/aurora/tree/main/packages/agave#readme) |


See also [Monorepo structure](https://6.docs.plone.org/volto/contributing/developing-core.html#monorepo-structure).


## Storybook for the frontend's modular architecture

The frontend's modular architecture in Plone is documented with Storybook.
You can find it at https://plone-storybook.readthedocs.io/?path=/docs/introduction--docs.


## Create a Plone Aurora frontend-only project

To create a project with a frontend-only scaffold using Plone Aurora, follow the [Plone installation documentation](https://volto.readthedocs.io/seven/get-started/create-package.html).


## Documentation

You can find the documentation at [https://volto.readthedocs.io/seven/](https://volto.readthedocs.io/seven/).


## Supported Plone, Python, and Plone REST API versions

See [Plone, Python, and Plone REST API compatibility](https://volto.readthedocs.io/seven/contributing/version-policy.html#version-policy-plone-python-and-plone-rest-api-compatibility)

See the [Plone Release Schedule](https://plone.org/download/release-schedule) for details of maintenance and support.


## Supported Node.js versions

See [Node.js version policy](https://volto.readthedocs.io/seven/contributing/version-policy.html#version-policy-plone-python-and-plone-rest-api-compatibility).


## Supported browsers

See [Supported browsers](https://volto.readthedocs.io/seven/contributing/version-policy.html#version-policy-supported-browsers).


## Contributing

To contribute to the Plone Aurora project by writing code, documentation, translations, and so on, please read [Contributing to Plone](https://6.docs.plone.org/contributing/index.html) and [Contributing to Volto](https://volto.readthedocs.io/seven/contributing/index.html).

For newcomers to Plone Aurora, Plone, or open source software, you must read and follow [First-time contributors](https://6.docs.plone.org/contributing/first-time.html).

## Contributors

<a href="https://github.com/plone/aurora/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=plone/aurora" />
</a>


## License

MIT License. Copyrights held by the [Plone Foundation](https://plone.org/foundation).

See [LICENSE.md](LICENSE.md) for details.
