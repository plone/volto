/**
 * FormFieldWrapper component.
 * @module components/manage/Widgets/FormFieldWrapper
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Icon as IconOld, Label } from 'semantic-ui-react';
import { map } from 'lodash';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  edit: {
    id: 'Edit',
    defaultMessage: 'Edit',
  },
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
  language_independent: {
    id: 'Language independent field.',
    defaultMessage: 'Language independent field.',
  },
});

/**
 * FormFieldWrapper functional component.
 * @param {Object} props Component properties.
 * @returns {React.Element} Rendered component.
 */
const FormFieldWrapper = (props) => {
  const {
    id,
    title,
    description,
    fieldSet,
    required,
    error,
    wrapped,
    columns,
    draggable,
    onEdit,
    className,
    isDisabled,
    onDelete,
    noForInFieldLabel,
    multilingual_options,
    children,
  } = props;

  const intl = useIntl();

  const wdg = (
    <>
      {children}

      {map(error, (message) => (
        <Label key={message} basic color="red" className="form-error-label">
          {message}
        </Label>
      ))}
    </>
  );

  return wrapped ? (
    <Form.Field
      inline
      required={required}
      error={error && error.length > 0}
      className={cx(
        description ? 'help' : '',
        className,
        `field-wrapper-${id}`,
        multilingual_options?.language_independent
          ? 'language-independent-field'
          : null,
      )}
    >
      <Grid>
        <Grid.Row stretched>
          {columns === 2 && (
            <Grid.Column width="4">
              <div className="wrapper">
                <label
                  id={`fieldset-${fieldSet}-field-label-${id}`}
                  htmlFor={noForInFieldLabel ? null : `field-${id}`}
                >
                  {draggable && onEdit && (
                    <i
                      aria-hidden="true"
                      className="grey bars icon drag handle"
                    />
                  )}
                  {title}
                </label>
              </div>
            </Grid.Column>
          )}
          <Grid.Column width={columns === 2 ? 8 : 12}>
            {onEdit && !isDisabled && (
              <div className="toolbar" style={{ zIndex: '2' }}>
                <button
                  aria-label={intl.formatMessage(messages.edit)}
                  className="item ui noborder button"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onEdit(id);
                  }}
                >
                  <IconOld name="write square" size="large" color="blue" />
                </button>
                <button
                  aria-label={intl.formatMessage(messages.delete)}
                  className="item ui noborder button"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onDelete(id);
                  }}
                >
                  <IconOld name="close" size="large" color="red" />
                </button>
              </div>
            )}
            {wdg}
          </Grid.Column>
        </Grid.Row>
        {description && (
          <Grid.Row stretched>
            <Grid.Column stretched width="12">
              <p className="help">
                {multilingual_options
                  ? `${intl.formatMessage(messages.language_independent)} `
                  : null}
                {description}
              </p>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Form.Field>
  ) : (
    <>{wdg}</>
  );
};

FormFieldWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  wrapped: PropTypes.bool,
  columns: PropTypes.number,
  draggable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onEdit: PropTypes.func,
  className: PropTypes.string,
  onDelete: PropTypes.func,
  noForInFieldLabel: PropTypes.bool,
  multilingual_options: PropTypes.object,
  children: PropTypes.node,
};

FormFieldWrapper.defaultProps = {
  description: null,
  required: false,
  error: [],
  wrapped: true,
  columns: 2,
  onDelete: null,
  isDisabled: null,
  draggable: null,
  noForInFieldLabel: false,
  multilingual_options: null,
  children: null,
};

export default FormFieldWrapper;
