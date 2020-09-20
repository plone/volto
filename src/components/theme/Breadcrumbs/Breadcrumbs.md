Breadcrumbs example:

```jsx static
<Breadcrumbs />
```

Output:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
const BrowserRouter = require('react-router-dom/BrowserRouter').default;
import { Breadcrumb, Container, Icon, Segment } from 'semantic-ui-react';

const store = configureStore()({
  intl: {
    locale: 'en',
    messages: {},
  },
  breadcrumbs: {
    items: [''],
  },
});

<Provider store={store}>
  <BrowserRouter>
    <Breadcrumbs
      items={['hello', 'www.google.com']}
      pathname={'/'}
      getBreadcrumbs={() => {}}
    />
  </BrowserRouter>
</Provider>;
```
