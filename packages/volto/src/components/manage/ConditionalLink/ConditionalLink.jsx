import React from 'react';
import { UniversalLink } from '@plone/volto/components';
import PropTypes from 'prop-types';

const ConditionalLink = ({ condition, to, item, ...props }) => {
  if (condition) {
    return (
      <UniversalLink href={to} item={item} {...props}>
        {props.children}
      </UniversalLink>
    );
  } else {
    return <>{props.children}</>;
  }
};

ConditionalLink.propTypes = {
  condition: PropTypes.bool,
  to: PropTypes.string,
  item: PropTypes.shape({
    '@id': PropTypes.string,
    remoteUrl: PropTypes.string, //of plone @type 'Link'
  }),
  children: PropTypes.node,
};

export default ConditionalLink;
