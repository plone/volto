/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * Schema widget fieldset.
 * @module components/manage/Widgets/SchemaWidgetFieldset
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Icon } from 'semantic-ui-react';

/**
 * Schema widget fieldset component.
 * @function SchemaWidgetFieldset
 * @returns {string} Markup of the component.
 */
export const SchemaWidgetFieldsetComponent = ({
  // isDragging,
  title,
  order,
  active,
  onShowEditFieldset,
  onShowDeleteFieldset,
  onClick,
  getItemStyle,
  isDraggable,
  isDisabled,
}) => (
  <Draggable draggableId={title} index={order} key={title}>
    {(provided, snapshot) => (
      <div
        className={`item${active ? ' active' : ''}`}
        onClick={() => onClick(order)}
        ref={provided.innerRef}
        {...provided.draggableProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        {isDraggable && (
          <i
            aria-hidden="true"
            className="grey bars icon drag handle"
            {...provided.dragHandleProps}
          />
        )}
        {title}
        {!isDisabled && (
          <button
            className="item ui noborder button"
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              onShowEditFieldset(order);
            }}
          >
            <Icon name="write square" size="large" color="blue" />
          </button>
        )}

        {!isDisabled && (
          <button
            className="item ui noborder button"
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              onShowDeleteFieldset(order);
            }}
          >
            <Icon name="close" size="large" color="red" />
          </button>
        )}
      </div>
    )}
  </Draggable>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
SchemaWidgetFieldsetComponent.propTypes = {
  order: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  onOrderFieldset: PropTypes.func.isRequired,
  onShowEditFieldset: PropTypes.func.isRequired,
  onShowDeleteFieldset: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  getItemStyle: PropTypes.func.isRequired,
  isDraggable: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default SchemaWidgetFieldsetComponent;
