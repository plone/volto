/**
 * TextWidget component.
 * @module components/manage/Widgets/TextWidget
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'semantic-ui-react';

import { FormFieldWrapper, Icon } from '@plone/volto/components';
import { injectIntl } from 'react-intl';

/**
 * The simple text widget.
 *
 * It is the default fallback widget, so if no other widget is found based on
 * passed field properties, it will be used.
 */
function TextWidget(props) {
  const {
    id,
    value,
    onChange = () => {},
    onBlur = () => {},
    onClick = () => {},
    onEdit,
    onDelete,
    icon,
    iconAction,
    minLength,
    maxLength,
    placeholder,
    required = false,
    error = [],
    focus = false,
    node,
    isDisabled,
  } = props;

  React.useEffect(() => {
    if (focus) {
      node.focus();
    }
  }, [node, focus]);

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
        ref={node}
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
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 */
TextWidget.propTypes = {
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
  isDisabled: PropTypes.bool,
};

export default injectIntl(TextWidget);
