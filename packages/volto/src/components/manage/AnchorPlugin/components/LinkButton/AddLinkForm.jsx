import React, { useEffect, useMemo, useRef, useState } from 'react';

import { compose } from 'redux';
import { withRouter } from 'react-router';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { defineMessages, injectIntl } from 'react-intl';

import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import linkSVG from '@plone/volto/icons/link.svg';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import { Input, Form, Button } from 'semantic-ui-react';

import doesNodeContainClick from 'semantic-ui-react/dist/commonjs/lib/doesNodeContainClick';

import {
  addAppURL,
  isInternalURL,
  flattenToAppURL,
  URLUtils,
} from '@plone/volto/helpers/Url/Url';

import cx from 'classnames';

function AddLinkForm({
  placeholder = 'Enter URL or select an item',
  data,
  theme,
  objectBrowserPickerType = 'link',
  isObjectBrowserOpen,
  onChangeValue,
  onClear,
  onOverrideContent,
  intl,
  openObjectBrowser,
}) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [val, setVal] = useState({});
  const inputRef = useRef();
  const linkFormContainer = useRef();

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

  const onClose = () => onOverrideContent(undefined);

  const onChange = (value, clear) => {
    let preprocessedValue = value;

    if (!clear) {
      if (isInvalid && URLUtils.isUrl(URLUtils.normalizeUrl(value))) {
        setIsInvalid(false);
      }

      if (isInternalURL(value)) {
        setVal(flattenToAppURL(value));
      }
    }

    setVal(preprocessedValue);

    if (clear) onClear();
  };

  const handleClickOutside = (e) => {
    if (
      linkFormContainer.current &&
      doesNodeContainClick(linkFormContainer.current, e)
    )
      return;
    if (linkFormContainer.current && isObjectBrowserOpen) return;

    onClose();
  };

  const onSubmit = () => {
    let url = val;

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

  const clear = () => {
    setVal('');
    onClear();
  };

  const className = useMemo(
    () =>
      isInvalid
        ? cx(
            'ui input editor-link',
            'input-anchorlink-theme',
            'input-anchorlink-theme-Invalid',
          )
        : cx('ui input editor-link', 'input-anchorlink-theme'),
    [isInvalid],
  );

  useEffect(() => {
    setTimeout(() => inputRef.current.focus(), 50);
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setVal(
      isInternalURL(data.url) ? flattenToAppURL(data.url) : data.url || '',
    );
  }, [data.url]);

  return (
    <div className="link-form-container" ref={linkFormContainer}>
      <Icon name={linkSVG} color="#B8B2C8" size="20px" />
      <Form.Field inline>
        <div className="wrapper">
          <Input
            className={className}
            name="link"
            value={val || ''}
            onChange={({ target }) => onChange(target.value)}
            placeholder={
              placeholder || intl.formatMessage(messages.placeholder)
            }
            onKeyDown={onKeyDown}
            ref={inputRef}
          />
          {val.length > 0 ? (
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
                  inputRef.current.focus();
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
                      onSubmit();
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
              disabled={!val.length > 0}
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
}

export default compose(injectIntl, withRouter, withObjectBrowser)(AddLinkForm);
