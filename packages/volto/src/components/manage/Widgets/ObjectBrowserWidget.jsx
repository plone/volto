import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import compact from 'lodash/compact';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';
import { connect } from 'react-redux';
import { Image, Label, Popup, Button } from 'semantic-ui-react';
import {
  flattenToAppURL,
  isInternalURL,
  isUrl,
  normalizeUrl,
  removeProtocol,
} from '@plone/volto/helpers/Url/Url';
import { searchContent } from '@plone/volto/actions/search/search';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { defineMessages, injectIntl } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import config from '@plone/volto/registry';

import navTreeSVG from '@plone/volto/icons/nav.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import homeSVG from '@plone/volto/icons/home.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import blankSVG from '@plone/volto/icons/blank.svg';
import { withRouter } from 'react-router';

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

const ObjectBrowserWidgetComponent = (props) => {
  const [manualLinkInput, setManualLinkInput] = useState('');
  const [validURL, setValidURL] = useState(false);

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
                  size="small"
                  src={`${item['@id']}/@@images/image/thumb`}
                />
              ) : (
                item.title
              )}
            </div>
            <div>
              {props.mode === 'multiple' && (
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
    let value = [...props.value];
    remove(value, function (_item) {
      return _item['@id'] === item['@id'];
    });
    props.onChange(props.id, value);
  };

  const handleChange = (item) => {
    let value =
      props.mode === 'multiple' && props.value ? [...props.value] : [];
    value = value.filter((item) => item != null);
    const maxSize =
      props.widgetOptions?.pattern_options?.maximumSelectionSize || -1;
    if (maxSize === 1 && value.length === 1) {
      value = [];
    }
    let exists = false;
    let index = -1;
    value.forEach((_item, _index) => {
      if (flattenToAppURL(_item['@id']) === flattenToAppURL(item['@id'])) {
        exists = true;
        index = _index;
      }
    });
    if (!exists) {
      let resultantItem = item;
      if (props.selectedItemAttrs) {
        const allowedItemKeys = [...props.selectedItemAttrs, '@id', 'title'];
        resultantItem = Object.keys(item)
          .filter((key) => allowedItemKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = item[key];
            return obj;
          }, {});
      }
      resultantItem = { ...resultantItem, '@id': item['@id'] };
      value.push(resultantItem);
      if (props.return === 'single') {
        props.onChange(props.id, value[0]);
      } else {
        props.onChange(props.id, value);
      }
    } else {
      value.splice(index, 1);
      props.onChange(props.id, value);
    }
  };

  const onManualLinkInput = (e) => {
    setManualLinkInput(e.target.value);
    if (validateManualLink(e.target.value)) {
      setValidURL(true);
    } else {
      setValidURL(false);
    }
  };

  const validateManualLink = (url) => {
    if (props.allowExternals) {
      return isUrl(url);
    } else {
      return isInternalURL(url);
    }
  };

  const onSubmitManualLink = () => {
    if (validateManualLink(manualLinkInput)) {
      if (isInternalURL(manualLinkInput)) {
        const link = manualLinkInput;
        props
          .searchContent(
            '/',
            {
              'path.query': flattenToAppURL(manualLinkInput),
              'path.depth': '0',
              sort_on: 'getObjPositionInParent',
              metadata_fields: '_all',
              b_size: 1000,
            },
            `${props.block}-${props.mode}`,
          )
          .then((resp) => {
            if (resp.items?.length > 0) {
              handleChange(resp.items[0]);
            } else {
              props.onChange(props.id, [
                {
                  '@id': flattenToAppURL(link),
                  title: removeProtocol(link),
                },
              ]);
            }
          });
      } else {
        props.onChange(props.id, [
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
    props.openObjectBrowser({
      mode: props.mode,
      currentPath: props.initialPath || props.location.pathname,
      propDataName: 'value',
      onSelectItem: (url, item) => {
        handleChange(item);
      },
      selectableTypes:
        props.widgetOptions?.pattern_options?.selectableTypes ||
        props.selectableTypes,
      maximumSelectionSize:
        props.widgetOptions?.pattern_options?.maximumSelectionSize ||
        props.maximumSelectionSize,
    });
  };

  const handleSelectedItemsRefClick = (e) => {
    if (props.isDisabled) {
      return;
    }

    if (
      e.target.contains(selectedItemsRef.current) ||
      e.target.contains(placeholderRef.current)
    ) {
      showObjectBrowser(e);
    }
  };

  const { id, description, fieldSet, value, mode, onChange, isDisabled, intl } =
    props;

  let items = compact(!isArray(value) && value ? [value] : value || []);

  let icon = mode === 'multiple' || items.length === 0 ? navTreeSVG : clearSVG;
  let iconAction =
    mode === 'multiple' || items.length === 0
      ? showObjectBrowser
      : (e) => {
          e.preventDefault();
          onChange(id, props.return === 'single' ? null : []);
        };

  return (
    <FormFieldWrapper {...props} className={description ? 'help text' : 'text'}>
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

          {items.length === 0 && props.mode === 'multiple' && (
            <div className="placeholder" ref={placeholderRef}>
              {props.placeholder ?? intl.formatMessage(messages.placeholder)}
            </div>
          )}
          {props.allowExternals &&
            items.length === 0 &&
            props.mode !== 'multiple' && (
              <input
                onKeyDown={onKeyDownManualLink}
                onChange={onManualLinkInput}
                value={manualLinkInput}
                placeholder={
                  props.placeholder ?? intl.formatMessage(messages.placeholder)
                }
              />
            )}
        </div>
        {manualLinkInput && isEmpty(items) && (
          <Button.Group>
            <Button
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
  mode: PropTypes.string,
  return: PropTypes.string,
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
    injectIntl,
    withObjectBrowser,
    withRouter,
    connect(null, { searchContent }),
  )((props) => <ObjectBrowserWidgetComponent {...props} mode={mode} />);

export { ObjectBrowserWidgetMode };
export default compose(
  injectIntl,
  withObjectBrowser,
  withRouter,
  connect(null, { searchContent }),
)(ObjectBrowserWidgetComponent);
