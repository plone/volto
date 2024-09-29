/**
 * SchemaWidget component.
 * @module components/manage/Widgets/SchemaWidget
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {
  concat,
  findIndex,
  isString,
  map,
  omit,
  slice,
  without,
} from 'lodash-es';
import move from 'lodash-move';
import { Confirm, Form, Grid, Icon, Message, Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';

import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';
import { slugify } from '@plone/volto/helpers/Utils/Utils';
import SchemaWidgetFieldset from '@plone/volto/components/manage/Widgets/SchemaWidgetFieldset';
import { Field, ModalForm } from '@plone/volto/components/manage/Form';

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
  parentFieldSet: {
    id: 'Parent fieldset',
    defaultMessage: 'Parent fieldset',
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
  choices: {
    id: 'Possible values',
    defaultMessage: 'Possible values (Enter allowed choices one per line).',
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

/**
 * Makes a list of fieldset types formatted for select widget
 * @param {Object[]} listOfTypes array of strings
 * @param {*} intl
 * @returns {Object[]} example [['default', 'default']]
 */
const makeFieldsetList = (listOfFieldsets, intl) => {
  const result = listOfFieldsets.map((type) => [type.id, type.title]);
  return result;
};

/**
 * schemaField used for modal form, when editing a field
 * - based on the factory a set of fields is presented
 * - fields can be moved to another fieldset
 * @param {string} factory - the kind of field
 * @param {Object} intl
 * @param {*} fieldsets
 * @return {Object} - schema
 */
