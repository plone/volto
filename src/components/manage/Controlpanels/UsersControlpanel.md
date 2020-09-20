UsersControlpanel example source:

```jsx_ noeditor
import {StaticRouter} from 'react-router-dom';
import UsersControlpanel from './UsersControlpanel';

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
    users: {},
    reset: {
      loading: '',
    },
  },
  actions: {},
  content: { get: {} },
  controlpanels: {},
  roles:{
    roles: [{ '@id': '', '@type': '' }]
  },
  groups: {
    groups: []
  },
  users: {
    users: [
        {
          fullname: '',
          username: '',
          roles: [],
        },
      ]
   },
   types: {
    types: []
   }
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <UsersControlpanel
        listRoles={() => {}}
        listUsers={() => {}}
        roles={[{ '@id': '', '@type': '' }]}
        pathname="/"
        location={{pathname: "/"}}
        updateRequest={{ loading: true, loaded: false }}
        controlpanel={{ '@id': '', data: {}, title: 'Plone', schema: {} }}
      />
    </StaticRouter>
  </Provider>
</div>;
```
