FileView example source:

```jsx_ noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import FileView from './FileView';
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
  actions: {},
  content: { get: {} },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <FileView
        content={{
          file: {},
          url: '',
          title: '',
          description: '',
          file: { download: '', filename: '' },
        }}
        url=""
      />
    </StaticRouter>
  </Provider>
</div>;
```
