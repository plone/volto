/**
 * Schema builder component.
 * @module components/manage/Form/SchemaBuilder
 */

import { Field, Icon } from '@plone/volto/components';
import dragSVG from '@plone/volto/icons/drag.svg';
import { keys, map } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { injectIntl } from 'react-intl';
import { Container, Form as UiForm, Segment, Tab } from 'semantic-ui-react';

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

const makeFormData = (objectItem) => {
  let result = {};
  Object.keys(objectItem).forEach(
    (key) => (result[key] = objectItem[key].title),
  );
  return result;
};

/**
 * SchemaBuilder container class.
 * @class SchemaBuilder
 * @extends Component
 */
class SchemaBuilder extends Component {
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
   * @constructs SchemaBuilder
   */
  constructor(props) {
    super(props);

    const allFields = makeArrayFromObject(props?.schema?.properties);

    this.state = {
      errors: {},
      selected: allFields[0]?.id,
      placeholderProps: {},
      fields: allFields,
      formData: makeFormData(props?.schema?.properties),
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
    const { schema, title } = this.props;
    console.log('render this.state', this.state);
    console.log('render this.props', this.props);

    return (
      <Container>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.handleDragStart}
          onDragUpdate={this.onDragUpdate}
        >
          <UiForm
            method="post"
            onSubmit={this.onSubmit}
            error={keys(this.state.errors).length > 0}
          >
            <Segment.Group raised>
              {schema && schema.fieldsets.length > 1 && (
                <Droppable droppableId="schema-edit">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <Tab
                        menu={{
                          secondary: true,
                          pointing: true,
                          attached: true,
                          tabular: true,
                          className: 'formtabs',
                        }}
                        panes={map(schema.fieldsets, (item) => ({
                          menuItem: item.title,
                          render: () => [
                            title && (
                              <Segment secondary attached key={title}>
                                {title}
                              </Segment>
                            ),
                            provided.placeholder,
                            ...map(item.fields, (field, index) => (
                              <Draggable
                                draggableId={field}
                                index={index}
                                key={field}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <div style={{ position: 'relative' }}>
                                      <div
                                        style={{
                                          visibility: 'visible',
                                          display: 'inline-block',
                                        }}
                                        {...provided.dragHandleProps}
                                        className="drag handle wrapper"
                                      >
                                        <Icon name={dragSVG} size="18px" />
                                      </div>
                                      <Field
                                        {...schema.properties[field]}
                                        id={field}
                                        fieldSet={item.title.toLowerCase()}
                                        focus={index === 0}
                                        value={this.state.formData[field]}
                                        required={
                                          schema.required.indexOf(field) !== -1
                                        }
                                        onChange={this.onChangeField}
                                        key={field}
                                        error={this.state.errors[field]}
                                      />
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            )),
                          ],
                        }))}
                      />
                    </div>
                  )}
                </Droppable>
              )}
            </Segment.Group>
          </UiForm>
        </DragDropContext>
      </Container>
    );
  }
}

export default injectIntl(SchemaBuilder, { forwardRef: true });
