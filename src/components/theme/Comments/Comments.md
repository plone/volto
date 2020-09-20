```jsx noeditor
import Wrapper from '@plone/volto/styleguide';

<Wrapper customStore={{
  comments: {
    items: [
      {
        ['@id']: '',
        author_name: 'John',
        creation_date: '01-02-2020',
        text: {
          data: 'Hello!',
          'mime-type': '',
        },
        is_deletable: true,
        is_editable: true,
      },
    ],
  }}}>
  <Comments
    items={[
      {
        '@id': '',
        author_name: 'Jim',
        creation_date: '01-01-2020',
        text: {
          data: 'Hi!',
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
</Wrapper>
```
