SummaryView example source:

```jsx noeditor
import Wrapper from '@plone/volto/styleguide';

<Wrapper>
  <SummaryView
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
          image: { scales: { thumb: { download: 'https://plone.org/logo.png'} } },
          image_caption: '',
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
