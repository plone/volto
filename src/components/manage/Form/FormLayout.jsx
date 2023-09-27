import React from 'react';
import { keys } from 'lodash';
import { Segment, Message, Button, Icon, Container } from 'semantic-ui-react';
import { messages } from '@plone/volto/helpers';
import FormFields from './FormFields';
import FormActions from './FormActions';
import FormTabs from './FormTabs';

function FormLayout({ schema, formData, onChangeField, onBlurField, onClickInput, errors, activeIndex, onTabChange, title, description, onSubmit, onCancel, loading, submitLabel, intl, hideActions }) {
  return (
    <Container>
      <fieldset className="invisible">
        <Segment.Group raised>
          {schema && schema.fieldsets.length > 1 && (
            <>
              {settings.verticalFormTabs && title && (
                <Segment secondary attached key={title}>
                  {title}
                </Segment>
              )}
              <FormTabs
                schema={schema}
                activeIndex={activeIndex}
                onTabChange={onTabChange}
                title={title}
                description={description}
                formData={formData}
                onChangeField={onChangeField}
                onBlurField={onBlurField}
                onClickInput={onClickInput}
                errors={errors}
              />
            </>
          )}
          {schema && schema.fieldsets.length === 1 && (
            <Segment>
              {title && (
                <Segment className="primary">
                  <h1 style={{ fontSize: '16px' }}> {title}</h1>
                </Segment>
              )}
              {description && <Segment secondary>{description}</Segment>}
              {keys(errors).length > 0 && (
                <Message
                  icon="warning"
                  negative
                  attached
                  header={intl.formatMessage(messages.error)}
                  content={intl.formatMessage(messages.thereWereSomeErrors)}
                />
              )}
              {error && (
                <Message
                  icon="warning"
                  negative
                  attached
                  header={intl.formatMessage(messages.error)}
                  content={error.message}
                />
              )}
              <FormFields
                schema={schema}
                formData={formData}
                onChangeField={onChangeField}
                onBlurField={onBlurField}
                onClickInput={onClickInput}
                errors={errors}
              />
            </Segment>
          )}
          <FormActions
            onSubmit={onSubmit}
            onCancel={onCancel}
            loading={loading}
            submitLabel={submitLabel}
            intl={intl}
            hideActions={hideActions}
          />
        </Segment.Group>
      </fieldset>
    </Container>
  );
}

export default FormLayout;
