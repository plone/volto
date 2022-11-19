/**
 * Field component.
 * @module components/manage/Form/Field
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import config from '@plone/volto/registry';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const MODE_HIDDEN = 'hidden'; //hidden mode. If mode is hidden, field is not rendered
/**
 * Get default widget
 * @method getViewDefault
 * @returns {string} Widget component.
 */
const getWidgetDefault = () => config.widgets.default;

/**
 * Get widget by field's `id` attribute
 * @method getWidgetById
 * @param {string} id Id
 * @returns {string} Widget component.
 */
const getWidgetByFieldId = (id) => config.widgets.id[id] || null;

/**
 * Get widget by factory attribute
 * @method getWidgetByFactory
 * @param {string} id Id
 * @returns {string} Widget component.
 */
const getWidgetByFactory = (factory) =>
  config.widgets.factory?.[factory] || null;

/**
 * Get widget by field's `widget` attribute
 * @method getWidgetByName
 * @param {string} widget Widget
 * @returns {string} Widget component.
 */
const getWidgetByName = (widget) =>
  typeof widget === 'string'
    ? config.widgets.widget[widget] || getWidgetDefault()
    : null;

/**
 * Get widget by tagged values
 * @param {object} widgetOptions
 * @returns {string} Widget component.
 *

directives.widget(
    'fieldname',
    frontendOptions={
        "widget": 'specialwidget',
        "version": 'extra'
    })

 */
const getWidgetFromTaggedValues = (widgetOptions) =>
  typeof widgetOptions?.frontendOptions?.widget === 'string'
    ? config.widgets.widget[widgetOptions.frontendOptions.widget]
    : null;

/**
 * Get widget props from tagged values
 * @param {object} widgetOptions
 * @returns {string} Widget component.
 *

directives.widget(
    "fieldname",
    frontendOptions={
        "widget": "specialwidget",
        "widgetProps": {"prop1": "specialprop"}
    })

 */
const getWidgetPropsFromTaggedValues = (widgetOptions) =>
  typeof widgetOptions?.frontendOptions?.widgetProps === 'object'
    ? widgetOptions.frontendOptions.widgetProps
    : null;

/**
 * Get widget by field's `vocabulary` attribute
 * @method getWidgetByVocabulary
 * @param {string} vocabulary Widget
 * @returns {string} Widget component.
 */
const getWidgetByVocabulary = (vocabulary) =>
  vocabulary && vocabulary['@id']
    ? config.widgets.vocabulary[
        vocabulary['@id'].replace(/^.*\/@vocabularies\//, '')
      ]
    : null;

/**
 * Get widget by field's hints `vocabulary` attribute in widgetOptions
 * @method getWidgetByVocabularyFromHint
 * @param {string} props Widget props
 * @returns {string} Widget component.
 */
const getWidgetByVocabularyFromHint = (props) =>
  props.widgetOptions && props.widgetOptions.vocabulary
    ? config.widgets.vocabulary[
        props.widgetOptions.vocabulary['@id'].replace(
          /^.*\/@vocabularies\//,
          '',
        )
      ]
    : null;

/**
 * Get widget by field's `choices` attribute
 * @method getWidgetByChoices
 * @param {string} choices Widget
 * @returns {string} Widget component.
 */
const getWidgetByChoices = (props) => {
  if (props.choices) {
    return config.widgets.choices;
  }

  if (props.vocabulary) {
    // If vocabulary exists, then it means it's a choice field in disguise with
    // no widget specified that probably contains a string then we force it
    // to be a select widget instead
    return config.widgets.choices;
  }

  return null;
};

/**
 * Get widget by field's `type` attribute
 * @method getWidgetByType
 * @param {string} type Type
 * @returns {string} Widget component.
 */
const getWidgetByType = (type) => config.widgets.type[type] || null;

/**
 * Field component class.
 * @function Field
 * @param {Object} props Properties.
 * @returns {string} Markup of the component.
 */
const UnconnectedField = (props, { intl }) => {
  const Widget =
    getWidgetByFieldId(props.id) ||
    getWidgetFromTaggedValues(props.widgetOptions) ||
    getWidgetByName(props.widget) ||
    getWidgetByChoices(props) ||
    getWidgetByVocabulary(props.vocabulary) ||
    getWidgetByVocabularyFromHint(props) ||
    getWidgetByFactory(props.factory) ||
    getWidgetByType(props.type) ||
    getWidgetDefault();

  if (props.mode === MODE_HIDDEN) {
    return null;
  }

  // Adding the widget props from tagged values (if any)
  const widgetProps = {
    ...props,
    ...getWidgetPropsFromTaggedValues(props.widgetOptions),
  };

  if (props.onOrder) {
    const { DropTarget, DragSource } = props.reactDnd;
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
      (connect) => ({
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
    return <WrappedWidget {...widgetProps} />;
  }
  return <Widget {...widgetProps} />;
};

const DndConnectedField = injectLazyLibs(['reactDnd'])(UnconnectedField);

const Field = (props) =>
  props.onOrder ? (
    <DndConnectedField {...props} />
  ) : (
    <UnconnectedField {...props} />
  );

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Field.propTypes = {
  widget: PropTypes.string,
  vocabulary: PropTypes.shape({ '@id': PropTypes.string }),
  choices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  focus: PropTypes.bool,
  onOrder: PropTypes.func,
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
  focus: false,
  onOrder: null,
};

export default injectIntl(Field);
