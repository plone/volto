import React from 'react';
import { UniversalLink } from '@plone/volto/components';
import PropTypes from 'prop-types';

const ConditionalLink = ({ condition, to, ...props }) => {
  if (condition) {
    return (
      <UniversalLink href={to} {...props}>
        {props.children}
      </UniversalLink>
    );
  } else {
    return props.children;
  }
};

ConditionalLink.propTypes = {
  condition: PropTypes.bool,
  to: PropTypes.string,
  children: PropTypes.node,
};

export default ConditionalLink;
