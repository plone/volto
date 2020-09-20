Breadcrumbs example:

```jsx static
<Breadcrumbs />
```

Output:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import StaticRouter from 'react-router-dom/StaticRouter';
import { Breadcrumb, Container, Icon, Segment } from 'semantic-ui-react';

const store = configureStore()({
  intl: {
    locale: 'en',
    messages: {},
  },
  breadcrumbs: {
    items: [
      {title: 'hello', url: '/hello'},
      {title: 'world', url: '/hello/world'}
    ],
  },
});

<Provider store={store}>
  <StaticRouter>
    <Breadcrumbs
      pathname={'/'}
      getBreadcrumbs={() => {}}
    />
  </StaticRouter>
</Provider>;
```
