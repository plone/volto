/**
 * Edit map tile.
 * @module components/manage/Tiles/Maps/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input, Message } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import cx from 'classnames';

import { Icon } from '../../../../components';
import trashSVG from '../../../../icons/delete.svg';
import clearSVG from '../../../../icons/clear.svg';
import imageLeftSVG from '../../../../icons/image-left.svg';
import imageRightSVG from '../../../../icons/image-right.svg';
import imageFitSVG from '../../../../icons/image-fit.svg';
import imageFullSVG from '../../../../icons/image-full.svg';
import globeSVG from '../../../../icons/globe.svg';
import addSVG from '../../../../icons/circle-plus.svg';

import { createContent } from '../../../../actions';

const messages = defineMessages({
  ImageTileInputPlaceholder: {
    id: 'Enter Map URL',
    defaultMessage: 'Enter Map URL',
  },
});

@injectIntl
@connect(
  state => ({
    request: state.content.create,
    content: state.content.data,
  }),
  dispatch => bindActionCreators({ createContent }, dispatch),
)
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
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onAddTile: PropTypes.func.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
    onFocusPreviousTile: PropTypes.func.isRequired,
    onFocusNextTile: PropTypes.func.isRequired,
    createContent: PropTypes.func.isRequired,
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
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (
      this.props.request.loading &&
      nextProps.request.loaded &&
      this.state.uploading
    ) {
      this.setState({
        uploading: false,
      });
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        url: nextProps.content['@id'],
      });
    }
    if (nextProps.selected) {
      this.node.focus();
    }
  }

  /**
   * Align tile handler
   * @method onAlignTile
   * @param {string} align Alignment option
   * @returns {undefined}
   */
  onAlignTile(align) {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      align,
    });
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
  onSubmitUrl = e => {
    e.preventDefault();
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      url: this.state.url,
    });
  };

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
   * handleKeyDown
   * @method handleKeyDown
   * @param {event} e Event
   * @returns {undefined}
   */
  handleKeyDown = e => {
    if (e.key === 'ArrowUp') {
      this.props.onFocusPreviousTile(this.props.tile, this.node);
      e.preventDefault();
    }
    if (e.key === 'ArrowDown') {
      this.props.onFocusNextTile(this.props.tile, this.node);
      e.preventDefault();
    }
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div
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
        onKeyDown={this.handleKeyDown}
        ref={node => {
          this.node = node;
        }}
      >
        {this.props.selected &&
          !!this.props.data.url && (
            <div className="toolbar">
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={this.onAlignTile.bind(this, 'left')}
                  active={this.props.data.align === 'left'}
                >
                  <Icon name={imageLeftSVG} size="24px" />
                </Button>
              </Button.Group>
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={this.onAlignTile.bind(this, 'right')}
                  active={this.props.data.align === 'right'}
                >
                  <Icon name={imageRightSVG} size="24px" />
                </Button>
              </Button.Group>
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={this.onAlignTile.bind(this, 'center')}
                  active={
                    this.props.data.align === 'center' || !this.props.data.align
                  }
                >
                  <Icon name={imageFitSVG} size="24px" />
                </Button>
              </Button.Group>
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={this.onAlignTile.bind(this, 'full')}
                  active={this.props.data.align === 'full'}
                >
                  <Icon name={imageFullSVG} size="24px" />
                </Button>
              </Button.Group>
              <div className="separator" />
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={() =>
                    this.props.onChangeTile(this.props.tile, {
                      ...this.props.data,
                      url: '',
                    })
                  }
                >
                  <Icon name={clearSVG} size="24px" color="#e40166" />
                </Button>
              </Button.Group>
            </div>
          )}
        {this.props.selected &&
          !this.props.data.url && (
            <div className="toolbar">
              <Icon name={globeSVG} size="24px" />
              <form onSubmit={e => this.onSubmitUrl(e)}>
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
        {this.props.selected && (
          <Button
            icon
            basic
            onClick={() => this.props.onDeleteTile(this.props.tile)}
            className="tile-delete-button"
          >
            <Icon name={trashSVG} size="18px" />
          </Button>
        )}
        <div className="append-new-tile-wrapper">
          <div
            className="divider"
            onClick={() => this.props.onAddTile('text', this.props.index + 1)}
          >
            <div className="divider-inner" />
          </div>
          <Button
            basic
            icon
            onClick={() => this.props.onAddTile('text', this.props.index + 1)}
            className="tile-add-button between-tiles"
          >
            <Icon name={addSVG} className="tile-add-button" size="24px" />
          </Button>
        </div>
      </div>
    );
  }
}
