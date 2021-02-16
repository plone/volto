import React from 'react';
import { Icon, BlockChooser } from '@plone/volto/components';
import { blocks } from '~/config';
import { Button } from 'semantic-ui-react';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import addSVG from '@plone/volto/icons/circle-plus.svg';

const ReadOnly = (props) => {
  const [addNewBlockOpened, setAddNewBlockOpened] = React.useState(false);
  const handleClickOutside = (e) => {
    if (
      props.blockNode.current &&
      doesNodeContainClick(props.blockNode.current, e)
    )
      return;
    setAddNewBlockOpened(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
  });

  const toggleAddNewBlock = (e) => {
    e.preventDefault();
    setAddNewBlockOpened((state) => !state);
  };

  const disableNewBlocks = props.data?.disableNewBlocks || props.detached;
  const Block = blocks.blocksConfig?.[props.type]?.['view'] || null;

  return (
    <>
      <Block {...props} />
      {props.selected && !disableNewBlocks && (
        <Button
          basic
          icon
          onClick={toggleAddNewBlock}
          className="block-add-button read-only"
        >
          <Icon name={addSVG} className="block-add-button" size="24px" />
        </Button>
      )}
      {addNewBlockOpened && (
        <BlockChooser
          onMutateBlock={props.onMutateBlock}
          currentBlock={props.block}
          allowedBlocks={props.allowedBlocks}
          showRestricted={props.showRestricted}
        />
      )}
    </>
  );
};

export default ReadOnly;
