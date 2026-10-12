# Future improvements

The following enhancements need to be considered for next iterations:

## Separate out the data‑fetching layer from `@plone/client` into a separate package

This would make the integration cleaner and allow the underlying data‑fetching implementation to evolve independently.

```jsx
import { PloneClient, PloneClientProvider } from `@plone/client`;

const ploneClient = new PloneClient({
  baseURL: '...'
})

ploneClient.login(username, password);

const App = () => {
  return (
    <PloneClientProvider ploneClient={ploneClient}>
      <MainApp />
    </PloneClientProvider>
  )
}
```

Then we can import action hooks directly from the package like: `import { useGetBreadcrumbs } from @plone/react-client/actions` and it can work out of the box.

## Put the data‑fetching library and `axios` as peer dependencies in `@plone/client`

This would mean that anyone who wants to use `@plone/client` would need to install `@plone/client`, the chosen data‑fetching library, and `axios`, but it has some added benefits too:

1. mocking direct dependencies of projects is much easier. We can then mock `axios` directly instead of using `nock`, although the latter has no clear downsides either
2. Projects that use `@plone/client` can bring their own version of the data‑fetching library.
   Otherwise they would need to import that dependency indirectly from `@plone/client`, and then can't have their own version of it without conflicts.
   The same applies to any project that already uses `axios`.
3. Projects that use other frameworks, such as Vue, would likely need to install a framework‑specific adapter for the chosen data‑fetching library anyway.
   There must be consistency between frameworks, so it makes sense that projects with React also bring their own version of the dependency.

## `SSR` support in `@plone/client`

For implementing SSR with a data‑fetching library, the challenge is to figure out the data dependencies for a component that's rendered on the server.

The following sections discuss approaches to implement SSR.

### Manual approach

In this approach, Server-Side Rendering (SSR) is achieved by explicitly controlling the prefetching and caching of queries using your chosen data‑fetching library in conjunction with the `@plone/client` library.

The steps for this approach are as follows:

1. Collect all the query options (query key and query function) for all @plone/client action calls that want to enable SSR caching
2. Trigger a prefetch on all collected queries and wait until resolution.
3. Render the component to a string on the server.
4. Pass the data from collected queries to the data‑fetching library cache hydration


### Automatic caching approach

In this approach we detect @plone/client use in a component and cache automatically on the server. It involves rendering the component twice on the server.

Do the following on each API call in the handler function:

1. Render the component to string twice on the server
2. On the first render, collect query options (query key and query function) for all @plone/client action calls that want to enable SSR caching
3. Trigger a prefetch on all collected queries and wait until resolution
4. On the second render pass the data from collected queries to the data‑fetching library cache hydration

The inspiration for this approach came from [useSSE](https://github.com/kmoskwiak/useSSE).
