# @plone/types

Plone unified TypeScript typings.


## Rules while developing this package

This package contains `.d.ts` typing definitions, curated by hand.
Due to the nature of this package, it does not need bundling.
It's published "as is", so you can import the type definitions from anywhere in your code.

The files are organized in the following way:

-   blocks (props related to blocks and blocks components)
-   config (configuration object typings)
-   content (content releated and serialization of the content objects)
-   services (typings concerning Plone REST API services)


## Extending existing types in this package in your projects

In a project, you often need to extend the default definitions with your own, for example, when dealing with custom content types or creating new blocks.

You can use TypeScript for extending the types like this:

```ts
// We extend the block types with our custom ones
declare module '@plone/types' {
  export interface BlocksConfigData {
    myCustomBlock: BlockConfigBase;
  }
}
```


## Compatibility

You can use this package from Volto 17 onwards.
In Volto 17, you should declare it as dependency.
In Volto 18 and later, it is included by default.
