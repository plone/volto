/**
 * UrlWidget component.
 * @module components/manage/Widgets/UrlWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Input, Label } from 'semantic-ui-react';
import { map } from 'lodash';

/** UrlWidget function component
 * @function UrlWidget
 * @returns {string} Markup of the component
 */
const UrlWidget = ({
  id,
  title,
  description,
  required,
  error,
  value,
  onChange,
  onBlur,
  onClick,
  fieldSet,
  minLength,
  maxLength,
}) => {
  const inputId = `field-${id}`;
  const fieldId = `${fieldSet || 'field'}-${id}`;
  const errorsList = map(error, (message) => (
    <Label key={message} basic color="red" pointing>
      {message}
    </Label>
  ));

  return (
    <Form.Field
      inline
      required={required}
      error={error.length > 0}
      className={description ? 'help' : ''}
      id={fieldId}
    >
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor={inputId}>{title}</label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            <Input
              id={inputId}
              name={id}
              type="url"
              value={value || ''}
              onChange={({ target }) =>
                onChange(id, target.value === '' ? undefined : target.value)
              }
              onBlur={({ target }) =>
                onBlur(id, target.value === '' ? undefined : target.value)
              }
              onClick={() => onClick()}
            >
              <input
                minLength={minLength || null}
                maxLength={maxLength || null}
              />
            </Input>
            {errorsList}
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
  );
};

/**
 * Property types
 * @property {Object} propTypes Property types.
 * @static
 */
UrlWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
UrlWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
  onChange: () => {},
  onBlur: () => {},
  onClick: () => {},
  minLength: null,
  maxLength: null,
};

export default UrlWidget;
