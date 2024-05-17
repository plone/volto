import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

/**
 * The simple text widget.
 *
 * It is the default fallback widget, so if no other widget is found based on
 * passed field properties, it will be used.
 */

const TextWidget = (props) => {
  const {
    id,
    value,
    onChange,
    onBlur,
    onClick,
    icon,
    iconAction,
    minLength,
    maxLength,
    placeholder,
    isDisabled,
  } = props;

  const ref = useRef(null);

  useEffect((focus) => {
    if (focus) ref.current.focus();
  }, []);

  return (
    <FormFieldWrapper {...props} className="text">
      <Input
        id={`field-${id}`}
        name={id}
        value={value || ''}
        disabled={isDisabled}
        icon={icon || null}
        placeholder={placeholder}
        onChange={({ target }) =>
          onChange(id, target.value === '' ? undefined : target.value)
        }
        ref={ref}
        onBlur={({ target }) =>
          onBlur(id, target.value === '' ? undefined : target.value)
        }
        onClick={() => onClick()}
        minLength={minLength || null}
        maxLength={maxLength || null}
      />
      {icon && iconAction && (
        <button className={`field-${id}-action-button`} onClick={iconAction}>
          <Icon name={icon} size="18px" />
        </button>
      )}
    </FormFieldWrapper>
  );
};

export default TextWidget;

TextWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  focus: PropTypes.bool,
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

TextWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
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
