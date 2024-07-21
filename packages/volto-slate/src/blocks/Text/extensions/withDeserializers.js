import isUrl from 'is-url';
import imageExtensions from 'image-extensions';
import { blockTagDeserializer } from '@plone/volto-slate/editor/deserialize';
import { getBaseUrl, validateFileUploadSize } from '@plone/volto/helpers';
import { v4 as uuid } from 'uuid';
import { Transforms } from 'slate';

import { IMAGE } from '@plone/volto-slate/constants';

export const insertImage = (editor, url, { typeImg = IMAGE } = {}) => {
  const image = { type: typeImg, url, children: [{ text: '' }] };
  Transforms.insertNodes(editor, image);
};

export const isImageUrl = (url) => {
  if (!isUrl(url)) return false;

  const ext = new URL(url).pathname.split('.').pop();

  return imageExtensions.includes(ext);
};

export const onImageLoad = (editor, reader) => () => {
  const data = reader.result;

  // if (url) insertImage(editor, url);
  const fields = data.match(/^data:(.*);(.*),(.*)$/);
  const blockProps = editor.getBlockProps();
  const { block, uploadContent, pathname } = blockProps;

  // TODO: we need a way to get the uploaded image URL
  // This would be easier if we would have block transformers-based image
  // blocks
  const url = getBaseUrl(pathname);
  const uploadId = uuid();
  const uploadFileName = `clipboard-${uploadId}`;
  const uploadTitle = `Clipboard image`;
  const content = {
    '@type': 'Image',
    title: uploadTitle,
    image: {
      data: fields[3],
      encoding: fields[2],
      'content-type': fields[1],
      filename: uploadFileName,
    },
  };

  uploadContent(url, content, block);
};

export const withDeserializers = (editor) => {
  editor.htmlTagsToSlate = {
    ...editor.htmlTagsToSlate,

    // We don't want H1 tags when pasting, we rewrite them as H2
    H1: blockTagDeserializer('h2'),
  };

  const handleFiles = editor.dataTransferHandlers?.files || (() => true);

  editor.dataTransferHandlers = {
    ...editor.dataTransferHandlers,
    files: (files) => {
      const unprocessed = [];
      const { intl } = editor.getBlockProps();
      for (const file of files) {
        if (!validateFileUploadSize(file, intl.formatMessage)) return;
        const reader = new FileReader();
        const [mime] = file.type.split('/');
        if (mime === 'image') {
          reader.addEventListener('load', onImageLoad(editor, reader));
          reader.readAsDataURL(file);
        } else {
          unprocessed.push(file);
        }
      }

      return handleFiles(unprocessed);
    },
  };

  return editor;
};
