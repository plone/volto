import React from 'react';
import { useSelector } from 'react-redux';
import { RenderBlocks } from '@plone/volto/components';

function PersistentSlotRenderer({ slotName }) {
  // data is like properties, has blocks + blocks_layout

  const content = useSelector((state) => state.slots?.[slotName]?.data || {});
  const metadata = useSelector((state) => state.content.data);

  return <RenderBlocks content={content} metadata={metadata} />;
}

export default PersistentSlotRenderer;