const schemaField = (factory, intl, fieldsets) => ({
  fieldsets: [
    {
      id: 'default',
      title: 'default',
      fields: [
        ...['title', 'description', 'parentFieldSet'],
        ...((factory) => {
          switch (factory) {
            case 'Rich Text':
              return ['maxLength'];
            case 'URL':
            case 'Password':
            case 'label_password_field':
            case 'Email':
            case 'label_email':
              return ['minLength', 'maxLength'];
            case 'Integer':
            case 'label_integer_field':
              return ['minimum', 'maximum'];
            case 'Floating-point number':
            case 'label_float_field':
            case 'Date/Time':
            case 'label_datetime_field':
            case 'Date':
            case 'label_date_field':
            case 'File':
            case 'File Upload':
            case 'Image':
            case 'Yes/No':
            case 'label_boolean_field':
            case 'JSONField':
            case 'Relation Choice':
            case 'Relation List':
              return [];
            case 'Multiple Choice':
            case 'label_multi_choice_field':
            case 'Choice':
            case 'label_choice_field':
              return ['values'];
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
      title: intl.formatMessage(messages.description),
    },
    parentFieldSet: {
      type: 'string',
      title: intl.formatMessage(messages.parentFieldSet),
      choices: makeFieldsetList(fieldsets),
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
        case 'label_password_field':
        case 'Email':
        case 'label_email':
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
        case 'Integer':
        case 'label_integer_field':
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
        case 'Floating-point number':
        case 'label_float_field':
        case 'Date/Time':
        case 'label_datetime_field':
        case 'Date':
        case 'label_date_field':
        case 'File':
        case 'File Upload':
        case 'Image':
        case 'Yes/No':
        case 'label_boolean_field':
        case 'JSONField':
        case 'Relation Choice':
        case 'Relation List':
          return {};
        case 'Multiple Choice':
        case 'label_multi_choice_field':
        case 'Choice':
        case 'label_choice_field':
          return {
            values: {
              type: 'string',
              title: intl.formatMessage(messages.choices),
              widget: 'textarea',
            },
          };
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

/**
 * schema for adding a new field
 * @param {Object} intl
 */
const fieldsetSchema = (intl) => ({
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.default),
      fields: ['title', 'id'],
    },
  ],
  properties: {
    id: {
      type: 'string',
      title: intl.formatMessage(messages.idTitle),
      description: intl.formatMessage(messages.idDescription),
    },
    title: {
      type: 'string',
      title: intl.formatMessage(messages.title),
    },
  },
  required: ['id', 'title'],
});

/**
 * 'plone.dexterity.schema.generated' is considered user created
 * @param {Object} field
 */
const isEditable = (field) =>
  !field.behavior || field.behavior.includes('generated');

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'white' : 'transparent',

  // styles we need to apply on draggable
  ...draggableStyle,
});

const getTabStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#f4f4f4' : 'transparent',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

const getFieldStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#f4f4f4' : 'transparent',
});

/**
 * will transform a string with new lines in an array for each item on a line
 * @param {string} textarea - has '\r\n' characters
 */
const formatTextareaToArray = (textarea) => {
  const values =
    textarea && textarea
      ? textarea
          .split(/(\r\n|\n|\r)/gm)
          .map((elem) => elem.trim())
          .filter((elem) => elem !== '')
      : null;

  return values ? { values } : {};
};

const formatArrayToTextarea = (props) => {
  if (props?.values) {
    return props.values.join('\n');
  }
  if (props?.choices) {
    return props.choices.map((elem) => elem[0]).join('\n');
  }
  if (props?.items?.choices) {
    return props.items.choices.map((elem) => elem[0]).join('\n');
  }
  return '';
};

const formatTextareaToChoices = (textarea, multiple) => {
  const choices =
    textarea && textarea
      ? textarea
          .split(/(\r\n|\n|\r)/gm)
          .map((elem) => elem.trim())
          .filter((elem) => elem !== '')
          .map((elem) => [elem, elem])
      : null;

  if (!multiple) {
    return choices ? { choices } : {};
  }

  const items = choices ? { choices: choices } : {};
  return items ? { items } : {};
};

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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
    };
  }

  /**
   * Add field handler
   * @method onAddField
   * @param {Object} values Form values
   * @returns {undefined}
   */
  onAddField(values) {
    const fieldId = slugify(values.title);
    const currentFieldsetFields =
      this.props.value.fieldsets[this.state.currentFieldset].fields;
    const hasChangeNote = currentFieldsetFields.indexOf('changeNote') > -1;
    const newFieldsetFields = hasChangeNote
      ? [
          ...currentFieldsetFields.slice(0, currentFieldsetFields.length - 1),
          fieldId,
          currentFieldsetFields[currentFieldsetFields.length - 1],
        ]
      : [...currentFieldsetFields, fieldId];

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
        [fieldId]: {
          title: values.title,
          description: values.description,
          id: fieldId,
          ...((factory) => {
            switch (factory) {
              case 'Date/Time':
              case 'label_datetime_field':
                return {
                  type: 'string',
                  widget: 'datetime',
                  factory,
                };
              case 'Date':
              case 'label_date_field':
                return {
                  type: 'string',
                  widget: 'date',
                  factory,
                };
              case 'Email':
              case 'label_email':
                return {
                  type: 'string',
                  widget: 'email',
                  factory,
                };
              case 'File':
              case 'File Upload':
                return {
                  type: 'object',
                  factory,
                };
              case 'Floating-point number':
              case 'label_float_field':
                return {
                  type: 'number',
                  factory,
                };
              case 'Integer':
              case 'label_integer_field':
                return {
                  type: 'integer',
                  factory,
                };
              case 'Image':
                return {
                  type: 'object',
                  factory,
                };
              case 'JSONField':
                return {
                  type: 'dict',
                  widget: 'json',
                  factory,
                };
              case 'Multiple Choice':
              case 'label_multi_choice_field':
                return {
                  type: 'array',
                  factory,
                };
              case 'Relation List':
                return {
                  type: 'array',
                  factory,
                };
              case 'Choice':
              case 'label_choice_field':
                return {
                  type: 'string',
                  choices: [],
                  factory,
                };
              case 'Relation Choice':
                return {
                  type: 'string',
                  factory,
                };
              case 'Password':
              case 'label_password_field':
                return {
                  type: 'string',
                  widget: 'password',
                  factory,
                };
              case 'Rich Text':
                return {
                  type: 'string',
                  widget: 'richtext',
                  factory,
                };
              case 'URL':
                return {
                  type: 'string',
                  widget: 'url',
                  factory,
                };
              case 'Yes/No':
              case 'label_boolean_field':
                return {
                  type: 'boolean',
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
        ? [...this.props.value.required, fieldId]
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
    values.fields =
      values.fields ||
      this.props.value.fieldsets[this.state.editFieldset]?.fields ||
      [];
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
   * Recreates the fieldset structure
   * will move change name of the field if needed and
   * change fieldset if changed
   * @param {Object[]} fieldsets
   * @param {string} parentFieldSet - id
   * @param {number} currentFieldset - index
   * @param {Object} oldfieldId
   * @param {Object} newfieldId
   * @returns {Object[]} fieldsets
   */
  editFieldset(
    fieldsets,
    parentFieldSet,
    currentFieldset,
    oldfieldId,
    newfieldId,
  ) {
    const moveToFieldsetWithNewName = () => {
      const newParentFieldsetIndex = fieldsets.findIndex(
        (field) => field.id === parentFieldSet,
      );
      const indexOfChangeNote =
        fieldsets[newParentFieldsetIndex].fields.indexOf('changeNote');
      // remove from current fieldset
      const fieldsetsWithoutField = [
        ...slice(fieldsets, 0, currentFieldset),
        {
          ...fieldsets[currentFieldset],
          fields: fieldsets[currentFieldset].fields.filter(
            (fieldId) => fieldId !== oldfieldId,
          ),
        },
        ...slice(fieldsets, currentFieldset + 1),
      ];

      const fieldsOfNewFieldset =
        indexOfChangeNote > -1
          ? [
              ...fieldsetsWithoutField[newParentFieldsetIndex].fields.slice(
                0,
                indexOfChangeNote + 1,
              ),
              oldfieldId,
              fieldsetsWithoutField[newParentFieldsetIndex].fields[
                indexOfChangeNote
              ],
            ]
          : [
              ...fieldsetsWithoutField[newParentFieldsetIndex].fields,
              oldfieldId,
            ];

      // add to new fieldset
      const fieldsetsWithField = [
        ...slice(fieldsetsWithoutField, 0, newParentFieldsetIndex),
        {
          ...fieldsetsWithoutField[newParentFieldsetIndex],
          fields: fieldsOfNewFieldset,
        },
        ...slice(fieldsetsWithoutField, newParentFieldsetIndex + 1),
      ];
      return fieldsetsWithField;
    };

    const changeNameInFieldset = () => {
      return [
        ...slice(fieldsets, 0, currentFieldset),
        {
          ...fieldsets[currentFieldset],
          fields: map(fieldsets[currentFieldset].fields, (field) =>
            field === oldfieldId ? newfieldId : field,
          ),
        },
        ...slice(fieldsets, currentFieldset + 1),
      ];
    };

    const result =
      parentFieldSet !== fieldsets[currentFieldset].id
        ? moveToFieldsetWithNewName()
        : changeNameInFieldset();
    return result;
  }

  /**
   * Edit field handler
   * recreates the schema based on field changes (properties, name, fieldset)
   * @method onEditField
   * @param {Object} values Field values
   * @returns {undefined}
   */
  onEditField(values) {
    let formattedValues = { ...values };

    const listOfProp = ['minLength', 'maxLength', 'minimum', 'maximum'];
    listOfProp.forEach((prop) => {
      formattedValues = {
        ...formattedValues,
        ...{ [prop]: values[prop] ? parseFloat(values[prop]) : null },
      };
    });

    const multiple =
      this.props.value.properties[this.state.editField.id]?.factory ===
        'Multiple Choice' ||
      this.props.value.properties[this.state.editField.id]?.factory ===
        'label_multi_choice_field';
    const result = {
      ...this.props.value,
      fieldsets: formattedValues.parentFieldSet
        ? this.editFieldset(
            this.props.value.fieldsets,
            formattedValues.parentFieldSet,
            this.state.currentFieldset,
            this.state.editField.id,
            formattedValues.id,
          )
        : this.props.value.fieldsets,
      properties: {
        ...omit(this.props.value.properties, [this.state.editField.id]),
        [formattedValues.id]: {
          ...this.props.value.properties[this.state.editField.id],
          ...omit(formattedValues, ['id', 'parentFieldSet']),
          ...formatTextareaToArray(formattedValues.values),
          ...formatTextareaToChoices(formattedValues.values, multiple),
        },
      },
      required: formattedValues.required
        ? concat(without(this.props.value.required, this.state.editField.id), [
            formattedValues.id,
          ])
        : without(this.props.value.required, this.state.editField.id),
    };

    this.onChange(result);

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
    this.props.onChange(this.props.id, value);
  }

  /**
   * Change default value handler
   * @method onChangeDefaultValue
   * @param {string} fieldId
   * @param {string} fieldValue
   */
  onChangeDefaultValue(fieldId, fieldValue) {
    // Default values can have irreversible consequence, thus skip it for now.
    // const value = { default: fieldValue }
    const value = {};

    const fieldMerge = {
      ...this.props.value.properties[fieldId],
      ...value,
    };
    const propsMerge = {
      ...this.props.value.properties,
      ...{ [fieldId]: fieldMerge },
    };

    this.onChange({
      ...this.props.value,
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
    return this.setState({
      editField: {
        id,
      },
    });
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
    const schema = {
      ...this.props.value,
      fieldsets: move(this.props.value.fieldsets, index, delta),
    };
    this.setState({
      currentFieldset: findIndex(schema.fieldsets, {
        id: schema.fieldsets[this.state.currentFieldset].id,
      }),
    });
    this.onChange(schema);
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
    const { error } = this.props;

    if (!this.props.value) {
      return '';
    }
    const nonUserCreatedFields = this.props.value.fieldsets[
      this.state.currentFieldset
    ].fields.filter(
      (fieldId) =>
        !isEditable(this.props.value.properties[fieldId]) &&
        fieldId !== 'changeNote',
    );
    const hasChangeNote =
      this.props.value.fieldsets[this.state.currentFieldset].fields.indexOf(
        'changeNote',
      ) > -1;
    const userCreatedFieldsStartingIndex = nonUserCreatedFields.length;
    const lastUserCreatedFieldsIndex = hasChangeNote
      ? this.props.value.fieldsets[this.state.currentFieldset].fields.length - 1
      : this.props.value.fieldsets[this.state.currentFieldset].fields.length;
    // fields that were not created by the user, but are part of a behavior
    const makeNonUserFields = () =>
      map(
        this.props.value.fieldsets[this.state.currentFieldset].fields.slice(
          0,
          userCreatedFieldsStartingIndex,
        ),
        (field, index) => (
          <div
            style={{ background: '#c7d5d859' }}
            key={`${field}-${this.state.currentFieldset}-${index}`}
          >
            <Field
              {...this.props.value.properties[field]}
              id={field}
              required={this.props.value.required.indexOf(field) !== -1}
              onEdit={this.onShowEditField}
              draggable={false}
              isDisabled={true}
              order={index}
              onDelete={this.onShowDeleteField}
              onChange={this.onChangeDefaultValue}
              value={this.props.value.properties[field].default}
            />
          </div>
        ),
      );
    // fields created by the user
    const makeUserFields = () =>
      map(
        this.props.value.fieldsets[this.state.currentFieldset].fields.slice(
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
                  {...this.props.value.properties[field]}
                  id={field}
                  required={this.props.value.required.indexOf(field) !== -1}
                  onEdit={this.onShowEditField}
                  draggable={true}
                  isDisabled={false}
                  order={index}
                  onDelete={this.onShowDeleteField}
                  onChange={this.onChangeDefaultValue}
                  key={`${field}-${this.state.currentFieldset}-${index}`}
                  value={this.props.value.properties[field].default}
                />
              </div>
            )}
          </Draggable>
        ),
      );

    const canAddFields =
      this.state.currentFieldset === 0 ||
      !this.props.value.fieldsets[this.state.currentFieldset].behavior ||
      this.props.value.fieldsets[this.state.currentFieldset].behavior.includes(
        'generated',
      );

    return (
      <div>
        <Segment.Group
          style={{
            margin: '-1rem',
          }}
        >
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
                  style={getTabStyle(snapshot.isDraggingOver)}
                >
                  {map(this.props.value.fieldsets, (fieldset, index) => (
                    <SchemaWidgetFieldset
                      key={`${fieldset.id}-${this.state.currentFieldset}-${index}`}
                      title={fieldset.title}
                      order={index}
                      active={index === this.state.currentFieldset}
                      onClick={this.onSetCurrentFieldset}
                      onShowEditFieldset={this.onShowEditFieldset}
                      onShowDeleteFieldset={this.onShowDeleteFieldset}
                      onOrderFieldset={this.onOrderFieldset}
                      getItemStyle={getItemStyle}
                      isDraggable={true}
                      isDisabled={
                        fieldset.behavior
                          ? !fieldset.behavior.includes('generated')
                          : false
                      }
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

            {makeNonUserFields()}

            <Droppable
              droppableId="fields-schema-edit"
              direction="vertical"
              type="fixed"
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  style={getFieldStyle(snapshot.isDraggingOver)}
                >
                  {makeUserFields()}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {hasChangeNote ? (
            <div style={{ background: '#c7d5d859' }}>
              <Field
                {...this.props.value.properties.changeNote}
                id={'changeNote'}
                required={
                  this.props.value.required.indexOf('changeNote') !== -1
                }
                onEdit={this.onShowEditField}
                draggable={false}
                isDisabled={true}
                order={
                  this.props.value.fieldsets[this.state.currentFieldset]
                    .length - 1
                }
                onDelete={this.onShowDeleteField}
                onChange={this.onChangeDefaultValue}
                key={'changeNote'}
                value={this.props.value.properties.changeNote.default}
              />
            </div>
          ) : null}

          {canAddFields && (
            <Form.Field inline>
              <Grid>
                <Grid.Row stretched>
                  <Grid.Column width="12">
                    <div className="wrapper">
                      <label htmlFor="addfield">
                        {this.props.intl.formatMessage(messages.addField)}
                      </label>
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
          )}
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
                  fields: ['factory', 'title', 'description', 'required'],
                },
              ],
              properties: {
                factory: {
                  type: 'string',
                  factory: 'Choice',
                  title: this.props.intl.formatMessage(messages.type),
                  vocabulary: {
                    '@id': `Fields`,
                  },
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
              parentFieldSet:
                this.props.value.fieldsets[this.state.currentFieldset].id,
              values: formatArrayToTextarea(
                this.props.value.properties[this.state.editField.id],
              ),
            }}
            schema={schemaField(
              this.props.value.properties[this.state.editField.id].factory,
              this.props.intl,
              this.props.value.fieldsets.filter(
                (fieldset) =>
                  !fieldset.behavior ||
                  fieldset.id === 'default' ||
                  fieldset.behavior.includes('generated'),
              ),
            )}
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
            schema={fieldsetSchema(this.props.intl)}
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
            schema={fieldsetSchema(this.props.intl)}
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
      value: isString(props.value) ? JSON.parse(props.value) : props.value,
    }),
    {},
  ),
)(SchemaWidget);
