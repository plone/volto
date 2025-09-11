import type { BlockEditProps } from '@plone/types';
import { renderSlate } from './slate';
import config from '@plone/registry';
import { PlateEditor } from '@plone/plate/components/editor/plate-editor';
import { SettingsProvider } from '@plone/plate/components/editor/settings';

const TextBlockEdit = (props: BlockEditProps) => {
  const { data, setBlock } = props;

  return (
    <SettingsProvider>
      <PlateEditor
        value={data.value}
        onChange={(options) => {
          setBlock({ ...data, value: options.value });
        }}
      />
    </SettingsProvider>
  );
};

export default TextBlockEdit;
