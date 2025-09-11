import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { atom, useAtom, useSetAtom } from 'jotai';
import { selectedBlockAtom } from './BlockEditor';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import BlockSettingsForm from './BlockSettingsForm';
import BlockWrapper from '@plone/layout/blocks/BlockWrapper';
import { Button } from '@plone/components/quanta';
import { Plug, Pluggable } from '@plone/layout/components/Pluggable';
import { blockAtomFamily } from '../../routes/atoms';
import config from '@plone/registry';
import { usePrevious } from '../../helpers/utils';
import DefaultEditBlock from './DefaultEditBlock';

type EditBlockWrapperProps = {
  block: string;
  extraAriaDescription?: string;
  onFocusNextBlock?: () => void;
  onFocusPreviousBlock?: () => void;
};

const EditBlockWrapper = (props: EditBlockWrapperProps) => {
  const { t } = useTranslation();
  const blockRef = useRef<HTMLDivElement>(null);
  // Handle the block selection state
  const onSelectBlock = useSetAtom(selectedBlockAtom);
  const currentSelectedAtom = useMemo(
    () => atom((get) => get(selectedBlockAtom) === props.block),
    [props.block],
  );
  const [selected] = useAtom(currentSelectedAtom);
  const previousSelected = usePrevious(selected);

  // Handle the block data in a focused way
  const blockAtom = blockAtomFamily(props.block);
  const [blockData, setBlock] = useAtom(blockAtom);

  const type = blockData['@type'];
  const blocksconfig =
    config.blocks.blocksConfig?.[type]?.blocksConfig ||
    config.blocks.blocksConfig;
  const title = blocksconfig[type]?.title || type;
  const schema = blocksconfig[type]?.blockSchema;
  const EditComponent = blocksconfig[type]?.edit ?? DefaultEditBlock;
  // TODO handle non editable or readonly blocks
  // packages/volto/src/components/manage/Blocks/Block/Edit.jsx#L130

  useEffect(() => {
    if (selected !== previousSelected && selected) {
      blockRef.current?.focus();
    }
  }, [previousSelected, selected]);

  return (
    <div
      role="group"
      aria-label={`${t('cmsui.blocks-editor.block')} ${title}. ${props.extraAriaDescription || ''}`}
      id={`ebw-${props.block}`}
      className={clsx('ebw', { 'outline-quanta-sapphire outline-2': selected })}
      onClick={() => {
        onSelectBlock(props.block);
      }}
      onFocus={() => {
        if (!selected) onSelectBlock(props.block);
      }}
    >
      {/* @ts-expect-error Volto's EditBlockWrapper passes RenderBlocksProps down. We need to revisit which props do we really need to pass down to the block Edit component */}
      <BlockWrapper data={blockData} blocksConfig={blocksconfig}>
        <EditComponent
          ref={blockRef}
          block={props.block}
          data={blockData}
          setBlock={setBlock}
          // @ts-expect-error missing props
          onFocusNextBlock={props.onFocusNextBlock}
          // @ts-expect-error missing props
          onFocusPreviousBlock={props.onFocusPreviousBlock}
          onFocusSidebar={() => {
            document.getElementById('sidebar')?.focus();
          }}
        />
      </BlockWrapper>
      {selected &&
        schema &&
        createPortal(
          <div>
            <BlockSettingsForm
              schema={schema}
              block={props.block}
              // data={props.data}
            />
            <Button
              onClick={() => {
                // setFocusInSidebar(false);
                blockRef.current?.focus();
              }}
            >
              {t('cmsui.blocks-editor.back-to-block')}
            </Button>
          </div>,
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
