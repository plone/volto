import React from 'react';
import { Button, Ref } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { BlockChooser, Icon } from '@plone/volto/components';
import { useDetectClickOutside } from '@plone/volto/helpers';
import addSVG from '@plone/volto/icons/add.svg';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';

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

  const blockChooserRef = useDetectClickOutside({
    onTriggered: () => setOpenMenu(false),
    triggerKeys: ['Escape'],
  });

  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, -30],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['right', 'top-start'],
        },
      },
    ],
  });

  return (
    <>
      <Ref innerRef={setReferenceElement}>
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
      </Ref>
      {isOpenMenu
        ? createPortal(
            <div
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className="container-chooser-wrapper"
            >
              <BlockChooser
                onMutateBlock={onMutateBlock}
                currentBlock={block}
                showRestricted
                blocksConfig={blocksConfig}
                ref={blockChooserRef}
              />
            </div>,
            document.body,
          )
        : null}
    </>
  );
};

export default NewBlockAddButton;
