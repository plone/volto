/**
 * Edit image tile.
 * @module components/manage/Tiles/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { readAsDataURL } from 'promise-file-reader';
import { Button, Dimmer, Input, Loader, Message } from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import cx from 'classnames';
import Dropzone from 'react-dropzone';

import { settings } from '~/config';
import withObjectBrowser from '../../Sidebar/ObjectBrowser';

import { Icon, ImageSidebar, SidebarPortal } from '@plone/volto/components';
import { createContent } from '@plone/volto/actions';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';

import imageTileSVG from './tile-image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';

const messages = defineMessages({
  ImageTileInputPlaceholder: {
    id: 'Browse the site, drop an image, or type an URL',
    defaultMessage: 'Browse the site, drop an image, or type an URL',
  },
});

/**
 * Edit image tile class.
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
    tile: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
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
    handleKeyDown: PropTypes.func.isRequired,
    createContent: PropTypes.func.isRequired,
    openObjectBrowser: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  state = {
    uploading: false,
    url: '',
  };

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selected) {
      this.node.current.focus();
    }
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
      this.node.current.focus();
    }
  }

  /**
   * Upload image handler (not used), but useful in case that we want a button
   * not powered by react-dropzone
   * @method onUploadImage
   * @returns {undefined}
   */
  onUploadImage = ({ target }) => {
    const file = target.files[0];
    this.setState({
      uploading: true,
    });
    readAsDataURL(file).then(data => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      this.props.createContent(getBaseUrl(this.props.pathname), {
        '@type': 'Image',
        title: file.name,
        image: {
          data: fields[3],
          encoding: fields[2],
          'content-type': fields[1],
          filename: file.name,
        },
      });
    });
  };

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
   * @param {object} e Event
   * @returns {undefined}
   */
  onSubmitUrl = () => {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      url: this.state.url,
    });
  };

  /**
   * Drop handler
   * @method onDrop
   * @param {array} files File objects
   * @returns {undefined}
   */
  onDrop = file => {
    this.setState({
      uploading: true,
    });

    readAsDataURL(file[0]).then(data => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      this.props.createContent(getBaseUrl(this.props.pathname), {
        '@type': 'Image',
        title: file[0].name,
        image: {
          data: fields[3],
          encoding: fields[2],
          'content-type': fields[1],
          filename: file[0].name,
        },
      });
    });
  };

  /**
   * Keydown handler on Variant Menu Form
   * This is required since the ENTER key is already mapped to a onKeyDown
   * event and needs to be overriden with a child onKeyDown.
   * @method onKeyDownVariantMenuForm
   * @param {Object} e Event object
   * @returns {undefined}
   */
  onKeyDownVariantMenuForm = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.onSubmitUrl();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // TODO: Do something on ESC key
    }
  };

  node = React.createRef();

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
          'tile image align',
          {
            selected: this.props.selected,
            center: !Boolean(this.props.data.align),
          },
          this.props.data.align,
        )}
        onKeyDown={e =>
          this.props.handleKeyDown(
            e,
            this.props.index,
            this.props.tile,
            this.node.current,
          )
        }
        ref={this.node}
      >
        {this.props.selected && !!this.props.data.url && (
          <div className="toolbar">
            {this.props.appendActions && <>{this.props.appendActions}</>}
            {this.props.detached && this.props.appendActions && (
              <div className="separator" />
            )}
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
            {this.props.appendSecondaryActions && (
              <>{this.props.appendSecondaryActions}</>
            )}
          </div>
        )}
        {this.props.selected &&
          !this.props.data.url &&
          this.props.appendSecondaryActions && (
            <div className="toolbar">{this.props.appendSecondaryActions}</div>
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
            <Dropzone onDrop={this.onDrop} className="dropzone">
              <Message>
                {this.state.uploading && (
                  <Dimmer active>
                    <Loader indeterminate>Uploading image</Loader>
                  </Dimmer>
                )}
                <center>
                  <img src={imageTileSVG} alt="" />
                  <div className="toolbar-inner">
                    <Button.Group>
                      <Button
                        basic
                        icon
                        onClick={e => {
                          e.stopPropagation();
                          this.props.openObjectBrowser();
                        }}
                      >
                        <Icon name={navTreeSVG} size="24px" />
                      </Button>
                    </Button.Group>
                    <Input
                      onKeyDown={this.onKeyDownVariantMenuForm}
                      onChange={this.onChangeUrl}
                      placeholder={this.props.intl.formatMessage(
                        messages.ImageTileInputPlaceholder,
                      )}
                      // Prevents propagation to the Dropzone and the opening
                      // of the upload browser dialog
                      onClick={e => e.stopPropagation()}
                    />
                    {this.state.url && (
                      <Button.Group>
                        <Button basic className="cancel">
                          <Icon name={clearSVG} size="30px" />
                        </Button>
                      </Button.Group>
                    )}
                    <Button.Group>
                      <Button basic primary>
                        <Icon name={aheadSVG} size="30px" />
                      </Button>
                    </Button.Group>
                  </div>
                </center>
              </Message>
            </Dropzone>
          </div>
        )}
        <SidebarPortal selected={this.props.selected}>
          <ImageSidebar {...this.props} />
        </SidebarPortal>
      </div>
    );
  }
}

export default compose(
  withObjectBrowser,
  injectIntl,
  connect(
    state => ({
      request: state.content.create,
      content: state.content.data,
    }),
    { createContent },
  ),
)(Edit);
