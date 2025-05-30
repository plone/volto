import { DialogTrigger, ModalOverlay, Heading } from 'react-aria-components';
import { Dialog, Modal } from '@plone/components';
import { Button } from '@plone/components/tailwind';
import config from '@plone/registry';
import type { BlockEditProps } from '@plone/types';

export default function EditBlockWrapper<T extends BlockEditProps>(props: T) {
  const {
    allowedBlocks,
    showRestricted,
    block,
    blocksConfig = config.blocks.blocksConfig,
    selected,
    type,
    onChangeBlock,
    onDeleteBlock,
    onInsertBlock,
    onSelectBlock,
    onMutateBlock,
    data: originalData,
    editable,
    properties,
    showBlockChooser,
    navRoot,
    contentType,
  } = props;

  let Block = () => <p>TODO: Default edit block</p>;
  if (type in Object.keys(blocksConfig)) {
    const editBlock = blocksConfig[type as keyof typeof blocksConfig].edit;
    if (editBlock) {
      Block = editBlock;
    }
  }
  // if (
  //   this.props.data?.readOnly ||
  //   (!editable && !config.blocks.showEditBlocksInBabelView)
  // ) {
  //   Block = blocksConfig?.[type]?.['view'] || ViewDefaultBlock;
  // }

  const schema = blocksConfig[type as keyof typeof blocksConfig]?.schema || {}; // TODO default blocksettings schema
  // const blockHasOwnFocusManagement =
  //   blocksConfig?.[type]?.['blockHasOwnFocusManagement'] || null;

  return (
    <div className="edit-block-wrapper" contentEditable="false">
      <DialogTrigger>
        <Button>Edit block</Button>
        <ModalOverlay className="my-overlay">
          <Modal className="my-modal">
            <Dialog>
              <Heading slot="title">Notice</Heading>
              <p>This is a modal with a custom modal overlay.</p>
              <Button slot="close">Close</Button>
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
      <Block {...props} />
    </div>
  );
}
