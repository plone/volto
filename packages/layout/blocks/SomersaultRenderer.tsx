import type { Content } from '@plone/types';
import {
  PlateController,
  PlateRenderer,
  type Value,
} from '@plone/plate/components/editor';
import somersaultRendererConfig from '@plone/plate/config/presets/somersault-renderer';

const SOMERSAULT_KEY = '__somersault__';

type SomersaultRendererProps = {
  content: Content;
};

const SomersaultRenderer = ({ content }: SomersaultRendererProps) => {
  const somersaultBlock = content.blocks?.[SOMERSAULT_KEY] as
    | { value?: Value }
    | undefined;

  return somersaultBlock?.value ? (
    <PlateController>
      <PlateRenderer
        editorConfig={somersaultRendererConfig}
        value={somersaultBlock.value as Value}
      />
    </PlateController>
  ) : null;
};

export default SomersaultRenderer;
