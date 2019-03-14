NewsItemView example source:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import BrowserRouter from 'react-router-dom/BrowserRouter';
import NewsItemView from './NewsItemView';
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
      <NewsItemView
        content={{
          title: 'plone',
          description: 'open source CMS',
          text: { data: '' },
        }}
      />
    </StaticRouter>
  </Provider>
</div>;
```
