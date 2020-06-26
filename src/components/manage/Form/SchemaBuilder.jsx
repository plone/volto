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
import { Container, Form as UiForm, Menu, Segment, Tab } from 'semantic-ui-react';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  // const [removed] = result.splice(startIndex, 1);
  // result.splice(endIndex, 0, removed);

  return result;
};

const makeFormData = (objectItem) => {
  let result = {};
  Object.keys(objectItem).forEach(
    (key) => (result[key] = objectItem[key].title),
  );
  return result;
};

const makeSchemaList = (schema) => {
  let result = [];
  console.log(schema);
  result = schema.fieldsets.map((fieldSet) => {
    const temp = {};
    temp[fieldSet.id] = {
      id: fieldSet.id,
      title: fieldSet.title,
      fields: [],
    };
    temp[fieldSet.id].fields = fieldSet.fields.map((fieldKey) => ({
      ...schema.properties[fieldKey],
      id: fieldKey,
    }));
    return temp;
  });
  console.log('makeSchemaList', result);
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

    this.state = {
      errors: {},
      placeholderProps: {},
      formData: makeFormData(props?.schema?.properties),
      activeIndex: 0,
      schemaItems: makeSchemaList(props?.schema),
    };

    this.onDragUpdate = this.onDragUpdate.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onSelectBlock = this.onSelectBlock.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.makeMenuItem = this.makeMenuItem.bind(this);
    this.makeTabItemContent = this.makeTabItemContent.bind(this);
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
  handleTabChange(e) {
    console.log('tab change');
    this.setState({ activeIndex: e.target.value });
  }

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
    console.log('onDragEnd result', result);
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
    // console.log('componentDidMount props', this.props);
  }

  makeMenuItem(item) {
    // console.log('menu item', item);
    const menuId = `tab-${item.id}`;
    const menuItem = (
      <Menu.Item key={menuId}>
        <Droppable droppableId={menuId}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.draggableProps}>
              {item.title}
            </div>
          )}
        </Droppable>
      </Menu.Item>
    );
    return menuItem;
  }

  makeTabItemContent(schema, item) {
    return (
      <Droppable droppableId="schema-edit">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            {map(item.fields, (field, index) => (
              <Draggable draggableId={field} index={index} key={field}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
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
                        required={schema.required.indexOf(field) !== -1}
                        onChange={this.onChangeField}
                        key={field}
                        error={this.state.errors[field]}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { schema } = this.props;
    const { activeIndex } = this.state;
    // console.log('render this.state', this.state);
    // console.log('render this.props', this.props);

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
                <Tab
                  activeIndex={activeIndex}
                  onTabChange={this.handleTabChange}
                  menu={{
                    secondary: true,
                    pointing: true,
                    attached: true,
                    tabular: true,
                    className: 'formtabs',
                  }}
                  panes={map(schema.fieldsets, (item) => ({
                    menuItem: this.makeMenuItem(item),
                    render: () => this.makeTabItemContent(schema, item),
                  }))}
                />
              )}
            </Segment.Group>
          </UiForm>
        </DragDropContext>
      </Container>
    );
  }
}

export default injectIntl(SchemaBuilder, { forwardRef: true });
