import React, { useState } from 'react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import {
  applyBlockDefaults,
  applyBlockInitialValue,
  getBlocksFieldname,
  blockHasValue,
  buildStyleClassNamesFromData,
  buildStyleObjectFromData,
  buildStyleClassNamesExtenders,
} from '@plone/volto/helpers/Blocks/Blocks';
import dragSVG from '@plone/volto/icons/drag.svg';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import config from '@plone/volto/registry';
import BlockChooserButton from '@plone/volto/components/manage/BlockChooser/BlockChooserButton';
import saveSVG from '@plone/volto/icons/save.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import SaveBlockDialog from './SaveBlockDialog';
const messages = defineMessages({
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
  save: {
    id: 'save',
    defaultMessage: 'save',
  },
  addToFavorites: {
    id: 'addToFavorites',
    defaultMessage: 'Add to Favorites',
  },
});

const EditBlockWrapper = (props) => {
  const hideHandler = (data) => {
    return (
      !!data.fixed ||
      (!config.experimental.addBlockButton.enabled &&
        !(blockHasValue(data) && props.blockProps.editable))
    );
  };

  const { intl, blockProps, draginfo, children } = props;
  const {
    allowedBlocks,
    showRestricted,
    block,
    blocksConfig,
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
  } = blockProps;

  const data = applyBlockDefaults({ data: originalData, ...blockProps, intl });
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const visible = selected && !hideHandler(data);

  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  let classNames = buildStyleClassNamesFromData(data.styles);
  classNames = buildStyleClassNamesExtenders({
    block,
    content: properties,
    data,
    classNames,
  });
  const style = buildStyleObjectFromData(data);

  // We need to merge the StyleWrapper styles with the draggable props from b-D&D
  const styleMergedWithDragProps = {
    ...draginfo.draggableProps,
    style: { ...style, ...draginfo.draggableProps.style },
  };

  return (
    <div
      ref={draginfo.innerRef}
      {...styleMergedWithDragProps}
      // Right now, we can have the alignment information in the styles property or in the
      // block data root, we inject the classname here for having control over the whole
      // Block Edit wrapper
      className={cx(`block-editor-${data['@type']}`, classNames, {
        [data.align]: data.align,
      })}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            visibility: visible ? 'visible' : 'hidden',
            display: 'inline-block',
          }}
          {...draginfo.dragHandleProps}
          className="drag handle wrapper"
        >
          <Icon name={dragSVG} size="18px" />
        </div>
        <div className={`ui drag block inner ${type}`}>
          {children}
          {selected && !required && editable && (
            <div
              style={{
                position: 'absolute',
                top: '-3px',
                right: '-35px',
                display: 'flex',
                zIndex: 10,
              }}
            >
              <Button
                icon
                basic
                onClick={() => onDeleteBlock(block, true)}
                className="delete-button"
                aria-label={intl.formatMessage(messages.delete)}
                style={{
                  marginRight: '3px',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              >
                <Icon
                  name={trashSVG}
                  size="20px"
                  className="hover:text-red-500 transition-colors duration-300"
                />
              </Button>

              <Button
                icon
                basic
                onClick={() => setIsSaveDialogOpen(true)}
                className="save-button"
                aria-label={intl.formatMessage(messages.save)}
                style={{
                  marginRight: '3px',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              >
                <Icon
                  name={saveSVG}
                  size="22px"
                  className="hover:text-green-500 transition-colors duration-300"
                />
              </Button>
              <SaveBlockDialog
                block={block}
                type={type}
                data={data}
                isOpen={isSaveDialogOpen}
                onClose={() => setIsSaveDialogOpen(false)}
              />
            </div>
          )}
          {config.experimental.addBlockButton.enabled && showBlockChooser && (
            <BlockChooserButton
              data={data}
              block={block}
              onInsertBlock={(id, value) => {
                if (blockHasValue(data)) {
                  onSelectBlock(onInsertBlock(id, value));
                } else {
                  const blocksFieldname = getBlocksFieldname(properties);
                  const newFormData = applyBlockInitialValue({
                    id,
                    value,
                    blocksConfig,
                    formData: {
                      ...properties,
                      [blocksFieldname]: {
                        ...properties[blocksFieldname],
                        [id]: value || null,
                      },
                    },
                  });
                  const newValue = newFormData[blocksFieldname][id];
                  onChangeBlock(id, newValue);
                }
              }}
              onMutateBlock={onMutateBlock}
              allowedBlocks={allowedBlocks}
              showRestricted={showRestricted}
              blocksConfig={blocksConfig}
              size="24px"
              properties={properties}
              navRoot={navRoot}
              contentType={contentType}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(EditBlockWrapper);
