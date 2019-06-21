/**
 * Edit listing tile.
 * @module components/manage/Tiles/Listing/Edit
 */

import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { Link } from 'react-router-dom';
import { /*intlShape, */ FormattedMessage } from 'react-intl';
import { Button, List, Image } from 'semantic-ui-react';
import { settings } from '~/config';
import { withSidebar } from '~/helpers';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import Icon from '../../../../components/theme/Icon/Icon';
import configurationSVG from '../../../../icons/configuration.svg';
import { searchContent, resetSearchContent } from '../../../../actions';

@withSidebar
@connect(
  (state, props) => ({
    // loaded: get(state.search.subrequests, [props.tile, 'loaded'], false),
    items: get(state.search.subrequests, [props.tile, 'items'], []),
  }),
  dispatch =>
    bindActionCreators(
      {
        searchContent,
        resetSearchContent,
      },
      dispatch,
    ),
)
/**
 * Edit text tile class.
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
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    detached: PropTypes.bool,
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    onAddTile: PropTypes.func.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
    onMutateTile: PropTypes.func.isRequired,
    onFocusPreviousTile: PropTypes.func.isRequired,
    onFocusNextTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    openSidebar: PropTypes.func.isRequired,
    closeSidebar: PropTypes.func.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    // intl: intlShape.isRequired,
    searchContent: PropTypes.func.isRequired,
    resetSearchContent: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.any),
  };

  /**
   * Component did mount. Search items if the query is set.
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { data, searchContent, tile } = this.props;
    if (data.query) {
      const options = {
        ...JSON.parse(data.query),
        fullobjects: 1,
      };
      searchContent('', options, tile);
    }
  }

  /**
   * Component did update. Here we fetch new content if needed.
   * @method componentDidUpdate
   * @param {Object} prevProps Props before update
   * @returns {undefined}
   */
  componentDidUpdate(prevProps) {
    const { data, searchContent, tile } = this.props;
    if (prevProps.data.query !== data.query) {
      const options = {
        ...JSON.parse(data.query),
        fullobjects: 1,
      };
      searchContent('', options, tile);
    }
  }

  /**
   * Component will unmount. Reset loaded content.
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    this.props.resetSearchContent(this.props.tile);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      data,
      items,
      openSidebar,
      onSelectTile,
      properties,
      selected,
      tile,
    } = this.props;

    const folderItems = properties ? properties.items || [] : [];
    const listingItems = data.query ? items : folderItems;

    return (
      <div
        role="presentation"
        onClick={() => onSelectTile(tile)}
        className={cx('tile listing', {
          selected,
        })}
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
        <Button icon basic onClick={openSidebar} className="config-button">
          <Icon name={configurationSVG} size="22px" />
        </Button>
        {listingItems.length > 0 ? (
          <List>
            {listingItems.map(item => {
              const image = get(item, 'image.scales.mini.download', '').replace(
                settings.apiPath,
                '',
              );
              const url = item['@id'].replace(settings.apiPath, '');
              return (
                <List.Item key={item.UID}>
                  {image && <Image avatar src={image} alt={item.title} />}
                  <List.Content>
                    <List.Header>
                      <Link to={url}>{item.title}</Link>
                    </List.Header>
                    <List.Description>{item.description}</List.Description>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        ) : (
          <div className="tile listing">
            <FormattedMessage
              id="No results found."
              defaultMessage="No results found."
            />
          </div>
        )}
      </div>
    );
  }
}
