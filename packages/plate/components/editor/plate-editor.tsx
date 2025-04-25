import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate/react';
import type { Value } from '@udecode/plate';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { useCreateSimpleEditor } from '@/components/editor/use-create-basic-editor';
import { SettingsDialog } from '@/components/editor/settings';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import type { BlocksData } from '@plone/types';
import { PlateStatic } from '@udecode/plate';
import { editorAtom } from '@/routes/editor';
import { editorAtomSimple } from '@/routes/editor-simple';
import { useSetAtom } from 'jotai';

export function PlateEditor(props: { value?: Value }) {
  const editor = useCreateEditor({ value: props.value });
  const setEditorState = useSetAtom(editorAtom);

  // const editor = useCreateEditor({ value: blocksToPlate({ ...props.value }) });
  // const editor = useCreateEditor();
  // console.log(blocksToPlate({ ...props.value }));
  // console.log(editor);
  // console.log(props.value);

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

        {/* {isClient && <pre>{JSON.stringify(editorState, null, 2)}</pre>} */}
      </DndProvider>
      {/* <PlateStatic editor={editor} components={editor} /> */}
    </>
  );
}

export function SimplePlateEditor(props: { value?: Value }) {
  const editor = useCreateSimpleEditor({ value: props.value });
  const setEditorState = useSetAtom(editorAtomSimple);

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
      </DndProvider>
      {/* <PlateStatic editor={editor} components={editor} /> */}
    </>
  );
}
