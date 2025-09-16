import React from 'react';
import {
  Plate,
  type PlateCorePlugin,
  type TPlateEditor,
} from '@udecode/plate/react';
import type { TElement, Value } from '@udecode/plate';

import { useCreateEditor } from '../editor/use-create-editor';
import { Editor, EditorContainer } from '../plate-ui/editor';

export function PlateEditor(props: {
  value?: Value;
  onChange: (options: {
    editor: TPlateEditor<Value, PlateCorePlugin>;
    value: TElement[];
  }) => void;
}) {
  const editor = useCreateEditor({ value: props.value });

  return (
    <Plate
      editor={editor}
      onChange={(options) => {
        props.onChange?.(options);
      }}
    >
      <EditorContainer className="">
        <Editor variant="none" />
      </EditorContainer>
    </Plate>
  );
}
