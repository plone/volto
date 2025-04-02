/**
 * Avatar component.
 * @module components/theme/Avatar/Avatar
 */
import React from 'react';
import PropTypes from 'prop-types';
import { getInitials } from '@plone/volto/helpers/Utils/Utils';

const defaultSize = 30;
const defaultColor = 'Teal';
const defaultClassName = 'avatar circular';

const Avatar = ({ src, title = 'User', text, size = defaultSize, color = defaultColor, className = defaultClassName }) => {
  const validSize = size > 0 ? size : defaultSize;
  const radius = Math.round(validSize / 2);

  return (
    <div className={className} title={title} role="img">
      {src ? (
        <img src={src} alt={title} width={validSize} height={validSize} />
      ) : (
        <svg width={validSize} height={validSize}>
          <circle cx={radius} cy={radius} r={radius} fill={color} />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fill="white"
            fontSize={`${radius}px`}
            fontFamily="Arial"
            dy=".3em"
          >
            {text || getInitials(title, 1)}
          </text>
        </svg>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Avatar;
