TabularView example source:

```jsx noeditor
import Wrapper from '@plone/volto/styleguide';

<Wrapper>
  <TabularView
    content={{
      title: 'plone',
      description: 'open source CMS',
      items: [
        {
          '@id': '@plone',
          '@type': 'image',
          url: 'www.plone.org',
          title: 'Plone',
          description: 'open source CMS',
          image: { scales: { thumb: {} } },
          review_state: 'private',
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
