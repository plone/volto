/**
 * SelectWidget component.
 * @module components/manage/Widgets/SelectWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Select, Label } from 'semantic-ui-react';
import { map } from 'lodash';

/**
 * SelectWidget component class.
 * @function SelectWidget
 * @returns {string} Markup of the component.
 */
const SelectWidget = ({
  id,
  title,
  required,
  description,
  error,
  value,
  choices,
  onChange,
}) => (
  <Form.Field
    inline
    required={required}
    error={error.length > 0}
    className={description ? 'help' : ''}
  >
    <Grid>
      <Grid.Row stretched>
        <Grid.Column width="4">
          <div className="wrapper">
            <label htmlFor={`field-${id}`}>{title}</label>
          </div>
        </Grid.Column>
        <Grid.Column width="8">
          <Select
            id={`field-${id}`}
            name={id}
            value={value || 'no-value'}
            onChange={(event, { value }) =>
              onChange(id, value === 'no-value' ? undefined : value)
            }
            options={[
              { key: 'no-value', text: 'No value', value: 'no-value' },
              ...choices.map(option => ({
                key: option[0],
                text: option[1],
                value: option[0],
              })),
            ]}
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
SelectWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  onChange: PropTypes.func.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
SelectWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: '',
  choices: [],
};

export default SelectWidget;
