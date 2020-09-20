ListingView example source:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import BrowserRouter from 'react-router-dom/BrowserRouter';
import ListingView from './ListingView';
import StaticRouter from 'react-router-dom/StaticRouter';
const store = configureStore()({
  userSession: {
    login: {},
  },
  intl: {
    locale: 'en',
    messages: {},
  },
  users: {
    reset: {
      loading: '',
    },
  },
  actions: {},
  content: { get: {} },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <ListingView
        content={{
          file: {},

          items: [
            {
              '@id': '@plone',
              '@type': '@image',
              url: 'www.plone.org',
              title: 'plone',
              description: 'open source CMS',
            },
          ],
        }}
      />
    </StaticRouter>
  </Provider>
</div>;
```
