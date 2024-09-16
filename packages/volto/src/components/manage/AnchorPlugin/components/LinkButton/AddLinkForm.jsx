/**
 * Add link form.
 * @module components/manage/AnchorPlugin/components/LinkButton/AddLinkForm
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

// import unionClassNames from 'union-class-names';
import cx from 'classnames';
import {
  addAppURL,
  isInternalURL,
  flattenToAppURL,
  URLUtils,
} from '@plone/volto/helpers';

import doesNodeContainClick from '@plone/volto/helpers/Utils/doesNodeContainClick';
import { Input, Form, Button } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';

import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import linkSVG from '@plone/volto/icons/link.svg';

import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { withRouter } from 'react-router';

import { Icon } from '@plone/volto/components';

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
 * Add link form class.
 * @class AddLinkForm
 * @extends Component
 */
class AddLinkForm extends Component {
  static propTypes = {
    onChangeValue: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onOverrideContent: PropTypes.func.isRequired,
    theme: PropTypes.objectOf(PropTypes.any).isRequired,
    openObjectBrowser: PropTypes.func.isRequired,
  };

  static defaultProps = {
    objectBrowserPickerType: 'link',
    placeholder: 'Enter URL or select an item',
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs AddLinkForm
   */
  constructor(props) {
    super(props);

    this.state = {
      value: isInternalURL(props.data.url)
        ? flattenToAppURL(props.data.url)
        : props.data.url || '',
      isInvalid: false,
    };
    this.onRef = this.onRef.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    setTimeout(() => this.input.focus(), 50);
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside = (e) => {
    if (
      this.linkFormContainer.current &&
      doesNodeContainClick(this.linkFormContainer.current, e)
    )
      return;
    if (this.linkFormContainer.current && this.props.isObjectBrowserOpen)
      return;
    this.onClose();
  };

  /**
   * Ref handler
   * @method onRef
   * @param {Object} node Node
   * @returns {undefined}
   */
  onRef(node) {
    this.input = node;
  }

  linkFormContainer = React.createRef();

  /**
   * Change handler
   * @method onChange
   * @param {Object} value Value
   * @returns {undefined}
   */
  onChange(value, clear) {
    let nextState = { value };
    if (!clear) {
      if (
        this.state.isInvalid &&
        URLUtils.isUrl(URLUtils.normalizeUrl(value))
      ) {
        nextState.isInvalid = false;
      }

      if (isInternalURL(value)) {
        nextState = { value: flattenToAppURL(value) };
      }
    }
    this.setState(nextState);

    if (clear) this.props.onClear();
  }

  /**
   * Select item handler
   * @method onSelectItem
   * @param {string} e event
   * @param {string} url Url
   * @returns {undefined}
   */
  onSelectItem = (e, url) => {
    e.preventDefault();
    this.setState({
      value: url,
      isInvalid: false,
    });
    this.props.onChangeValue(addAppURL(url));
  };

  /**
   * Clear handler
   * @method clear
   * @param {Object} value Value
   * @returns {undefined}
   */
  clear() {
    const nextState = { value: '' };
    this.setState(nextState);

    this.props.onClear();
  }

  /**
   * Close handler
   * @method onClose
   * @returns {undefined}
   */
  onClose = () => this.props.onOverrideContent(undefined);

  /**
   * Keydown handler
   * @method onKeyDown
   * @param {Object} e Event object
   * @returns {undefined}
   */
  onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.onSubmit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.onClose();
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @returns {undefined}
   */
  onSubmit() {
    let { value: url } = this.state;

    const checkedURL = URLUtils.checkAndNormalizeUrl(url);
    url = checkedURL.url;
    if (!checkedURL.isValid) {
      this.setState({ isInvalid: true });
      return;
    }

    const editorStateUrl = isInternalURL(url) ? addAppURL(url) : url;

    this.props.onChangeValue(editorStateUrl);
    this.onClose();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { value, isInvalid } = this.state;
    const className = isInvalid
      ? cx(
          'ui input editor-link',
          'input-anchorlink-theme',
          'input-anchorlink-theme-Invalid',
        )
      : cx('ui input editor-link', 'input-anchorlink-theme');

    return (
      <div className="link-form-container" ref={this.linkFormContainer}>
        <Icon name={linkSVG} color="#B8B2C8" size="20px" />
        <Form.Field inline>
          <div className="wrapper">
            <Input
              className={className}
              name="link"
              value={value || ''}
              onChange={({ target }) => this.onChange(target.value)}
              placeholder={
                this.props.placeholder ||
                this.props.intl.formatMessage(messages.placeholder)
              }
              onKeyDown={this.onKeyDown}
              ref={this.onRef}
            />
            {value.length > 0 ? (
              <Button.Group>
                <Button
                  basic
                  className="cancel"
                  aria-label={this.props.intl.formatMessage(messages.clear)}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.clear();
                    this.input.focus();
                  }}
                >
                  <Icon name={clearSVG} size="24px" />
                </Button>
              </Button.Group>
            ) : this.props.objectBrowserPickerType === 'link' ? (
              <Button.Group>
                <Button
                  basic
                  icon
                  aria-label={this.props.intl.formatMessage(
                    messages.openObjectBrowser,
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.openObjectBrowser({
                      mode: this.props.objectBrowserPickerType,
                      overlay: true,
                      onSelectItem: (url) => {
                        this.onChange(url);
                        this.onSubmit();
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
                aria-label={this.props.intl.formatMessage(messages.submit)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.onSubmit();
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
}

export default compose(injectIntl, withRouter, withObjectBrowser)(AddLinkForm);
