import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';

const messages = defineMessages({
  EmbeddedMap: {
    id: 'Embedded map',
    defaultMessage: 'Embedded map',
  },
});

const Body = ({ data }) => {
  const intl = useIntl();
  if (!data.url) return null;
  return (
    <div
      className={cx('maps-inner', {
        'full-width': data.align === 'full',
      })}
    >
      <iframe
        title={data.title || intl.formatMessage(messages.EmbeddedMap)}
        src={data.url}
        className="google-map"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

Body.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Body;
