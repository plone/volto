/**
 * CheckboxWidget component.
 * @module components/manage/Widgets/CheckboxWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Label, Checkbox } from 'semantic-ui-react';
import { map } from 'lodash';

/**
 * CheckboxWidget component class.
 * @function CheckboxWidget
 * @returns {string} Markup of the component.
 */
const CheckboxWidget = ({
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
    className={description ? 'help' : ''}
  >
    <Grid>
      <Grid.Row stretched>
        <Grid.Column width="12">
          <div className="wrapper">
            <Checkbox
              id={`field-${id}`}
              name={id}
              checked={value}
              onChange={(event, { checked }) => onChange(id, checked)}
            />
            <Label
              basic
              horizontal
              as="label"
              htmlFor={`field-${id}`}
              content={title}
            />
          </div>
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
CheckboxWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
CheckboxWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
};

export default CheckboxWidget;
