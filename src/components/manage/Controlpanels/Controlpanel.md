ControlPanel example source:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Controlpanel from './Controlpanel';
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
  controlpanels: {},
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <Controlpanel
        addMessage={() => {}}
        updateControlpanel={() => {}}
        id=""
        pathname="/"
        updateRequest={{ loading: true, loaded: false }}
        controlpanel={{ '@id': '', data: {}, title: 'Plone', schema: {} }}
      />
    </StaticRouter>
  </Provider>
</div>;
```
