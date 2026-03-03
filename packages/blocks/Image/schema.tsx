import type {
  BlocksFormData,
  JSONSchema,
  SchemaEnhancerArgs,
} from '@plone/types';

type ImageBlockFormData = BlocksFormData & {
  url?: string;
};

type ImageSchemaArgs = {
  formData?: ImageBlockFormData;
};

export function ImageSchema({ formData = {} }: ImageSchemaArgs): JSONSchema {
  return {
    title: 'Image',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [...(formData.url ? ['alt', 'align', 'size'] : [])],
      },
      ...(formData.url
        ? [
            {
              id: 'link_settings',
              title: 'Link settings',
              fields: ['href', 'openLinkInNewTab'],
            },
          ]
        : []),
    ],
    properties: {
      alt: {
        title: 'Alt text',
        description: (
          <>
            <a
              href="https://www.w3.org/WAI/tutorials/images/decision-tree/"
              title="Open in a new tab"
              target="_blank"
              rel="noopener noreferrer"
            >
              Describe the purpose of the image.
            </a>{' '}
            Leave empty if the image is purely decorative.
          </>
        ),
      },
      align: {
        title: 'Alignment',
        widget: 'align',
        default: 'center',
      },
      size: {
        title: 'Image size',
        widget: 'image_size',
        default: 'l',
      },
      href: {
        title: 'Link to',
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description', 'hasPreviewImage'],
        allowExternals: true,
      },
      openLinkInNewTab: {
        title: 'Open in a new tab',
        type: 'boolean',
      },
    },
    required: [],
  };
}

export const gridImageDisableSizeAndPositionHandlersSchema = ({
  schema,
}: SchemaEnhancerArgs): JSONSchema => {
  schema.fieldsets[0].fields = schema.fieldsets[0].fields.filter(
    (item) => !['align', 'size'].includes(item),
  );
  return schema;
};
