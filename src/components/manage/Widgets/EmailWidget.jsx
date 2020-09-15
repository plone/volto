/**
 * EmailWidget component.
 * @module components/manage/Widgets/EmailWidget
 */

import { FormFieldWrapper } from '@plone/volto/components';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'semantic-ui-react';

/** EmailWidget function component
 * @function EmailWidget
 * @returns {string} Markup of the component
 */
const EmailWidget = (props) => {
  const { id, value, onChange, onBlur, onClick, minLength, maxLength } = props;
  const inputId = `field-${id}`;

  return (
    <FormFieldWrapper {...props} className="email">
      <Input
        id={inputId}
        name={id}
        type="email"
        value={value || ''}
        onChange={({ target }) =>
          onChange(id, target.value === '' ? undefined : target.value)
        }
        onBlur={({ target }) =>
          onBlur(id, target.value === '' ? undefined : target.value)
        }
        onClick={() => onClick()}
        minLength={minLength || null}
        maxLength={maxLength || null}
      />
    </FormFieldWrapper>
  );
};

/**
 * Property types
 * @property {Object} propTypes Property types.
 * @static
 */
EmailWidget.propTypes = {
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
EmailWidget.defaultProps = {
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

export default EmailWidget;
