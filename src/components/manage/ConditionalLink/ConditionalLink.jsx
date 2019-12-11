import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ConditionalLink = ({ condition, ...props }) => {
  if (condition) {
    return <Link {...props}>{props.children}</Link>;
  } else {
    return props.children;
  }
};

ConditionalLink.propTypes = {
  condition: PropTypes.bool,
  children: PropTypes.node,
};

export default ConditionalLink;
