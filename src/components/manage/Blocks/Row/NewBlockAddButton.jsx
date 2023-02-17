import React from 'react';
import { Button } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { BlockChooser, Icon } from '@plone/volto/components';
import { useDetectClickOutside } from '@plone/volto/helpers';
import addSVG from '@plone/volto/icons/add.svg';

const messages = defineMessages({
  addBlock: {
    id: 'Add block in position {index}',
    defaultMessage: 'Add block in position {index}',
  },
});

const NewBlockAddButton = (props) => {
  const intl = useIntl();
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
          aria-label={intl.formatMessage(messages.addBlock, {
            index,
          })}
        >
          <Icon name={addSVG} className="circled" size="24px" />
        </Button>
      )}
    </>
  );
};

export default NewBlockAddButton;
