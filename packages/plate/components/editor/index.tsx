import type { AnyPluginConfig, SlateEditor, TElement, Value } from 'platejs';
import type { ReactNode } from 'react';
import { BlockSelectionPlugin } from '@platejs/selection/react';
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
  blocksApi?: any;
  intl?: any;
  children?: ReactNode;
  onChange: (options: {
    editor: TPlateEditor<Value, AnyPluginConfig>;
    value: TElement[];
  }) => void;
}) {
  const editor = usePlateEditor({
    ...props.editorConfig,
    value: props.value,
  });

  (editor as any).blocksApi = props.blocksApi;
  (editor as any).intl = props.intl ?? props.blocksApi?.intl;

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
        <Editor variant="block" placeholder="Type text..." />
      </EditorContainer>
      {props.children}
    </Plate>
  );
}

export type { Value } from 'platejs';
export { ElementApi, type Path } from 'platejs';
export {
  PlateController,
  createPlatePlugin,
  useEditorRef,
  useEditorSelector,
} from 'platejs/react';
export { BlockSelectionPlugin };

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

  return (
    <Plate editor={editor} readOnly>
      <EditorView {...rest} editor={editor} variant="none" />
    </Plate>
  );
}

PlateRenderer.displayName = 'PlateRenderer';
