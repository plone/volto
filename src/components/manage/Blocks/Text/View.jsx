/**
 * View text block.
 * @module components/manage/Blocks/Text/View
 */

import PropTypes from 'prop-types';
import redraft from 'redraft';

import { settings } from '~/config';

/**
 * View text block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) =>
  data.text
    ? redraft(data.text, settings.ToHTMLRenderers, settings.ToHTMLOptions)
    : '';

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
