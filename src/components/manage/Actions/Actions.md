Actions example source:

```
<Actions />
```

```jsx_ noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import Actions from './Actions';
import {StaticRouter} from 'react-router-dom';
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
  actions: {
    actions: {}
  },
  content: { get: {} },
  clipboard: {
    action: {},
    source: {}
  }
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
