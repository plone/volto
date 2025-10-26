import type { AnyPluginConfig, SlateEditor, TElement, Value } from 'platejs';
import {
  Plate,
  usePlateEditor,
  type TPlateEditor,
  type PlateViewProps,
} from 'platejs/react';

import {
  Editor,
  EditorContainer,
  EditorView,
  editorVariants,
} from '../ui/editor';
import type { VariantProps } from 'class-variance-authority';

export function PlateEditor(props: {
  editorConfig: Parameters<typeof usePlateEditor>[0];
  value?: Value;
  onChange: (options: {
    editor: TPlateEditor<Value, AnyPluginConfig>;
    value: TElement[];
  }) => void;
  onFocusPreviousBlock?: () => void;
  onFocusNextBlock?: () => void;
  onFocusSidebar?: () => void;
}) {
  const editor = usePlateEditor({ ...props.editorConfig, value: props.value });

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
        <Editor
          variant="none"
          placeholder="Type text..."
          onKeyDownCapture={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              if (!e.shiftKey) props.onFocusSidebar?.();
              else {
                console.log('Shift+Tab pressed, TODO move to helpers');
              }
            }
            if (
              e.key === 'ArrowDown' &&
              !editor?.selection &&
              editor?.getApi().isAt({ end: true })
            ) {
              props.onFocusNextBlock?.();
            }
            if (
              e.key === 'ArrowUp' &&
              !editor?.selection &&
              editor?.getApi().isAt({ start: true })
            ) {
              props.onFocusPreviousBlock?.();
            }
          }}
        />
      </EditorContainer>
    </Plate>
  );
}

export type { Value } from 'platejs';

export function PlateRenderer(
  props: Omit<
    PlateViewProps &
      VariantProps<typeof editorVariants> & {
        editorConfig: Parameters<typeof usePlateEditor>[0];
        value: Value;
      },
    'editor'
  >,
) {
  const { editorConfig, ...rest } = props;

  const editor = usePlateEditor({
    ...editorConfig,
    value: props.value,
  }) as SlateEditor; // EditorView likes it more

  return <EditorView {...rest} editor={editor} />;
}

PlateRenderer.displayName = 'PlateRenderer';
