Comments example:

```jsx static
<Comments />
```

Output:

```jsx noeditor
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { Breadcrumb, Container, Icon, Segment } from 'semantic-ui-react';
import Comments from './Comments';

const store = configureStore()({
  intl: {
    locale: 'en',
    messages: {},
  },
  comments: {
    items: [
      {
        ['@id']: '',
        author_name: '',
        creation_date: '',
        text: {
          data: '',
          'mime-type': '',
        },
        is_deletable: true,
        is_editable: true,
      },
    ],
  },
});

<Provider store={store}>
  <BrowserRouter>
    <Comments
      items={[
        {
          '@id': '',
          author_name: '',
          creation_date: '',
          text: {
            data: '',
            'mime-type': '',
          },
          is_deletable: true,
          is_editable: true,
        },
      ]}
      addComment={() => {}}
      deleteComment={() => {}}
      listComments={() => {}}
      pathname={'/'}
      addRequest={{
        loading: true,
        loaded: false,
      }}
      deleteRequest={{
        loading: true,
        loaded: false,
      }}
    />
  </BrowserRouter>
</Provider>;
```
