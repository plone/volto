```jsx
import React from 'react';
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

const Comp = (props) => {
  const [opened, setOpen] = React.useState(false);
  return (
    <Wrapper>
      <ModalForm
        open={opened}
        title={IframeSchema.title}
        schema={IframeSchema}
        formData={{url: 'https://google.com', enabled: true}}
        onCancel={() => setOpen(false)}
        onSubmit={() => setOpen(false)}
      />
      <button onClick={() => setOpen(!opened)}>Open modal</button>
    </Wrapper>
  );
}

<Comp />
```

