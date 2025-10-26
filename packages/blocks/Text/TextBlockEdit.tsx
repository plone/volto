import type { BlockEditProps } from '@plone/types';
import { PlateEditor, type Value } from '@plone/plate/components/editor';
import plateBlockConfig from '@plone/plate/config/presets/block';

const TextBlockEdit = (props: BlockEditProps) => {
  const { data, setBlock, onFocusNextBlock, onFocusPreviousBlock } = props;

  return (
    <PlateEditor
      editorConfig={plateBlockConfig.editorConfig}
      value={data.value as Value}
      onChange={(options) => {
        setBlock({ ...data, value: options.value });
      }}
      onFocusNextBlock={onFocusNextBlock}
      onFocusPreviousBlock={onFocusPreviousBlock}
      onFocusSidebar={props.onFocusSidebar}
    />
  );
};

export default TextBlockEdit;
