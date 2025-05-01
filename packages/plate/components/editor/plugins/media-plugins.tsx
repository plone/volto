import { CaptionPlugin } from '@udecode/plate-caption/react';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from '@udecode/plate-media/react';

import { ImagePreview } from '@/components/plate-ui/image-preview';
import { MediaUploadToast } from '@/components/plate-ui/media-upload-toast';

export const mediaPlugins = [
  ImagePlugin.extend({
    options: { disableUploadInsert: true },
    render: { afterEditable: ImagePreview },
    handlers: {
      onClick: ({ editor }) => {
        console.log(editor.api.block({ highest: true }));
        editor.emblaApi.scrollTo(1);
        console.log('ImagePlugin: onClick');
      },
    },
  }),
  MediaEmbedPlugin,
  VideoPlugin,
  AudioPlugin,
  FilePlugin,
  CaptionPlugin.configure({
    options: {
      plugins: [
        ImagePlugin,
        VideoPlugin,
        AudioPlugin,
        FilePlugin,
        MediaEmbedPlugin,
      ],
    },
  }),
  PlaceholderPlugin.configure({
    options: { disableEmptyPlaceholder: true },
    render: { afterEditable: MediaUploadToast },
  }),
] as const;
