import React from 'react';
import PropTypes from 'prop-types';
import registry from '@plone/volto/registry';

const TeaserBody = (props) => {
  const { variation } = props;
  const BodyComponent =
    variation?.view || registry.resolve('Teaser|Default')?.component;

  return <BodyComponent {...props} />;
};

TeaserBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  variation: PropTypes.objectOf(PropTypes.any),
  isEditMode: PropTypes.bool,
};

export default TeaserBody;
