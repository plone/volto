---
myst:
  html_meta:
    "description": "How to access global state in Volto using Redux"
    "property=og:description": "How to access global state in Volto using Redux"
    "property=og:title": "Redux"
    "keywords": "Volto, Plone, frontend, React, Redux, global state"
---

# Redux

```{note}
This documentation is a work in progress. Any help is welcome to fill in the
gaps!
```

As with any other complex React project, the way global state is handled
across all components has a big impact on the overall architecture. Basic
knowledge of {term}`Redux` is needed to understand this part, but Volto's use of Redux
is "typical" and you can find plenty examples in Volto's code base.

To access the global state, a component needs to be connected with `connect`.
A simple example of such component is the
`src/theme/ContactForm/ContactForm.jsx`, which is exported connected as:

```jsx
export default compose(
  withRouter,
  injectIntl,
  connect(
    (state, props) => ({
      loading: state.emailNotification.loading,
      loaded: state.emailNotification.loaded,
      error: state.emailNotification.error,
      pathname: props.location.pathname,
    }),
    { emailNotification },
  ),
)(ContactForm);
```

If multiple Higher Order Components need to be used, like in the above example,
the `compose` can be used to combine all of them in a final component.

If you're writing Function Components, you can use the `useSelector` {term}`hook`. See
`src/components/theme/OutdatedBrowser/OutdatedBrowser.jsx` for an example.

When using the `connect` function, you can `select` parts from the global store
and either pass them directly as component props, or tweak them combine them,
etc.

You can view the content of the global Redux store by using a browser [Redux
developer extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).
The code that is used to populate this store is in the `src/reducers` folder.

In some parts of Volto you'll see `asyncConnect` being used, which is needed to
enable proper {term}`server-side rendering` of components. Using it makes sure that the
component will be constructed with the proper data already fetched from the
backend and available as props.

```{note}
Beware! The `asyncConnect` is available only to components that are
attached directly to the router or its children. There are some components
that decide their "rendering path" at render time, so this prohibits the
use of asyncConnect in that component tree. The biggest example of this is
`src/theme/View/View.jsx` which decides on the render component based
inspecting the content, so it is not possible to use asyncConnect in any
view/layout component!
```

Notice the `emailNotification` action being passed to `connect` in the above
example. All action (which trigger global state updates) need to be passed as
props by `connect`. You can't properly trigger an action unless you access it
as a prop, for example `this.props.emailNotification()`. For Function
Components you can use the `useDispatch` hook.

Global state update fetches are typically triggered by components in the mount
lifecycle stage. See for example `src/components/theme/Search/Search.jsx` for
a component that needs to interact with the backend to show its content. In the
Redux flow of information, actions trigger the asynchronous processes and when
that content arrives to the global app, it is pushed as props through the
`connect` mechanism. So components only deal indirectly with async information:
they trigger getting that information and it will arrive as a property once it
is ready.

## Backend network fetching

Backend network fetches are automatically triggered by creating a Redux action
with a `request` key. For a simple example, see
`src/actions/navigation/navigation.js`. In the `request` key you can set the
HTTP method type (using the `op` field) and the `path` to the backend. Any
non-absolute URLs are use the `settings.apiPath` prefix, but you can query any
other backend server by using a URL that starts with `http://` or `https://`.
When writing the reducer counterpart, you'll get the backend response available
as `action.result`.

It's also possible to make multiple backend requests at once, for example to
batch create content. In that case, set the `action.request` to be a list of
objects (requests) and consequently, in the reducer, the `action.result` will
be a list of responses corresponding to each request. See the
`src/reducers/content` for an example.

In order to make them more generic and allow more reuse, some actions can
accept a `subrequest` parameter, basically a string that can identify the
response and "namespace" it in the global state. See for example the `content`
reducer. Using subrequest is specially important when using the `getContent`
action, as, without it, it would overwrite the global `state.content` store
with possible wrong content for the current context.

Creating a "request action" potentially triggers some additional access. For
example, even if we only declare the `GET_CONTENT` type of action, we can see
that `GET_CONTENT_SUCCESS`, `GET_CONTENT_PENDING` and `GET_CONTENT_FAIL` are
also used in the `content` reducer. They are automatically created by the
special Api middleware, available in `src/middleware/api.js`.

## Customizing the Redux middleware

It is possible to tweak Volto's {term}`Redux middleware`, for example to add new
middleware by using the `config.settings.storeExtender` configuration option.
If you have Redux middleware that you want to insert as the first middleware to
be used, for example, you could configure your project with:

```js
import logAllMiddleware from './example';

export default applyConfig(config) => {
  const addLogAll = (middlewares) => {
    return [...middlewares, logAllMiddleware];
  };
  config.settings.storeExtenders = [...config.settings.storeExtenders, addlogAll];

  return config;
}
```
