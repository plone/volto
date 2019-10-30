/**
 * Edit video block.
 * @module components/manage/Blocks/Title/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { Button, Input, Embed, Message } from 'semantic-ui-react';
import cx from 'classnames';

import { Icon } from '../../../../components';
import imageLeftSVG from '../../../../icons/image-left.svg';
import imageRightSVG from '../../../../icons/image-right.svg';
import imageFitSVG from '../../../../icons/image-fit.svg';
import imageFullSVG from '../../../../icons/image-full.svg';
import videoSVG from '../../../../icons/videocamera.svg';

const messages = defineMessages({
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  VideoFormDescription: {
    id: 'Specify a youtube video or playlist url',
    defaultMessage: 'Specify a youtube video or playlist url',
  },
  VideoBlockInputPlaceholder: {
    id: 'Enter Video URL',
    defaultMessage: 'Enter Video URL',
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

  /**
   * Align block handler
   * @method onAlignBlock
   * @param {string} align Alignment option
   * @returns {undefined}
   */
  onAlignBlock(align) {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      align,
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
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { data } = this.props;
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
        {this.props.selected && !!this.props.data.url && (
          <div className="toolbar">
            <Button.Group>
              <Button
                icon
                basic
                aria-label="Left"
                onClick={this.onAlignBlock.bind(this, 'left')}
                active={data.align === 'left'}
              >
                <Icon name={imageLeftSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                aria-label="Right"
                onClick={this.onAlignBlock.bind(this, 'right')}
                active={data.align === 'right'}
              >
                <Icon name={imageRightSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                aria-label="Center"
                onClick={this.onAlignBlock.bind(this, 'center')}
                active={data.align === 'center' || !data.align}
              >
                <Icon name={imageFitSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                aria-label="Full"
                onClick={this.onAlignBlock.bind(this, 'full')}
                active={data.align === 'full'}
              >
                <Icon name={imageFullSVG} size="24px" />
              </Button>
            </Button.Group>
          </div>
        )}
        {this.props.selected && !this.props.data.url && (
          <div className="toolbar">
            <Icon name={videoSVG} size="24px" />
            <Input
              onKeyDown={this.onKeyDownVariantMenuForm}
              onChange={this.onChangeUrl}
              placeholder={this.props.intl.formatMessage(
                messages.VideoBlockInputPlaceholder,
              )}
            />
          </div>
        )}
        {data.url ? (
          <div
            className={cx('video-inner', {
              'full-width': this.props.data.align === 'full',
            })}
          >
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
          </div>
        ) : (
          <div>
            <Message>
              <center>
                <Icon name={videoSVG} size="100px" color="#b8c6c8" />
              </center>
            </Message>
          </div>
        )}
      </div>
    );
  }
}

export default injectIntl(Edit);
