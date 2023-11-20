# Plone Frontend

This is the unified monorepository for Plone Frontend applications and libraries.
It is structured in `apps` and `packages` folders.
Inside the `packages` folder you can find Plone Volto, the default ui for Plone based in react js, and its support libreries.

## Core Libraries

### Volto

[Volto](https://github.com/plone/volto/tree/main/packages/volto/README.md) is a ReactJS-based frontend for the [Plone](https://plone.org) Content Management System. It is the default frontend, and reference implementation, starting with the Plone 6 release.

Volto is extensible using add-ons.
You can build your own or choose from the community released ones:

- [Volto Add-ons in NPM](https://www.npmjs.com/search?q=keywords%3Avolto-addon%2Cvolto)
- [Volto Awesome](https://github.com/collective/awesome-volto)

### Volto project generator

`@plone/generator-volto` is a Yeoman generator that helps you to set up Volto via command line.
It generates all the boilerplate needed for start developing a Plone Volto project.
It is used by [CookieCutter Plone Starter](https://github.com/collective/cookiecutter-plone-starter), the recommended way to setup Plone projects.
The generator features an `addon` template for scaffolding Volto add-ons in your projects.

### Registry

`@plone/registry` provides support for building an add-on registry and infrastructure for JavaScript and TypeScript-based apps.
Used by Volto, you can also use it in other JavaScript frameworks and environments to help create an add-on driven extensiblility story.

### Scripts

`@plone/scripts` is the placeholder of tools used by Volto and its add-ons, like the `i18n` internationalization scripts.

### Types

`@plone/types` is the package that contains the TypeScript types in used in Plone.

### Slate support for Volto

`@plone/volto-slate` is the glue package that provides support for the Slate library in Volto.

## Supported Frameworks

Plone support these frontend implementations, being the main one Plone Volto, the default frontend and reference ReactJS-based implementation. There are plans to support implementations in other frontends like NextJS or Remix.

### Plone

The default frontend and reference ReactJS=based implementation is Plone Volto.
In the `apps` folder you'll find a Volto project scaffolding that uses Volto as a library.
This is the same as the one that you'll have when running the Volto generator or CookieCutter Plone Starter.

### NextJS

Comming soon.

### Remix

Comming soon

## Support libraries

### Volto Coresandbox

`@plone/volto-coresandbox` is a support library used mainly for testing purposes. It provides fixtures to bootstrap projects with configurations different than the default one.
It is used by the acceptance tests to setup different test fixtures like the multilingual or workingcopy.

### Volto Testing package

`@plone/testing` stub library that helps setup the testing libraries used by Volto without having to install the whole Volto package.
Used in CI mainly to cut down installation times.

### Volto Guillotina

`@plone/volto-guillotina` is the support library used to interact with Guillotina as Plone backend.
