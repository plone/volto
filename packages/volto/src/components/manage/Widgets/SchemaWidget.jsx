/**
 * SchemaWidget component.
 * @module components/manage/Widgets/SchemaWidget
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import concat from 'lodash/concat';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import keys from 'lodash/keys';
import map from 'lodash/map';
import omit from 'lodash/omit';
import slice from 'lodash/slice';
import without from 'lodash/without';
import move from 'lodash-move';
import { Confirm, Form, Grid, Icon, Message, Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import config from '@plone/volto/registry';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { slugify } from '@plone/volto/helpers/Utils/Utils';
import { getVocabulary } from '@plone/volto/actions/vocabularies/vocabularies';

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
  defaultValue: {
    id: 'Default value',
    defaultMessage: 'Default value',
  },
  placeholder: {
    id: 'Placeholder',
    defaultMessage: 'Placeholder',
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
  queryParameterName: {
    id: 'Query Parameter Name',
    defaultMessage: 'Query Parameter Name',
  },
  queryParameterNameDescription: {
    id: 'Fills the value of the form field with the value supplied by a query parameter inside the URL with the given name.',
    defaultMessage:
      'Fills the value of the form field with the value supplied by a query parameter inside the URL with the given name.',
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
  size: {
    id: 'size',
    defaultMessage: 'Maximum size of the file in bytes',
  },
  accept: {
    id: 'accept',
    defaultMessage: 'File types allowed',
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

// Register field factory properties utilities

config.registerUtility({
  name: 'Rich Text',
  type: 'fieldFactoryProperties',
  method: (intl) => ({
    maxLength: {
      type: 'integer',
      title: intl.formatMessage(messages.maxLength),
    },
    default: {
      title: intl.formatMessage(messages.defaultValue),
      widget: 'richtext',
      type: 'string',
    },
  }),
});

map(
  ['URL', 'Password', 'label_password_field', 'Email', 'label_email'],
  (factory) => {
    config.registerUtility({
      name: factory,
      type: 'fieldFactoryProperties',
      method: (intl) => ({
        minLength: {
          type: 'integer',
          title: intl.formatMessage(messages.minLength),
        },
        maxLength: {
          type: 'integer',
          title: intl.formatMessage(messages.maxLength),
        },
        default: {
          type: 'string',
          title: intl.formatMessage(messages.defaultValue),
        },
      }),
    });
  },
);

map(['Integer', 'label_integer_field'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryProperties',
    method: (intl) => ({
      minimum: {
        type: 'integer',
        title: intl.formatMessage(messages.minimum),
      },
      maximum: {
        type: 'integer',
        title: intl.formatMessage(messages.maximum),
      },
      default: {
        type: 'integer',
        title: intl.formatMessage(messages.default),
      },
    }),
  });
});

map(
  [
    'Floating-point number',
    'label_float_field',
    'JSONField',
    'Relation Choice',
    'Relation List',
  ],
  (factory) => {
    config.registerUtility({
      name: factory,
      type: 'fieldFactoryProperties',
      method: (intl) => ({}),
    });
  },
);

map(['Yes/No', 'label_boolean_field'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryProperties',
    method: (intl) => ({
      default: {
        type: 'string',
        title: intl.formatMessage(messages.defaultValue),
      },
    }),
  });
});

map(['Date/Time', 'label_datetime_field'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryProperties',
    method: (intl) => ({
      default: {
        type: 'string',
        widget: 'datetime',
        title: intl.formatMessage(messages.defaultValue),
      },
    }),
  });
});

map(['Date', 'label_date_field'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryProperties',
    method: (intl) => ({
      default: {
        type: 'string',
        widget: 'date',
        title: intl.formatMessage(messages.defaultValue),
      },
    }),
  });
});

map(['time'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryProperties',
    method: (intl) => ({
      default: {
        type: 'string',
        widget: 'time',
        title: intl.formatMessage(messages.defaultValue),
      },
    }),
  });
});

map(['File', 'File Upload', 'Image'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryProperties',
    method: (intl) => ({
      size: {
        type: 'integer',
        title: intl.formatMessage(messages.size),
      },
      accept: {
        type: 'string',
        title: intl.formatMessage(messages.accept),
      },
    }),
  });
});

map(
  ['Multiple Choice', 'label_multi_choice_field', 'checkbox_group'],
  (factory) => {
    config.registerUtility({
      name: factory,
      type: 'fieldFactoryProperties',
      method: (intl) => ({
        values: {
          type: 'string',
          title: intl.formatMessage(messages.choices),
          widget: 'textarea',
        },
        default: {
          type: 'string',
          widget: 'textarea',
          title: intl.formatMessage(messages.defaultValue),
        },
      }),
    });
  },
);

map(['Choice', 'label_choice_field', 'radio_group'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryProperties',
    method: (intl) => ({
      values: {
        type: 'string',
        title: intl.formatMessage(messages.choices),
        widget: 'textarea',
      },
      default: {
        type: 'string',
        title: intl.formatMessage(messages.defaultValue),
      },
    }),
  });
});

config.registerUtility({
  name: 'static_text',
  type: 'fieldFactoryProperties',
  method: (intl) => ({
    default: {
      title: intl.formatMessage(messages.text),
      widget: 'richtext',
      type: 'string',
    },
  }),
});

config.registerUtility({
  name: 'number',
  type: 'fieldFactoryProperties',
  method: (intl) => ({
    default: {
      type: 'number',
      title: intl.formatMessage(messages.defaultValue),
    },
  }),
});

config.registerUtility({
  name: 'hidden',
  type: 'fieldFactoryProperties',
  method: (intl) => ({
    default: {
      type: 'string',
      title: intl.formatMessage(messages.defaultValue),
    },
  }),
});

config.registerUtility({
  name: 'textarea',
  type: 'fieldFactoryProperties',
  method: (intl) => ({
    minLength: {
      type: 'integer',
      title: intl.formatMessage(messages.minLength),
    },
    maxLength: {
      type: 'integer',
      title: intl.formatMessage(messages.maxLength),
    },
    default: {
      type: 'string',
      widget: 'textarea',
      title: intl.formatMessage(messages.defaultValue),
    },
    placeholder: {
      type: 'string',
      title: intl.formatMessage(messages.placeholder),
    },
  }),
});

// Register field factory initial data utilities

map(['Date/Time', 'label_datetime_field'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryInitialData',
    method: (intl) => ({
      type: 'string',
      widget: 'datetime',
      factory,
    }),
  });
});

map(['Date', 'label_date_field'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryInitialData',
    method: (intl) => ({
      type: 'string',
      widget: 'date',
      factory,
    }),
  });
});

config.registerUtility({
  name: 'time',
  type: 'fieldFactoryInitialData',
  method: (intl) => ({
    type: 'string',
    widget: 'time',
    factory: 'time',
  }),
});

map(['Email', 'label_email'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryInitialData',
    method: (intl) => ({
      type: 'string',
      widget: 'email',
      id: 'email',
      factory,
    }),
  });
});

map(['File', 'File Upload'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryInitialData',
    method: (intl) => ({
      type: 'object',
      factory,
    }),
  });
});

map(['Floating-point number', 'label_float_field'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryInitialData',
    method: (intl) => ({
      type: 'number',
      factory,
    }),
  });
});

map(['Integer', 'label_integer_field'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryInitialData',
    method: (intl) => ({
      type: 'integer',
      factory,
    }),
  });
});

config.registerUtility({
  name: 'Image',
  type: 'fieldFactoryInitialData',
  method: (intl) => ({
    type: 'object',
    factory: 'Image',
  }),
});

config.registerUtility({
  name: 'JSONField',
  type: 'fieldFactoryInitialData',
  method: (intl) => ({
    type: 'dict',
    widget: 'json',
    factory: 'JSONField',
  }),
});

map(['Multiple Choice', 'label_multi_choice_field'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryInitialData',
    method: (intl) => ({
      type: 'array',
      factory,
    }),
  });
});

config.registerUtility({
  name: 'Relation List',
  type: 'fieldFactoryInitialData',
  method: (intl) => ({
    type: 'array',
    factory: 'Relation List',
  }),
});

map(['Choice', 'label_choice_field'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryInitialData',
    method: (intl) => ({
      type: 'string',
      choices: [],
      factory,
    }),
  });
});

config.registerUtility({
  name: 'Relation Choice',
  type: 'fieldFactoryInitialData',
  method: (intl) => ({
    type: 'string',
    factory: 'Relation Choice',
  }),
});

map(['Password', 'label_password_field'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryInitialData',
    method: (intl) => ({
      type: 'string',
      widget: 'password',
      factory,
    }),
  });
});

config.registerUtility({
  name: 'Rich Text',
  type: 'fieldFactoryInitialData',
  method: (intl) => ({
    type: 'string',
    widget: 'richtext',
    factory: 'Rich Text',
  }),
});

config.registerUtility({
  name: 'URL',
  type: 'fieldFactoryInitialData',
  method: (intl) => ({
    type: 'string',
    widget: 'url',
    factory: 'URL',
  }),
});

map(['Yes/No', 'label_boolean_field'], (factory) => {
  config.registerUtility({
    name: factory,
    type: 'fieldFactoryInitialData',
    method: (intl) => ({
      type: 'boolean',
      factory,
    }),
  });
});

config.registerUtility({
  name: 'static_text',
  type: 'fieldFactoryInitialData',
  method: (intl) => ({
    type: 'object',
    widget: 'static_text',
    factory: 'static_text',
  }),
});

config.registerUtility({
  name: 'hidden',
  type: 'fieldFactoryInitialData',
  method: (intl) => ({
    type: 'string',
    widget: 'hidden',
    factory: 'hidden',
  }),
});

config.registerUtility({
  name: 'number',
  type: 'fieldFactoryInitialData',
  method: (intl) => ({
    type: 'number',
    factory: 'number',
  }),
});

config.registerUtility({
  name: 'radio_group',
  type: 'fieldFactoryInitialData',
  method: (intl) => ({
    type: 'string',
    choices: [],
    widget: 'radio_group',
    factory: 'radio_group',
  }),
});

config.registerUtility({
  name: 'checkbox_group',
  type: 'fieldFactoryInitialData',
  method: (intl) => ({
    type: 'array',
    widget: 'checkbox_group',
    factory: 'checkbox_group',
  }),
});

config.registerUtility({
  name: 'textarea',
  type: 'fieldFactoryInitialData',
  method: (intl) => ({
    type: 'string',
    widget: 'textarea',
    factory: 'textarea',
  }),
});

/**
 * schemaField used for modal form, when editing a field
 * - based on the factory a set of fields is presented
 * - fields can be moved to another fieldset
 * @param {string} factory - the kind of field
 * @param {Object} intl
 * @param {*} fieldsets
 * @param {Boolean} allowEditId
 * @param {Object} extraFields
 * @return {Object} - schema
 */
