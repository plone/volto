/**
 * Edit video block.
 * @module components/manage/Blocks/Title/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { Button, Input, Embed, Message } from 'semantic-ui-react';
import cx from 'classnames';

import { Icon, SidebarPortal, VideoSidebar } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import videoBlockSVG from '@plone/volto/components/manage/Blocks/Video/block-video.svg';
import { isInternalURL, getParentUrl } from '@plone/volto/helpers';
import { settings } from '~/config';

const messages = defineMessages({
  VideoFormDescription: {
    id: 'Specify a youtube video or playlist url',
    defaultMessage: 'Specify a youtube video or playlist url',
  },
  VideoBlockInputPlaceholder: {
    id: 'Type a Video (YouTube, Vimeo or mp4) URL',
    defaultMessage: 'Type a Video (YouTube, Vimeo or mp4) URL',
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

    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onSubmitUrl = this.onSubmitUrl.bind(this);
    this.onKeyDownVariantMenuForm = this.onKeyDownVariantMenuForm.bind(this);
    this.state = {
      url: '',
    };
  }

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
   * Submit url handler
   * @method onSubmitUrl
   * @returns {undefined}
   */
  onSubmitUrl() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      url: this.state.url,
    });
  }

  resetSubmitUrl = () => {
    this.setState({
      url: '',
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
          <div
            className={cx('video-inner', {
              'full-width': this.props.data.align === 'full',
            })}
          >
            {data.url.match('youtu') ? (
              <>
                <div className="ui blocker" />
                {data.url.match('list') ? (
                  <Embed
                    url={`https://www.youtube.com/embed/videoseries?list=${
                      data.url.match(/^.*\?list=(.*)$/)[1]
                    }`}
                    icon="arrow right"
                    defaultActive
                    autoplay={false}
                  />
                ) : (
                  <Embed
                    id={
                      data.url.match(/.be\//)
                        ? data.url.match(/^.*\.be\/(.*)/)[1]
                        : data.url.match(/^.*\?v=(.*)$/)[1]
                    }
                    source="youtube"
                    icon="arrow right"
                    defaultActive
                    autoplay={false}
                  />
                )}
              </>
            ) : (
              <>
                <div className="ui blocker" />
                {data.url.match('vimeo') ? (
                  <Embed
                    id={data.url.match(/^.*\.com\/(.*)/)[1]}
                    source="vimeo"
                    icon="arrow right"
                    defaultActive
                    autoplay={false}
                  />
                ) : (
                  <>
                    <div className="ui blocker" />
                    {data.url.match('.mp4') ? (
                      // eslint-disable-next-line jsx-a11y/media-has-caption
                      <video
                        src={
                          isInternalURL(
                            data.url.replace(
                              getParentUrl(settings.apiPath),
                              '',
                            ),
                          )
                            ? `${data.url}/@@download/file`
                            : data.url
                        }
                        controls
                        type="video/mp4"
                      />
                    ) : (
                      <div>
                        <Message>
                          <center>
                            <FormattedMessage
                              id="Please enter a valid URL by deleting the block and adding a new video block."
                              defaultMessage="Please enter a valid URL by deleting the block and adding a new video block."
                            />
                          </center>
                        </Message>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ) : (
          <Message>
            <center>
              <img src={videoBlockSVG} alt="" />
              <div className="toolbar-inner">
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
                    onClick={(e) => {
                      e.stopPropagation();
                      this.onSubmitUrl();
                    }}
                  >
                    <Icon name={aheadSVG} size="30px" />
                  </Button>
                </Button.Group>
              </div>
            </center>
          </Message>
        )}
        <SidebarPortal selected={this.props.selected}>
          <VideoSidebar {...this.props} resetSubmitUrl={this.resetSubmitUrl} />
        </SidebarPortal>
      </div>
    );
  }
}

export default injectIntl(Edit);
