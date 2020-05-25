/**
 * Edit map block.
 * @module components/manage/Blocks/Maps/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Message } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';

import { Icon, SidebarPortal, MapsSidebar } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import mapsBlockSVG from '@plone/volto/components/manage/Blocks/Maps/block-maps.svg';

const messages = defineMessages({
  MapsBlockInputPlaceholder: {
    id: 'Enter map Embed Code',
    defaultMessage: 'Enter map Embed Code',
  },
  left: {
    id: 'Left',
    defaultMessage: 'Left',
  },
  right: {
    id: 'Right',
    defaultMessage: 'Right',
  },
  center: {
    id: 'Center',
    defaultMessage: 'Center',
  },
  full: {
    id: 'Full',
    defaultMessage: 'Full',
  },
  GoogleMapsEmbeddedBlock: {
    id: 'Google Maps Embedded Block',
    defaultMessage: 'Google Maps Embedded Block',
  },
});

/**
 * Edit image block class.
 * @class Edit
 * @extends Component
 */
class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.getSrc = this.getSrc.bind(this);
    this.state = {
      url: '',
      error: null,
    };
    this.onSubmitUrl = this.onSubmitUrl.bind(this);
    this.onKeyDownVariantMenuForm = this.onKeyDownVariantMenuForm.bind(this);
  }

  /**
   * Change url handler
   * @method onChangeUrl
   * @param {Object} target Target object
   * @returns {undefined}
   */
  onChangeUrl = ({ target }) => {
    this.setState({
      url: target.value,
    });
  };

  /**
   * Submit url handler
   * @method onSubmitUrl
   * @param {string} e event
   * @returns {undefined}
   */
  onSubmitUrl() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      url: this.getSrc(this.state.url),
    });
  }

  /**
   * Keydown handler on Variant Menu Form
   * This is required since the ENTER key is already mapped to a onKeyDown
   * event and needs to be overriden with a child onKeyDown.
   * @method onKeyDownVariantMenuForm
   * @param {Object} e Event object
   * @returns {undefined}
   */
  onKeyDownVariantMenuForm(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.onSubmitUrl();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // TODO: Do something on ESC key
    }
  }

  /**
   * get getSrc handler
   * @method getSrc
   * @param {string} embed Embed HTML code from Google Maps share option
   * @returns {string} Source URL
   */
  getSrc(embed) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(embed, 'text/html');
    const iframe = doc.getElementsByTagName('iframe');
    if (iframe.length === 0) {
      this.setState({ error: true });
      return '';
    }
    this.setState({ error: false });
    return iframe[0].src;
  }

  resetSubmitUrl = () => {
    this.setState({
      url: '',
    });
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div
        className={cx(
          'block maps align',
          {
            center: !Boolean(this.props.data.align),
          },
          this.props.data.align,
        )}
      >
        {this.props.data.url ? (
          <div
            className={cx('maps-inner', {
              'full-width': this.props.data.align === 'full',
            })}
          >
            <iframe
              title={this.props.intl.formatMessage(
                messages.GoogleMapsEmbeddedBlock,
              )}
              src={this.props.data.url}
              className="google-map"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : (
          <Message>
            <center>
              <img src={mapsBlockSVG} alt="" />
              <div className="toolbar-inner">
                <Input
                  onKeyDown={this.onKeyDownVariantMenuForm}
                  onChange={this.onChangeUrl}
                  placeholder={this.props.intl.formatMessage(
                    messages.MapsBlockInputPlaceholder,
                  )}
                  value={this.state.url}
                  // Prevents propagation to the Dropzone and the opening
                  // of the upload browser dialog
                  onClick={(e) => e.stopPropagation()}
                />
                {this.state.url && (
                  <Button.Group>
                    <Button
                      basic
                      className="cancel"
                      onClick={(e) => {
                        e.stopPropagation();
                        this.setState({ url: '' });
                      }}
                    >
                      <Icon name={clearSVG} size="30px" />
                    </Button>
                  </Button.Group>
                )}
                <Button.Group>
                  <Button
                    basic
                    primary
                    onClick={(e) => {
                      e.stopPropagation();
                      this.onSubmitUrl();
                    }}
                  >
                    <Icon name={aheadSVG} size="30px" />
                  </Button>
                </Button.Group>
              </div>
              <div className="message-text">
                <FormattedMessage
                  id="Please enter the Embed Code provided by Google Maps -> Share -> Embed map. It should contain the <iframe> code on it."
                  defaultMessage="Please enter the Embed Code provided by Google Maps -> Share -> Embed map. It should contain the <iframe> code on it."
                />
                {this.state.error && (
                  <div style={{ color: 'red' }}>
                    <FormattedMessage
                      id="Embed code error, please follow the instructions and try again."
                      defaultMessage="Embed code error, please follow the instructions and try again."
                    />
                  </div>
                )}
              </div>
            </center>
          </Message>
        )}
        <SidebarPortal selected={this.props.selected}>
          <MapsSidebar {...this.props} resetSubmitUrl={this.resetSubmitUrl} />
        </SidebarPortal>
      </div>
    );
  }
}

export default injectIntl(Edit);
