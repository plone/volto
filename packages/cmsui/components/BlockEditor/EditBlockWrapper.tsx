import { useMemo } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { selectedBlockAtom } from './BlockEditor';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import BlockSettingsForm from './BlockSettingsForm';
import BlockWrapper from '@plone/layout/blocks/BlockWrapper';
import { Plug, Pluggable } from '@plone/layout/components/Pluggable';
import { blockAtomFamily } from '../../routes/atoms';
import config from '@plone/registry';

type EditBlockWrapperProps = {
  block: string;
};

const EditBlockWrapper = (props: EditBlockWrapperProps) => {
  // Handle the block selection state
  const onSelectBlock = useSetAtom(selectedBlockAtom);
  const currentSelectedAtom = useMemo(
    () => atom((get) => get(selectedBlockAtom) === props.block),
    [props.block],
  );
  const [selected] = useAtom(currentSelectedAtom);

  // Handle the block data in a focused way
  const blockAtom = blockAtomFamily(props.block);
  const [blockData, setBlock] = useAtom(blockAtom);

  const type = blockData['@type'];
  const EditComponent = config.blocks.blocksConfig?.[type]?.edit;
  const blocksconfig =
    config.blocks.blocksConfig?.[type]?.blocksConfig ||
    config.blocks.blocksConfig;
  const schema = blocksconfig[type]?.blockSchema;

  return (
    <div
      role="presentation"
      className={clsx('ebw', { 'outline-2 outline-quanta-sapphire': selected })}
      onClick={() => onSelectBlock(props.block)}
    >
      {/* @ts-expect-error Volto's EditBlockWrapper passes RenderBlocksProps down. We need to revisit which props do we really need to pass down to the block Edit component */}
      <BlockWrapper data={blockData} blocksConfig={blocksconfig}>
        {EditComponent ? (
          // @ts-expect-error same as above, we need to use the proper Seven types once all is settled
          <EditComponent
            block={props.block}
            data={blockData}
            setBlock={setBlock}
          />
        ) : (
          <>{type}</>
        )}
      </BlockWrapper>
      {selected &&
        schema &&
        createPortal(
          <BlockSettingsForm
            schema={schema}
            block={props.block}
            // data={props.data}
          />,
          document.getElementById('sidebar') as HTMLElement,
        )}
      {/* TODO: Re-evaluate if this has any sense */}
      <Pluggable name="block-helpers" />
      <Plug pluggable="block-helpers" id="button-settings">
        <div className="helpers">Helpers</div>
      </Plug>
    </div>
  );
};

export default EditBlockWrapper;
