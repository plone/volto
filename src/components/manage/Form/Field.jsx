/**
 * Field component.
 * @module components/manage/Form/Field
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

import {
  ArrayWidget,
  CheckboxWidget,
  DatetimeWidget,
  FileWidget,
  PasswordWidget,
  SchemaWidget,
  SelectWidget,
  TextWidget,
  TextareaWidget,
  WysiwygWidget,
} from '../../../components';

/**
 * Field component class.
 * @function Field
 * @param {Object} props Properties.
 * @returns {string} Markup of the component.
 */
const Field = props => {
  let Widget;
  if (props.id === 'schema') {
    Widget = SchemaWidget;
  } else if (props.widget) {
    switch (props.widget) {
      case 'richtext':
        Widget = WysiwygWidget;
        break;
      case 'textarea':
        Widget = TextareaWidget;
        break;
      case 'datetime':
        Widget = DatetimeWidget;
        break;
      case 'password':
        Widget = PasswordWidget;
        break;
      default:
        Widget = TextWidget;
        break;
    }
  } else if (props.choices) {
    Widget = SelectWidget;
  } else if (props.type === 'boolean') {
    Widget = CheckboxWidget;
  } else if (props.type === 'array') {
    Widget = ArrayWidget;
  } else if (props.type === 'object') {
    Widget = FileWidget;
  } else {
    Widget = TextWidget;
  }
  if (props.onOrder) {
    const WrappedWidget = DropTarget(
      'field',
      {
        hover(properties, monitor) {
          const dragOrder = monitor.getItem().order;
          const hoverOrder = properties.order;

          if (dragOrder === hoverOrder) {
            return;
          }
          properties.onOrder(dragOrder, hoverOrder - dragOrder);

          monitor.getItem().order = hoverOrder;
        },
      },
      connect => ({
        connectDropTarget: connect.dropTarget(),
      }),
    )(
      DragSource(
        'field',
        {
          beginDrag(properties) {
            return {
              id: properties.label,
              order: properties.order,
            };
          },
        },
        (connect, monitor) => ({
          connectDragSource: connect.dragSource(),
          connectDragPreview: connect.dragPreview(),
          isDragging: monitor.isDragging(),
        }),
      )(
        ({
          connectDropTarget,
          connectDragSource,
          connectDragPreview,
          ...rest
        }) =>
          connectDropTarget(
            connectDragSource(
              connectDragPreview(
                <div>
                  <Widget {...rest} />
                </div>,
              ),
            ),
          ),
      ),
    );
    return <WrappedWidget {...props} />;
  }
  return <Widget {...props} />;
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Field.propTypes = {
  widget: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  onOrder: PropTypes.func,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Field.defaultProps = {
  widget: null,
  choices: null,
  type: 'string',
  onOrder: null,
};

export default Field;
