/**
 * Edit image block.
 * @module components/manage/Blocks/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { readAsDataURL } from 'promise-file-reader';
import { Button, Dimmer, Input, Loader, Message } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import loadable from '@loadable/component';
import cx from 'classnames';
import { isEqual, isString } from 'lodash';

import {
  Icon,
  Image,
  ImageSidebar,
  SidebarPortal,
} from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';

const Dropzone = loadable(() => import('react-dropzone'));

const messages = defineMessages({
  ImageBlockInputPlaceholder: {
    id: 'Browse the site, drop an image, or type an URL',
    defaultMessage: 'Browse the site, drop an image, or type an URL',
  },
  uploadingImage: {
    id: 'Uploading image',
    defaultMessage: 'Uploading image',
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
    content: PropTypes.objectOf(PropTypes.any),
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    createContent: PropTypes.func.isRequired,
    openObjectBrowser: PropTypes.func.isRequired,
  };

  state = {
    uploading: false,
    url: '',
    dragging: false,
  };

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    // Update block data after upload finished
    if (
      this.props.request.loading &&
      nextProps.request.loaded &&
      this.state.uploading
    ) {
      this.setState({
        uploading: false,
      });
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        url: {
          '@id': nextProps.content['@id'],
          image_scales: { image: [nextProps.content.image] },
        },
        alt: '',
      });
    }
  }

  /**
   * @param {*} nextProps
   * @returns {boolean}
   * @memberof Edit
   */
  shouldComponentUpdate(nextProps) {
    return (
      this.props.selected ||
      nextProps.selected ||
      !isEqual(this.props.data, nextProps.data)
    );
  }

  /**
   * Upload image handler (not used), but useful in case that we want a button
   * not powered by react-dropzone
   * @method onUploadImage
   * @returns {undefined}
   */
  onUploadImage = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    this.setState({
      uploading: true,
    });
    readAsDataURL(file).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      this.props.createContent(
        getBaseUrl(this.props.pathname),
        {
          '@type': 'Image',
          title: file.name,
          image: {
            data: fields[3],
            encoding: fields[2],
            'content-type': fields[1],
            filename: file.name,
          },
        },
        this.props.block,
      );
    });
  };

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
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      url: flattenToAppURL(this.state.url),
    });
  };

  /**
   * Drop handler
   * @method onDrop
   * @param {array} files File objects
   * @returns {undefined}
   */
  onDrop = (file) => {
    this.setState({
      uploading: true,
    });

    readAsDataURL(file[0]).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      this.props.createContent(
        getBaseUrl(this.props.pathname),
        {
          '@type': 'Image',
          title: file[0].name,
          image: {
            data: fields[3],
            encoding: fields[2],
            'content-type': fields[1],
            filename: file[0].name,
          },
        },
        this.props.block,
      );
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
  onKeyDownVariantMenuForm = (e) => {
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
  onDragEnter = () => {
    this.setState({ dragging: true });
  };
  onDragLeave = () => {
    this.setState({ dragging: false });
  };

  node = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { data } = this.props;
    const placeholder =
      this.props.data.placeholder ||
      this.props.intl.formatMessage(messages.ImageBlockInputPlaceholder);

    return (
      <div
        className={cx(
          'block image align',
          {
            center: !Boolean(data.align),
          },
          data.align,
        )}
      >
        {data.url ? (
          <Image
            className={cx({
              'full-width': data.align === 'full',
              large: data.size === 'l',
              medium: data.size === 'm',
              small: data.size === 's',
            })}
            item={isString(data.url) ? undefined : data.url}
            src={isString(data.url) ? data.url : undefined}
            alt={data.alt || ''}
            loading="lazy"
            responsive={true}
          />
        ) : (
          <div>
            {this.props.editable && (
              <Dropzone
                noClick
                onDrop={this.onDrop}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
                className="dropzone"
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <Message>
                      {this.state.dragging && <Dimmer active></Dimmer>}
                      {this.state.uploading && (
                        <Dimmer active>
                          <Loader indeterminate>
                            {this.props.intl.formatMessage(
                              messages.uploadingImage,
                            )}
                          </Loader>
                        </Dimmer>
                      )}
                      <div className="no-image-wrapper">
                        <img src={imageBlockSVG} alt="" />
                        <div className="toolbar-inner">
                          <Button.Group>
                            <Button
                              basic
                              icon
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                this.props.openObjectBrowser({
                                  /**
                                   * link mode closes the browser automatically
                                   * after the first click, while image does not
                                   */
                                  mode: 'link',
                                  onSelectItem: (
                                    url,
                                    { title, image_field, image_scales },
                                  ) => {
                                    this.props.onChangeBlock(this.props.block, {
                                      ...this.props.data,
                                      url: {
                                        '@id': url,
                                        title,
                                        image_field,
                                        image_scales,
                                      },
                                      alt: this.props.data.alt || title,
                                    });
                                  },
                                });
                              }}
                            >
                              <Icon name={navTreeSVG} size="24px" />
                            </Button>
                          </Button.Group>
                          <Button.Group>
                            <label className="ui button basic icon">
                              <Icon name={uploadSVG} size="24px" />
                              <input
                                {...getInputProps({
                                  type: 'file',
                                  onChange: this.onUploadImage,
                                  style: { display: 'none' },
                                })}
                              />
                            </label>
                          </Button.Group>
                          <Input
                            onKeyDown={this.onKeyDownVariantMenuForm}
                            onChange={this.onChangeUrl}
                            placeholder={placeholder}
                            value={this.state.url}
                            onClick={(e) => {
                              e.target.focus();
                            }}
                            onFocus={(e) => {
                              this.props.onSelectBlock(this.props.id);
                            }}
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
                              disabled={!this.state.url}
                              onClick={(e) => {
                                e.stopPropagation();
                                this.onSubmitUrl();
                              }}
                            >
                              <Icon name={aheadSVG} size="30px" />
                            </Button>
                          </Button.Group>
                        </div>
                      </div>
                    </Message>
                  </div>
                )}
              </Dropzone>
            )}
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
  injectIntl,
  withBlockExtensions,
  connect(
    (state, ownProps) => ({
      request: state.content.subrequests[ownProps.block] || {},
      content: state.content.subrequests[ownProps.block]?.data,
    }),
    { createContent },
  ),
)(Edit);
