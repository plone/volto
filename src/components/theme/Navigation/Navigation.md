Navigation example source:

```jsx_ noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import Navigation from './Navigation';
import {StaticRouter} from 'react-router-dom';

const store = configureStore()({
  userSession: {
    login: {},
  },
  intl: {
    locale: 'en',
    messages: {},
  },
  navigation: {
    items: [],
  },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <Navigation
        getNavigation={() => '/'}
        pathname={'/'}
        items={[{ title: 'Hello', url: 'www.plone.org' }]}
      />
    </StaticRouter>
  </Provider>
</div>;
```
