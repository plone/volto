/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * Schema widget fieldset.
 * @module components/manage/Widgets/SchemaWidgetFieldset
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { Icon } from 'semantic-ui-react';

/**
 * Schema widget fieldset component.
 * @function SchemaWidgetFieldset
 * @returns {string} Markup of the component.
 */
export const SchemaWidgetFieldsetComponent = ({
  connectDragSource,
  connectDragPreview,
  connectDropTarget,
  isDragging,
  title,
  order,
  active,
  onShowEditFieldset,
  onShowDeleteFieldset,
  onClick,
}) =>
  connectDropTarget(
    connectDragPreview(
      <div
        className={`item${active ? ' active' : ''}`}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onClick={() => onClick(order)}
      >
        {connectDragSource(
          <i aria-hidden="true" className="grey bars icon drag handle" />,
        )}
        {title}
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
      </div>,
    ),
  );

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
SchemaWidgetFieldsetComponent.propTypes = {
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  order: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  onOrderFieldset: PropTypes.func.isRequired,
  onShowEditFieldset: PropTypes.func.isRequired,
  onShowDeleteFieldset: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DropTarget(
  'fieldset',
  {
    hover(props, monitor) {
      const dragOrder = monitor.getItem().order;
      const hoverOrder = props.order;

      if (dragOrder === hoverOrder) {
        return;
      }
      props.onOrderFieldset(dragOrder, hoverOrder - dragOrder);

      monitor.getItem().order = hoverOrder;
    },
  },
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    'fieldset',
    {
      beginDrag(props) {
        return {
          id: props.label,
          order: props.order,
        };
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    }),
  )(SchemaWidgetFieldsetComponent),
);
