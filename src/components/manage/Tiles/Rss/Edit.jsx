/**
 * Edit rss tile.
 * @module components/manage/Tiles/Rss/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Button, Form, Input, Embed, Message, Container } from 'semantic-ui-react';
import Parser from 'rss-parser';
import { Icon } from '../../../../components';
import trashSVG from '../../../../icons/delete.svg';
import clearSVG from '../../../../icons/clear.svg';
import imageLeftSVG from '../../../../icons/image-left.svg';
import imageRightSVG from '../../../../icons/image-right.svg';
import imageFitSVG from '../../../../icons/image-fit.svg';
import imageFullSVG from '../../../../icons/image-full.svg';
import rssSVG from '../../../../icons/rss.svg';

const messages = defineMessages({
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  VideoFormDescription: {
    id: 'Specify a Rss  url',
    defaultMessage: 'Specify a Rss url',
  },
  VideoTileInputPlaceholder: {
    id: 'Enter site URL',
    defaultMessage: 'Enter site URL',
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
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
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
  onSubmitUrl(e) {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      url: this.state.url,
    });
    (async () => {
      let parser = new Parser();
      let feed = await parser.parseURL(this.state.url);
      console.log(feed);
      feed.items.forEach(item => {
        console.log(item.title + ':' + item.link)
      });
    })();

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
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { data } = this.props;
    return (
      <div
        onClick={() => this.props.onSelectTile(this.props.tile)}
        className={[
          'tile',
          'rss',
          'align',
          this.props.selected && 'selected',
          data.align,
        ]
          .filter(e => !!e)
          .join(' ')}
      >
        {this.props.selected &&
          !!this.props.data.url && (
            <div className="toolbar">
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={this.onAlignTile.bind(this, 'left')}
                  active={data.align === 'left'}
                >
                  <Icon name={imageLeftSVG} size="24px" />
                </Button>
              </Button.Group>
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={this.onAlignTile.bind(this, 'right')}
                  active={data.align === 'right'}
                >
                  <Icon name={imageRightSVG} size="24px" />
                </Button>
              </Button.Group>
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={this.onAlignTile.bind(this, 'center')}
                  active={data.align === 'center' || !data.align}
                >
                  <Icon name={imageFitSVG} size="24px" />
                </Button>
              </Button.Group>
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={this.onAlignTile.bind(this, 'full')}
                  active={data.align === 'full'}
                >
                  <Icon name={imageFullSVG} size="24px" />
                </Button>
              </Button.Group>
            </div>
          )}
        {this.props.selected &&
          !this.props.data.url && (
            <div className="toolbar">
              <Icon name={rssSVG} size="24px" />
              <form onSubmit={e => this.onSubmitUrl(e)}>
                <Input
                  onChange={this.onChangeUrl}
                  placeholder={this.props.intl.formatMessage(
                    messages.VideoTileInputPlaceholder,
                  )}
                />
              </form>
              {/* <Button.Group>
                <label className="ui button basic icon">
                  <Icon name={folderSVG} size="24px" />
                  <input
                    type="file"
                    onChange={this.onUploadImage}
                    style={{ display: 'none' }}
                  />
                </label>
              </Button.Group> */}
            </div>
          )}
        {data.url ? (
          <p>
            {data.url.match('.rss') ? (
              <Container>
                url matched
              </Container>
            ) : (
              <Container>
                Url not matched
              </Container>
            )}
          </p>
        ) : (
          <div>
            <Message>
              <center>
                <Icon name={rssSVG} size="100px" color="#b8c6c8" />
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
