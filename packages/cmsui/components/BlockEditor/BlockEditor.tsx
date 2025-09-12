import { atom, useAtom, type PrimitiveAtom } from 'jotai';
import { FocusScope, VisuallyHidden } from 'react-aria';
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

  return (
    <div className="relative">
      <VisuallyHidden>{t('cmsui.blocksEditor.explanation')}</VisuallyHidden>
      <FocusScope>
        {blocksLayout.items.map((blockId, index) => (
          <EditBlockWrapper
            key={blockId}
            block={blockId}
            extraAriaDescription={t('cmsui.blocksEditor.extraAriaDescription', {
              index: index + 1,
              length: blocksLayout.items.length,
            })}
          />
        ))}
      </FocusScope>
    </div>
  );
};

export default BlockEditor;
