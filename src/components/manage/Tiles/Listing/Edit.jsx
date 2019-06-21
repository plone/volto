/**
 * Edit listing tile.
 * @module components/manage/Tiles/Listing/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Image } from 'semantic-ui-react';
import { intlShape } from 'react-intl';
import { get } from 'lodash';

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
    intl: intlShape.isRequired,
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
