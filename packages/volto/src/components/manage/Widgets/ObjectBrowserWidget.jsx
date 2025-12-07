/**
 * ObjectBrowserWidget component.
 * @module components/manage/Widgets/ObjectBrowserWidget
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import compact from 'lodash/compact';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';
import { connect } from 'react-redux';
import { Label, Popup, Button } from 'semantic-ui-react';
import {
  flattenToAppURL,
  isInternalURL,
  normalizeUrl,
  removeProtocol,
} from '@plone/volto/helpers/Url/Url';
import { urlValidator } from '@plone/volto/helpers/FormValidation/validators';
import { searchContent } from '@plone/volto/actions/search/search';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { defineMessages, useIntl } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import config from '@plone/volto/registry';

import navTreeSVG from '@plone/volto/icons/nav.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import homeSVG from '@plone/volto/icons/home.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import blankSVG from '@plone/volto/icons/blank.svg';
import { withRouter } from 'react-router';
import Image from '@plone/volto/components/theme/Image/Image';

const messages = defineMessages({
  placeholder: {
    id: 'No items selected',
    defaultMessage: 'No items selected',
  },
  edit: {
    id: 'Edit',
    defaultMessage: 'Edit',
  },
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
  openObjectBrowser: {
    id: 'Open object browser',
    defaultMessage: 'Open object browser',
  },
});

/**
 * ObjectBrowserWidget component.
 * @function ObjectBrowserWidgetComponent
 * @param {Object} props Component properties.
 * @returns {JSX.Element} Markup for the component.
 */
