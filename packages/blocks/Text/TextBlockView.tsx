import type { BlockViewProps } from '@plone/types';
import { PlateRenderer, type Value } from '@plone/plate/components/editor';
import plateBlockConfig from '@plone/plate/config/presets/block';

const TextBlockView = (props: BlockViewProps) => {
  const { data } = props;

  return data?.value ? (
    <PlateRenderer
      editorConfig={plateBlockConfig.rendererConfig}
      value={data.value as Value}
    />
  ) : null;
};

export default TextBlockView;
