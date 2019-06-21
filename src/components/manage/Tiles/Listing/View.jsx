/**
 * View listing tile.
 * @module components/manage/Tiles/Listing/View
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
    const { items } = this.props.properties;

    return (
      <List>
        {items.map(item => {
          const image = get(item, 'image.scales.mini.download', undefined);
          return (
            <List.Item>
              {image && <Image avatar src={image} />}
              <List.Content>
                <List.Header as="a">{item.title}</List.Header>
                <List.Description>{item.description}</List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );
  }
}
