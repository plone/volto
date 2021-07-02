import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, injectIntl, useIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import { blockHasValue } from '@plone/volto/helpers';
import { Pluggable, Plug } from '@plone/volto/components/manage/Pluggable';
// import EditBlockWrapper from './EditBlockWrapper';
import MutateBlockButton from './MutateBlockButton';
import cx from 'classnames';

import config from '@plone/volto/registry';

import moreSVG from '@plone/volto/icons/more.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
});

const hideHandler = (data) => {
  return !!data.fixed || !blockHasValue(data);
};

const DefaultPlugs = (props) => {
  const intl = useIntl();
  const { blockProps } = props;
  const { data, type, onDeleteBlock, block } = blockProps;
  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  return (
    <>
      <Plug pluggable="block-toolbar" id="mutate-block-button">
        <MutateBlockButton
          {...blockProps}
          onInsertBlock={(id, value) => {
            blockProps.onSelectBlock(blockProps.onInsertBlock(id, value));
          }}
          className="quanta-block-add-button"
        />
      </Plug>
      <Plug pluggable="block-toolbar-more" id="delete-button">
        {!required ? (
          <Button
            icon
            basic
            onClick={() => onDeleteBlock(block)}
            className="delete-button"
            aria-label={intl.formatMessage(messages.delete)}
          >
            <Icon name={trashSVG} size="18px" />
          </Button>
        ) : null}
      </Plug>
    </>
  );
};

const QuantaEditBlockWrapper = (props) => {
  const { blockProps, draginfo, children, className } = props;
  const { data, selected, type } = blockProps;

  // if (usesClassicWrapper(data)) return <EditBlockWrapper {...props} />;

  const visible = selected && !hideHandler(data);

  return (
    <div
      ref={draginfo.innerRef}
      {...draginfo.draggableProps}
      className={cx(
        'quanta-block',
        `quanta-block-editor-${data['@type']}`,
        className,
      )}
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

          <Pluggable name="block-toolbar" params={blockProps} />
          <Pluggable name="block-toolbar-slots" params={blockProps} />
          <Pluggable name="block-toolbar-more">
            {(pluggables) => {
              return pluggables?.length > 1 ? (
                <Button basic icon>
                  <Dropdown
                    item
                    icon={<Icon name={moreSVG} size="18px" color="#826a6a" />}
                    className=""
                  >
                    <Dropdown.Menu className="right">
                      <Dropdown.Header content="More actions" />
                      <Dropdown.Menu scrolling>
                        {pluggables.map((p) => p())}
                      </Dropdown.Menu>
                    </Dropdown.Menu>
                  </Dropdown>
                </Button>
              ) : pluggables ? (
                pluggables.map((p, i) => p())
              ) : null;
            }}
          </Pluggable>

          <DefaultPlugs {...props} />
        </div>
      )}
      <div className={`ui drag block inner ${type}`}>{children}</div>
    </div>
  );
};

export default injectIntl(QuantaEditBlockWrapper);
/*
                        {children.map((child, i) => (
                          <Dropdown.Item key={i}>{child}</Dropdown.Item>
                        ))}

      <Plug pluggable="block-toolbar-more" id="more-button" order={999}></Plug>
                        */
