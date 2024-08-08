import React, { useEffect, useRef, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import { createPortal } from 'react-dom';
import { nth } from 'lodash';
import PropTypes from 'prop-types';
import { Button, Header } from 'semantic-ui-react';

import { getSchema, putSchema } from '@plone/volto/actions';
import { getParentUrl } from '@plone/volto/helpers';
import { Error, Icon, Toast, Toolbar } from '@plone/volto/components';
import { Form } from '@plone/volto/components/manage/Form';
import clearSVG from '@plone/volto/icons/clear.svg';
import saveSVG from '@plone/volto/icons/save.svg';

const messages = defineMessages({
  title: {
    id: '{id} Schema',
    defaultMessage: '{id} Schema',
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
    id: 'Schema updates',
    defaultMessage: 'Schema updates',
  },
  info: {
    id: 'Info',
    defaultMessage: 'Info',
  },
  changesSaved: {
    id: 'Changes saved.',
    defaultMessage: 'Changes saved.',
  },
});

const ContentTypeSchema = (props) => {
  const { getSchema, putSchema, pathname, id, schema, schemaRequest, history } =
    props;

  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const formRef = useRef();
  const intl = useIntl();

  useEffect(() => {
    getSchema(id);
    setIsClient(true);
  }, [getSchema, id]);

  useEffect(() => {
    if (schemaRequest.loading && schemaRequest.error) {
      setError(schemaRequest.error);
    }

    if (schemaRequest.put.loading && schemaRequest.put.loaded) {
      toast.info(
        <Toast
          info
          title={intl.formatMessage(messages.info)}
          content={intl.formatMessage(messages.changesSaved)}
        />,
      );
    }

    if (schemaRequest.put.loading && schemaRequest.put.error) {
      toast.error(
        <Toast
          error
          title={intl.formatMessage(messages.error)}
          content={JSON.stringify(
            schemaRequest.put.error.response.body ||
              schemaRequest.put.error.response.text,
          )}
        />,
      );
    }
  }, [schemaRequest, intl]);

  const onSubmit = (data) => {
    putSchema(id, data.schema);
  };

  const onCancel = () => {
    let url = getParentUrl(pathname);
    history.push(getParentUrl(url));
  };

  const makeSchemaList = (schema) => {
    const result = {
      title: 'Schema',
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
          widget: 'schema',
        },
      },
      required: [],
      layouts: null,
    };
    result.layouts = schema.layouts.slice();

    return result;
  };

  const isEditable = (field) =>
    !field.behavior || field.behavior.includes('generated');

  const makeSchemaData = (schema, contentType) => {
    const fieldsets = schema.fieldsets.map((fieldset) => {
      const readOnlyFields = fieldset.fields.filter(
        (fieldId) =>
          !isEditable(schema.properties[fieldId]) && fieldId !== 'changeNote',
      );
      const userCreatedFields = fieldset.fields.filter((fieldId) =>
        isEditable(schema.properties[fieldId]),
      );
      const changeNote = fieldset.fields.filter(
        (fieldId) => fieldId === 'changeNote',
      );
      return {
        ...fieldset,
        fields: [...readOnlyFields, ...userCreatedFields, ...changeNote],
      };
    });
    const result = {
      ...schema,
      fieldsets,
      contentType,
    };

    return { schema: JSON.stringify(result) };
  };

  if (error) {
    return <Error error={error} />;
  }

  if (schema) {
    const contentTypeSchema = makeSchemaList(schema);
    const schemaData = makeSchemaData(schema, id);

    return (
      <div id="page-controlpanel-schema" className="ui container">
        <Header disabled>
          {intl.formatMessage(messages.title, {
            id: schema?.title || id,
          })}
        </Header>
        <Form
          ref={formRef}
          schema={contentTypeSchema}
          formData={schemaData}
          pathname={pathname}
          onSubmit={onSubmit}
          onCancel={onCancel}
          hideActions
        />
        {isClient &&
          createPortal(
            <Toolbar
              pathname={pathname}
              hideDefaultViewButtons
              inner={
                <>
                  <Button
                    id="toolbar-save"
                    className="save"
                    aria-label={intl.formatMessage(messages.save)}
                    onClick={() => formRef.current.onSubmit()}
                    disabled={schemaRequest.put.loading}
                    loading={schemaRequest.put.loading}
                  >
                    <Icon
                      name={saveSVG}
                      className="circled"
                      size="30px"
                      title={intl.formatMessage(messages.save)}
                    />
                  </Button>
                  <Button
                    className="cancel"
                    aria-label={intl.formatMessage(messages.cancel)}
                    onClick={onCancel}
                  >
                    <Icon
                      name={clearSVG}
                      className="circled"
                      size="30px"
                      title={intl.formatMessage(messages.cancel)}
                    />
                  </Button>
                </>
              }
            />,
            document.getElementById('toolbar'),
          )}
      </div>
    );
  }

  return <div />;
};

ContentTypeSchema.propTypes = {
  getSchema: PropTypes.func.isRequired,
  putSchema: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default compose(
  connect(
    (state, props) => ({
      schema: state.schema.schema,
      schemaRequest: state.schema,
      pathname: props.location.pathname,
      id: nth(props.location.pathname.split('/'), -2),
    }),
    {
      getSchema,
      putSchema,
    },
  ),
)(ContentTypeSchema);
