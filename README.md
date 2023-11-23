# Volto - the default Plone 6 frontend

This is the unified monorepository for Volto applications and libraries.
It is structured in `apps` and `packages` folders.
Inside the `packages` folder, you can find Volto.


## Core libraries

The monorepository consists of several core libraries.


### Volto

[Volto](https://github.com/plone/volto/tree/main/packages/volto/README.md) is a React-based frontend for the [Plone](https://plone.org) content management system.
It is the default frontend, and reference implementation, starting with the Plone 6 release.

Volto is extensible using add-ons.
You can build your own or choose from the community released ones:

-   [Volto add-ons in npm](https://www.npmjs.com/search?q=keywords%3Avolto-addon%2Cvolto)
-   [Volto Awesome](https://github.com/collective/awesome-volto)


### Volto project generator

`@plone/generator-volto` is a Yeoman generator that helps you set up Volto via command line.
It generates all the boilerplate needed to start developing a Plone Volto project.
It is used by [CookieCutter Plone Starter](https://github.com/collective/cookiecutter-plone-starter), the recommended way to set up Plone projects.
The generator features an `addon` template for scaffolding Volto add-ons in your projects.


### Registry

`@plone/registry` provides support for building an add-on registry and infrastructure for JavaScript and TypeScript-based apps.
Used by Volto, you can also use it in other JavaScript frameworks and environments to help create an add-on driven extensiblility story.


### Scripts

`@plone/scripts` is the placeholder of tools used by Volto and its add-ons, such as the `i18n` internationalization scripts.


### Types

`@plone/types` is the package that contains the TypeScript types in used in Plone.


### Slate support for Volto

`@plone/volto-slate` is the glue package that provides support for the Slate library in Volto.


## Supported frameworks

Plone supports several frontend implementations, the main one being Volto as the default frontend and reference React-based implementation.
There are plans to support implementations in other frontends, including NextJS and Remix.


### Plone

The default frontend and reference React-based implementation in Plone is Volto.
In the `apps` folder you'll find a Volto project scaffolding that uses Volto as a library.
This is the same as the one that you'll have when running the Volto generator or `cookiecutter-plone-starter`.


### NextJS

Coming soon.


### Remix

Coming soon.


## Support libraries

Volto uses serveral libraries to support development.


### `volto-coresandbox`

`@plone/volto-coresandbox` is a support library used mainly for testing purposes.
It provides fixtures to bootstrap projects with configurations different than the default one.
It is used by the acceptance tests to set up different test fixtures, such as `multilingual` or `workingcopy`.


### Volto testing package

The `@plone/testing` stub library helps set up the testing libraries used by Volto without having to install the whole Volto package.
It is mainly used in CI to reduce installation times.


### Volto Guillotina

`@plone/volto-guillotina` is the support library used to interact with Guillotina as the Plone backend.
