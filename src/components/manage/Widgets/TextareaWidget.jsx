/**
 * TextareaWidget component.
 * @module components/manage/Widgets/TextareaWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Label, TextArea } from 'semantic-ui-react';
import { map } from 'lodash';

/**
 * TextareaWidget component class.
 * @function TextareaWidget
 * @returns {string} Markup of the component.
 */
const TextareaWidget = ({
  id,
  title,
  required,
  description,
  error,
  value,
  onChange,
}) => (
  <Form.Field
    inline
    required={required}
    error={error.length > 0}
    className={description ? 'help textarea' : 'textarea'}
  >
    <Grid>
      <Grid.Row stretched>
        <Grid.Column width="4">
          <div className="wrapper">
            <label htmlFor={`field-${id}`}>{title}</label>
          </div>
        </Grid.Column>
        <Grid.Column width="8">
          <TextArea
            id={`field-${id}`}
            name={id}
            value={value || ''}
            onChange={({ target }) =>
              onChange(id, target.value === '' ? undefined : target.value)
            }
          />
          {map(error, message => (
            <Label key={message} basic color="red" pointing>
              {message}
            </Label>
          ))}
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

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
TextareaWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
TextareaWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
};

export default TextareaWidget;
