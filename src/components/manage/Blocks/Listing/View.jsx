/**
 * View listing block.
 * @module components/manage/Blocks/Listing/View
 */

import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';
import { settings } from '~/config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchContent, resetSearchContent } from '../../../../actions';

@connect(
  (state, props) => ({
    items: get(state.search.subrequests, [props.id, 'items'], []),
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
 * Listing view component.
 * @class View
 * @extends Component
 */
export default class View extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    searchContent: PropTypes.func.isRequired,
    resetSearchContent: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    properties: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { query } = this.props.data;
    if (query) {
      // Use subrequests to fetch block data
      try {
        const options = {
          ...JSON.parse(query),
          fullobjects: 1,
        };
        this.props.searchContent('', options, this.props.id);
      } catch (err) {
        console.error('Listing Block View - componentDidMount: ', err.message);
      }
    }
  }

  /**
   * Component will unmount. Reset loaded content.
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    this.props.resetSearchContent(this.props.id);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { data, items, properties } = this.props;
    const folderItems = properties ? properties.items : [];
    const listingItems = data.query ? items : folderItems;

    if (listingItems.length === 0) {
      return <List className="block listing" />;
    }

    return (
      <List className="block listing">
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
    );
  }
}
