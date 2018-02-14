/**
 * Editbar component.
 * @module components/Mosaic/Editbar/Editbar
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'semantic-ui-react';

/**
 * Editbar component class.
 * @function Editbar
 * @param {Object} props Component properties.
 * @param {func} props.insertTile Insert tile method.
 * @returns {string} Markup of the component.
 */
const Editbar = ({ insertTile }) => (
  <Menu compact icon="labeled" className="editbar">
    <Menu.Item name="font" onClick={() => insertTile('text')}>
      <Icon name="font" />
      Text
    </Menu.Item>

    <Menu.Item name="image">
      <Icon name="image" />
      Media
    </Menu.Item>

    <Menu.Item name="checkmark box">
      <Icon name="checkmark box" />
      Field
    </Menu.Item>

    <Menu.Item name="browser">
      <Icon name="browser" />
      App
    </Menu.Item>

    <Menu.Item name="cancel">
      <Icon name="cancel" color="red" />
      Cancel
    </Menu.Item>

    <Menu.Item name="save">
      <Icon name="save" color="blue" />
      Save
    </Menu.Item>
  </Menu>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Editbar.propTypes = {
  insertTile: PropTypes.func.isRequired,
};

export default Editbar;
