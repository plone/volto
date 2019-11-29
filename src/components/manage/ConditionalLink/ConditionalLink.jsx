import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ConditionalLink = props => {
  if (props.condition) {
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
