/**
 * UrlWidget component.
 * @module components/manage/Widgets/UrlWidget
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import {
  addAppURL,
  isInternalURL,
  flattenToAppURL,
  URLUtils,
  hasTemplateVariables,
} from '@plone/volto/helpers/Url/Url';
import { defineMessages, useIntl } from 'react-intl';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
/** Widget to edit urls
 *
 * This is the default widget used for the `remoteUrl` field. You can also use
 * it by declaring a field like:
 *
 * ```jsx
 * {
 *  title: "URL",
 *  widget: 'url',
 * }
 * ```
 */
const messages = defineMessages({
  urlMissing: {
    id: 'URL is missing',
    defaultMessage: 'URL is missing',
  },
  urlInvalid: {
    id: 'URL is invalid',
    defaultMessage: 'URL is invalid',
  },
  clearUrl: {
    id: 'Clear URL',
    defaultMessage: 'Clear URL',
  },
  openUrlBrowser: {
    id: 'Open URL browser',
    defaultMessage: 'Open URL browser',
  },
});
export const UrlWidget = (props) => {
  const {
    id,
    onChange,
    onBlur,
    onClick,
    minLength,
    maxLength,
    placeholder,
    isDisabled,
    required,
  } = props;
  const inputId = `field-${id}`;
  const intl = useIntl();

  // Preserve template variables when initializing value
  const initialValue = props.value
    ? hasTemplateVariables(props.value)
      ? props.value
      : flattenToAppURL(props.value)
    : '';
  const [value, setValue] = useState(initialValue);
  const [isInvalid, setIsInvalid] = useState(false);
  /**
   * Clear handler
   * @method clear
   * @param {Object} value Value
   * @returns {undefined}
   */
  const clear = () => {
    setValue('');
    onChange(id, undefined);
    setIsInvalid(false);
  };
  const onChangeValue = (_value) => {
    let newValue = _value;

    // Preserve template variables. Skip all processing if present
    const hasTemplateVars = hasTemplateVariables(newValue);

    if (newValue?.length > 0 && !hasTemplateVars) {
      if (isInvalid && URLUtils.isUrl(URLUtils.normalizeUrl(newValue))) {
        setIsInvalid(false);
      }
      if (isInternalURL(newValue)) {
        newValue = flattenToAppURL(newValue);
      }
    }
    setValue(newValue);

    if (!hasTemplateVars) {
      newValue = isInternalURL(newValue) ? addAppURL(newValue) : newValue;

      if (!isInternalURL(newValue) && newValue.length > 0) {
        const checkedURL = URLUtils.checkAndNormalizeUrl(newValue);
        newValue = checkedURL.url;
        if (!checkedURL.isValid) {
          setIsInvalid(true);
        }
      }
    } else {
      // For template variables, mark as valid since they're preserved as it is
      setIsInvalid(false);
    }
    onChange(id, newValue === '' ? undefined : newValue);
  };
  // A11y: if the field is required and the user leaves it empty, we mark it as missing
  const handleBlur = ({ target }) => {
    if (required && (!target.value || target.value === '')) {
      setIsInvalid(true);
    }
    onBlur(id, target.value === '' ? undefined : target.value);
  };
  return (
    <FormFieldWrapper {...props} className="url wide">
      <div className="wrapper">
        <Input
          id={inputId}
          name={id}
          type="url"
          required={required}
          aria-required={required}
          aria-invalid={isInvalid}
          aria-errormessage={isInvalid ? `${inputId}-error` : undefined}
          onBlur={handleBlur}
          value={value || ''}
          disabled={isDisabled}
          placeholder={placeholder}
          onChange={({ target }) => onChangeValue(target.value)}
          onClick={() => onClick()}
          minLength={minLength || null}
          maxLength={maxLength || null}
          error={isInvalid}
        />
        {isInvalid && (
          <span
            id={`${inputId}-error`}
            role="alert"
            className="visually-hidden"
          >
            {value?.length > 0
              ? intl.formatMessage(messages.urlInvalid)
              : intl.formatMessage(messages.urlMissing)}
          </span>
        )}
        {value?.length > 0 ? (
          <Button.Group>
            <Button
              type="button"
              basic
              className="cancel"
              aria-label={intl.formatMessage(messages.clearUrl)}
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
              type="button"
              basic
              icon
              aria-label={intl.formatMessage(messages.openUrlBrowser)}
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
UrlWidget.propTypes = {
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
UrlWidget.defaultProps = {
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
export default withObjectBrowser(UrlWidget);
