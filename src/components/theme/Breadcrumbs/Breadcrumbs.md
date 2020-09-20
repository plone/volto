Breadcrumbs example:

```jsx static
<Breadcrumbs />
```

Output:

```jsx noeditor
import {StaticRouter} from 'react-router-dom';
import { Breadcrumb, Container, Icon, Segment } from 'semantic-ui-react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

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
