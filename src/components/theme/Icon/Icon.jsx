import React from 'react';
import PropTypes from 'prop-types';

const defaultSize = '100%';

const Icon = ({ name, size, color, className, title }) => (
  <svg
    xmlns={name.attributes.xmlns}
    viewBox={name.attributes.viewBox}
    style={{ height: size, width: 'auto', fill: color || 'currentColor' }}
    className={className ? `icon ${className}` : 'icon'}
    dangerouslySetInnerHTML={{
      __html: title ? `<title>${title}</title>${name.content}` : name.content,
    }}
  />
);

Icon.propTypes = {
  name: PropTypes.shape({
    xmlns: PropTypes.string,
    viewBox: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};

Icon.defaultProps = {
  size: defaultSize,
  color: null,
  className: null,
  title: null,
};

export default Icon;
