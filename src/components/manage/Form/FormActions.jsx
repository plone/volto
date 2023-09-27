import React from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { messages } from '@plone/volto/helpers';

function FormActions({ onSubmit, onCancel, loading, submitLabel, intl, hideActions }) {
  return (
    !hideActions && (
      <Segment className="actions" clearing>
        {onSubmit && (
          <Button
            basic
            primary
            floated="right"
            type="submit"
            aria-label={submitLabel || intl.formatMessage(messages.save)}
            title={submitLabel || intl.formatMessage(messages.save)}
            loading={loading}
          >
            <Icon className="circled" name={aheadSVG} size="30px" />
          </Button>
        )}
        {onCancel && (
          <Button
            basic
            secondary
            aria-label={intl.formatMessage(messages.cancel)}
            title={intl.formatMessage(messages.cancel)}
            floated="right"
            onClick={onCancel}
          >
            <Icon className="circled" name={clearSVG} size="30px" />
          </Button>
        )}
      </Segment>
    )
  );
}

export default FormActions;
