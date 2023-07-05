export default function Blocks(props) {
  const { draftJs, immutableLib } = props;
  const { DefaultDraftBlockRenderMap } = draftJs;
  const { Map } = immutableLib;

  const blockRenderMap = Map({
    callout: {
      element: 'p',
    },
    unstyled: {
      element: 'div',
    },
  });

  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
    blockRenderMap,
  );

  const blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'callout') {
      return 'callout';
    }
    return null;
  };

  const listBlockTypes = ['unordered-list-item', 'ordered-list-item'];

  return { extendedBlockRenderMap, blockStyleFn, listBlockTypes };
}
