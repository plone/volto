/**
 * TextWidget component.
 * @module components/manage/Widgets/TextWidget
 */

import { FormFieldWrapper, Icon } from '@plone/volto/components';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Input } from 'semantic-ui-react';

/**
 * TextWidget component class.
 * @class TextWidget
 * @extends Component
 */
class TextWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    focus: PropTypes.bool,
    isDraggable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    icon: PropTypes.shape({
      xmlns: PropTypes.string,
      viewBox: PropTypes.string,
      content: PropTypes.string,
    }),
    iconAction: PropTypes.func,
    wrapped: PropTypes.bool,
    placeholder: PropTypes.string,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    description: null,
    required: false,
    error: [],
    value: null,
    onChange: null,
    onEdit: null,
    onDelete: null,
    focus: false,
    isDraggable: false,
    isDisabled: false,
    icon: null,
    iconAction: null,
  };

  /**
   * Component did mount lifecycle method
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.focus) {
      this.node.focus();
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      id,
      value,
      onChange,
      onEdit,
      isDraggable,
      isDisabled,
      onDelete,
      intl,
      icon,
      iconAction,
      placeholder,
    } = this.props;

    return (
      <FormFieldWrapper
        {...this.props}
        draggable={isDraggable}
        className="text"
        onEdit={onEdit ? () => onEdit(id) : null}
        onDelete={onDelete}
        intl={intl}
        isDisabled={isDisabled}
      >
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
          ref={(node) => {
            this.node = node;
          }}
        />
        {icon && iconAction && (
          <button onClick={iconAction}>
            <Icon name={icon} size="18px" />
          </button>
        )}
      </FormFieldWrapper>
    );
  }
}

export default injectIntl(TextWidget);
