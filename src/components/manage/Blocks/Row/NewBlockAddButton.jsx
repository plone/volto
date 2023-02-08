import React from 'react';
import { Button } from 'semantic-ui-react';
import { BlockChooser, Icon } from '@plone/volto/components';
import { useDetectClickOutside } from '@plone/volto/helpers';
import addSVG from '@plone/volto/icons/add.svg';

const NewBlockAddButton = (props) => {
  const { blocksConfig, block, index, onMutateBlock } = props;
  const [isOpenMenu, setOpenMenu] = React.useState(false);

  const ref = useDetectClickOutside({
    onTriggered: () => setOpenMenu(false),
    triggerKeys: ['Escape'],
  });

  return (
    <>
      {isOpenMenu ? (
        <div ref={ref}>
          <BlockChooser
            onMutateBlock={onMutateBlock}
            currentBlock={block}
            showRestricted
            blocksConfig={blocksConfig}
          />
        </div>
      ) : (
        <Button
          basic
          icon
          onClick={() => setOpenMenu(true)}
          className="add-block-button"
          aria-label={`Add grid block in position ${index}`}
        >
          <Icon name={addSVG} className="circled" size="24px" />
        </Button>
      )}
    </>
  );
};

export default NewBlockAddButton;
