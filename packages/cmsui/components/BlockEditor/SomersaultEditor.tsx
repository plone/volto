import { useAtom } from 'jotai';
import * as React from 'react';
import { PlateEditor, type Value } from '@plone/plate/components/editor';
import plateBlockNativeConfig from '@plone/blocks/plate/native-editor';
import { TITLE_BLOCK_TYPE } from '@plone/plate/components/editor/plugins/title';
import { SidebarPlugin } from './plugins/SidebarPlugin';
import { blockAtomFamily } from '../../routes/atoms';

const SOMERSAULT_KEY = '__somersault__';

const getDefaultSomersaultValue = (): Value => [
  {
    type: TITLE_BLOCK_TYPE,
    children: [{ text: '' }],
  },
  {
    type: 'p',
    children: [{ text: '' }],
  },
];

const SomersaultEditor = () => {
  const somersaultBlockAtom = blockAtomFamily(SOMERSAULT_KEY);
  const [somersaultBlock, setSomersaultBlock] = useAtom(somersaultBlockAtom);

  // Keep the initial Plate value stable across parent re-renders.
  // If we pass a freshly derived value on each change, Plate treats it as a
  // new controlled value and media nodes (like images) can visually blink.
  const stableInitialValueRef = React.useRef<Value | null>(null);

  if (!stableInitialValueRef.current) {
    stableInitialValueRef.current =
      (((somersaultBlock as any)?.value as Value | undefined) ?? []).length > 0
        ? ((somersaultBlock as any).value as Value)
        : getDefaultSomersaultValue();
  }

  const editorConfig = React.useMemo(
    () => ({
      ...plateBlockNativeConfig,
      plugins: [...(plateBlockNativeConfig.plugins ?? []), SidebarPlugin],
    }),
    [],
  );

  return (
    <PlateEditor
      editorConfig={editorConfig}
      value={stableInitialValueRef.current}
      onChange={(options) => {
        setSomersaultBlock((previousBlock: Record<string, unknown>) => ({
          ...(previousBlock ?? {}),
          '@type': SOMERSAULT_KEY,
          value: options.value as unknown as Value[],
        }));
      }}
    />
  );
};

export default SomersaultEditor;
