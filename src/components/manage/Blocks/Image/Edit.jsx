/**
 * Edit image block.
 * @module components/manage/Blocks/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { readAsDataURL } from 'promise-file-reader';
import { Dimmer, Loader, Message } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import loadable from '@loadable/component';
import cx from 'classnames';
import { isEqual } from 'lodash';

import { ImageSidebar, SidebarPortal } from '@plone/volto/components';
import { createContent } from '@plone/volto/actions';
import {
  flattenToAppURL,
  getBaseUrl,
  isInternalURL,
} from '@plone/volto/helpers';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';

const Dropzone = loadable(() => import('react-dropzone'));

const messages = defineMessages({
  ImageBlockInputPlaceholder: {
    id:
      'Click on this area or drop an image. If you have the source url, use the sidebar',
    defaultMessage:
      'Click on this area or drop an image. If you have the source url, use the sidebar',
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
    content: PropTypes.objectOf(PropTypes.any).isRequired,
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
    dragging: false,
  };

  /**
   * Component Did Update
   * @method componentDidUpdate
   * @param {Object} prevProps Previous properties
   * @returns {undefined}
   */
  componentDidUpdate(prevProps) {
    if (
      prevProps.request.loading &&
      this.props.request.loaded &&
      this.state.uploading
    ) {
      this.setState({
        uploading: false,
      });
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        url: flattenToAppURL(this.props.content['@id']),
        source: [
          {
            '@id': flattenToAppURL(this.props.content['@id']),
            title: this.props.content.title,
          },
        ],
      });
    }
  }

  componentDidMount() {
    ///bbb
    if (this.props.data.url) {
      const sourceUrl = flattenToAppURL(this.props.data.url);
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        source: [
          {
            '@id': sourceUrl,
            title: sourceUrl,
          },
        ],
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
    const url = data?.source?.[0]?.['@id'] || data.url;
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
        {url ? (
          <>
            <img
              className={cx({
                'full-width': data.align === 'full',
                large: data.size === 'l',
                medium: data.size === 'm',
                small: data.size === 's',
              })}
              src={
                isInternalURL(url)
                  ? // Backwards compat in the case that the block is storing the full server URL
                    (() => {
                      if (data.size === 'l')
                        return `${flattenToAppURL(url)}/@@images/image`;
                      if (data.size === 'm')
                        return `${flattenToAppURL(url)}/@@images/image/preview`;
                      if (data.size === 's')
                        return `${flattenToAppURL(url)}/@@images/image/mini`;
                      return `${flattenToAppURL(url)}/@@images/image`;
                    })()
                  : url
              }
              alt={data.alt || ''}
            />
          </>
        ) : (
          <div>
            {this.props.editable && (
              <Dropzone
                onDrop={this.onDrop}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
                className="dropzone"
              >
                {({ getRootProps, getInputProps, open }) => (
                  <div {...getRootProps()}>
                    <Message>
                      {this.state.dragging && <Dimmer active></Dimmer>}
                      {this.state.uploading && (
                        <Dimmer active>
                          <Loader indeterminate>Uploading image</Loader>
                        </Dimmer>
                      )}
                      <div className="no-image-wrapper">
                        <img src={imageBlockSVG} alt="" />
                        <input
                          {...getInputProps({
                            onChange: this.onUploadImage,
                          })}
                        />
                        <p>{placeholder}</p>
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
  connect(
    (state, ownProps) => ({
      request: state.content.subrequests[ownProps.block] || {},
      content: state.content.subrequests[ownProps.block]?.data,
      mainContent: state.content.update,
    }),
    { createContent },
  ),
)(Edit);
