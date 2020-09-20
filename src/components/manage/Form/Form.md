Form example source:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Form from './Form';
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
  content: { get: {}, update: {} },
  schema: {},
  controlpanels: {},
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <Form
        schema={{
          fieldsets: [
            {
              fields: [],
              id: '',
              title: 'PLone',
            },
          ],
          properties: {},
          definitions: {},
          required: [],
        }}
        formData={{}}
        pathname=""
        onSubmit={() => {}}
        onCancel={() => {}}
        submitLabel="PLone"
        resetAfterSubmit={true}
        title={'plone'}
        error={{
          message: 'Hello',
        }}
        loading={true}
        hideActions={true}
        description="CMS"
        visual={true}
        tiles={[]}
      />
    </StaticRouter>
  </Provider>
</div>;
```
