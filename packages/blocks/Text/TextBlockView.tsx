import type { BlockViewProps } from '@plone/types';
import { PlateRenderer, type Value } from '@plone/plate/components/editor';

import config from '@plone/registry';

const TextBlockView = (props: BlockViewProps) => {
  const { data } = props;

  return data?.value ? (
    <PlateRenderer
      editorConfig={config.settings.plate.rendererConfig}
      value={data.value as Value}
    />
  ) : null;
};

export default TextBlockView;
