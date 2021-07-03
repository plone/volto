import React from 'react';
import cx from 'classnames';
import { Button, Dropdown } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, useIntl } from 'react-intl';
import { BlockChooserButton, Icon } from '@plone/volto/components';
import { blockHasValue } from '@plone/volto/helpers';
import { Pluggable, Plug } from '@plone/volto/components/manage/Pluggable';

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

const QuantaEditBlockWrapper = (props) => {
  const { blockProps, draginfo, children, className } = props;
  const intl = useIntl();
  const { selected, data, type, onDeleteBlock, block } = blockProps;
  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

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
      {selected ? (
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

          <Pluggable name="block-toolbar-required" params={blockProps} />
          <Pluggable name="block-toolbar-main" params={blockProps} />
          <Pluggable name="block-toolbar-extra">
            {(pluggables) => {
              const groups = new Map();
              const seen = [];
              const options = { isMenuShape: pluggables.length > 1 };
              config.blocks.toolbarGroups.forEach(({ id, title }) => {
                groups[id] = pluggables
                  .filter((p, i) => {
                    if (p.extra?.group === id) {
                      seen.push(i);
                      return true;
                    }
                    return false;
                  })
                  .map((p) => p(options))
                  .filter((r) => !!r);
              });
              const ungrouped = pluggables
                .filter((p, i) => seen.indexOf(i) === -1)
                .map((p) => p(options))
                .filter((r) => !!r);

              const allItems = [
                ...[...Object.keys(groups).map((n) => groups[n])],
                ...ungrouped,
              ].reduce((n, acc) => acc + n, 0);

              return allItems.length > 1 ? (
                <Button basic icon>
                  <Dropdown
                    item
                    icon={<Icon name={moreSVG} size="18px" color="#826a6a" />}
                    className=""
                  >
                    {Object.keys(groups).map((groupName) => {
                      const results = groups[groupName];
                      const { title } = config.blocks.toolbarGroups.find(
                        (g) => g.id === groupName,
                      );
                      return (
                        <Dropdown.Menu className="right" key={groupName}>
                          <Dropdown.Header content={title} />
                          <Dropdown.Menu scrolling>{results}</Dropdown.Menu>
                        </Dropdown.Menu>
                      );
                    })}
                    {ungrouped.length && (
                      <Dropdown.Menu className="right" key="ungrouped">
                        <Dropdown.Menu scrolling>
                          {ungrouped.map((r, i) => r)}
                        </Dropdown.Menu>
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                </Button>
              ) : allItems.length === 1 ? (
                allItems[0]
              ) : null;
            }}
          </Pluggable>

          <Plug pluggable="block-toolbar-required" id="mutate-block-button">
            <BlockChooserButton
              {...blockProps}
              onInsertBlock={(id, value) => {
                blockProps.onSelectBlock(blockProps.onInsertBlock(id, value));
              }}
              className="quanta-block-add-button"
            />
          </Plug>
          <Plug pluggable="block-toolbar-extra" id="delete-button">
            <>
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
            </>
          </Plug>
        </div>
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
