import React from 'react';
import cx from 'classnames';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, useIntl } from 'react-intl';
import { BlockChooserButton, Icon } from '@plone/volto/components';
// import { blockHasValue } from '@plone/volto/helpers';
import {
  Pluggable,
  Plug,
  // context as PluggableContext,
} from '@plone/volto/components/manage/Pluggable';
import PluggableMenuSection from './PluggableMenuSection';

import config from '@plone/volto/registry';

import dragSVG from '@plone/volto/icons/drag.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import insertBeforeSVG from '@plone/volto/icons/row-before.svg';
import insertAfterSVG from '@plone/volto/icons/row-after.svg';

const messages = defineMessages({
  remove: {
    id: 'remove',
    defaultMessage: 'Remove block',
  },
  insertBefore: {
    id: 'insertBefore',
    defaultMessage: 'Add block before',
  },
  insertAfter: {
    id: 'insertAfter',
    defaultMessage: 'Add block after',
  },
});

// const hideHandler = (data) => {
//   return !!data.fixed || !blockHasValue(data);
// };

const QuantaToolbar = (props) => {
  // const pluggableContext = React.useContext(PluggableContext);
  return <div className="toolbar quanta-block-toolbar">{props.children}</div>;
};

const QuantaEditBlockWrapper = (props) => {
  const { blockProps, draginfo, children, classNames } = props;
  const intl = useIntl();
  const { selected, data, type, onDeleteBlock, block } = blockProps;
  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  // const visibleHandler = selected && !hideHandler(data);

  return (
    <div
      ref={draginfo.innerRef}
      {...draginfo.draggableProps}
      className={cx(
        'quanta-block',
        `quanta-block-editor-${data['@type']}`,
        `block-editor-${data['@type']}`,
        classNames,
      )}
    >
      {selected ? (
        <QuantaToolbar {...props}>
          <Button {...draginfo.dragHandleProps} className="drag handler" icon>
            <Icon name={dragSVG} size="20px" />
          </Button>

          <Pluggable
            name={`block-toolbar-required:${block}`}
            params={blockProps}
          />
          <div className="block-toolbar-main">
            <Pluggable
              name={`block-toolbar-main:${block}`}
              params={blockProps}
            />
          </div>
          <PluggableMenuSection
            name={`block-toolbar-extra:${block}`}
            maxSizeBeforeCollapse={1}
            params={blockProps}
          />

          <Plug
            pluggable={`block-toolbar-main:${block}`}
            id="mutate-block-button"
            dependencies={[{ ...blockProps }]}
          >
            <BlockChooserButton
              {...blockProps}
              onInsertBlock={(id, value) => {
                blockProps.onSelectBlock(blockProps.onInsertBlock(id, value));
              }}
              className="quanta-block-add-button"
              size="24px"
            />
          </Plug>
          <Plug
            pluggable={`block-toolbar-extra:${block}`}
            id="insert-before-button"
            dependencies={[blockProps]}
          >
            <>
              <Button
                aria-label={intl.formatMessage(messages.insertBefore)}
                icon
                basic
                onClick={() =>
                  blockProps.onInsertBlock(blockProps.id, {
                    '@type': config.settings.defaultBlockType,
                  })
                }
                className="insert-before-button"
              >
                <Icon name={insertBeforeSVG} size="18px" />
                {intl.formatMessage(messages.insertBefore)}
              </Button>
            </>
          </Plug>
          <Plug
            pluggable={`block-toolbar-extra:${block}`}
            id="insert-after-button"
            dependencies={[blockProps]}
          >
            <Button
              aria-label={intl.formatMessage(messages.insertAfter)}
              icon
              basic
              onClick={() =>
                blockProps.onInsertBlockAfter(blockProps.id, {
                  '@type': config.settings.defaultBlockType,
                })
              }
              className="insert-after-button"
            >
              <Icon name={insertAfterSVG} size="18px" />
              {intl.formatMessage(messages.insertAfter)}
            </Button>
          </Plug>

          {!required ? (
            <Plug
              pluggable={`block-toolbar-extra:${block}`}
              id="delete-button"
              dependencies={[blockProps]}
            >
              <>
                <Button
                  icon
                  basic
                  onClick={() => onDeleteBlock(block)}
                  className="delete-button"
                  aria-label={intl.formatMessage(messages.remove)}
                >
                  <Icon name={trashSVG} size="18px" />
                  {intl.formatMessage(messages.remove)}
                </Button>
              </>
            </Plug>
          ) : null}
        </QuantaToolbar>
      ) : (
        <div {...draginfo.dragHandleProps} style={{ display: 'none' }}></div>
      )}
      <div className={`ui drag block inner ${type}`}>{children}</div>
    </div>
  );
};

export default QuantaEditBlockWrapper;
/*
{children.map((child, i) => (
  <Dropdown.Item key={i}>{child}</Dropdown.Item>
))}
*/
