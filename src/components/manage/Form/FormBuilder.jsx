/**
 * Form builder component.
 * @module components/manage/Form/FormBuilder
 */

import { EditBlock, Icon } from '@plone/volto/components';
import dragSVG from '@plone/volto/icons/drag.svg';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { injectIntl } from 'react-intl';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const makeArrayFromObject = (objectItem) => {
  console.log('makeArrayFromObject objectItem', objectItem);
  const listOfKeys = Object.keys(objectItem);
  const result = listOfKeys.map((itemKey) => ({
    ...objectItem[itemKey],
    id: itemKey,
  }));
  console.log('result', result);
  return result;
};

/**
 * FormBuilder container class.
 * @class FormBuilder
 * @extends Component
 */
class FormBuilder extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    schema: PropTypes.shape({
      fieldsets: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.arrayOf(PropTypes.string),
          id: PropTypes.string,
          title: PropTypes.string,
        }),
      ),
      properties: PropTypes.objectOf(PropTypes.any),
      definitions: PropTypes.objectOf(PropTypes.any),
      required: PropTypes.arrayOf(PropTypes.string),
    }),
    pathname: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    loading: PropTypes.bool,
    hideActions: PropTypes.bool,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    schema: {},
    pathname: '',
    onSubmit: null,
    onCancel: null,
    error: null,
    loading: null,
    hideActions: false,
    visual: false,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs FormBuilder
   */
  constructor(props) {
    super(props);

    const allFields = makeArrayFromObject(props?.schema?.properties);

    this.state = {
      errors: {},
      selected: allFields[0]?.id,
      placeholderProps: {},
      fields: allFields,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onSelectBlock = this.onSelectBlock.bind(this);
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  onSubmit(event) {}
  handleKeyDown(event) {}
  handleDragStart(event) {}
  onDragUpdate(event) {}
  onAddBlock(event) {}
  onChangeBlock(event) {}
  onMutateBlock(event) {}
  onChangeField(event) {}
  onDeleteBlock(event) {}
  onMoveBlock(event) {}
  onFocusPreviousBlock(event) {}
  onFocusNextBlock(event) {}
  removeBlocksLayoutFields(event) {}

  hideHandler = (data) => {
    return false;
  };

  onSelectBlock(id) {
    console.log('setBlovk id', id);
    this.setState({
      selected: id,
    });
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const fields = reorder(
      this.state.fields,
      result.source.index,
      result.destination.index,
    );

    this.setState(
      {
        fields,
      },
      console.log('onDragEnd state', this.state),
    );
  }

  componentDidMount() {
    console.log('componentDidMount props', this.props);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { schema } = this.props;
    const placeholderProps = {};

    console.log('render this.state', this.state);

    return (
      <div className="ui container">
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.handleDragStart}
          onDragUpdate={this.onDragUpdate}
        >
          <Droppable droppableId="edit-form">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ position: 'relative' }}
              >
                {this.state.fields.map((field, index) => (
                  <Draggable
                    draggableId={field.id}
                    index={index}
                    key={field.id}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`field-editor-${field.type}`}
                      >
                        <div style={{ position: 'relative' }}>
                          <div
                            style={{
                              visibility:
                                this.state.selected === field.id &&
                                !this.hideHandler(field)
                                  ? 'visible'
                                  : 'hidden',
                              display: 'inline-block',
                            }}
                            {...provided.dragHandleProps}
                            className="drag handle wrapper"
                          >
                            <Icon name={dragSVG} size="18px" />
                          </div>
                          <EditBlock
                            id={field.id}
                            index={index}
                            type={field.type}
                            key={field.id}
                            handleKeyDown={this.handleKeyDown}
                            onAddBlock={this.onAddBlock}
                            onChangeBlock={this.onChangeBlock}
                            onMutateBlock={this.onMutateBlock}
                            onChangeField={this.onChangeField}
                            onDeleteBlock={this.onDeleteBlock}
                            onSelectBlock={this.onSelectBlock}
                            onMoveBlock={this.onMoveBlock}
                            onFocusPreviousBlock={this.onFocusPreviousBlock}
                            onFocusNextBlock={this.onFocusNextBlock}
                            pathname={this.props.pathname}
                            data={field.id}
                            block={field.id}
                            selected={this.state.selected === field.id}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {/* {provided.placeholder} */}
                {/* {!isEmpty(placeholderProps) && (
                <div
                  style={{
                    position: 'absolute',
                    top: `${placeholderProps.clientY}px`,
                    height: `${placeholderProps.clientHeight + 18}px`,
                    background: '#eee',
                    width: `${placeholderProps.clientWidth}px`,
                    borderRadius: '3px',
                  }}
                />
              )} */}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default injectIntl(FormBuilder, { forwardRef: true });
