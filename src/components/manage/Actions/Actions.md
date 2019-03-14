Actions example source:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Actions from './Actions';
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
      <Actions
        listActions={() => {}}
        pathname=""
        location={{ search: '/hello', pathname: '/' }}
        getContent={() => {}}
        versionId=""
        content={{
          layout: 'PLone',
          allow_discussion: true,
          title: 'plone',
          description: 'plone CMS',
          '@type': '@Document',
          is_folderish: true,
          subjects: [],
        }}
      />
    </StaticRouter>
  </Provider>
</div>;
```
