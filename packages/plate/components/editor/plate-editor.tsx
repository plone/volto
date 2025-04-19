import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate/react';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { SettingsDialog } from '@/components/editor/settings';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import type { BlocksData } from '@plone/types';
import { PlateStatic } from '@udecode/plate';

function blocksToPlate({
  blocks,
  blocks_layout,
}: {
  blocks: BlocksData['blocks'];
  blocks_layout: BlocksData['blocks_layout'];
}) {
  const plateChildren = blocks_layout.items.map((blockId) => {
    const block = blocks[blockId];

    if (block['@type'] === 'slate') {
      return {
        type: 'p',
        children: [block.value[0]],
        ...block,
      };
    } else if (block['@type'] === 'title') {
      return {
        type: 'title',
        children: [
          {
            text: 'The title',
          },
        ],
        ...block,
      };
    }
  });

  return plateChildren.filter((block) => block !== undefined);
}

export function PlateEditor(props: { value?: BlocksData }) {
  const editor = useCreateEditor({ value: blocksToPlate({ ...props.value }) });
  // const editor = useCreateEditor();
  // console.log(blocksToPlate({ ...props.value }));
  // console.log(editor);
  // console.log(props.value);

  const [editorState, setEditorState] = React.useState(editor.children);

  const [isClient, setClient] = React.useState(false);

  React.useEffect(() => {
    setClient(true);
  });

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Plate
          editor={editor}
          onChange={(options) => {
            setEditorState(options.value);
          }}
        >
          <EditorContainer className="border-2">
            <Editor variant="demo" />
          </EditorContainer>

          <SettingsDialog />
        </Plate>

        {isClient && <pre>{JSON.stringify(editorState, null, 2)}</pre>}
      </DndProvider>
      {/* <PlateStatic editor={editor} components={editor} /> */}
    </>
  );
}
