/**
 * Avatar component.
 * @module components/theme/Avatar/Avatar
 */
import React from 'react';
import PropTypes from 'prop-types';
import { getInitials } from '@plone/volto/helpers';

const defaultSize = 30;
const defaultColor = 'Teal';
const defaultClassName = 'avatar circular';

const Avatar = ({ src, title, text, size, color, className }) => {
  const radius = Math.round(size / 2);
  return (
    <div className={className} title={title}>
      {src ? (
        <img src={src} alt={title}></img>
      ) : (
        <svg width={size} height={size}>
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

Avatar.defaultProps = {
  src: null,
  title: null,
  text: null,
  size: defaultSize,
  color: defaultColor,
  className: defaultClassName,
};

export default Avatar;
