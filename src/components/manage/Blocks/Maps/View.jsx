/**
 * View map block.
 * @module components/manage/Blocks/Maps/View
 */

import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { compose } from 'redux';
import { withBlockExtensions } from '@plone/volto/helpers';
const messages = defineMessages({
  EmbededGoogleMaps: {
    id: 'Embeded Google Maps Of',
    defaultMessage: 'Embeded Google Maps Of',
  },
});

/**
 * View image block class.
 * @class View
 * @extends Component
 */

const View = ({ data, intl }) => (
  <div
    className={cx(
      'block maps align',
      {
        center: !Boolean(data.align),
      },
      data.align,
    )}
  >
    <div
      className={cx('maps-inner', {
        'full-width': data.align === 'full',
      })}
    >
      <iframe
        title={`${intl.formatMessage(messages.EmbededGoogleMaps)} ${
          data.title
        }`}
        src={data.url}
        className="google-map"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default compose(injectIntl, withBlockExtensions)(View);
