import React from 'react';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, injectIntl } from 'react-intl';
import { Icon, BlockChooser } from '@plone/volto/components';
import { blockHasValue } from '@plone/volto/helpers';
import { Pluggable } from '@plone/volto/components/manage/Pluggable';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';

import config from '@plone/volto/registry';

import addSVG from '@plone/volto/icons/circle-plus.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
});

const MutateBlockButton = ({ block, allowedBlocks, data, onMutateBlock }) => {
  const { disableNewBlocks } = data;
  const [addNewBlockOpened, setAddNewBlockOpened] = React.useState(false);

  const blockChooserRef = React.useRef();

  const handleClickOutside = React.useCallback((e) => {
    if (
      blockChooserRef.current &&
      doesNodeContainClick(blockChooserRef.current, e)
    )
      return;
    setAddNewBlockOpened(false);
  }, []);

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, [handleClickOutside]);

  return (
    <>
      {!disableNewBlocks && !blockHasValue(data) && (
        <Button
          icon
          basic
          title="Add block"
          onClick={() => setAddNewBlockOpened(true)}
          className="group-block-add-button"
        >
          <Icon name={addSVG} className="" size="19px" />
        </Button>
      )}
      {addNewBlockOpened && (
        <BlockChooser
          onMutateBlock={(id, value) => {
            setAddNewBlockOpened(false);
            onMutateBlock(id, value);
          }}
          currentBlock={block}
          allowedBlocks={allowedBlocks}
          ref={blockChooserRef}
        />
      )}
    </>
  );
};

const EditBlockWrapper = (props) => {
  const hideHandler = (data) => {
    return !!data.fixed || !blockHasValue(data);
  };

  const { intl, blockProps, draginfo, children } = props;
  const { block, data, onDeleteBlock, selected, type } = blockProps;
  const visible = selected && !hideHandler(data);

  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  return (
    <div
      ref={draginfo.innerRef}
      {...draginfo.draggableProps}
      className={`quanta-block quanta-block-editor-${data['@type']}`}
    >
      {selected && (
        <div className="toolbar quanta-block-toolbar">
          <Button
            style={{
              visibility: visible ? 'visible' : 'visible',
              display: 'inline-block',
            }}
            {...draginfo.dragHandleProps}
            icon
            basic
          >
            <Icon name={dragSVG} size="18px" />
          </Button>
          <MutateBlockButton {...blockProps} />

          {!required && (
            <Button
              icon
              basic
              onClick={() => onDeleteBlock(block)}
              className="delete-button"
              aria-label={intl.formatMessage(messages.delete)}
            >
              <Icon name={trashSVG} size="18px" />
            </Button>
          )}
          <Pluggable name="block-toolbar" />
        </div>
      )}
      <div className={`ui drag block inner ${type}`}>{children}</div>
    </div>
  );
};

export default injectIntl(EditBlockWrapper);
