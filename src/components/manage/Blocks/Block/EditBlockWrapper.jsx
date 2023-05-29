import { useSortable } from '@dnd-kit/sortable';
import { useDndContext } from '@dnd-kit/core';
import { Icon } from '@plone/volto/components';
import {
  blockHasValue,
  buildStyleClassNamesFromData,
} from '@plone/volto/helpers';
import dragSVG from '@plone/volto/icons/drag.svg';
import config from '@plone/volto/registry';
import cx from 'classnames';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';

import trashSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
});

const EditBlockWrapper = (props) => {
  const hideHandler = (data) => {
    return !!data.fixed || !(blockHasValue(data) && props.blockProps.editable);
  };

  const { intl, blockProps, children } = props;
  const { block, selected, type, onDeleteBlock, data, editable } = blockProps;

  const { attributes, listeners, setNodeRef, transition } = useSortable({
    id: block,
  });
  const { over, active } = useDndContext();
  const overIndex = over?.id
    ? over?.data.current.sortable.items.indexOf(over?.id)
    : -1;
  const activeIndex = active?.id
    ? active?.data.current.sortable.items.indexOf(active?.id)
    : -1;
  const border = activeIndex !== overIndex && over?.id === block;

  const style = {
    transition,
    borderTop: border && overIndex < activeIndex ? 'solid 3px blue' : null,
    borderBottom: border && overIndex > activeIndex ? 'solid 3px blue' : null,
    marginTop: border && overIndex < activeIndex ? '-3px' : null,
    marginBottom: border && overIndex > activeIndex ? '-3px' : null,
    opacity: active?.id === block ? 0.2 : null,
  };

  const visible = selected && !hideHandler(data);

  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  const styles = buildStyleClassNamesFromData(data.styles);

  return (
    <div
      className={cx(`block-editor-${data['@type']}`, styles, {
        [data.align]: data.align,
      })}
      ref={setNodeRef}
      style={style ? style : null}
    >
      <div style={{ position: 'relative', marginBottom: '2em' }}>
        <div
          {...listeners}
          {...attributes}
          style={{
            visibility: visible ? 'visible' : 'hidden',
            display: 'inline-block',
          }}
          className="drag handle wrapper"
        >
          <Icon name={dragSVG} size="18px" />
        </div>
        <div className={`ui drag block inner ${type}`}>
          {children}
          {selected && !required && editable && (
            <Button
              icon
              basic
              onClick={() => onDeleteBlock(block, true)}
              className="delete-button"
              aria-label={intl.formatMessage(messages.delete)}
            >
              <Icon name={trashSVG} size="18px" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(EditBlockWrapper);
