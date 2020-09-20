SearchTags example:

```jsx static
<SearchComponent path="" searchableText="" items={[]} />
```

Output:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import SearchTags from './SearchTags';
const store = configureStore()({
  userSession: {
    login: {},
  },
  intl: {
    locale: 'en',
    messages: {},
  },
  search: {
    items: [],
  },
  content: {},
  vocabularies: {},
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <SearchTags
      path=""
      searchableText=""
      items={[]}
      location={''}
      terms={[{ title: 'plone' }]}
    />
  </Provider>
</div>;
```
