/**
 * ObjectBrowserWidget component.
 * @module components/manage/Widgets/ObjectBrowserWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { remove } from 'lodash';

import { Label, Popup, Button } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { defineMessages, injectIntl } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import homeSVG from '@plone/volto/icons/home.svg';

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
});

/**
 * ObjectBrowserWidget component class.
 * @class ObjectBrowserWidget
 * @extends Component
 */
class ObjectBrowserWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    mode: PropTypes.string, //link,image,multiple
    required: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.object,
    ]),
    onChange: PropTypes.func.isRequired,
    openObjectBrowser: PropTypes.func.isRequired,
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
  };

  constructor(props) {
    super(props);
    this.selectedItemsRef = React.createRef();
    this.placeholderRef = React.createRef();
  }
  renderLabel(item) {
    return (
      <Popup
        key={flattenToAppURL(item['@id'])}
        content={
          <>
            <Icon name={homeSVG} size="18px" />
            {flattenToAppURL(item['@id'])}
          </>
        }
        trigger={
          <Label>
            {item.title}
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
    let value = this.props.mode === 'multiple' ? [...this.props.value] : [];
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
      this.props.onChange(this.props.id, value);
    } else {
      //remove item
      value.splice(index, 1);
      this.props.onChange(this.props.id, value);
    }
  };

  showObjectBrowser = (ev) => {
    ev.preventDefault();
    this.props.openObjectBrowser({
      mode: this.props.mode,
      onSelectItem: (url, item) => {
        this.onChange(item);
      },
      propDataName: 'value',
      selectableTypes: this.props.widgetOptions?.pattern_options
        ?.selectableTypes,
      maximumSelectionSize: this.props.widgetOptions?.pattern_options
        ?.maximumSelectionSize,
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
    const { id, description, value, mode, onChange, isDisabled } = this.props;

    let icon =
      mode === 'multiple' || value.length === 0 ? navTreeSVG : clearSVG;
    let iconAction =
      mode === 'multiple' || value.length === 0
        ? this.showObjectBrowser
        : (e) => {
            e.preventDefault();
            onChange(id, []);
          };

    let items = value ? value.filter((item) => item != null) : [];

    return (
      <FormFieldWrapper
        {...this.props}
        className={description ? 'help text' : 'text'}
      >
        <div className="objectbrowser-field">
          <div
            className="selected-values"
            onClick={this.handleSelectedItemsRefClick}
            onKeyDown={this.handleSelectedItemsRefClick}
            role="searchbox"
            tabIndex={0}
            ref={this.selectedItemsRef}
          >
            {items.map((item) => this.renderLabel(item))}

            {items.length === 0 && (
              <div className="placeholder" ref={this.placeholderRef}>
                {this.props.intl.formatMessage(messages.placeholder)}
              </div>
            )}
          </div>

          <Button onClick={iconAction} className="action" disabled={isDisabled}>
            <Icon name={icon} size="18px" />
          </Button>
        </div>
      </FormFieldWrapper>
    );
  }
}

const ObjectBrowserWidgetMode = (mode) =>
  compose(
    injectIntl,
    withObjectBrowser,
  )((props) => <ObjectBrowserWidget {...props} mode={mode} />);
export { ObjectBrowserWidgetMode };
export default compose(injectIntl, withObjectBrowser)(ObjectBrowserWidget);
