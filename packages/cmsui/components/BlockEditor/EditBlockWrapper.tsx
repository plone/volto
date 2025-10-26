import { useContext, useMemo } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { BlockEditorContext, selectedBlockAtom } from './BlockEditor';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import BlockSettingsForm from './BlockSettingsForm';
import BlockWrapper from '@plone/layout/blocks/BlockWrapper';
import { Pluggable } from '@plone/layout/components/Pluggable';
import { blockAtomFamily } from '../../routes/atoms';
import config from '@plone/registry';
import {
  BinIcon,
  ChevrondownIcon,
  ChevronupIcon,
} from '@plone/components/Icons';
import { Button } from '@plone/components';
import { Toolbar } from '@plone/components/quanta';
import { Group } from 'react-aria-components';

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

  const { moveBlockUp, moveBlockDown, deleteBlock } =
    useContext(BlockEditorContext) ?? {};

  return (
    <div
      role="presentation"
      className={clsx('ebw relative', {
        'outline-2 outline-quanta-sapphire': selected,
      })}
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
      <div
        className={clsx(
          'absolute top-1/2 right-1 z-10 translate-y-[-50%] rounded-2xl p-1 pb-2 transition-opacity',
          {
            hidden: !selected,
            'flex bg-quanta-arctic opacity-50 hover:opacity-100': selected,
          },
        )}
      >
        <Toolbar
          aria-label="Block actions"
          orientation="vertical"
          className="gap-0.5"
        >
          <Group aria-label="Move up/Move down">
            <Button
              aria-label="Move block up"
              onPress={(event) => {
                // event.stopPropagation();
                moveBlockUp?.(props.block);
              }}
            >
              <ChevronupIcon className="size-5" />
            </Button>
            <Button
              aria-label="Move block down"
              onPress={(event) => {
                // event.stopPropagation();
                moveBlockDown?.(props.block);
              }}
            >
              <ChevrondownIcon className="size-5" />
            </Button>
            <Button
              aria-label="Delete block"
              onPress={() => {
                deleteBlock?.(props.block);
              }}
            >
              <BinIcon className="size-5" />
            </Button>
          </Group>
        </Toolbar>
      </div>
      {/* TODO: Re-evaluate if this has any sense */}
      <Pluggable name="block-helpers" />
    </div>
  );
};

export default EditBlockWrapper;
