import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  defineMessages,
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import { Button, Input } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { searchContent } from '@plone/volto/actions';

import configSVG from '@plone/volto/icons/configuration.svg';
import linkSVG from '@plone/volto/icons/link.svg';
import addSVG from '@plone/volto/icons/add.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import folderSVG from '@plone/volto/icons/folder.svg';
import imageSVG from '@plone/volto/icons/image.svg';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';

const messages = defineMessages({
  ImageTileInputPlaceholder: {
    id: 'Browse or type URL',
    defaultMessage: 'Browse or type URL',
  },
});

@injectIntl
@connect(
  state => ({
    searchSubrequests: state.search.subrequests,
  }),
  { searchContent },
)
class TileToolbar extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    tile: PropTypes.string.isRequired,
    onUploadImage: PropTypes.func.isRequired,
    onChangeImageURL: PropTypes.func.isRequired,
    onChangeLinkURL: PropTypes.func.isRequired,
    searchContent: PropTypes.func.isRequired,
    trashAction: PropTypes.func,
    searchSubrequests: PropTypes.objectOf(PropTypes.any).isRequired,
    intl: intlShape.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      linkOpen: false,
      isBrowserOpen: false,
      currentPath: '',
    };
  }

  onNavigate = id => {
    this.props.searchContent(
      id,
      {
        'path.depth': 1,
        fullobjects: 1,
      },
      this.props.tile,
    );
    this.setState({ currentPath: `${this.state.currentPath}${id}` });
  };

  onSelectItem = id => this.props.onChangeImageURL(id);

  onFocusImageInput = () => {
    this.setState({ isBrowserOpen: true });
    this.props.searchContent(
      '/',
      {
        'path.depth': 1,
        fullobjects: 1,
      },
      this.props.tile,
    );
  };

  render() {
    return (
      <div className="toolbar">
        <div className="toolbar-header">
          <Icon
            name={linkSVG}
            size="24px"
            onClick={() =>
              this.setState({
                linkOpen: true,
              })
            }
          />
          <div
            className="select-link"
            style={{
              width: this.state.linkOpen ? null : 0,
            }}
          >
            <form onKeyDown={this.props.onKeyDown}>
              <Input
                onChange={this.props.onChangeLinkURL}
                placeholder={this.props.intl.formatMessage(
                  messages.ImageTileInputPlaceholder,
                )}
              />
            </form>
          </div>
          <Icon
            name={imageSVG}
            size="24px"
            onClick={() =>
              this.setState({
                linkOpen: false,
              })
            }
          />
          <div
            className="select-image"
            style={{
              width: this.state.linkOpen ? 0 : null,
            }}
          >
            <form onKeyDown={this.props.onKeyDown}>
              <Input
                onChange={this.props.onChangeImageURL}
                placeholder={this.props.intl.formatMessage(
                  messages.ImageTileInputPlaceholder,
                )}
                onFocus={this.onFocusImageInput}
                onBlur={() => this.setState({ isBrowserOpen: true })}
              />
            </form>
            <Button.Group>
              <label className="ui button basic icon">
                <Icon name={folderSVG} size="24px" />
                <input
                  type="file"
                  onChange={this.props.onUploadImage}
                  style={{ display: 'none' }}
                />
              </label>
            </Button.Group>
          </div>
          <div className="separator" />
          <Button.Group>
            <Button icon basic onClick={this.props.trashAction}>
              <Icon name={trashSVG} size="24px" color="#e40166" />
            </Button>
          </Button.Group>
        </div>
        {this.state.isBrowserOpen && (
          <div className="toolbar-browser">
            <div className="toolbar-browser-header">
              {this.state.currentPath}
            </div>
            <div className="toolbar-browser-body">
              {this.props.searchSubrequests[this.props.tile] &&
                this.props.searchSubrequests[this.props.tile].items.map(
                  item => (
                    <div
                      className="toolbar-browser-item"
                      key={item['@id']}
                      onClick={() =>
                        item.is_folderish
                          ? this.onNavigate(item['@id'])
                          : this.onSelectItem(item['@id'])
                      }
                    >
                      {item['@id'].replace(this.state.currentPath, '')}
                    </div>
                  ),
                )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TileToolbar;
