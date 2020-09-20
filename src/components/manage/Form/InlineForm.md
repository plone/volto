```jsx
import Wrapper from '@plone/volto/styleguide'

const IframeSchema = {
  title: 'Embed external content',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'url',
        'privacy_statement',
        'enabled',
      ],
    },
  ],

  properties: {
    url: {
      title: 'Embed URL',
    },
    privacy_statement: {
      title: 'Privacy statement',
      description: 'Short notification text',
      widget: 'text',
    },
    enabled: {
      title: 'Use privacy screen?',
      description: 'Enable/disable the privacy protection',
      type: 'boolean',
    },
  },

  required: ['url'],
};

<Wrapper>
  <InlineForm
    title={IframeSchema.title}
    schema={IframeSchema}
    formData={{url: 'https://google.com', enabled: true}}
  />
</Wrapper>
```
