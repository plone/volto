import { useAtom, type PrimitiveAtom } from 'jotai';
import type { Content } from '@plone/types';
import { useFieldFocusAtom } from '../../helpers/atoms';
import BlockWrapper from '@plone/blocks/RenderBlocks/BlockWrapper';
import config from '@plone/registry';
import { Plug } from '@plone/layout/components/Pluggable';

type BlockEditorProps = {
  formAtom: PrimitiveAtom<Content>;
};

const BlockEditor = (props: BlockEditorProps) => {
  const blocksAtom = useFieldFocusAtom(props.formAtom, 'blocks');
  const blocksLayoutAtom = useFieldFocusAtom(props.formAtom, 'blocks_layout');
  const [blocks] = useAtom(blocksAtom);
  const [blocksLayout] = useAtom(blocksLayoutAtom);

  return (
    <div>
      {blocksLayout.items.map((blockId) => {
        return (
          <>
            <BlockWrapper
              key={blockId}
              data={blocks[blockId]}
              block={blocks[blockId]}
              blocksConfig={config.blocks.blocksConfig}
            >
              {blocks[blockId]['@type']}
            </BlockWrapper>
            <Plug pluggable="block-helpers" id="button-settings">
              <div className="helpers">Helpers</div>
            </Plug>
          </>
        );
      })}
    </div>
  );
};

export default BlockEditor;
