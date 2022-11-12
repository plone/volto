import React from 'react';
import PropTypes from 'prop-types';
import FormFieldWrapper from '../FormFieldWrapper/FormFieldWrapper';
import cx from 'classnames';
import { isNil } from 'lodash';
import { useForwardedRef } from '../../helpers';

const Input = React.forwardRef((props, ref) => {
  const {
    disabled,
    error,
    id,
    minLength,
    maxLength,
    onChange,
    onClick,
    placeholder,
    readOnly,
    required,
    tabIndex,
    value,
  } = props;

  const inputRef = useForwardedRef(ref);

  const computeTabIndex = () => {
    if (!isNil(tabIndex)) return tabIndex;
    if (disabled) return -1;
  };

  return (
    <FormFieldWrapper {...props} className="text">
      <input
        aria-describedby={`field-hint-${id}`}
        aria-labelledby={`field-label-${id}`}
        className={cx('q input', { error: error })}
        id={`field-${id}`}
        disabled={disabled}
        minLength={minLength || null}
        maxLength={maxLength || null}
        placeholder={placeholder || ' '}
        onChange={({ target }) =>
          readOnly
            ? undefined
            : onChange(id, target.value === '' ? undefined : target.value)
        }
        onClick={() => onClick()}
        readOnly={readOnly}
        ref={inputRef}
        required={required}
        tabIndex={computeTabIndex()}
        value={value || ''}
      />
    </FormFieldWrapper>
  );
});

Input.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  focus: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  icon: PropTypes.shape({
    xmlns: PropTypes.string,
    viewBox: PropTypes.string,
    content: PropTypes.string,
  }),
  iconAction: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  wrapped: PropTypes.bool,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  description: null,
  required: false,
  error: undefined,
  value: undefined,
  onChange: () => {},
  onBlur: () => {},
  onClick: () => {},
  onEdit: null,
  onDelete: null,
  focus: null,
  icon: null,
  iconAction: null,
  minLength: null,
  maxLength: null,
};

export default Input;
