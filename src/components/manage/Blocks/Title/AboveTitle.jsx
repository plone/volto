import PropTypes from 'prop-types';

/**
 * Component to display item above the title, returns null by default. Addons or themes can register the desired AboveTitle component.
 * @function Field
 * @param {Object} props Component properties.
 * @param {Object} props.item Item to display above the title.
 * @returns {string} Markup of the component.
 */
const AboveTitle = ({ item }) => null;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
AboveTitle.propTypes = {
  /**
   * Item to display above the title.
   */
  item: PropTypes.object,
};

export default AboveTitle;
