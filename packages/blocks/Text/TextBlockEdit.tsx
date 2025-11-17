import { useMemo } from 'react';
import type { BlockEditProps } from '@plone/types';
import { PlateEditor, type Value } from '@plone/plate/components/editor';
import { PloneEditorPlugin } from '@plone/plate/components/editor/plugins/plone';
import plateBlockConfig from '@plone/plate/config/presets/block';

const TextBlockEdit = (props: BlockEditProps) => {
  const {
    data,
    setBlock,
    onFocusNextBlock = () => {},
    onFocusPreviousBlock = () => {},
    onFocusHelpers = () => {},
    onFocusSidebar = () => {},
  } = props;

  const ploneEditorPlugin = useMemo(
    () =>
      PloneEditorPlugin(
        onFocusSidebar,
        onFocusHelpers,
        // @ts-expect-error TODO fix types for Seven
        onFocusNextBlock,
        onFocusPreviousBlock,
      ),
    [onFocusSidebar, onFocusHelpers, onFocusNextBlock, onFocusPreviousBlock],
  );

  const editorConfig = {
    ...plateBlockConfig.editorConfig,
    plugins: [...plateBlockConfig.editorConfig.plugins, ploneEditorPlugin],
  };

  return (
    <PlateEditor
      editorConfig={editorConfig}
      value={data.value as Value}
      onChange={(options) => {
        setBlock({ ...data, value: options.value });
      }}
    />
  );
};

export default TextBlockEdit;
