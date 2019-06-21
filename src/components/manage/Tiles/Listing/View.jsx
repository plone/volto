/**
 * View listing tile.
 * @module components/manage/Tiles/Listing/View
 */

import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';
import { settings } from '~/config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
    tile: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    getContent: PropTypes.func.isRequired,
    resetContent: PropTypes.func.isRequired,
    contentSubrequests: PropTypes.objectOf(PropTypes.any),
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const items = this.props.properties ? this.props.properties.items : null;

    if (!items) {
      return <div className="tile listing" />;
    }

    return (
      <List className="tile listing">
        {items.map(item => {
          const image = get(item, 'image.scales.mini.download', undefined);
          const url = item['@id'].replace(settings.apiPath, '');
          return (
            <List.Item>
              {image && <Image avatar src={image} alt={item.title} />}
              <List.Content>
                <List.Header as="a">
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
