/**
 * Edit map tile.
 * @module components/manage/Tiles/Maps/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Message } from 'semantic-ui-react';
import AlignTile from '../../../../helpers/AlignTile';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import cx from 'classnames';

import { Icon } from '../../../../components';
import globeSVG from '../../../../icons/globe.svg';

const messages = defineMessages({
  ImageTileInputPlaceholder: {
    id: 'Enter Map URL',
    defaultMessage: 'Enter Map URL',
  },
});

@injectIntl
/**
 * Edit image tile class.
 * @class Edit
 * @extends Component
 */
export default class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
    onFocusPreviousTile: PropTypes.func.isRequired,
    onFocusNextTile: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
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
      uploading: false,
      url: '',
      error: null,
    };
    this.onSubmitUrl = this.onSubmitUrl.bind(this);
    this.onKeyDownVariantMenuForm = this.onKeyDownVariantMenuForm.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selected) {
      this.node.focus();
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected) {
      this.node.focus();
    }
  }

  /**
   * Change url handler
   * @method onChangeUrl
   * @param {Object} target Target object
   * @returns {undefined}
   */
  onChangeUrl = ({ target }) => {
    this.setState({
      url: this.getSrc(target.value),
    });
  };

  /**
   * Submit url handler
   * @method onSubmitUrl
   * @param {string} e event
   * @returns {undefined}
   */
  onSubmitUrl() {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      url: this.state.url,
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

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div
        role="presentation"
        onClick={() => this.props.onSelectTile(this.props.tile)}
        className={cx(
          'tile maps align',
          {
            selected: this.props.selected,
            center: !Boolean(this.props.data.align),
          },
          this.props.data.align,
        )}
        tabIndex={0}
        onKeyDown={e =>
          this.props.handleKeyDown(
            e,
            this.props.index,
            this.props.tile,
            this.node,
          )
        }
        ref={node => {
          this.node = node;
        }}
      >
        {this.props.selected && !!this.props.data.url && (
          <div className="toolbar">
            <AlignTile
              align={this.props.data.align}
              onChangeTile={this.props.onChangeTile}
              data={this.props.data}
              tile={this.props.tile}
            />
          </div>
        )}
        {this.props.selected && !this.props.data.url && (
          <div className="toolbar">
            <Icon name={globeSVG} size="24px" />
            <form onKeyDown={this.onKeyDownVariantMenuForm}>
              <Input
                onChange={this.onChangeUrl}
                placeholder={this.props.intl.formatMessage(
                  messages.ImageTileInputPlaceholder,
                )}
              />
            </form>
          </div>
        )}
        {this.props.data.url ? (
          <div>
            <iframe
              title="Google Maps Embedded Tile"
              src={this.props.data.url}
              className="google-map"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : (
          <div>
            <Message>
              <Icon name={globeSVG} size="100px" color="#b8c6c8" />
              <FormattedMessage
                id="Maps instructions"
                defaultMessage="Please enter the Embed Code provided by Google Maps -> Share -> Embed map. It should contain the <iframe> code on it."
              />
              {this.state.error && (
                <span style={{ color: 'red' }}>
                  <FormattedMessage
                    id="Maps data error"
                    defaultMessage="Embed code error, please follow the instructions and try again."
                  />
                </span>
              )}
            </Message>
          </div>
        )}
      </div>
    );
  }
}
