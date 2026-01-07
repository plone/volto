/**
 * Add link form.
 * @module components/manage/AnchorPlugin/components/LinkButton/AddLinkForm
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import cx from 'classnames';

import {
  addAppURL,
  isInternalURL,
  flattenToAppURL,
  URLUtils,
} from '@plone/volto/helpers/Url/Url';

import doesNodeContainClick from 'semantic-ui-react/dist/commonjs/lib/doesNodeContainClick';
import { Input, Form, Button } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';

import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import linkSVG from '@plone/volto/icons/link.svg';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

const messages = defineMessages({
  placeholder: {
    id: 'Enter URL or select an item',
    defaultMessage: 'Enter URL or select an item',
  },
  clear: {
    id: 'Clear',
    defaultMessage: 'Clear',
  },
  openObjectBrowser: {
    id: 'Open object browser',
    defaultMessage: 'Open object browser',
  },
  submit: {
    id: 'Submit',
    defaultMessage: 'Submit',
  },
});

/**
 * Add link form component.
 * @function AddLinkForm
 */
const AddLinkForm = (props) => {
  const {
    onChangeValue,
    onClear,
    onOverrideContent,
    openObjectBrowser,
    data,
    placeholder,
    objectBrowserPickerType,
    isObjectBrowserOpen,
  } = props;

  const intl = useIntl();

  const [value, setValue] = useState(
    isInternalURL(data?.url) ? flattenToAppURL(data.url) : data?.url || '',
  );
  const [isInvalid, setIsInvalid] = useState(false);

  const linkFormContainerRef = useRef(null);
  const inputRef = useRef(null);

  const onClose = useCallback(() => {
    onOverrideContent(undefined);
  }, [onOverrideContent]);

  const handleClickOutside = useCallback(
    (e) => {
      if (
        linkFormContainerRef.current &&
        doesNodeContainClick(linkFormContainerRef.current, e)
      )
        return;
      if (linkFormContainerRef.current && isObjectBrowserOpen) return;
      onClose();
    },
    [isObjectBrowserOpen, onClose],
  );

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 50);
    document.addEventListener('mousedown', handleClickOutside, false);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, [handleClickOutside]);

  const onChange = (newValue, clear = false) => {
    let nextValue = newValue;
    let nextIsInvalid = isInvalid;

    if (!clear) {
      if (nextIsInvalid && URLUtils.isUrl(URLUtils.normalizeUrl(newValue))) {
        nextIsInvalid = false;
      }

      if (isInternalURL(newValue)) {
        nextValue = flattenToAppURL(newValue);
      }
    }

    setValue(nextValue);
    if (nextIsInvalid !== isInvalid) {
      setIsInvalid(nextIsInvalid);
    }

    if (clear) onClear();
  };

  const onSubmit = (urlOverride) => {
    let url = typeof urlOverride === 'string' ? urlOverride : value;

    const checkedURL = URLUtils.checkAndNormalizeUrl(url);
    url = checkedURL.url;
    if (!checkedURL.isValid) {
      setIsInvalid(true);
      return;
    }

    const editorStateUrl = isInternalURL(url) ? addAppURL(url) : url;

    onChangeValue(editorStateUrl);
    onClose();
  };

  const clear = () => {
    setValue('');
    onClear();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onSubmit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const className = isInvalid
    ? cx(
        'ui input editor-link',
        'input-anchorlink-theme',
        'input-anchorlink-theme-Invalid',
      )
    : cx('ui input editor-link', 'input-anchorlink-theme');

  return (
    <div className="link-form-container" ref={linkFormContainerRef}>
      <Icon name={linkSVG} color="#B8B2C8" size="20px" />
      <Form.Field inline>
        <div className="wrapper">
          <Input
            className={className}
            name="link"
            value={value || ''}
            onChange={({ target }) => onChange(target.value)}
            placeholder={
              placeholder || intl.formatMessage(messages.placeholder)
            }
            onKeyDown={onKeyDown}
            ref={inputRef}
          />
          {value.length > 0 ? (
            <Button.Group>
              <Button
                type="button"
                basic
                className="cancel"
                aria-label={intl.formatMessage(messages.clear)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  clear();
                  if (inputRef.current) inputRef.current.focus();
                }}
              >
                <Icon name={clearSVG} size="24px" />
              </Button>
            </Button.Group>
          ) : objectBrowserPickerType === 'link' ? (
            <Button.Group>
              <Button
                type="button"
                basic
                icon
                aria-label={intl.formatMessage(messages.openObjectBrowser)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openObjectBrowser({
                    mode: objectBrowserPickerType,
                    overlay: true,
                    onSelectItem: (url) => {
                      onChange(url);

                      let nextValue = url;
                      if (isInternalURL(url)) {
                        nextValue = flattenToAppURL(url);
                      }
                      onSubmit(nextValue);
                    },
                  });
                }}
              >
                <Icon name={navTreeSVG} size="24px" />
              </Button>
            </Button.Group>
          ) : null}

          <Button.Group>
            <Button
              basic
              primary
              disabled={!value.length > 0}
              aria-label={intl.formatMessage(messages.submit)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSubmit();
              }}
            >
              <Icon name={aheadSVG} size="24px" />
            </Button>
          </Button.Group>
        </div>
      </Form.Field>
    </div>
  );
};

AddLinkForm.propTypes = {
  onChangeValue: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
  data: PropTypes.shape({
    url: PropTypes.string,
  }),
  placeholder: PropTypes.string,
  objectBrowserPickerType: PropTypes.string,
  isObjectBrowserOpen: PropTypes.bool,
};

AddLinkForm.defaultProps = {
  objectBrowserPickerType: 'link',
  placeholder: 'Enter URL or select an item',
  data: {},
  isObjectBrowserOpen: false,
};

export default compose(withRouter, withObjectBrowser)(AddLinkForm);
