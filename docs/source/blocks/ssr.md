# Server-side rendering for async blocks

By default blocks that depend on async-fetched data won't be rendered fully in
the server-side rendering phase. For the main "content", Volto provides
a mechanism for async rendering in the form of `asyncConnect` and
`asyncPropExtenders`.

For blocks we have a similar mechanism but we provide it via the
`config.blocks` registry. To use it, add the `getAsyncData` key in your block
configuration, pointing to a function that returns a list of promises.

For example:

```
export default ({ dispatch, data, path }) => {
  return [
    dispatch(
      getQueryStringResults(path, { ...data, fullobjects: 1 }, data.block),
    ),
  ];
};
```

All promises returned will be awaited before the rendering of that block, so
the strategy is to dispatch the data-fetching actions so that the Redux store
gets populated.
