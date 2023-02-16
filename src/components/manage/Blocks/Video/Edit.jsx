/**
 * Edit video block.
 * @module components/manage/Blocks/Title/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { Button, Input, Message, Loader, Dimmer } from 'semantic-ui-react';
import cx from 'classnames';
import { isEqual } from 'lodash';

import { Icon, SidebarPortal, VideoSidebar } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import videoBlockSVG from '@plone/volto/components/manage/Blocks/Video/block-video.svg';
import Body from '@plone/volto/components/manage/Blocks/Video/Body';
import { connect } from 'react-redux';
import {
  withBlockExtensions,
  getBaseUrl,
  flattenToAppURL,
} from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { compose } from 'redux';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';

import { readAsDataURL } from 'promise-file-reader';
import loadable from '@loadable/component';
const Dropzone = loadable(() => import('react-dropzone'));

const messages = defineMessages({
  VideoFormDescription: {
    id: 'Specify a youtube video or playlist url',
    defaultMessage: 'Specify a youtube video or playlist url',
  },
  VideoBlockInputPlaceholder: {
    id: 'Type a Video (YouTube, Vimeo or mp4) URL',
    defaultMessage: 'Type a Video (YouTube, Vimeo or mp4) URL',
  },
  UploadingVideo: {
    id: 'Uploading video',
    defaultMessage: 'Uploading video',
  },
});

/**
 * Edit video block class.
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
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    createContent: PropTypes.func.isRequired,
    openObjectBrowser: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onSubmitUrl = this.onSubmitUrl.bind(this);
    this.onKeyDownVariantMenuForm = this.onKeyDownVariantMenuForm.bind(this);
    this.state = {
      uploading: false,
      url: '',
      dragging: false,
    };
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
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
        url: nextProps.content['@id'],
        alt: '',
      });
    }
  }

  /**
   * Upload video handler (not used), but useful in case that we want a button
   * not powered by react-dropzone
   * @method onUploadVideo
   * @returns {undefined}
   */
  onUploadVideo = (e) => {
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
          '@type': 'File',
          title: file.name,
          file: {
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
  onChangeUrl({ target }) {
    this.setState({
      url: target.value,
    });
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
   * Submit url handler
   * @method onSubmitUrl
   * @returns {undefined}
   */
  onSubmitUrl() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      url: flattenToAppURL(this.state.url),
    });
  }
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
          '@type': 'File',
          title: file[0].name,
          file: {
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

  resetSubmitUrl = () => {
    this.setState({
      url: '',
    });
  };
  onDragEnter = () => {
    this.setState({ dragging: true });
  };
  onDragLeave = () => {
    this.setState({ dragging: false });
  };

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
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { data } = this.props;
    const placeholder =
      this.props.data.placeholder ||
      this.props.intl.formatMessage(messages.VideoBlockInputPlaceholder);
    return (
      <div
        className={cx(
          'block video align',
          {
            selected: this.props.selected,
            center: !Boolean(this.props.data.align),
          },
          this.props.data.align,
        )}
      >
        {data.url ? (
          <Body data={this.props.data} isEditMode={true} />
        ) : (
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
                        {this.props.intl.formatMessage(messages.UploadingVideo)}
                      </Loader>
                    </Dimmer>
                  )}
                  <img src={videoBlockSVG} alt="" />
                  <div className="toolbar-inner">
                    <Button.Group>
                      <Button
                        basic
                        icon
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          this.props.openObjectBrowser({
                            mode: 'link',
                            overlay: true,
                            onSelectItem: (url) => {
                              this.setState({ url }, this.onSubmitUrl);
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
                            onChange: this.onUploadVideo,
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
                </Message>
              </div>
            )}
          </Dropzone>
        )}
        <SidebarPortal selected={this.props.selected}>
          <VideoSidebar {...this.props} resetSubmitUrl={this.resetSubmitUrl} />
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
