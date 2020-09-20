TabularView example source:

```jsx_ noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import TabularView from './TabularView';
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
      <TabularView
        content={{
          title: 'plone',
          description: 'open source CMS',
          items: [
            {
              '@id': '@plone',
              '@type': '@image',
              url: 'www.plone.org',
              title: 'plone',
              description: 'open source CMS',
              image: { scales: { thumb: {} } },
              review_state: '',
            },
          ],
        }}
      />
    </StaticRouter>
  </Provider>
</div>;
```
