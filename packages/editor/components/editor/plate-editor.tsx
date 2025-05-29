import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate/react';
import type { Value } from '@udecode/plate';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { editorAtom } from '@/routes/editor';
import { useSetAtom } from 'jotai';

export function PlateEditor(props: {
  value?: Value;
  onChange?: (value: Value) => void;
  editorCallbacks?: Record<string, any>;
}) {
  const editor = useCreateEditor({
    value: props.value,
  });
  const setEditorState = useSetAtom(editorAtom);
  editor.emblaApi = props.emblaApi;
  editor.editorCallbacks = props.editorCallbacks;

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Plate
          editor={editor}
          onChange={(options) => {
            props.onChange?.(options.value);
            setEditorState(options.value);
          }}
        >
          <EditorContainer className="border-2">
            <Editor variant="demo" />
          </EditorContainer>
        </Plate>
      </DndProvider>
    </>
  );
}
