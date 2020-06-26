/**
 * Content type metadata.
 * @module components/manage/Controlpanels/ContentTypeMetadata
 */

import { getSchema, updateContentTypeFieldTypes } from '@plone/volto/actions';
import { Form, Toast } from '@plone/volto/components';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { compose } from 'redux';

const messages = defineMessages({
  metadata: {
    id: 'metadata {type}',
    defaultMessage: 'metadata {type}',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
});

const makeSchemaList = (schema) => {
  const result = {
    title: 'Event',
    type: 'object',
    fieldsets: [
      {
        fields: ['schema'],
        id: 'default',
        title: 'Default',
      },
    ],
    properties: {
      schema: {
        description: 'Form schema',
        title: 'Form schema',
        type: 'schema',
        id: 'schema',
      },
    },
    required: [],
    layouts: null,
  };
  result.layouts = schema.layouts.slice();

  return result;
};
const isUserCreated = (field) =>
  !field.behavior ||
  field.behavior.indexOf('plone.dexterity.schema.generated') > -1;

const makeSchemaData = (schema, contentType) => {
  const fieldsets = schema.fieldsets.map((fieldset) => {
    const nonUserCreatedFields = fieldset.fields.filter(
      (fieldId) =>
        !isUserCreated(schema.properties[fieldId]) && fieldId !== 'changeNote',
    );
    const userCreatedFields = fieldset.fields.filter((fieldId) =>
      isUserCreated(schema.properties[fieldId]),
    );
    const changeNote = fieldset.fields.filter(
      (fieldId) => fieldId === 'changeNote',
    );
    return {
      ...fieldset,
      fields: [...nonUserCreatedFields, ...userCreatedFields, ...changeNote],
    };
  });
  const result = {
    ...schema,
    fieldsets,
    contentType,
  };
  // console.log('make schema ', schema);
  // console.log('make schema data fieldsets', fieldsets);
  // console.log('make schema data result', result);
  return { schema: JSON.stringify(result) };
};

/**
 * ContentTypeMetadata class.
 * @class ContentTypeMetadata
 * @extends Component
 */
class ContentTypeMetadata extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getSchema: PropTypes.func.isRequired,
    updateContentTypeFieldTypes: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    schema: PropTypes.objectOf(PropTypes.any),
    content: PropTypes.shape({
      // eslint-disable-line react/no-unused-prop-types
      '@id': PropTypes.string,
      '@type': PropTypes.string,
    }),
    returnUrl: PropTypes.string,
    createRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    schemaRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    type: PropTypes.string,
    location: PropTypes.objectOf(PropTypes.any),
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    schema: null,
    content: null,
    returnUrl: '/controlpanel/dexterity-types',
    type: 'Default',
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.state = {
      error: [],
      placeholderProps: {},
      formData: {},
      activeIndex: 0,
      schemaItems: {},
      loading: false,
      hideActions: false,
      visual: true,
    };

    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.form = React.createRef();
  }
  onSubmit(data) {
    console.log('onsubmit data', data);
    console.log('onsubmit data', JSON.parse(data.schema));
    this.props.updateContentTypeFieldTypes(this.props.type, data.schema);
  }
  onChange(data) {
    console.log('onChange data', data);
  }
  onCancel(event) {
    const location = {
      pathname: '/controlpanel/dexterity-types',
    };
    this.props.history.push(location);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getSchema(this.props.type);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.createRequest.error) {
      toast.error(
        <Toast
          error
          title={this.props.intl.formatMessage(messages.error)}
          content={`${this.props.createRequest.error.status}:  ${this.props.createRequest.error.response?.body?.message}`}
        />,
      );
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.schema) {
      const contentTypeSchema = makeSchemaList(this.props.schema);
      const schemaData = makeSchemaData(this.props.schema, this.props.type);
      console.log('render this.props.schema ', this.props.schema);
      console.log('render schemaData', schemaData);

      return (
        <Form
          isEditForm
          schema={contentTypeSchema}
          formData={schemaData}
          pathname={this.props.pathname}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          onChange={this.onChange}
        />
      );
    }

    return <div />;
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      createRequest: state.content.create,
      schemaRequest: state.schema,
      content: state.content.data,
      schema: state.schema.schema,
      pathname: props.location.pathname,
      returnUrl: qs.parse(props.location.search).return_url,
      type: props.match.params.id,
    }),
    {
      getSchema,
      updateContentTypeFieldTypes,
    },
  ),
)(ContentTypeMetadata);
