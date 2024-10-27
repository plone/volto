# Add-on registry

An add-on registry is a facility that allows an app, which was built on an existing framework, to itself be extensible and pluggable.

The add-on registry is a store where you can register a number of add-ons that your app consumes.

The add-on registry can be queried, so it can provide a list of add-ons installed in the registry and their properties.


## What is an add-on?

Add-on packages are just CommonJS or ESM packages.
Their main purpose is to encapsulate logic, configuration and customizations in a reusable way.
The only requirement is that their primary entry point (the `main` key of their `package.json`) points to a module that exports a default function, which acts as a default configuration loader for that package.

Add-ons are applied in the order they are declared in the `addons` key of {file}`package.json` or programatically via a provided configuration file.
Add-ons can override configuration coming from other add-ons, providing a hierarchy of configuration stacks.

An add-on can be published in an npm registry, just as any other package.
However, add-ons are meant to not be transpiled, but built along with your app code.
They can be released as "source" packages or used directly in your app as local code.

Add-ons can define shadowed components.
"Component shadowing" is a technique for overriding modules of other packages at build time.
This technique builds upon the `resolve.aliases` facilities of bundlers, so modules can be replaced when the app is being built.

Add-ons can be chained, where each one can configure the app in some way.
If needed, each add-on in the chain can override or extend the previous configuration that other add-ons set.
Thus, the order in which you register add-ons matters.
