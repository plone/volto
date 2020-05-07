/**
 * ObjectBrowserWidget component.
 * @module components/manage/Widgets/ObjectBrowserWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { map, remove, find } from 'lodash';
import {
  Form,
  Grid,
  Label,
  Popup,
  Icon as OldIcon,
  Button,
} from 'semantic-ui-react';

import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { defineMessages, injectIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  placeholder: {
    id: 'No items selected',
    defaultMessage: 'No items selected',
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
    mode: PropTypes.string,
    required: PropTypes.bool,
    multiple: PropTypes.bool,
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
    value: null,
    mode: 'link',
    multiple: true,
  };

  constructor(props) {
    super(props);
    this.selectedItemsRef = React.createRef();
    this.placeholderRef = React.createRef();
  }
  renderLabel(item) {
    return (
      <Popup
        key={item['@id']}
        content={
          <>
            <OldIcon name="home" /> {item['@id']}
          </>
        }
        trigger={
          <Label>
            {item.title}
            {this.props.multiple && (
              <OldIcon
                name="delete"
                onClick={event => {
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

  removeItem = item => {
    let value = [...this.props.value];
    remove(value, function(_item) {
      return _item['@id'] === item['@id'];
    });
    this.props.onChange(this.props.id, value);
  };

  onChange = item => {
    let value = this.props.multiple ? [...this.props.value] : [];
    let exists = find(value, { '@id': item['@id'] });
    if (!exists) {
      value.push(item);
      this.props.onChange(this.props.id, value);
    }
  };

  showObjectBrowser = ev => {
    ev.preventDefault();
    this.props.openObjectBrowser({
      mode: this.props.mode,
      onSelectItem: (url, item) => {
        this.onChange(item);
      },
    });
  };

  handleSelectedItemsRefClick = e => {
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
    const {
      id,
      title,
      required,
      description,
      error,
      value,
      multiple,
      onEdit,
      fieldSet,
      onChange,
    } = this.props;

    let icon = multiple || value.length == 0 ? navTreeSVG : clearSVG;
    let iconAction =
      multiple || value.length === 0
        ? this.showObjectBrowser
        : e => {
            e.preventDefault();
            onChange(id, []);
          };

    return (
      <Form.Field
        inline
        required={required}
        error={error.length > 0}
        className={description ? 'help text' : 'text'}
        id={`${fieldSet || 'field'}-${id}`}
      >
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width="4">
              <div className="wrapper">
                <label htmlFor={`field-${id}`}>
                  {onEdit && (
                    <i
                      aria-hidden="true"
                      className="grey bars icon drag handle"
                    />
                  )}
                  {title}
                </label>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <div className="objectbrowser-field">
                <div
                  className="selected-values"
                  onClick={this.handleSelectedItemsRefClick}
                  onKeyDown={this.handleSelectedItemsRefClick}
                  role="searchbox"
                  tabIndex={0}
                  ref={this.selectedItemsRef}
                >
                  {value.map(item => this.renderLabel(item))}

                  {value.length === 0 && (
                    <div className="placeholder" ref={this.placeholderRef}>
                      {this.props.intl.formatMessage(messages.placeholder)}
                    </div>
                  )}
                </div>

                {/* <Button onClick={this.showObjectBrowser} className="action">
                  <Icon name={navTreeSVG} size="18px" />
                </Button> */}

                <Button onClick={iconAction} className="action">
                  <Icon name={icon} size="18px" />
                </Button>
              </div>

              {map(error, message => (
                <Label key={message} basic color="red" pointing>
                  {message}
                </Label>
              ))}
            </Grid.Column>
          </Grid.Row>
          {description && (
            <Grid.Row stretched>
              <Grid.Column stretched width="12">
                <p className="help">{description}</p>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Form.Field>
    );
  }
}

export default compose(injectIntl, withObjectBrowser)(ObjectBrowserWidget);
