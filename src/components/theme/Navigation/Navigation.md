Navigation example source:

```jsx noeditor
import Wrapper from '@plone/volto/styleguide';

<Wrapper>
  <Navigation
    getNavigation={() => '/'}
    pathname={'/'}
    items={[{ title: 'Hello', url: 'www.plone.org' }]}
  />
</Wrapper>
```
