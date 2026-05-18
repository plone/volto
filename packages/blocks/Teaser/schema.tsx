import type { BlocksFormData, JSONSchema } from '@plone/types';

export function TeaserSchema({
  formData = {} as BlocksFormData,
}: { formData?: BlocksFormData } = {}): JSONSchema {
  return {
    title: 'Teaser',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'href',
          'overwrite',
          ...(formData?.overwrite
            ? ['title', 'head_title', 'description', 'preview_image']
            : []),
          ...(formData?.href ? ['openLinkInNewTab'] : []),
        ],
      },
    ],
    properties: {
      href: {
        title: 'Target',
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: [
          'Title',
          'title',
          'Description',
          'description',
          'head_title',
          'hasPreviewImage',
          'image_field',
          'image_scales',
          '@type',
        ],
        allowExternals: true,
      },
      overwrite: {
        title: 'Customize teaser content',
        description:
          'Check this box to customize the title, description, or image of the target content item for this teaser.',
        type: 'boolean',
        default: false,
      },
      title: {
        title: 'Title',
      },
      head_title: {
        title: 'Head title',
      },
      description: {
        title: 'Description',
        widget: 'textarea',
      },
      preview_image: {
        title: 'Image override',
        widget: 'object_browser',
        mode: 'image',
        allowExternals: true,
        selectedItemAttrs: ['image_field', 'image_scales'],
      },
      openLinkInNewTab: {
        title: 'Open in a new tab',
        type: 'boolean',
      },
    },
    required: ['href'],
  };
}
