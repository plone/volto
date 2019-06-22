/**
 * Edit listing tile.
 * @module components/manage/Tiles/Listing/Edit
 */

import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { List, Image } from 'semantic-ui-react';
import { settings } from '~/config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { Portal } from 'react-portal';

import { searchContent, resetSearchContent } from '../../../../actions';
import ListingSidebar from './ListingSidebar';

@connect(
  (state, props) => ({
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
 * Edit listing tile class.
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
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    searchContent: PropTypes.func.isRequired,
    resetSearchContent: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.any),
    properties: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  /**
   * Component did mount. Search items if the query is set.
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { data, searchContent, selected, tile } = this.props;
    if (selected) {
      this.node.focus();
    }
    if (data.query) {
      try {
        const options = {
          ...JSON.parse(data.query),
          fullobjects: 1,
        };
        searchContent('', options, tile);
      } catch (err) {
        console.error('Listing Tile Edit - componentDidMount: ', err.message);
      }
    }
  }

  /**
   * Component did update. Here we fetch new content if needed.
   * @method componentDidUpdate
   * @param {Object} prevProps Props before update
   * @returns {undefined}
   */
  componentDidUpdate(prevProps) {
    const {
      data,
      /* resetSearchContent, */ searchContent,
      selected,
      tile,
    } = this.props;
    if (!prevProps.selected && selected) {
      this.node.focus();
    }
    if (prevProps.data.query !== data.query) {
      if (!data.query) {
        // resetSearchContent(tile);
        return;
      }
      try {
        const options = {
          ...JSON.parse(data.query),
          fullobjects: 1,
        };
        searchContent('', options, tile);
      } catch (err) {
        console.error('Listing Tile Edit - componentDidUpdate: ', err.message);
      }
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
      onChangeTile,
      onSelectTile,
      properties,
      selected,
      tile,
    } = this.props;

    const folderItems = properties ? properties.items || [] : [];
    let listingItems = folderItems;
    try {
      JSON.parse(data.query);
      listingItems = items;
    } catch (err) {}

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
        <FormattedMessage id="Results preview" defaultMessage="Results preview">
          {message => <p className="items-preview">{message}</p>}
        </FormattedMessage>
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
        {selected && (
          <Portal
            node={__CLIENT__ && document.getElementById('sidebar-properties')}
          >
            <aside
              onClick={e => {
                e.stopPropagation();
              }}
              onKeyDown={e => {
                e.stopPropagation();
              }}
            >
              <ListingSidebar
                data={data}
                tile={tile}
                onChangeTile={onChangeTile}
              />
            </aside>
          </Portal>
        )}
      </div>
    );
  }
}
