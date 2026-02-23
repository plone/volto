/**
 * FormFieldWrapper component.
 * @module components/manage/Widgets/FormFieldWrapper
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Icon as IconOld, Label } from 'semantic-ui-react';
import map from 'lodash/map';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import LanguageSVG from '@plone/volto/icons/language.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';

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
  language_independent_icon_title: {
    id: 'Language independent icon title',
    defaultMessage:
      'This is a language independent field. Any value you enter here will overwrite the corresponding field of all members of the translation group when you save this form.',
  },
});
/**
 * FormFieldWrapper component.
 * @function FormFieldWrapper
 * @param {Object} props - Component props
 * @returns {JSX.Element} Markup for the component.
 */
const FormFieldWrapper = ({
  id,
  title,
  description = null,
  fieldSet,
  required = false,
  error = [],
  wrapped = true,
  columns = 2,
  draggable = null,
  onEdit,
  className,
  isDisabled = null,
  onDelete = null,
  noForInFieldLabel,
  multilingual_options,
  children,
}) => {
  const intl = useIntl();
  const languageIndependent = multilingual_options?.language_independent;

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
        languageIndependent ? 'language-independent-field' : null,
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
                  {languageIndependent && (
                    <div className="languageIndependent-icon">
                      <Icon
                        title={intl.formatMessage(
                          messages.language_independent_icon_title,
                        )}
                        name={LanguageSVG}
                        size="24px"
                        color="#555"
                      />
                    </div>
                  )}
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

/**
 * Property types.
 * @property {Object} propTypes Property types.
 */
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
  fieldSet: PropTypes.string,
  noForInFieldLabel: PropTypes.bool,
  multilingual_options: PropTypes.object,
  children: PropTypes.node,
};

export default FormFieldWrapper;
