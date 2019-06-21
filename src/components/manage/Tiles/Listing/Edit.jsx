/**
 * Edit listing tile.
 * @module components/manage/Tiles/Listing/Edit
 */

import { get } from 'lodash';
import { intlShape } from 'react-intl';
import { List, Image } from 'semantic-ui-react';
import { settings } from '~/config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
