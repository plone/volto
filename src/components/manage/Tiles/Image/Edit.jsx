/**
 * Edit image tile.
 * @module components/manage/Tiles/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readAsDataURL } from 'promise-file-reader';
import { Button, Dimmer, Input, Loader, Message } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import cx from 'classnames';
import { settings } from '~/config';

import { Icon } from '../../../../components';
import { createContent } from '../../../../actions';
import { flattenToAppURL, getBaseUrl } from '../../../../helpers';

import trashSVG from '../../../../icons/delete.svg';
import clearSVG from '../../../../icons/clear.svg';
import folderSVG from '../../../../icons/folder.svg';
import imageSVG from '../../../../icons/image.svg';
import imageLeftSVG from '../../../../icons/image-left.svg';
import imageRightSVG from '../../../../icons/image-right.svg';
import imageFitSVG from '../../../../icons/image-fit.svg';
import imageFullSVG from '../../../../icons/image-full.svg';

const messages = defineMessages({
  ImageTileInputPlaceholder: {
    id: 'Browse or type URL',
    defaultMessage: 'Browse or type URL',
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
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
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

    this.onUploadImage = this.onUploadImage.bind(this);
    this.state = {
      uploading: false,
      url: '',
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
   * Upload image handler
   * @method onUploadImage
   * @returns {undefined}
   */
  onUploadImage({ target }) {
    const file = target.files[0];
    this.setState({
      uploading: true,
    });
    readAsDataURL(file).then(data => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      this.props.createContent(getBaseUrl(this.props.pathname), {
        '@type': 'Image',
        image: {
          data: fields[3],
          encoding: fields[2],
          'content-type': fields[1],
          filename: file.name,
        },
      });
    });
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
      url: target.value,
    });
  };

  /**
   * Submit url handler
   * @method onSubmitUrl
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
          'tile image align',
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
              <Icon name={imageSVG} size="24px" />
              <form onSubmit={e => this.onSubmitUrl(e)}>
                <Input
                  onChange={this.onChangeUrl}
                  placeholder={this.props.intl.formatMessage(
                    messages.ImageTileInputPlaceholder,
                  )}
                />
              </form>
              <Button.Group>
                <label className="ui button basic icon">
                  <Icon name={folderSVG} size="24px" />
                  <input
                    type="file"
                    onChange={this.onUploadImage}
                    style={{ display: 'none' }}
                  />
                </label>
              </Button.Group>
            </div>
          )}
        {this.props.data.url ? (
          <p>
            <img
              src={
                this.props.data.url.includes(settings.apiPath)
                  ? `${flattenToAppURL(this.props.data.url)}/@@images/image`
                  : this.props.data.url
              }
              alt=""
            />
          </p>
        ) : (
          <div>
            <Message>
              {this.state.uploading && (
                <Dimmer active>
                  <Loader indeterminate>Uploading image</Loader>
                </Dimmer>
              )}
              <center>
                <Icon name={imageSVG} size="100px" color="#b8c6c8" />
              </center>
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
      </div>
    );
  }
}
