---
myst:
  html_meta:
    'description': 'Bundle size optimization in Volto'
    'property=og:description': 'Bundle size optimization in Volto'
    'property=og:title': 'Bundle size optimization'
    'keywords': 'Volto, Plone, frontend, React, Performance, guidelines'
---

(bundle-size-optimization-label)=

# Bundle size optimization

## Lazy loading in core

Since Volto 18, several core components use lazy loading to keep the final build size under control.

For example, the Form components are lazy-loaded, which means that the code for the form components is only loaded when the user navigates to a page that contains a form. A new index file has been created at `packages/volto/src/components/manage/Form/index.tsx` that exports the form components with lazy loading. The `export`s in the main components index (`packages/volto/src/components/index.js`) have been updated to export components from the new specific index. The same goes for other components that have been lazy-loaded, i.e. the controlpanels and the widgets.

Several `import` statements have been updated to use the new lazy-loaded components. For example, the `Form` component is now imported from `@plone/volto/components/manage/Form` instead of `@plone/volto/components/manage/Form/Form`. You should keep this in mind and always import components from the specific component index files when available, while avoiding importing components from the main components index file if possible. This should also help reducing the circular dependencies and help the overall build performance in the long run.

### Unit-testing components that use lazy loaded components

If you import a component from a lazy loaded index, you can have issues with rendering these in uni tests. Mocks are provided for lazy-loaded components and are available for you to use. This can be done by using the `jest.mock` function to mock the specific component index. For example, to mock the `Form` component and all other components in the `Form`-specific index, you can use the following code in your test file:

```javascript
jest.mock('@plone/volto/components/manage/Form');
```
