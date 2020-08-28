/**
 * Content type metadata.
 * @module components/manage/Controlpanels/ContentTypeMetadata
 */

import {
  getSchema,
  getVocabulary,
  updateContentTypeFieldTypes,
} from '@plone/volto/actions';
import { Form, Icon, Toast, Toolbar } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
import saveSVG from '@plone/volto/icons/save.svg';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Portal } from 'react-portal';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import { Button } from 'semantic-ui-react';

const messages = defineMessages({
  metadata: {
    id: 'metadata {type}',
    defaultMessage: 'metadata {type}',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
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
  typeCreated: {
    id: 'Metadata updates',
    defaultMessage: 'Metadata updates',
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
    getVocabulary: PropTypes.func.isRequired,
    updateContentTypeFieldTypes: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    schema: PropTypes.objectOf(PropTypes.any),
    vocabularyFields: PropTypes.objectOf(PropTypes.any),
    contenttype: PropTypes.shape({
      // eslint-disable-line react/no-unused-prop-types
      '@id': PropTypes.string,
      '@type': PropTypes.string,
    }),
    returnUrl: PropTypes.string,
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
      isClient: false,
    };

    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.form = React.createRef();
  }

  onSubmit(data) {
    this.props.updateContentTypeFieldTypes(this.props.type, data.schema);
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
    this.props.getVocabulary('Fields');
    this.setState({ isClient: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.contenttype.error) {
      toast.error(
        <Toast
          error
          title={this.props.intl.formatMessage(messages.error)}
          content={`${this.props.contenttype.error.status}:  ${this.props.contenttype.error.response?.body?.message}`}
        />,
      );
    }
    if (this.props.contenttype.loaded && prevProps.contenttype.loading) {
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.typeCreated)}
        />,
      );
    }
  }

  form = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.schema) {
      const contentTypeSchema = makeSchemaList(this.props.schema);
      const schemaData = makeSchemaData(this.props.schema, this.props.type);

      return (
        <>
          <Form
            isEditForm
            ref={this.form}
            schema={contentTypeSchema}
            vocabularyFields={this.props.vocabularyFields}
            formData={schemaData}
            pathname={this.props.pathname}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            hideActions
          />
          {this.state.isClient && (
            <Portal node={document.getElementById('toolbar')}>
              <Toolbar
                pathname={this.props.pathname}
                hideDefaultViewButtons
                inner={
                  <>
                    <Button
                      id="toolbar-save"
                      className="save"
                      aria-label={this.props.intl.formatMessage(messages.save)}
                      onClick={() => this.form.current.onSubmit()}
                      disabled={this.props.contenttype.loading}
                      loading={this.props.contenttype.loading}
                    >
                      <Icon
                        name={saveSVG}
                        className="circled"
                        size="30px"
                        title={this.props.intl.formatMessage(messages.save)}
                      />
                    </Button>
                    <Button
                      className="cancel"
                      aria-label={this.props.intl.formatMessage(
                        messages.cancel,
                      )}
                      onClick={() => this.onCancel()}
                    >
                      <Icon
                        name={clearSVG}
                        className="circled"
                        size="30px"
                        title={this.props.intl.formatMessage(messages.cancel)}
                      />
                    </Button>
                  </>
                }
              />
            </Portal>
          )}
        </>
      );
    }

    return <div />;
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      contenttype: state.contenttype,
      schema: state.schema.schema,
      vocabularyFields: state.vocabularies.Fields,
      pathname: props.location.pathname,
      returnUrl: qs.parse(props.location.search).return_url,
      type: props.match.params.id,
    }),
    {
      getSchema,
      updateContentTypeFieldTypes,
      getVocabulary,
    },
  ),
)(ContentTypeMetadata);
