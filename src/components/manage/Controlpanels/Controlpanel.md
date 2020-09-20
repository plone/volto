ControlPanel example source:

```jsx_ noeditor
import {StaticRouter} from 'react-router-dom';
import Controlpanel from './Controlpanel';

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
  content: { get: {} },
  controlpanels: {},
  groups: {
    groups: {},
  },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <Controlpanel
        addMessage={() => {}}
        updateControlpanel={() => {}}
        id=""
        pathname="/"
        match={{params: {id: ''}}}
        location={{pathname: '/'}}
        updateRequest={{ loading: true, loaded: false }}
        controlpanel={{ '@id': '', data: {}, title: 'Plone', schema: {} }}
      />
    </StaticRouter>
  </Provider>
</div>;
```
