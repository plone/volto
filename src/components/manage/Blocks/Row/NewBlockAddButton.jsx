import React from 'react';
import { Button } from 'semantic-ui-react';
import { BlockChooser, Icon } from '@plone/volto/components';
import useOutsideClick from './useOutsideClick';
import addSVG from '@plone/volto/icons/add.svg';

const NewBlockAddButton = (props) => {
  const { blocksConfig, block, index, onMutateBlock } = props;
  const ref = React.useRef();
  const [isOpenMenu, setOpenMenu] = React.useState(false);

  useOutsideClick(ref, () => setOpenMenu(false));

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
