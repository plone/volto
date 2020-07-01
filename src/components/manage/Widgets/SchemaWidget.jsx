/**
 * SchemaWidget component.
 * @module components/manage/Widgets/SchemaWidget
 */

import { getFieldSchema } from '@plone/volto/actions';
import {
  Field,
  ModalForm,
  SchemaWidgetFieldset,
} from '@plone/volto/components';
import { concat, findIndex, map, omit, slice, without } from 'lodash';
import move from 'lodash-move';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Confirm, Form, Grid, Icon, Message, Segment } from 'semantic-ui-react';

const messages = defineMessages({
  add: {
    id: 'Add',
    defaultMessage: 'Add',
  },
  addField: {
    id: 'Add field',
    defaultMessage: 'Add field',
  },
  addFieldset: {
    id: 'Add fieldset',
    defaultMessage: 'Add fieldset',
  },
  editField: {
    id: 'Edit field',
    defaultMessage: 'Edit field',
  },
  editFieldset: {
    id: 'Edit fieldset',
    defaultMessage: 'Edit fieldset',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  idTitle: {
    id: 'Short Name',
    defaultMessage: 'Short Name',
  },
  idDescription: {
    id: 'Used for programmatic access to the fieldset.',
    defaultMessage: 'Used for programmatic access to the fieldset.',
  },
  string: {
    id: 'String',
    defaultMessage: 'String',
  },
  text: {
    id: 'Text',
    defaultMessage: 'Text',
  },
  richtext: {
    id: 'Richtext',
    defaultMessage: 'Richtext',
  },
  checkbox: {
    id: 'Checkbox',
    defaultMessage: 'Checkbox',
  },
  selection: {
    id: 'Selection',
    defaultMessage: 'Selection',
  },
  type: {
    id: 'Type',
    defaultMessage: 'Type',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  required: {
    id: 'Required',
    defaultMessage: 'Required',
  },
  minLength: {
    id: 'minLength',
    defaultMessage: 'Minimum Length',
  },
  maxLength: {
    id: 'maxLength',
    defaultMessage: 'Maximum Length',
  },
  minimum: {
    id: 'minimum',
    defaultMessage: 'Start of the range',
  },
  maximum: {
    id: 'maximum',
    defaultMessage: 'End of the range (including the value itself)',
  },
  deleteFieldset: {
    id: 'Are you sure you want to delete this fieldset including all fields?',
    defaultMessage:
      'Are you sure you want to delete this fieldset including all fields?',
  },
  deleteField: {
    id: 'Are you sure you want to delete this field?',
    defaultMessage: 'Are you sure you want to delete this field?',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
});

const makeFieldTypes = (listOfTypes, intl) => {
  const result = listOfTypes.map((type) => [type.label, type.label]);
  return result;
};

const schemaField = (factory, intl) => ({
  fieldsets: [
    {
      id: 'default',
      title: 'default',
      fields: [
        ...['title', 'description'],
        ...((factory) => {
          switch (factory) {
            case 'Rich Text':
              return ['maxLength'];
            case 'URL':
            case 'Password':
            case 'Email':
              return ['minLength', 'maxLength'];
            case 'Date/Time':
            case 'Date':
            case 'Floating-point number':
            case 'Integer':
              return ['minimum', 'maximum'];
            case 'File':
            case 'Image':
            case 'Yes/No':
            case 'JSONField':
            case 'Multiple Choice':
            case 'Relation List':
              return [];
            default:
              return ['minLength', 'maxLength'];
          }
        })(factory),
        ...['required'],
      ],
    },
  ],
  properties: {
    title: {
      type: 'string',
      title: intl.formatMessage(messages.title),
    },
    description: {
      type: 'string',
      widget: 'textarea',
      title: intl.formatMessage(messages.idDescription),
    },
    required: {
      type: 'boolean',
      title: intl.formatMessage(messages.required),
    },
    ...((factory) => {
      switch (factory) {
        case 'Rich Text':
          return {
            maxLength: {
              type: 'integer',
              title: intl.formatMessage(messages.maxLength),
            },
          };
        case 'URL':
        case 'Password':
        case 'Email':
          return {
            minLength: {
              type: 'integer',
              title: intl.formatMessage(messages.minLength),
            },
            maxLength: {
              type: 'integer',
              title: intl.formatMessage(messages.maxLength),
            },
          };
        case 'Date/Time':
        case 'Date':
        case 'Floating-point number':
        case 'Integer':
          return {
            minimum: {
              type: 'integer',
              title: intl.formatMessage(messages.minimum),
            },
            maximum: {
              type: 'integer',
              title: intl.formatMessage(messages.maximum),
            },
          };
        case 'File':
        case 'Image':
        case 'Yes/No':
        case 'JSONField':
        case 'Multiple Choice':
        case 'Relation List':
          return {};
        default:
          return {
            minLength: {
              type: 'integer',
              title: intl.formatMessage(messages.minLength),
            },
            maxLength: {
              type: 'integer',
              title: intl.formatMessage(messages.maxLength),
            },
          };
      }
    })(factory),
  },
  required: ['type', 'title'],
});

const isUserCreated = (field) =>
  !field.behavior ||
  field.behavior.indexOf('plone.dexterity.schema.generated') > -1;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'white' : 'transparent',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#f4f4f4' : 'transparent',
});

/**
 * SchemaWidget component class.
 * @class SchemaWidget
 * @extends Component
 */
class SchemaWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Id of the field
     */
    id: PropTypes.string.isRequired,
    /**
     * Title of the field
     */
    required: PropTypes.bool,
    /**
     * Value of the field
     */
    value: PropTypes.object,
    /**
     * List of error messages
     */
    error: PropTypes.arrayOf(PropTypes.string),
    /**
     * On change handler
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Intl object
     */
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    required: false,
    value: {},
    error: [],
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangeDefaultValue = this.onChangeDefaultValue.bind(this);
    this.onAddField = this.onAddField.bind(this);
    this.onAddFieldset = this.onAddFieldset.bind(this);
    this.onEditField = this.onEditField.bind(this);
    this.onEditFieldset = this.onEditFieldset.bind(this);
    this.onDeleteFieldset = this.onDeleteFieldset.bind(this);
    this.onDeleteField = this.onDeleteField.bind(this);
    this.onShowAddField = this.onShowAddField.bind(this);
    this.onShowAddFieldset = this.onShowAddFieldset.bind(this);
    this.onShowEditFieldset = this.onShowEditFieldset.bind(this);
    this.onShowEditField = this.onShowEditField.bind(this);
    this.onShowDeleteFieldset = this.onShowDeleteFieldset.bind(this);
    this.onShowDeleteField = this.onShowDeleteField.bind(this);
    this.onSetCurrentFieldset = this.onSetCurrentFieldset.bind(this);
    this.onOrderField = this.onOrderField.bind(this);
    this.onOrderFieldset = this.onOrderFieldset.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.state = {
      addField: null,
      addFieldset: null,
      editFieldset: null,
      editField: null,
      deleteFieldset: null,
      deleteField: null,
      currentFieldset: 0,
      lol: 'lol',
    };
  }

  /**
   * Add field handler
   * @method onAddField
   * @param {Object} values Form values
   * @returns {undefined}
   */
  onAddField(values) {
    console.log('onAddField', values);

    const currentFieldsetFields = this.props.value.fieldsets[
      this.state.currentFieldset
    ].fields;
    const hasChangeNote = currentFieldsetFields.indexOf('changeNote') > -1;
    const newFieldsetFields = hasChangeNote
      ? [
          ...currentFieldsetFields.slice(0, currentFieldsetFields.length - 1),
          values.id,
          currentFieldsetFields[currentFieldsetFields.length - 1],
        ]
      : [...currentFieldsetFields, values.id];

    this.onChange({
      ...this.props.value,
      fieldsets: [
        ...slice(this.props.value.fieldsets, 0, this.state.currentFieldset),
        {
          ...this.props.value.fieldsets[this.state.currentFieldset],
          fields: newFieldsetFields,
        },
        ...slice(this.props.value.fieldsets, this.state.currentFieldset + 1),
      ],
      properties: {
        ...this.props.value.properties,
        [values.id]: {
          title: values.title,
          description: values.description,
          ...((factory) => {
            switch (factory) {
              case 'File':
                return {
                  type: 'object',
                  widget: 'textarea',
                  factory,
                };
              case 'Image':
                return {
                  type: 'object',
                  factory,
                };
              case 'Rich Text':
                return {
                  type: 'string',
                  widget: 'richtext',
                  factory,
                };
              case 'Email':
                return {
                  type: 'string',
                  widget: 'email',
                  factory,
                };
              case 'Yes/No':
                return {
                  type: 'boolean',
                  factory,
                };
              case 'Floating-point number':
                return {
                  type: 'number',
                  factory,
                };
              case 'Integer':
                return {
                  type: 'integer',
                  factory,
                };
              case 'Date/Time':
                return {
                  type: 'string',
                  widget: 'datetime',
                  factory,
                };
              case 'Date':
                return {
                  type: 'string',
                  widget: 'date',
                  factory,
                };
              case 'JSONField':
                return {
                  type: 'dict',
                  widget: 'json',
                  factory,
                };
              case 'Multiple Choice':
              case 'Relation List':
                return {
                  type: 'array',
                  factory,
                };
              case 'URL':
                return {
                  type: 'string',
                  widget: 'url',
                  factory,
                };
              case 'Password':
                return {
                  type: 'string',
                  widget: 'password',
                  factory,
                };
              case 'selection':
                return {
                  type: 'string',
                  choices: [],
                  factory,
                };
              default:
                return {
                  type: 'string',
                  factory,
                };
            }
          })(values.factory),
        },
      },
      required: values.required
        ? [...this.props.value.required, values.id]
        : this.props.value.required,
    });
    this.onCancel();
  }

  /**
   * Add fieldset handler
   * @method onAddFieldset
   * @param {Object} values Form values
   * @returns {undefined}
   */
  onAddFieldset(values) {
    this.onChange({
      ...this.props.value,
      fieldsets: [
        ...this.props.value.fieldsets,
        {
          ...values,
          fields: [],
        },
      ],
    });
    this.onCancel();
  }

  /**
   * Edit fieldset handler
   * @method onEditFieldset
   * @param {Object} values Form values
   * @returns {undefined}
   */
  onEditFieldset(values) {
    this.onChange({
      ...this.props.value,
      fieldsets: [
        ...slice(this.props.value.fieldsets, 0, this.state.editFieldset),
        values,
        ...slice(this.props.value.fieldsets, this.state.editFieldset + 1),
      ],
    });
    this.onCancel();
  }

  /**
   * Edit field handler
   * @method onEditField
   * @param {Object} values Field values
   * @returns {undefined}
   */
  onEditField(values) {
    this.onChange({
      ...this.props.value,
      fieldsets: [
        ...slice(this.props.value.fieldsets, 0, this.state.currentFieldset),
        {
          ...this.props.value.fieldsets[this.state.currentFieldset],
          fields: map(
            this.props.value.fieldsets[this.state.currentFieldset].fields,
            (field) => (field === this.state.editField.id ? values.id : field),
          ),
        },
        ...slice(this.props.value.fieldsets, this.state.currentFieldset + 1),
      ],
      properties: {
        ...omit(this.props.value.properties, [this.state.editField.id]),
        [values.id]: {
          ...this.props.value.properties[this.state.editField.id],
          ...omit(values, ['id', 'required']),
        },
      },
      required: values.required
        ? concat(without(this.props.value.required, this.state.editField.id), [
            values.id,
          ])
        : without(this.props.value.required, this.state.editField.id),
    });
    this.onCancel();
  }

  /**
   * Delete fieldset handler
   * @method onDeleteFieldset
   * @returns {undefined}
   */
  onDeleteFieldset() {
    if (this.state.currentFieldset > this.props.value.fieldsets.length - 2) {
      this.setState({
        currentFieldset: this.state.currentFieldset - 1,
      });
    }
    this.onChange({
      ...this.props.value,
      fieldsets: [
        ...slice(this.props.value.fieldsets, 0, this.state.deleteFieldset),
        ...slice(this.props.value.fieldsets, this.state.deleteFieldset + 1),
      ],
      properties: omit(
        this.props.value.properties,
        this.props.value.fieldsets[this.state.deleteFieldset].fields,
      ),
    });
    this.onCancel();
  }

  /**
   * Delete field handler
   * @method onDeleteField
   * @returns {undefined}
   */
  onDeleteField() {
    this.onChange({
      ...this.props.value,
      fieldsets: [
        ...slice(this.props.value.fieldsets, 0, this.state.currentFieldset),
        {
          ...this.props.value.fieldsets[this.state.currentFieldset],
          fields: without(
            this.props.value.fieldsets[this.state.currentFieldset].fields,
            this.state.deleteField,
          ),
        },
        ...slice(this.props.value.fieldsets, this.state.currentFieldset + 1),
      ],
      properties: omit(this.props.value.properties, [this.state.deleteField]),
    });
    this.onCancel();
  }

  /**
   * Change handler
   * @method onChange
   * @param {Object} value New schema
   * @returns {undefined}
   */
  onChange(value) {
    // console.log('onChange', value);
    this.props.onChange(this.props.id, JSON.stringify(value));
  }

  onChangeDefaultValue(fieldId, fieldValue) {
    // console.log('onChangeDefaultValue', fieldId, fieldValue);
    const { value } = this.props;
    const fieldMerge = {
      ...value.properties[fieldId],
      ...{ default: fieldValue },
    };
    const propsMerge = { ...value.properties, ...{ [fieldId]: fieldMerge } };

    this.onChange({
      ...value,
      properties: propsMerge,
    });
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.setState({
      addField: null,
      addFieldset: null,
      editFieldset: null,
      editField: null,
      deleteFieldset: null,
      deleteField: null,
    });
  }

  /**
   * Show add field handler
   * @method onShowAddField
   * @returns {undefined}
   */
  onShowAddField(event) {
    this.setState({
      addField: true,
    });
    event.preventDefault();
  }

  /**
   * Show add fieldset handler
   * @method onShowAddFieldset
   * @returns {undefined}
   */
  onShowAddFieldset(event) {
    this.setState({
      addFieldset: true,
    });
    event.preventDefault();
  }

  /**
   * Show edit fieldset handler
   * @method onShowEditFieldset
   * @param {Number} index Index of fieldset
   * @returns {undefined}
   */
  onShowEditFieldset(index) {
    this.setState({
      editFieldset: index,
    });
  }

  /**
   * Show edit field handler
   * @method onShowEditField
   * @param {string} id Id of field
   * @param {Object} schema Schema of the field
   * @returns {undefined}
   */
  onShowEditField(id, schema) {
    // const { contentType } = this.props.value;
    console.log('on show field schema', schema);
    this.setState({
      editField: {
        id,
        // schema,
      },
    });

    // this.props.getFieldSchema(contentType, id);
  }

  /**
   * Show delete fieldset handler
   * @method onShowDeleteFieldset
   * @param {Number} index Index of fieldset
   * @param {Object} event Event object
   * @returns {undefined}
   */
  onShowDeleteFieldset(index) {
    this.setState({
      deleteFieldset: index,
    });
  }

  /**
   * Show delete field handler
   * @method onShowDeleteField
   * @param {String} field Field to delete
   * @param {Object} event Event object
   * @returns {undefined}
   */
  onShowDeleteField(field) {
    this.setState({
      deleteField: field,
    });
  }

  /**
   * Set current fieldset handler
   * @method onSetCurrentFieldset
   * @param {Number} index Index of fieldset
   * @returns {undefined}
   */
  onSetCurrentFieldset(index) {
    this.setState({
      currentFieldset: index,
    });
  }

  /**
   * On order fieldset
   * @method onOrderField
   * @param {number} index Index
   * @param {number} delta Delta
   * @returns {undefined}
   */
  onOrderField(index, delta) {
    this.onChange({
      ...this.props.value,
      fieldsets: [
        ...slice(this.props.value.fieldsets, 0, this.state.currentFieldset),
        {
          ...this.props.value.fieldsets[this.state.currentFieldset],
          fields: move(
            this.props.value.fieldsets[this.state.currentFieldset].fields,
            index,
            delta,
          ),
        },
        ...slice(this.props.value.fieldsets, this.state.currentFieldset + 1),
      ],
    });
  }

  /**
   * On order fieldset
   * @method onOrderFieldset
   * @param {number} index Index
   * @param {number} delta Delta
   * @returns {undefined}
   */
  onOrderFieldset(index, delta) {
    const value = {
      ...this.props.value,
      fieldsets: move(this.props.value.fieldsets, index, delta),
    };
    this.setState({
      currentFieldset: findIndex(value.fieldsets, {
        id: this.props.value.fieldsets[this.state.currentFieldset].id,
      }),
    });
    this.onChange(value);
  }

  /**
   * Set current fieldset handler
   * @method onDragEnd
   * @param {Number} index Index of fieldset
   * @returns {undefined}
   */
  onDragEnd(result) {
    if (
      result.destination &&
      result.destination.droppableId === 'fields-schema-edit'
    ) {
      this.onOrderField(result.source.index, result.destination.index);
    }
    if (
      result.destination &&
      result.destination.droppableId === 'tabs-schema-edit'
    ) {
      this.onOrderFieldset(result.source.index, result.destination.index);
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { value, error, vocabularyFields } = this.props;
    const nonUserCreatedFields = value.fieldsets[
      this.state.currentFieldset
    ].fields.filter(
      (fieldId) =>
        !isUserCreated(value.properties[fieldId]) && fieldId !== 'changeNote',
    );
    const hasChangeNote =
      value.fieldsets[this.state.currentFieldset].fields.indexOf('changeNote') >
      -1;
    const userCreatedFieldsStartingIndex = nonUserCreatedFields.length;
    const lastUserCreatedFieldsIndex = hasChangeNote
      ? value.fieldsets[this.state.currentFieldset].fields.length - 1
      : value.fieldsets[this.state.currentFieldset].fields.length;
    console.log('render this.props ', this.props);

    return (
      <div>
        <Segment.Group raised>
          {error.length > 0 &&
            map(error, (err, index) => (
              <Message
                icon="warning"
                key={`${err}-${index}`}
                negative
                attached
                header={this.props.intl.formatMessage(messages.error)}
                content={err}
              />
            ))}
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="tabs-schema-edit" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  role="tablist"
                  className="ui pointing secondary attached tabular menu"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {map(value.fieldsets, (item, index) => (
                    <SchemaWidgetFieldset
                      key={`${item.id}-${this.state.currentFieldset}-${index}`}
                      title={item.title}
                      order={index}
                      active={index === this.state.currentFieldset}
                      onClick={this.onSetCurrentFieldset}
                      onShowEditFieldset={this.onShowEditFieldset}
                      onShowDeleteFieldset={this.onShowDeleteFieldset}
                      onOrderFieldset={this.onOrderFieldset}
                      getItemStyle={getItemStyle}
                    />
                  ))}
                  <div className="item item-add">
                    <button
                      aria-label={this.props.intl.formatMessage(messages.add)}
                      className="item ui noborder button"
                      onClick={this.onShowAddFieldset}
                    >
                      <Icon name="plus" size="large" />
                    </button>
                  </div>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {map(
              value.fieldsets[this.state.currentFieldset].fields.slice(
                0,
                userCreatedFieldsStartingIndex,
              ),
              (field, index) => (
                <div
                  style={{ background: '#c7d5d859' }}
                  key={`${field}-${this.state.currentFieldset}-${index}`}
                >
                  <Field
                    {...value.properties[field]}
                    id={field}
                    required={value.required.indexOf(field) !== -1}
                    onEdit={this.onShowEditField}
                    isDraggable={false}
                    isDissabled={true}
                    order={index}
                    vocabularyFields={vocabularyFields}
                    onDelete={this.onShowDeleteField}
                    onChange={this.onChangeDefaultValue}
                    value={value.properties[field].default}
                  />
                </div>
              ),
            )}
            <Droppable
              droppableId="fields-schema-edit"
              direction="vertical"
              type="fixed"
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {map(
                    value.fieldsets[this.state.currentFieldset].fields.slice(
                      userCreatedFieldsStartingIndex,
                      lastUserCreatedFieldsIndex,
                    ),
                    (field, index) => (
                      <Draggable
                        draggableId={field}
                        index={userCreatedFieldsStartingIndex + index}
                        key={`${field}-${this.state.currentFieldset}-${index}`}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                            )}
                          >
                            <Field
                              {...value.properties[field]}
                              id={field}
                              required={value.required.indexOf(field) !== -1}
                              onEdit={this.onShowEditField}
                              isDraggable={true}
                              isDissabled={false}
                              order={index}
                              onDelete={this.onShowDeleteField}
                              onChange={this.onChangeDefaultValue}
                              key={`${field}-${this.state.currentFieldset}-${index}`}
                              value={value.properties[field].default}
                            />
                          </div>
                        )}
                      </Draggable>
                    ),
                  )}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {hasChangeNote ? (
            <div style={{ background: '#c7d5d859' }}>
              <Field
                {...value.properties.changeNote}
                id={'changeNote'}
                required={value.required.indexOf('changeNote') !== -1}
                onEdit={this.onShowEditField}
                isDraggable={false}
                isDissabled={true}
                order={value.fieldsets[this.state.currentFieldset].length - 1}
                onDelete={this.onShowDeleteField}
                onChange={this.onChangeDefaultValue}
                key={'changeNote'}
                value={value.properties.changeNote.default}
              />
            </div>
          ) : null}

          <Form.Field inline>
            <Grid>
              <Grid.Row stretched>
                <Grid.Column width="12">
                  <div className="wrapper">
                    <label htmlFor="addfield">Add new field</label>
                  </div>
                  <div className="toolbar">
                    <button
                      aria-label={this.props.intl.formatMessage(messages.add)}
                      id="addfield"
                      className="item ui noborder button"
                      onClick={this.onShowAddField}
                    >
                      <Icon name="plus" color="blue" size="large" />
                    </button>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form.Field>
        </Segment.Group>
        {this.state.addField !== null && (
          <ModalForm
            onSubmit={this.onAddField}
            onCancel={this.onCancel}
            title={this.props.intl.formatMessage(messages.addField)}
            formData={{
              type: '',
              id: '',
              title: '',
            }}
            schema={{
              fieldsets: [
                {
                  id: 'default',
                  title: this.props.intl.formatMessage(messages.default),
                  fields: [
                    'factory',
                    'title',
                    'minLength',
                    'description',
                    'required',
                  ],
                },
              ],
              properties: {
                factory: {
                  type: 'string',
                  title: this.props.intl.formatMessage(messages.type),
                  choices: makeFieldTypes(this.props.vocabularyFields?.items),
                },
                minLength: {
                  type: 'integer',
                  title: 'minLength',
                },
                title: {
                  type: 'string',
                  title: this.props.intl.formatMessage(messages.title),
                },
                description: {
                  type: 'string',
                  widget: 'textarea',
                  title: this.props.intl.formatMessage(messages.description),
                },
                required: {
                  type: 'boolean',
                  title: this.props.intl.formatMessage(messages.required),
                },
              },
              required: ['type', 'title'],
            }}
          />
        )}
        {this.state.addFieldset !== null && (
          <ModalForm
            onSubmit={this.onAddFieldset}
            onCancel={this.onCancel}
            title={this.props.intl.formatMessage(messages.addFieldset)}
            formData={{
              id: '',
              title: '',
            }}
            schema={{
              fieldsets: [
                {
                  id: 'default',
                  title: this.props.intl.formatMessage(messages.default),
                  fields: ['title', 'id'],
                },
              ],
              properties: {
                id: {
                  type: 'string',
                  title: this.props.intl.formatMessage(messages.idTitle),
                  description: this.props.intl.formatMessage(
                    messages.idDescription,
                  ),
                },
                title: {
                  type: 'string',
                  title: this.props.intl.formatMessage(messages.title),
                },
              },
              required: ['id', 'title'],
            }}
          />
        )}
        {this.state.editField !== null && (
          <ModalForm
            onSubmit={this.onEditField}
            onCancel={this.onCancel}
            title={this.props.intl.formatMessage(messages.editField)}
            formData={{
              ...this.props.value.properties[this.state.editField.id],
              id: this.state.editField.id,
              required:
                this.props.value.required.indexOf(this.state.editField.id) !==
                -1,
            }}
            schema={schemaField(
              this.props.value.properties[this.state.editField.id].factory,
              this.props.intl,
            )}
          />
        )}
        {this.state.editFieldset !== null && (
          <ModalForm
            onSubmit={this.onEditFieldset}
            onCancel={this.onCancel}
            title={this.props.intl.formatMessage(messages.editFieldset)}
            formData={{
              id: this.props.value.fieldsets[this.state.editFieldset].id,
              title: this.props.value.fieldsets[this.state.editFieldset].title,
            }}
            schema={{
              fieldsets: [
                {
                  id: 'default',
                  title: this.props.intl.formatMessage(messages.default),
                  fields: ['title', 'id'],
                },
              ],
              properties: {
                id: {
                  type: 'string',
                  title: this.props.intl.formatMessage(messages.idTitle),
                  description: this.props.intl.formatMessage(
                    messages.idDescription,
                  ),
                },
                title: {
                  type: 'string',
                  title: this.props.intl.formatMessage(messages.title),
                },
              },
              required: ['id', 'title'],
            }}
          />
        )}
        {this.state.deleteFieldset !== null && (
          <Confirm
            open
            content={this.props.intl.formatMessage(messages.deleteFieldset)}
            onCancel={this.onCancel}
            onConfirm={this.onDeleteFieldset}
          />
        )}
        {this.state.deleteField !== null && (
          <Confirm
            open
            content={this.props.intl.formatMessage(messages.deleteField)}
            onCancel={this.onCancel}
            onConfirm={this.onDeleteField}
          />
        )}
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      value: JSON.parse(props.value),
    }),
    {
      getFieldSchema,
    },
  ),
)(SchemaWidget);
