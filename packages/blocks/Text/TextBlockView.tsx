import type { BlockViewProps } from '@plone/types';
import { PlateRenderer, type Value } from '@plone/plate/components/editor';
import plateBlockConfig from '@plone/plate/config/presets/block-renderer';

const TextBlockView = (props: BlockViewProps) => {
  const { data } = props;

  return data?.value ? (
    <PlateRenderer
      editorConfig={plateBlockConfig}
      value={data.value as Value}
    />
  ) : null;
};

export default TextBlockView;
