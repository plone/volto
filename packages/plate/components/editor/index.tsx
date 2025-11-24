import type { AnyPluginConfig, SlateEditor, TElement, Value } from 'platejs';
import {
  Plate,
  usePlateEditor,
  type TPlateEditor,
  type PlateViewProps,
} from 'platejs/react';
import { useMemo } from 'react';

import {
  Editor,
  EditorContainer,
  EditorView,
  editorVariants,
} from '../ui/editor';
import type { VariantProps } from 'class-variance-authority';
import { normalizeLegacyValue } from './plugins/normalize-legacy';

export function PlateEditor(props: {
  editorConfig: Parameters<typeof usePlateEditor>[0];
  value?: Value;
  blocksApi?: any;
  onChange: (options: {
    editor: TPlateEditor<Value, AnyPluginConfig>;
    value: TElement[];
  }) => void;
}) {
  const sanitizedValue = useMemo(
    () => normalizeLegacyValue(props.value),
    [props.value],
  );

  const editor = usePlateEditor({
    ...props.editorConfig,
    value: sanitizedValue,
  });

  (editor as any).blocksApi = props.blocksApi;

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

  const sanitizedValue = useMemo(
    () => normalizeLegacyValue(props.value),
    [props.value],
  );

  const editor = usePlateEditor({
    ...editorConfig,
    value: sanitizedValue,
  }) as SlateEditor; // EditorView likes it more

  return <EditorView {...rest} editor={editor} variant="none" />;
}

PlateRenderer.displayName = 'PlateRenderer';