const schemaField = (
  factory,
  intl,
  fieldsets,
  allowEditId,
  extraFields = {},
) => {
  const utility = config.getUtility({
    name: factory,
    type: 'fieldFactoryProperties',
  });

  const properties = utility.method
    ? utility.method(intl)
    : {
        minLength: {
          type: 'integer',
          title: intl.formatMessage(messages.minLength),
        },
        maxLength: {
          type: 'integer',
          title: intl.formatMessage(messages.maxLength),
        },
        default: {
          type: 'string',
          title: intl.formatMessage(messages.defaultValue),
        },
        placeholder: {
          type: 'string',
          title: intl.formatMessage(messages.placeholder),
        },
      };

  return {
    fieldsets: [
      {
        id: 'default',
        title: 'default',
        fields: [
          ...keys(extraFields),
          ...(allowEditId ? ['id'] : []),
          ...['title', 'description', 'parentFieldSet', 'queryParameterName'],
          ...keys(properties),
          ...['required'],
        ],
      },
    ],
    properties: {
      ...extraFields,
      ...(allowEditId
        ? {
            id: {
              type: 'string',
              title: intl.formatMessage(messages.idTitle),
            },
          }
        : {}),
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
      queryParameterName: {
        type: 'string',
        title: intl.formatMessage(messages.queryParameterName),
        description: intl.formatMessage(messages.queryParameterNameDescription),
      },
      required: {
        type: 'boolean',
        title: intl.formatMessage(messages.required),
      },
      ...properties,
    },
    required: ['type', 'title'],
  };
};

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
     * Filter for factory choices
     */
    filterFactory: PropTypes.arrayOf(PropTypes.string),
    /**
     * Additional factories
     */
    additionalFactory: PropTypes.arrayOf(PropTypes.object),
    /**
     * Allow editing of the id
     */
    allowEditId: PropTypes.bool,
    /**
     * On change handler
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Get vocabulary action
     */
    getVocabulary: PropTypes.func.isRequired,
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
    filterFactory: null,
    additionalFactory: null,
    allowEditId: false,
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
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getVocabulary({
      vocabNameOrURL: 'Fields',
      size: -1,
      subrequest: 'schemawidget',
    });
  }

  /**
   * Add field handler
   * @method onAddField
   * @param {Object} values Form values
   * @returns {undefined}
   */
  onAddField(values) {
    const fieldId = slugify(
      values.id || values.title,
      keys(this.props.value.properties),
    );
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

    const utility = config.getUtility({
      name: values.factory,
      type: 'fieldFactoryInitialData',
    });

    const multiple =
      values.factory === 'Multiple Choice' ||
      values.factory === 'label_multi_choice_field';

    const initialData = utility.method
      ? omit(utility.method(this.props.intl), ['id'])
      : {
          type: 'string',
          factory: values.factory,
        };

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
          id: fieldId,
          ...omit(initialData, ['required']),
          ...omit(values, ['factory', 'required', 'id', 'parentFieldset']),
          ...formatTextareaToArray(values.values),
          ...formatTextareaToChoices(values.values, multiple),
        },
      },
      required: [
        ...this.props.value.required,
        ...(values.required || initialData.required ? [fieldId] : []),
      ],
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
        ...{ [prop]: values[prop] ? parseFloat(values[prop]) : undefined },
      };
    });

    const multiple =
      this.props.value.properties[this.state.editField.id]?.factory ===
        'Multiple Choice' ||
      this.props.value.properties[this.state.editField.id]?.factory ===
        'label_multi_choice_field';

    let fieldsets = this.props.value.fieldsets;

    if (this.state.editField.id !== formattedValues.id) {
      this.props.value.fieldsets[this.state.currentFieldset].fields = map(
        this.props.value.fieldsets[this.state.currentFieldset].fields,
        (field) =>
          field === this.state.editField.id ? formattedValues.id : field,
      );
      const index = isArray(this.props.value.required)
        ? this.props.value.required.indexOf(formattedValues.id)
        : -1;

      if (index > -1) {
        this.props.value.required[index] = formattedValues.id;
      }
    }

    if (formattedValues.parentFieldSet) {
      fieldsets = this.editFieldset(
        this.props.value.fieldsets,
        formattedValues.parentFieldSet,
        this.state.currentFieldset,
        this.state.editField.id,
        formattedValues.id,
      );
    }

    const result = {
      ...this.props.value,
      fieldsets,
      properties: {
        ...omit(this.props.value.properties, [this.state.editField.id]),
        [formattedValues.id]: {
          ...this.props.value.properties[this.state.editField.id],
          ...omit(formattedValues, ['parentFieldSet']),
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
      required: without(
        this.props.value.required || [],
        this.state.deleteField,
      ),
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
      addField: '',
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
    const { additionalFactory, error, reactBeautifulDnd, filterFactory } =
      this.props;
    const { Draggable, DragDropContext, Droppable } = reactBeautifulDnd;
    if (!this.props.value) {
      return '';
    }
    const choices = [
      ...this.props.fields,
      ...(this.props.additionalFactory || []),
    ];
    let editFieldType = '';
    if (this.state.editField) {
      let factory =
        this.props.value.properties[this.state.editField.id].factory;

      if (factory.value) {
        factory = factory.value;
      }
      const fieldType = find(choices, {
        value: factory !== '' ? factory : 'label_text_field',
      });
      editFieldType = fieldType
        ? this.props.intl.formatMessage({
            id: fieldType.value,
            defaultMessage: fieldType.label,
          })
        : '';
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
              widgets={this.props.widgets}
              component={this.props.component}
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
                  required={
                    this.props.value.required &&
                    this.props.value.required.indexOf(field) !== -1
                  }
                  widgets={this.props.widgets}
                  component={this.props.component}
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

    const utility = config.getUtility({
      name: this.state.addField,
      type: 'fieldFactoryInitialData',
    });

    const id = utility?.method ? utility.method(this.props.intl).id : undefined;

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
            <Form.Field inline className="addfield">
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
            className={`field-${slugify(isString(this.state.addField) && this.state.addField !== '' ? this.state.addField : 'label_text_field')}`}
            onChangeFormData={(data) => {
              this.setState({
                addField: data.factory,
              });
            }}
            title={this.props.intl.formatMessage(messages.addField)}
            formData={{
              factory:
                find(choices, { value: 'label_text_field' }) || undefined,
              id,
            }}
            schema={schemaField(
              this.state.addField,
              this.props.intl,
              this.props.value.fieldsets.filter(
                (fieldset) =>
                  !fieldset.behavior ||
                  fieldset.id === 'default' ||
                  fieldset.behavior.includes('generated'),
              ),
              this.props.allowEditId,
              {
                factory: {
                  type: 'string',
                  factory: 'Choice',
                  title: this.props.intl.formatMessage(messages.type),
                  vocabulary: {
                    '@id': `Fields`,
                  },
                  filterChoices: filterFactory,
                  additionalChoices: additionalFactory,
                  sort: true,
                },
              },
            )}
          />
        )}
        {this.state.editField !== null && (
          <ModalForm
            onSubmit={this.onEditField}
            onCancel={this.onCancel}
            title={`${this.props.intl.formatMessage(messages.editField)}: ${editFieldType}`}
            className={`factory-${slugify(editFieldType)}`}
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
              this.props.allowEditId,
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
  injectLazyLibs(['reactBeautifulDnd']),
  connect(
    (state, props) => ({
      value: isString(props.value) ? JSON.parse(props.value) : props.value,
      fields:
        state.vocabularies?.Fields?.subrequests?.schemawidget?.items || [],
    }),
    { getVocabulary },
  ),
)(SchemaWidget);
