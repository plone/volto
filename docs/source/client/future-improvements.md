# Future improvements

The following enhancements need to be considered for next iterations:

## Separate out the `react-query` part from `@plone/client` into a separate package

This would make the integration cleaner.

We could create wrapper over `@tanstack/react-query` that provides our enhanced `ploneClient` (just like `queryClient` in `@tanstack/react-query`) to the entire package via react-context.

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

## Put `@tanstack/react-query` and `axios` as peer-dependencies in `@plone/client`

This would mean that anyone who wants to use `@plone/client` would need to install `@plone/client @tanstack/react-query axios` now, but it has some added benefits too:

1. mocking direct dependencies of projects is much easier. We can then mock `axios` directly instead of using `nock`, although the latter has no clear downsides either
2. the projects that wants to use `@plone/client` can bring their own `@tanstack/react-query` - otherwise they would need to import the `@tanstack/react-query` dependency indirectly from `@plone/client` and then cannot have their own version of it without conflicts - same applies to any project that already uses `axios` as well
3. projects using other frameworks like vue would need to install `@tanstack/vue-query` anyway, so we need to have some consistency around frameworks, thus it makes sense that projects with react also bring their own version of the dependency

## SSR support in @plone/client

For implementing SSR with TanStack Query, the challenge is to figure out the data dependencies for a component that is rendered on the server.

We can consider the following approaches to implement SSR:

### Manual approach

In this approach, Server-Side Rendering (SSR) is achieved by explicitly controlling the prefetching and caching of queries using the TanStack Query library in conjunction with the @plone/client library.

The steps for this approach are as follows:

1. Collect all the query options (query key and query function) for all @plone/client action calls that want to enable SSR caching
2. Trigger a prefetch on all collected queries and wait until resolution
3. Render the component to string on the server
4. Pass the data from collected queries to TanStack Query cache hydration

```{seealso}
[TanStack Query Server Rendering & Hydration documentation](https://tanstack.com/query/latest/docs/framework/react/guides/ssr)
```


### Automatic caching approach

In this approach we detect @plone/client use in component and cache automatically on the server. It involves rendering the component twice on the server.

Do the following on each API call in the handler function:

1. Render the component to string twice on the server
2. On the first render, collect query options (query key and query function) for all @plone/client action calls that want to enable SSR caching
3. Trigger a prefetch on all collected queries and wait until resolution
4. On the second render pass the data from collected queries to TanStack Query cache hydration

POC using the approach described below: https://github.com/hemant-hc/tanstack-query-ssr-example

The inspiration for this approach came from [useSSE](https://github.com/kmoskwiak/useSSE).
