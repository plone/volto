ListingView example source:

```jsx noeditor
import Wrapper from '@plone/volto/styleguide';

<Wrapper>
  <ListingView
    content={{
      file: {},

      items: [
        {
          '@id': '@plone',
          '@type': '@image',
          url: 'www.plone.org',
          title: 'plone',
          description: 'open source CMS',
        },
        {
          '@id': '@volto',
          '@type': 'link',
          url: 'https://voltocms.com',
          title: 'Volto',
          description: 'open source CMS',
          review_state: 'published',
        },
      ],
    }}
  />
</Wrapper>
```
