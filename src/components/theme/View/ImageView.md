ImageView example source:

```jsx_ noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import ImageView from './ImageView';
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
      <ImageView
        content={{
          file: {},
          url: '',
          title: '',
          description: '',
          image: { scales: { preview: { download: '' } } },
        }}
        url=""
      />
    </StaticRouter>
  </Provider>
</div>;
```
