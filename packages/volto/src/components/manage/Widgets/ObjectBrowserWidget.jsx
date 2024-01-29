/**
 * ObjectBrowserWidget component.
 * @module components/manage/Widgets/ObjectBrowserWidget
 */

import React, { Component } from 'react';
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

/**
 * ObjectBrowserWidget component class.
 * @class ObjectBrowserWidget
 * @extends Component
 */
export class ObjectBrowserWidgetComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
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

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    description: null,
    required: false,
    error: [],
    value: [],
    mode: 'multiple',
    return: 'multiple',
    initialPath: '',
    allowExternals: false,
  };

  state = {
    manualLinkInput: '',
    validURL: false,
  };

  constructor(props) {
    super(props);
    this.selectedItemsRef = React.createRef();
    this.placeholderRef = React.createRef();
  }
  renderLabel(item) {
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
              {this.props.mode === 'multiple' && (
                <Icon
                  name={clearSVG}
                  size="12px"
                  className="right"
                  onClick={(event) => {
                    event.preventDefault();
                    this.removeItem(item);
                  }}
                />
              )}
            </div>
          </Label>
        }
      />
    );
  }

  removeItem = (item) => {
    let value = [...this.props.value];
    remove(value, function (_item) {
      return _item['@id'] === item['@id'];
    });
    this.props.onChange(this.props.id, value);
  };

  onChange = (item) => {
    let value =
      this.props.mode === 'multiple' && this.props.value
        ? [...this.props.value]
        : [];
    value = value.filter((item) => item != null);
    const maxSize =
      this.props.widgetOptions?.pattern_options?.maximumSelectionSize || -1;
    if (maxSize === 1 && value.length === 1) {
      value = []; //enable replace of selected item with another value, if maxsize is 1
    }
    let exists = false;
    let index = -1;
    value.forEach((_item, _index) => {
      if (flattenToAppURL(_item['@id']) === flattenToAppURL(item['@id'])) {
        exists = true;
        index = _index;
      }
    });
    //find(value, {
    //   '@id': flattenToAppURL(item['@id']),
    // });
    if (!exists) {
      // add item
      // Check if we want to filter the attributes of the selected item
      let resultantItem = item;
      if (this.props.selectedItemAttrs) {
        const allowedItemKeys = [
          ...this.props.selectedItemAttrs,
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
      value.push(resultantItem);
      if (this.props.return === 'single') {
        this.props.onChange(this.props.id, value[0]);
      } else {
        this.props.onChange(this.props.id, value);
      }
    } else {
      //remove item
      value.splice(index, 1);
      this.props.onChange(this.props.id, value);
    }
  };

  onManualLinkInput = (e) => {
    this.setState({ manualLinkInput: e.target.value });
    if (this.validateManualLink(e.target.value)) {
      this.setState({ validURL: true });
    } else {
      this.setState({ validURL: false });
    }
  };

  validateManualLink = (url) => {
    if (this.props.allowExternals) {
      return isUrl(url);
    } else {
      return isInternalURL(url);
    }
  };

  onSubmitManualLink = () => {
    if (this.validateManualLink(this.state.manualLinkInput)) {
      if (isInternalURL(this.state.manualLinkInput)) {
        const link = this.state.manualLinkInput;
        // convert it into an internal on if possible
        this.props
          .searchContent(
            '/',
            {
              'path.query': flattenToAppURL(this.state.manualLinkInput),
              'path.depth': '0',
              sort_on: 'getObjPositionInParent',
              metadata_fields: '_all',
              b_size: 1000,
            },
            `${this.props.block}-${this.props.mode}`,
          )
          .then((resp) => {
            if (resp.items?.length > 0) {
              this.onChange(resp.items[0]);
            } else {
              this.props.onChange(this.props.id, [
                {
                  '@id': flattenToAppURL(link),
                  title: removeProtocol(link),
                },
              ]);
            }
          });
      } else {
        this.props.onChange(this.props.id, [
          {
            '@id': normalizeUrl(this.state.manualLinkInput),
            title: removeProtocol(this.state.manualLinkInput),
          },
        ]);
      }
      this.setState({ validURL: true, manualLinkInput: '' });
    }
  };

  onKeyDownManualLink = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.onSubmitManualLink();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // TODO: Do something on ESC key
    }
  };

  showObjectBrowser = (ev) => {
    ev.preventDefault();
    this.props.openObjectBrowser({
      mode: this.props.mode,
      currentPath: this.props.initialPath || this.props.location.pathname,
      propDataName: 'value',
      onSelectItem: (url, item) => {
        this.onChange(item);
      },
      selectableTypes:
        this.props.widgetOptions?.pattern_options?.selectableTypes ||
        this.props.selectableTypes,
      maximumSelectionSize:
        this.props.widgetOptions?.pattern_options?.maximumSelectionSize ||
        this.props.maximumSelectionSize,
    });
  };

  handleSelectedItemsRefClick = (e) => {
    if (this.props.isDisabled) {
      return;
    }

    if (
      e.target.contains(this.selectedItemsRef.current) ||
      e.target.contains(this.placeholderRef.current)
    ) {
      this.showObjectBrowser(e);
    }
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { id, description, fieldSet, value, mode, onChange, isDisabled } =
      this.props;

    let items = compact(!isArray(value) && value ? [value] : value || []);

    let icon =
      mode === 'multiple' || items.length === 0 ? navTreeSVG : clearSVG;
    let iconAction =
      mode === 'multiple' || items.length === 0
        ? this.showObjectBrowser
        : (e) => {
            e.preventDefault();
            onChange(id, this.props.return === 'single' ? null : []);
          };

    return (
      <FormFieldWrapper
        {...this.props}
        className={description ? 'help text' : 'text'}
      >
        <div
          className="objectbrowser-field"
          aria-labelledby={`fieldset-${
            fieldSet || 'default'
          }-field-label-${id}`}
        >
          <div
            className="selected-values"
            onClick={this.handleSelectedItemsRefClick}
            onKeyDown={this.handleSelectedItemsRefClick}
            role="searchbox"
            tabIndex={0}
            ref={this.selectedItemsRef}
          >
            {items.map((item) => this.renderLabel(item))}

            {items.length === 0 && this.props.mode === 'multiple' && (
              <div className="placeholder" ref={this.placeholderRef}>
                {this.props.placeholder ??
                  this.props.intl.formatMessage(messages.placeholder)}
              </div>
            )}
            {this.props.allowExternals &&
              items.length === 0 &&
              this.props.mode !== 'multiple' && (
                <input
                  onKeyDown={this.onKeyDownManualLink}
                  onChange={this.onManualLinkInput}
                  value={this.state.manualLinkInput}
                  placeholder={
                    this.props.placeholder ??
                    this.props.intl.formatMessage(messages.placeholder)
                  }
                />
              )}
          </div>
          {this.state.manualLinkInput && isEmpty(items) && (
            <Button.Group>
              <Button
                basic
                className="cancel"
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({ manualLinkInput: '' });
                }}
              >
                <Icon name={clearSVG} size="18px" color="#e40166" />
              </Button>
              <Button
                basic
                primary
                disabled={!this.state.validURL}
                onClick={(e) => {
                  e.stopPropagation();
                  this.onSubmitManualLink();
                }}
              >
                <Icon name={aheadSVG} size="18px" />
              </Button>
            </Button.Group>
          )}
          {!this.state.manualLinkInput && (
            <Button
              aria-label={this.props.intl.formatMessage(
                messages.openObjectBrowser,
              )}
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
  }
}

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
