import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

import { Icon } from '@plone/volto/components';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

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
    focus,
  } = props;

  const ref = useRef();

  useEffect(() => {
    if (focus) {
      ref.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
};