const ObjectBrowserWidgetComponent = (props) => {
  const {
    id,
    description,
    fieldSet,
    value,
    mode,
    return: returnMode,
    initialPath,
    onChange,
    openObjectBrowser,
    allowExternals,
    placeholder,
    isDisabled,
    location,
    searchContent: searchContentAction,
    widgetOptions,
    selectableTypes,
    maximumSelectionSize,
    selectedItemAttrs,
    block,
  } = props;

  const intl = useIntl();
  const [manualLinkInput, setManualLinkInput] = useState('');
  const [validURL, setValidURL] = useState(false);
  const [errors, setErrors] = useState([]);

  const selectedItemsRef = useRef(null);
  const placeholderRef = useRef(null);

  const renderLabel = (item) => {
    const href = item['@id'];
    return (
      <Popup
        key={flattenToAppURL(href)}
        content={
          <div style={{ display: 'flex' }}>
            {isInternalURL(href) ? (
              <Icon name={homeSVG} size="18px" />
            ) : (
              <Icon name={blankSVG} size="18px" />
            )}
            &nbsp;
            {flattenToAppURL(href)}
          </div>
        }
        trigger={
          <Label>
            <div className="item-title">
              {includes(config.settings.imageObjects, item['@type']) ? (
                <Image
                  className="small ui image"
                  src={`${item['@id']}/@@images/image/thumb`}
                />
              ) : (
                item.title
              )}
            </div>
            <div>
              {mode === 'multiple' && (
                <Icon
                  name={clearSVG}
                  size="12px"
                  className="right"
                  onClick={(event) => {
                    event.preventDefault();
                    removeItem(item);
                  }}
                />
              )}
            </div>
          </Label>
        }
      />
    );
  };

  const removeItem = (item) => {
    let valueArray = [...(value || [])];
    remove(valueArray, function (_item) {
      return _item['@id'] === item['@id'];
    });
    onChange(id, valueArray);
  };

  const handleChange = (item) => {
    let valueArray = mode === 'multiple' && value ? [...value] : [];
    valueArray = valueArray.filter((item) => item != null);

    const maxSize = widgetOptions?.pattern_options?.maximumSelectionSize || -1;
    if (maxSize === 1 && valueArray.length === 1) {
      valueArray = []; //enable replace of selected item with another value, if maxsize is 1
    }
    let exists = false;
    let index = -1;
    valueArray.forEach((_item, _index) => {
      if (flattenToAppURL(_item['@id']) === flattenToAppURL(item['@id'])) {
        exists = true;
        index = _index;
      }
    });

    if (!exists) {
      // add item
      // Check if we want to filter the attributes of the selected item
      let resultantItem = item;
      if (selectedItemAttrs) {
        const allowedItemKeys = [
          ...selectedItemAttrs,
          // Add the required attributes for the widget to work
          '@id',
          'title',
        ];
        resultantItem = Object.keys(item)
          .filter((key) => allowedItemKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = item[key];
            return obj;
          }, {});
      }

      // Add required @id field, just in case
      resultantItem = { ...resultantItem, '@id': item['@id'] };
      valueArray.push(resultantItem);

      if (returnMode === 'single') {
        onChange(id, valueArray[0]);
      } else {
        onChange(id, valueArray);
      }
    } else {
      //remove item
      valueArray.splice(index, 1);
      onChange(id, valueArray);
    }
  };

  const validateManualLink = (url) => {
    if (allowExternals && !url.startsWith('/')) {
      const error = urlValidator({
        value: url,
        formatMessage: intl.formatMessage,
      });
      if (error && url !== '') {
        setErrors([error]);
      } else {
        setErrors([]);
      }
      return !Boolean(error);
    } else {
      return isInternalURL(url);
    }
  };

  const onManualLinkInput = (e) => {
    const inputValue = e.target.value;
    setManualLinkInput(inputValue);
    if (validateManualLink(inputValue)) {
      setValidURL(true);
    } else {
      setValidURL(false);
    }
  };

  const onSubmitManualLink = () => {
    if (validateManualLink(manualLinkInput)) {
      if (isInternalURL(manualLinkInput)) {
        const link = manualLinkInput;
        // convert it into an internal on if possible
        searchContentAction(
          '/',
          {
            'path.query': flattenToAppURL(manualLinkInput),
            'path.depth': '0',
            sort_on: 'getObjPositionInParent',
            metadata_fields: '_all',
            b_size: 1000,
          },
          `${block}-${mode}`,
        ).then((resp) => {
          if (resp.items?.length > 0) {
            handleChange(resp.items[0]);
          } else {
            onChange(id, [
              {
                '@id': flattenToAppURL(link),
                title: removeProtocol(link),
              },
            ]);
          }
        });
      } else {
        onChange(id, [
          {
            '@id': normalizeUrl(manualLinkInput),
            title: removeProtocol(manualLinkInput),
          },
        ]);
      }
      setValidURL(true);
      setManualLinkInput('');
    }
  };

  const onKeyDownManualLink = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onSubmitManualLink();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // TODO: Do something on ESC key
    }
  };

  const showObjectBrowser = (ev) => {
    ev.preventDefault();
    openObjectBrowser({
      mode: mode,
      currentPath: initialPath || location.pathname,
      propDataName: 'value',
      onSelectItem: (url, item) => {
        handleChange(item);
      },
      selectableTypes:
        widgetOptions?.pattern_options?.selectableTypes || selectableTypes,
      maximumSelectionSize:
        widgetOptions?.pattern_options?.maximumSelectionSize ||
        maximumSelectionSize,
    });
  };

  const handleSelectedItemsRefClick = (e) => {
    if (isDisabled) {
      return;
    }
    // Fix: Check if the clicked element is contained within the ref elements
    if (
      selectedItemsRef.current?.contains(e.target) ||
      placeholderRef.current?.contains(e.target)
    ) {
      showObjectBrowser(e);
    }
  };

  const items = compact(!isArray(value) && value ? [value] : value || []);

  const icon =
    mode === 'multiple' || items.length === 0 ? navTreeSVG : clearSVG;
  const iconAction =
    mode === 'multiple' || items.length === 0
      ? showObjectBrowser
      : (e) => {
          e.preventDefault();
          onChange(id, returnMode === 'single' ? null : []);
        };

  return (
    <FormFieldWrapper
      {...props}
      // At the moment, OBW handles its own errors and validation
      error={errors}
      className={description ? 'help text' : 'text'}
    >
      <div
        className="objectbrowser-field"
        aria-labelledby={`fieldset-${fieldSet || 'default'}-field-label-${id}`}
      >
        <div
          className="selected-values"
          onClick={handleSelectedItemsRefClick}
          onKeyDown={handleSelectedItemsRefClick}
          role="searchbox"
          tabIndex={0}
          ref={selectedItemsRef}
        >
          {items.map((item) => renderLabel(item))}

          {items.length === 0 && mode === 'multiple' && (
            <div className="placeholder" ref={placeholderRef}>
              {placeholder ?? intl.formatMessage(messages.placeholder)}
            </div>
          )}
          {allowExternals && items.length === 0 && mode !== 'multiple' && (
            <input
              onBlur={onSubmitManualLink}
              onKeyDown={onKeyDownManualLink}
              onChange={onManualLinkInput}
              value={manualLinkInput}
              placeholder={
                placeholder ?? intl.formatMessage(messages.placeholder)
              }
            />
          )}
        </div>
        {manualLinkInput && isEmpty(items) && (
          <Button.Group>
            <Button
              type="button"
              basic
              className="cancel"
              onClick={(e) => {
                e.stopPropagation();
                setManualLinkInput('');
              }}
            >
              <Icon name={clearSVG} size="18px" color="#e40166" />
            </Button>
            <Button
              type="button"
              basic
              primary
              disabled={!validURL}
              onClick={(e) => {
                e.stopPropagation();
                onSubmitManualLink();
              }}
            >
              <Icon name={aheadSVG} size="18px" />
            </Button>
          </Button.Group>
        )}
        {!manualLinkInput && (
          <Button
            type="button"
            aria-label={intl.formatMessage(messages.openObjectBrowser)}
            onClick={iconAction}
            className="action"
            disabled={isDisabled}
          >
            <Icon name={icon} size="18px" />
          </Button>
        )}
      </div>
    </FormFieldWrapper>
  );
};

ObjectBrowserWidgetComponent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  mode: PropTypes.string, // link, image, multiple
  return: PropTypes.string, // single, multiple
  initialPath: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  onChange: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
  allowExternals: PropTypes.bool,
  placeholder: PropTypes.string,
};

ObjectBrowserWidgetComponent.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: [],
  mode: 'multiple',
  return: 'multiple',
  initialPath: '',
  allowExternals: false,
};

const ObjectBrowserWidgetMode = (mode) =>
  compose(
    withObjectBrowser,
    withRouter,
    connect(null, { searchContent }),
  )((props) => <ObjectBrowserWidgetComponent {...props} mode={mode} />);
export { ObjectBrowserWidgetMode };
export default compose(
  withObjectBrowser,
  withRouter,
  connect(null, { searchContent }),
)(ObjectBrowserWidgetComponent);
