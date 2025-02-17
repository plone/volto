import React from 'react';
import doesNodeContainClick from 'semantic-ui-react/dist/commonjs/lib/doesNodeContainClick';
import addSVG from '@plone/volto/icons/circle-plus.svg';
import { blockHasValue } from '@plone/volto/helpers/Blocks/Blocks';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import BlockChooser from '@plone/volto/components/manage/BlockChooser/BlockChooser';
import config from '@plone/volto/registry';
import { Button, Ref } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';

const messages = defineMessages({
  addBlock: {
    id: 'Add block',
    defaultMessage: 'Add block',
  },
});

export const ButtonComponent = (props) => {
  const intl = useIntl();
  const {
    className = `block-add-button${
      config.experimental.addBlockButton.enabled ? ' new-add-block' : ''
    }`,
    size = '19px',
    onShowBlockChooser,
  } = props;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      onShowBlockChooser();
    }
  };

  return (
    <Button
      icon
      basic
      title={intl.formatMessage(messages.addBlock)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onShowBlockChooser();
      }}
      onKeyDown={handleKeyDown}
      className={className}
      aria-haspopup="dialog"
      aria-expanded={false}
    >
      <Icon name={addSVG} className={className} size={size} />
    </Button>
  );
};

const BlockChooserButton = (props) => {
  const {
    block,
    allowedBlocks,
    showRestricted,
    data,
    onMutateBlock,
    onInsertBlock,
    blocksConfig,
    buttonComponent,
    properties,
    navRoot,
    contentType,
  } = props;

  const { disableNewBlocks } = data;
  const [addNewBlockOpened, setAddNewBlockOpened] = React.useState(false);
  const triggerButtonRef = React.useRef(null);
  const blockChooserRef = React.useRef();

  const handleClickOutside = React.useCallback((e) => {
    if (
      blockChooserRef.current &&
      doesNodeContainClick(blockChooserRef.current, e)
    )
      return;
    setAddNewBlockOpened(false);
  }, []);

  const handleClose = React.useCallback(() => {
    setAddNewBlockOpened(false);
    triggerButtonRef.current?.focus();
  }, []);

  const Component = buttonComponent || ButtonComponent;

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, [handleClickOutside]);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && addNewBlockOpened) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [addNewBlockOpened, handleClose]);

  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: config.experimental.addBlockButton.enabled
      ? 'bottom'
      : 'right-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-10, 5],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: config.experimental.addBlockButton.enabled
            ? ['bottom-start', 'bottom-end']
            : ['right-end', 'top-start'],
        },
      },
    ],
  });

  return (
    <>
      {!disableNewBlocks &&
        (config.experimental.addBlockButton.enabled ||
          !blockHasValue(data)) && (
          <Ref
            innerRef={(node) => {
              setReferenceElement(node);
              if (node) {
                triggerButtonRef.current = node;
              }
            }}
          >
            <Component
              {...props}
              onShowBlockChooser={() => setAddNewBlockOpened(true)}
              aria-expanded={addNewBlockOpened}
            />
          </Ref>
        )}
      {addNewBlockOpened &&
        createPortal(
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            role="dialog"
            aria-modal="true"
          >
            <BlockChooser
              onMutateBlock={
                onMutateBlock
                  ? (id, value) => {
                      handleClose();
                      onMutateBlock(id, value);
                    }
                  : null
              }
              onInsertBlock={
                onInsertBlock
                  ? (id, value) => {
                      handleClose();
                      onInsertBlock(id, value);
                    }
                  : null
              }
              initialFocus="search"
              currentBlock={block}
              allowedBlocks={allowedBlocks}
              blocksConfig={blocksConfig}
              properties={properties}
              showRestricted={showRestricted}
              ref={blockChooserRef}
              navRoot={navRoot}
              contentType={contentType}
              onClose={handleClose}
            />
          </div>,
          document.body,
        )}
    </>
  );
};

export default BlockChooserButton;
