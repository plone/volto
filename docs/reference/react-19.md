---
myst:
  html_meta:
    "description": "React 19: what's new compared to React 18"
    "property=og:description": "React 19: what's new compared to React 18"
    "property=og:title": "React 19: what's new compared to React 18"
    "keywords": "Plone, Seven, frontend, React 19, reference"
---

# React 19: what's new compared to React 18

React 19 builds on React 18's concurrent rendering and Suspense foundations.
Its goals are to simplify async logic, stabilize Server Components, and improve hydration, performance, and developer experience.

```{seealso}
[Official React 19 announcement](https://react.dev/blog/2024/05/14/react-19)
```

## Actions (async UI)

-	Call async functions directly from components or event handlers.
-	Built-in pending, error, and optimistic states.
-	Reduces custom `useState` and `useEffect` boilerplate for fetches and forms.

## Server Components and Server Actions

-	React Server Components (RSC) are stable and fully supported.
-	Data fetching and heavy logic can stay on the server; only lightweight descriptions go to the client.
-	Server Actions let UI trigger server-side code directly.

## Improved hydration and Suspense

-	Faster, more reliable hydration with fewer mismatches.
-	Better streaming under Suspense for progressive HTML delivery.
-	Smoother SSR performance and page transitions.

## New hooks

-	`useActionState()` for managing async state from Server Actions.
-	`useFormStatus()` for reading form submission state.
-	`useOptimistic()` for optimistic UI updates.
-	`use(...)` to consume promises or context directly in async components.

## Ref improvements

-	Refs can be passed as ordinary props.
-	Support for cleanup functions on refs.
-	Easier integration with DOM APIs and reusable components.

## Metadata and resource handling

-	Components can set document metadata, such as `title` or `meta` tags.
-	Declarative preloading of stylesheets and other resources.

## Error handling updates

-	Render-time errors are not rethrown by default.
-	Root options `onCaughtError` and `onUncaughtError` provide finer control.
-	Reduces duplicate logs and clarifies error boundaries.

## Deprecated APIs removed

-	`propTypes` and `defaultProps` checks on function components removed.
-	Additional legacy patterns cleaned up.
-	Encourages modern React practices and can reduce bundle size.
