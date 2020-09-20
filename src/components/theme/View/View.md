View example source:

```jsx_ noeditor
import {StaticRouter} from 'react-router-dom';
import View from './View';

const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;

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
  apierror: {},
  actions: {},
  content: { get: {} },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <View
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
