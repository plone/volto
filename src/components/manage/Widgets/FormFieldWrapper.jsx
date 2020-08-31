/**
 * FormFieldWrapper component.
 * @module components/manage/Widgets/FormFieldWrapper
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Icon as IconOld, Label } from 'semantic-ui-react';
import { map } from 'lodash';
import cx from 'classnames';
import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
});
/**
 * FormFieldWrapper component class.
 * @class FormFieldWrapper
 * @extends Component
 */
class FormFieldWrapper extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string),
    wrapped: PropTypes.bool,
    columns: PropTypes.number,
    draggable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onEdit: PropTypes.func,
    className: PropTypes.string,
    onDelete: PropTypes.func,
    intl: PropTypes.object,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    description: null,
    required: false,
    error: [],
    wrapped: true,
    columns: 2,
    onDelete: null,
    intl: null,
    isDisabled: null,
    draggable: null,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      id,
      title,
      description,
      required,
      error,
      fieldSet,
      wrapped,
      columns,
      draggable,
      onEdit,
      className,
      isDisabled,
      onDelete,
      intl,
    } = this.props;
    const wdg = (
      <>
        {this.props.children}

        {map(error, (message) => (
          <Label key={message} basic color="red" pointing>
            {message}
          </Label>
        ))}
      </>
    );

    return wrapped ? (
      <Form.Field
        inline
        required={required}
        error={error.length > 0}
        className={cx(description ? 'help' : '', className)}
        id={`${fieldSet || 'field'}-${id}`}
      >
        <Grid>
          <Grid.Row stretched>
            {columns === 2 && (
              <Grid.Column width="4">
                <div className="wrapper">
                  <label htmlFor={`field-${id}`}>
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
                <div className="toolbar">
                  <button
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
                <p className="help">{description}</p>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Form.Field>
    ) : (
      <>{wdg}</>
    );
  }
}

export default injectIntl(FormFieldWrapper);
