import React from 'react';
import type { AnyPluginConfig, TElement, Value } from 'platejs';
import { Plate, usePlateEditor, type TPlateEditor } from 'platejs/react';

import { Editor, EditorContainer } from '../ui/editor';

export function PlateEditor(props: {
  editorConfig: Parameters<typeof usePlateEditor>[0];
  value?: Value;
  onChange: (options: {
    editor: TPlateEditor<Value, AnyPluginConfig>;
    value: TElement[];
  }) => void;
}) {
  const editor = usePlateEditor(props.editorConfig);

  return (
    <Plate
      editor={editor}
      onChange={(options) => {
        props.onChange?.(options);
      }}
    >
      {/* Provides editor context */}
      <EditorContainer className="">
        {/* Styles the editor area */}
        <Editor variant="none" placeholder="Type text..." />
      </EditorContainer>
    </Plate>
  );
}

export type { Value } from 'platejs';
