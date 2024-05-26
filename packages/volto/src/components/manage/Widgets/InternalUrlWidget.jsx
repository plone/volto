/**
 * UrlWidget component.
 * @module components/manage/Widgets/UrlWidget
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { isInternalURL, flattenToAppURL, URLUtils } from '@plone/volto/helpers';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

/** Widget to edit urls
 *
 * This is a widget used for getting and setting an internal url. You can also use
 * it by declaring a field like:
 *
 * ```jsx
 * {
 *  title: "URL",
 *  widget: 'internal_url',
 * }
 * ```
 */
export const InternalUrlWidget = (props) => {
  const {
    id,
    onChange,
    onBlur,
    onClick,
    minLength,
    maxLength,
    placeholder,
    isDisabled,
    value,
  } = props;
  const inputId = `field-${id}`;

  const [isInvalid, setIsInvalid] = useState(false);

  /**
   * Clear handler
   * @method clear
   * @param {Object} value Value
   * @returns {string} Empty string
   */
  const clear = () => {
    onChange(id, '');
  };

  const onChangeValue = (_value) => {
    let newValue = _value;
    if (newValue?.length > 0) {
      if (isInvalid && URLUtils.isUrl(URLUtils.normalizeUrl(newValue))) {
        setIsInvalid(false);
      }

      if (isInternalURL(newValue)) {
        newValue = flattenToAppURL(newValue);
      }
    }

    newValue = isInternalURL(newValue) ? flattenToAppURL(newValue) : newValue;

    if (!isInternalURL(newValue) && newValue.length > 0) {
      const checkedURL = URLUtils.checkAndNormalizeUrl(newValue);
      newValue = checkedURL.url;
      if (!checkedURL.isValid) {
        setIsInvalid(true);
      }
    }

    onChange(id, newValue);
  };

  return (
    <FormFieldWrapper {...props} className="url wide">
      <div className="wrapper">
        <Input
          id={inputId}
          name={id}
          type="url"
          value={value || ''}
          disabled={isDisabled}
          placeholder={placeholder}
          onChange={({ target }) => onChangeValue(target.value)}
          onBlur={({ target }) => onBlur(id, target.value)}
          onClick={() => onClick()}
          minLength={minLength}
          maxLength={maxLength}
          error={isInvalid}
        />
        {value?.length > 0 ? (
          <Button.Group>
            <Button
              basic
              className="cancel"
              aria-label="clearUrlBrowser"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                clear();
              }}
            >
              <Icon name={clearSVG} size="30px" />
            </Button>
          </Button.Group>
        ) : (
          <Button.Group>
            <Button
              basic
              icon
              aria-label="openUrlBrowser"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.openObjectBrowser({
                  mode: 'link',
                  overlay: true,
                  onSelectItem: (url) => {
                    onChangeValue(url);
                  },
                });
              }}
            >
              <Icon name={navTreeSVG} size="24px" />
            </Button>
          </Button.Group>
        )}
      </div>
    </FormFieldWrapper>
  );
};

/**
 * Property types
 * @property {Object} propTypes Property types.
 * @static
 */
InternalUrlWidget.propTypes = {
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
  openObjectBrowser: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
InternalUrlWidget.defaultProps = {
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

export default withObjectBrowser(InternalUrlWidget);
