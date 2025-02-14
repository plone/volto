/**
 * IntervalField component.
 * @module components/manage/Widgets/RecurrenceWidget/IntervalField
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Input } from 'semantic-ui-react';

/**
 * IntervalField component class.
 * @function IntervalField
 * @returns {string} Markup of the component.
 */
const IntervalField = ({ label, labelAfter, value, onChange }) => {
  return (
    <Form.Field inline className="text">
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor="interval">{label}</label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            <Form.Field inline>
              <Input
                id="interval"
                name="interval"
                value={value || ''}
                onChange={({ target }) => {
                  onChange(
                    target.id,
                    target.value === '' ? undefined : parseInt(target.value),
                  );
                }}
              />
              {labelAfter && <span>{labelAfter}</span>}
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form.Field>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
IntervalField.propTypes = {
  label: PropTypes.string.isRequired,
  labelAfter: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
IntervalField.defaultProps = {
  label: null,
  labelAfter: null,
  onChange: null,
};

export default IntervalField;
