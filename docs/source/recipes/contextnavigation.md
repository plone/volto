# Context navigation component

A contextual navigation component is available in Volto, but it needs to be
integrated with your own website. To use it, customize any appropriate Volto
theme component (for example `App.jsx` or `DefaultView.jsx`) and insert the
ContextNavigation component:

```jsx
import ContextNavigation from '@plone/volto/components/theme/Navigation/ContextNavigation

// and insert it like:

<ContextNavigation params={{includeTop: true}} />

// or:
<ContextNavigation params={{ currentFolderOnly: true }} />

```

By default it uses the current location path to fetch the portlet listing, but
you can compute and pass a custom path like:

```
<ContextNavigation pathname="/my-section" params={{ currentFolderOnly: true }} />
```

As parameters you can use:

- `name`: The title of the navigation tree.
- `root_path`: Root node path, can be "frontend path", derived from router
- `includeTop`: Bool, Include top nodeschema
- `currentFolderOnly`: Bool, Only show the contents of the current folder.
- `topLevel`: Int, Start level
- `bottomLevel`: Int, Navigation tree depth
- `no_icons`: Bool, Suppress Icons
- `thumb_scale`: String, Override thumb scale
- `no_thumbs`: Bool, Suppress thumbs

Notice the similarity to the classic Plone navigation portlet, as the
plone.restapi implementation is based on that original code.
