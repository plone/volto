import React from 'react';
import PropTypes from 'prop-types';
import FormFieldWrapper from '../FormFieldWrapper/FormFieldWrapper';
import cx from 'classnames';
import { isNil } from 'lodash';
import { useForwardedRef } from '../../helpers';
import { useTextField } from 'react-aria';
import { mergeProps } from 'react-aria';

const TextArea = React.forwardRef((props, ref) => {
  const {
    disabled,
    error,
    id,
    onChange,
    onClick,
    placeholder,
    readOnly,
    required,
    tabIndex,
    title,
    value,
  } = props;

  const TextAreaRef = useForwardedRef(ref);

  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
  } = useTextField(
    {
      ...props,
      inputElementType: 'textarea',
      id: `field-${id}`,
      label: title,
      isDisabled: disabled,
      isReadOnly: readOnly,
      isRequired: required,
    },
    TextAreaRef,
  );

  const computeTabIndex = () => {
    if (!isNil(tabIndex)) return tabIndex;
    if (disabled) return -1;
  };

  const localTextAreaProps = {
    className: cx('q input textarea', { error: error }),
    placeholder: placeholder || ' ',
    onChange: ({ target }) =>
      readOnly
        ? undefined
        : onChange(id, target.value === '' ? undefined : target.value),
    onClick: () => onClick(),
    tabIndex: computeTabIndex(),
    value: value || '',
  };

  return (
    <FormFieldWrapper
      {...props}
      labelProps={labelProps}
      descriptionProps={descriptionProps}
      errorMessageProps={errorMessageProps}
      className="text"
    >
      <textarea
        ref={TextAreaRef}
        required={required}
        {...mergeProps(localTextAreaProps, inputProps)}
      />
    </FormFieldWrapper>
  );
});

TextArea.propTypes = {
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

TextArea.defaultProps = {
  description: null,
  required: false,
  error: undefined,
  value: null,
  onChange: () => {},
  onBlur: () => {},
  onClick: () => {},
  onEdit: null,
  onDelete: null,
  focus: false,
  icon: null,
  iconAction: null,
  minLength: null,
  maxLength: null,
};

export default TextArea;
