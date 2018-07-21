/**
 * Field component.
 * @module components/manage/Form/Field
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { defaultWidget, widgetMapping } from '~/config';
import { injectIntl, intlShape } from 'react-intl';

/**
 * Get default widget
 * @method getViewDefault
 * @returns {string} Widget component.
 */
const getWidgetDefault = () => defaultWidget;

/**
 * Get widget by field's `id` attribute
 * @method getWidgetById
 * @param {string} id Id
 * @returns {string} Widget component.
 */
const getWidgetByFieldId = id => widgetMapping.id[id] || null;

/**
 * Get widget by field's `widget` attribute
 * @method getWidgetByName
 * @param {string} widget Widget
 * @returns {string} Widget component.
 */
const getWidgetByName = widget =>
  typeof widget === 'string'
    ? widgetMapping.widget[widget] || getWidgetDefault()
    : null;

/**
 * Get widget by field's `vocabulary` attribute
 * @method getWidgetByVocabulary
 * @param {string} vocabulary Widget
 * @returns {string} Widget component.
 */
const getWidgetByVocabulary = vocabulary =>
  widgetMapping.vocabulary[vocabulary] || null;

/**
 * Get widget by field's `choices` attribute
 * @method getWidgetByChoices
 * @param {string} choices Widget
 * @returns {string} Widget component.
 */
const getWidgetByChoices = choices => (choices ? widgetMapping.choices : null);

/**
 * Get widget by field's `type` attribute
 * @method getWidgetByType
 * @param {string} type Type
 * @returns {string} Widget component.
 */
const getWidgetByType = type => widgetMapping.type[type] || null;

/**
 * Field component class.
 * @function Field
 * @param {Object} props Properties.
 * @returns {string} Markup of the component.
 */
const Field = (props, { intl }) => {
  const Widget =
    getWidgetByFieldId(props.id) ||
    getWidgetByName(props.widget) ||
    getWidgetByVocabulary(props.vocabulary) ||
    getWidgetByChoices(props.choices) ||
    getWidgetByType(props.type) ||
    getWidgetDefault();

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
  vocabulary: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  onOrder: PropTypes.func,
  intl: intlShape.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Field.defaultProps = {
  widget: null,
  vocabulary: null,
  choices: null,
  type: 'string',
  onOrder: null,
};

export default injectIntl(Field);
