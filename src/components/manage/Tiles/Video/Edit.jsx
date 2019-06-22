/**
 * Edit video tile.
 * @module components/manage/Tiles/Title/Edit
 */
import AlignTile from '../../../../helpers/AlignTile';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';
import videoSVG from '../../../../icons/videocamera.svg';
import { Button, Input, Embed, Message } from 'semantic-ui-react';
import { Icon } from '../../../../components';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  VideoFormDescription: {
    id: 'Specify a youtube video or playlist url',
    defaultMessage: 'Specify a youtube video or playlist url',
  },
  VideoTileInputPlaceholder: {
    id: 'Enter Video URL',
    defaultMessage: 'Enter Video URL',
  },
});

@injectIntl
/**
 * Edit video tile class.
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

    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onSubmitUrl = this.onSubmitUrl.bind(this);
    this.onKeyDownVariantMenuForm = this.onKeyDownVariantMenuForm.bind(this);
    this.state = {
      url: '',
    };
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
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { data } = this.props;
    return (
      <div
        role="presentation"
        onClick={() => this.props.onSelectTile(this.props.tile)}
        className={cx(
          'tile video align',
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
            <Icon name={videoSVG} size="24px" />
            <form onKeyDown={this.onKeyDownVariantMenuForm}>
              <Input
                onChange={this.onChangeUrl}
                placeholder={this.props.intl.formatMessage(
                  messages.VideoTileInputPlaceholder,
                )}
              />
            </form>
          </div>
        )}
        {data.url ? (
          <div className="video-inner">
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
