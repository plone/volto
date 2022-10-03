import { v4 as uuid } from 'uuid';
import { Editor, Transforms } from 'slate';
import { IMAGE } from '@plone/volto-slate/constants';

export function syncCreateImageBlock(url) {
  const id = uuid();
  const block = {
    '@type': 'image',
    url,
  };
  return [id, block];
}

// This function is used by deconstructToVoltoBlocks, so not directly by the
// <SlateEditor>. File exists here because there's no "blocks/Image" folder
export const extractImages = (editor, pathRef) => {
  const imageNodes = Array.from(
    Editor.nodes(editor, {
      at: pathRef.current,
      match: (node) => node.type === IMAGE,
    }),
  );
  const images = imageNodes.map(([el, path]) => el);
  Transforms.removeNodes(editor, {
    at: pathRef.current,
    match: (node) => node.type === IMAGE,
  });

  return images.map((el) => syncCreateImageBlock(el.url));
};
