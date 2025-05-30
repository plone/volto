import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate/react';
import type { Value } from '@udecode/plate';
import type { EmblaCarouselType } from 'embla-carousel';

import { useSetAtom } from 'jotai';
import { CustomDragLayer } from './custom-drag-layer';
import { useCreateEditor } from './use-create-editor';
import { Editor, EditorContainer } from '../plate-ui/editor';
import { editorAtom } from '../../routes/editor';

export function PlateEditor(props: {
  value?: Value;
  onChange?: (value: Value) => void;
  emblaApi?: EmblaCarouselType;
}) {
  const editor = useCreateEditor({ value: props.value });
  const setEditorState = useSetAtom(editorAtom);
  editor.emblaApi = props.emblaApi;

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
        <CustomDragLayer />
      </DndProvider>
    </>
  );
}
