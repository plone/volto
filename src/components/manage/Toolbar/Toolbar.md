Toolbar example source:

```jsx_ noeditor
import Toolbar from './Toolbar';
import {StaticRouter} from 'react-router-dom';

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
  actions: {},
  content: { get: {}, data: {} },
  controlpanels: {},
  diff: {},
  history: [],
  schema: {},
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <Toolbar
        token=""
        content={{
          '@type': '',
          is_folderish: true,
          review_state: 'open',
        }}
        inner={{}}
      />
    </StaticRouter>
  </Provider>
</div>;
```
