const AnnounceBlockSchema = (props) => {
  return {
    required: [],
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'description', 'image', 'imageAlt'],
      },
      {
        id: 'button',
        title: 'Button',
        fields: ['buttonTitle', 'buttonLink'],
      },
    ],
    properties: {
      title: {
        title: 'Title',
        widget: 'text',
      },
      description: {
        title: 'Description',
        widget: 'text',
      },
      buttonTitle: {
        title: 'Button Title',
        widget: 'text',
      },
      buttonLink: {
        title: 'Button link',
        widget: 'object_browser',
        mode: 'link',
        allowExternals: true,
      },
      image: {
        title: 'Image',
        widget: 'object_browser',
        mode: 'image',
      },
      imageAlt: {
        title: 'Image alt text',
        widget: 'text',
      },
    },
  };
};
export { AnnounceBlockSchema };
