UsersControlpanel example source:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import BrowserRouter from 'react-router-dom/BrowserRouter';
import UsersControlpanel from './UsersControlpanel';
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
    users: {},
    reset: {
      loading: '',
    },
  },
  roles: {},
  actions: {},
  content: { get: {} },
  controlpanels: {},
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <UsersControlpanel
        listRoles={() => {}}
        listUsers={() => {}}
        users={[
          {
            fullname: '',
            username: '',
            roles: [],
          },
        ]}
        roles={[{ '@id': '', '@type': '' }]}
        pathname="/"
        updateRequest={{ loading: true, loaded: false }}
        controlpanel={{ '@id': '', data: {}, title: 'Plone', schema: {} }}
      />
    </StaticRouter>
  </Provider>
</div>;
```
