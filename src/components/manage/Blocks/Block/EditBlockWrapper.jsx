import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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

  const { intl, blockProps, draginfo, children } = props;
  const { block, selected, type, onDeleteBlock, data, editable } = blockProps;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const visible = selected && !hideHandler(data);

  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  const styles = buildStyleClassNamesFromData(data.styles);

  return (
    <div
      // ref={draginfo.innerRef}
      // {...draginfo.draggableProps}
      // Right now, we can have the alignment information in the styles property or in the
      // block data root, we inject the classname here for having control over the whole
      // Block Edit wrapper
      className={cx(`block-editor-${data['@type']}`, styles, {
        [data.align]: data.align,
      })}
      ref={setNodeRef}
      style={style ? style : null}
    >
      <div style={{ position: 'relative' }}>
        <div
          {...listeners}
          {...attributes}
          style={{
            visibility: visible ? 'visible' : 'hidden',
            display: 'inline-block',
          }}
          // {...draginfo.dragHandleProps}
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
