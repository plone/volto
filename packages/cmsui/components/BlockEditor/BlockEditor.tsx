import { atom, useAtom, type PrimitiveAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { useFieldFocusAtom } from '@plone/helpers';
import EditBlockWrapper from './EditBlockWrapper';
import type { Content } from '@plone/types';

type BlockEditorProps = {
  formAtom: PrimitiveAtom<Content>;
};

export const selectedBlockAtom = atom<string | null>(null);

const BlockEditor = (props: BlockEditorProps) => {
  const { t } = useTranslation();
  const blocksLayoutAtom = useFieldFocusAtom(props.formAtom, 'blocks_layout');

  // TODO: The inferred type for blocks and blocks_layout are not working
  // properly, so we cast them to the expected types.
  // We need to figure out why this is happening (see helpers/atoms.ts)
  // const [blocks] = useAtom(blocksAtom) as unknown as [Content['blocks']];
  const [blocksLayout] = useAtom(blocksLayoutAtom) as unknown as [
    Content['blocks_layout'],
  ];

  const [selectedBlock, onSelectBlock] = useAtom(selectedBlockAtom);

  return (
    <section
      aria-label={t('cmsui.blocks-editor.label')}
      onFocus={(e) => {
        // if (!e.currentTarget.contains(e.relatedTarget)) {
        //   e.stopPropagation();
        //   e.preventDefault();
        //   document.getElementById(`ebw-${selectedBlock}`)?.focus();
        // }
      }}
    >
      {blocksLayout.items.map((blockId, index) => (
        <EditBlockWrapper
          key={blockId}
          block={blockId}
          extraAriaDescription={`Item ${index + 1} of ${blocksLayout.items.length}.`}
          onFocusNextBlock={() => {
            const nextBlock = blocksLayout.items[index + 1];
            if (nextBlock) {
              onSelectBlock(nextBlock);
            }
          }}
          onFocusPreviousBlock={() => {
            const previousBlock = blocksLayout.items[index - 1];
            if (previousBlock) {
              onSelectBlock(previousBlock);
            }
          }}
        />
      ))}
    </section>
  );
};

export default BlockEditor;
